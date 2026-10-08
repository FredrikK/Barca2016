import {
  ASSUMPTIONS,
  CHAINS,
  AGE_CHECK,
  AIRPORT_BUS,
  AREA,
  FLIGHTS,
  HOTEL,
  LEAGUES,
  MATCHES,
  MEALS,
  META,
  METHOD,
  PLAYOFFS,
  SNACK_PAGE,
  STAY,
  TEAMS,
  VENUE,
  WEIGHTS,
  WEATHER,
  RIDES,
  canReturnBetween,
  fieldSurface,
  morningPrep,
  pitchPlan,
  rankedTeams,
  snackStops,
  teamById,
  teamTheme,
  travelStops,
  usableMeal,
} from "./data.js?v=hembuss";

const app = document.querySelector("#app");
const tabs = document.querySelector("#tabbar");

const state = {
  filter: "mine",
  day: "sat",
};

const ICONS = {
  trip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15l8-9 8 9"/><path d="M8 15v4h8v-4"/></svg>`,
  schedule: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>`,
  rank: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 19V10M12 19V5M19 19v-7"/></svg>`,
  area: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.2"/></svg>`,
};

const TAB_LABELS = {
  trip: "Resa",
  schedule: "Schema",
  rank: "Motståndare",
  area: "Området",
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function flag(code) {
  return `<i class="flag ${esc(code)}" aria-hidden="true"></i>`;
}

function crest(team, size) {
  return `<img class="team-logo ${size}" src="${esc(team.logo)}" alt="">`;
}

function go(hash) {
  location.hash = hash;
}

function countdown() {
  const target = new Date(META.kickoff).getTime();
  const diff = Math.max(0, target - Date.now());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  return { days, hours, started: diff === 0 };
}

function render() {
  const route = (location.hash || "#trip").slice(1);
  const [page, arg] = route.split("/");
  tabs.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("on", button.dataset.tab === pageMap(page));
  });
  const views = {
    trip: viewTrip,
    schedule: viewSchedule,
    rank: viewRank,
    teams: viewRank,
    area: viewArea,
    team: () => viewTeam(arg),
    match: () => viewMatch(arg),
    method: viewMethod,
    snacks: viewSnacks,
  };
  app.innerHTML = (views[page] || viewTrip)();
  paintTheme(page === "team" ? teamById(arg) : null);
  window.scrollTo(0, 0);
  bind();
}

function paintTheme(team) {
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (!team) {
    for (const name of ["--green", "--green-soft", "--gold", "--gold-soft"]) root.style.removeProperty(name);
    themeColor?.setAttribute("content", "#003671");
    return;
  }
  const theme = teamTheme(team.colors);
  root.style.setProperty("--green", theme.ink);
  root.style.setProperty("--green-soft", theme.soft);
  root.style.setProperty("--gold", theme.accent);
  root.style.setProperty("--gold-soft", theme.soft);
  themeColor?.setAttribute("content", theme.ink);
}

function pageMap(page) {
  if (page === "team" || page === "teams") return "rank";
  if (page === "match") return "schedule";
  if (page === "method") return "rank";
  if (page === "snacks") return "";
  return ["trip", "schedule", "rank", "area"].includes(page) ? page : "trip";
}

function bind() {
  app.querySelectorAll("[data-go]").forEach((node) => {
    node.addEventListener("click", () => go(node.dataset.go));
  });
  app.querySelectorAll("[data-filter]").forEach((node) => {
    node.addEventListener("click", () => {
      state.filter = node.dataset.filter;
      render();
    });
  });
  app.querySelectorAll("[data-day]").forEach((node) => {
    node.addEventListener("click", () => {
      state.day = node.dataset.day;
      render();
    });
  });
}

function weatherFacts(day) {
  const forecast = WEATHER.days[day];
  if (!forecast) return "";
  return `${esc(forecast.summary)} · ${forecast.high}°/${forecast.low}° · regn ${forecast.rain}% · vind ${forecast.wind} km/h`;
}

function weatherCard(day) {
  const forecast = WEATHER.days[day];
  if (!forecast) return "";
  const games = forecast.games || [];
  return `
    <article class="card pad weather">
      <div class="section-head">
        <h2>${esc(forecast.summary)}</h2>
        <span class="pill ink">${forecast.high}° / ${forecast.low}°</span>
      </div>
      ${games.length ? games.map((game) => `
        <div class="weather-line">
          <b>${esc(game.time)}</b>
          <span class="small">${game.temp}° · ${esc(game.summary)} · regn ${game.rain} % · ${game.mm} mm · vind ${game.wind} km/h</span>
        </div>
        <p class="tiny">Prognos klockan ${esc(game.hour)}, närmaste hela timme kring avsparken.</p>`).join("") : ""}
      <p class="small" style="margin-top:8px">${esc(forecast.advice)}</p>
      <p class="small" style="margin-top:6px">Regnrisk ${forecast.rain} % under dygnet. Högsta vind ${forecast.wind} km/h. ${esc(WEATHER.note)}</p>
      <p class="tiny" style="margin-top:6px">Prognos för ${esc(WEATHER.place)} från <a href="${esc(WEATHER.source)}">${esc(WEATHER.sourceLabel)}</a>, hämtad ${esc(WEATHER.fetched)}. Siffrorna är avrundade och kan ändras.</p>
    </article>`;
}

function viewTrip() {
  const clock = countdown();
  const next = MATCHES.find((match) => match.mine);
  const dayOrder = [
    ["fri", "Fre 16"],
    ["sat", "Lör 17"],
    ["sun", "Sön 18"],
    ["mon", "Mån 19"],
  ];
  return `
    <section class="view">
      <header class="topbar">
        <div>
          <p class="eyebrow">${esc(META.competition)}</p>
          <h1>${esc(META.title)}</h1>
          <p class="sub">${esc(META.age)} · Salou · ${esc(META.dates)}</p>
        </div>
        <img class="crest" src="assets/spanga-crest.png" alt="Spånga IS Fotboll">
      </header>
      <div class="hero">
        <div class="kicker">Spånga IS F11-U Gul · första avspark</div>
        <h2>${clock.started ? "Cupdagen" : `${clock.days} dagar`}</h2>
        <p>${clock.started ? "Gruppmatcherna är igång." : `${clock.hours} timmar till lördag 09:50, plan 1, mot St Patricks.`}</p>
        <div class="countdown">
          <div class="count"><b>${clock.days}</b><span>dagar</span></div>
          <div class="count"><b>5</b><span>gruppmatcher</span></div>
          <div class="count"><b>2×20</b><span>plus ${esc(RIDES.breakMin)} min paus</span></div>
        </div>
      </div>
      <div class="grid-2">
        <div class="stat"><b>Futbol Salou</b><span>${esc(META.address)}</span></div>
        <div class="stat"><b>Grupp om sex</b><span>Irland, Sverige, Katalonien</span></div>
      </div>

      ${hotelCard()}

      <div class="section">
        <div class="section-head"><h2>Väder</h2><button class="text-btn" data-go="#schedule">Till schemat</button></div>
        <div class="card pad">
          ${dayOrder.map(([day, label]) => `
            <div class="weather-line">
              <b>${label}</b>
              <span class="small">${weatherFacts(day)}</span>
            </div>`).join("")}
          <p class="tiny" style="margin-top:8px">${esc(WEATHER.note)} Prognos från <a href="${esc(WEATHER.source)}">${esc(WEATHER.sourceLabel)}</a>, hämtad ${esc(WEATHER.fetched)}. Den kan ändras.</p>
        </div>
      </div>

      <div class="section">
        <div class="section-head"><h2>Nästa på ert kort</h2><button class="text-btn" data-go="#schedule">Hela schemat</button></div>
        ${matchButton(next)}
      </div>

      <div class="section">
        <div class="section-head"><h2>Flyg</h2></div>
        <div class="card pad">
          ${FLIGHTS.map((flight) => `
            <div class="flight">
              <div>
                <b>${esc(flight.no)}</b>
                <div class="tiny">${esc(flight.date)}</div>
              </div>
              <div>
                <div class="route">${esc(flight.from)} → ${esc(flight.to)}</div>
                <div class="times small">${esc(flight.dep)} – ${esc(flight.arr)}${flight.arrNote ? ` · ${esc(flight.arrNote)}` : ""}</div>
              </div>
            </div>`).join("")}
          <p class="tiny" style="margin-top:8px">Tiderna står som på resebladet. De är lokal tid på varje flygplats. Samling på Arlanda, terminal 5, kl ${esc(travelStops("fri").find((item) => item.name === "Samling").start)}. Resebladet har ingen egen mötestid, så det är två timmar före LH 801.</p>
        </div>
      </div>

      <div class="section">
        <div class="section-head"><h2>Flygbuss</h2></div>
        <div class="card pad">
          <p class="small">Arrangörens transfer till ${esc(HOTEL.name)}, ${esc(HOTEL.address)}. Inget bussbolag och inget linjenummer är publicerat.</p>
          <div class="flight">
            <div>
              <b>Fre 16</b>
              <div class="tiny">Till hotellet</div>
            </div>
            <div>
              <div class="route">Hotell ungefär ${esc(AIRPORT_BUS.arrival.hotelFrom)}–${esc(AIRPORT_BUS.arrival.hotelTo)}</div>
              <div class="times small">${esc(AIRPORT_BUS.arrival.flight)} landar ${esc(AIRPORT_BUS.arrival.land)}</div>
              <p class="tiny" style="margin-top:6px">${esc(AIRPORT_BUS.arrival.meet)}</p>
              <p class="tiny" style="margin-top:6px">Körningen är ungefär ${esc(RIDES.airportKm)} km. Fri väg tar ungefär 1 timme och 10 minuter. En transferoffert för det här hotellet säger 1 timme och 40 minuter. Hotellfönstret räknar med att bussen går ungefär en timme efter landning. Middag är 19:00–21:30.</p>
              <p class="tiny" style="margin-top:6px">På Reus och Girona väntar bussen på parkeringen med lagnamnet. Det här flyget går till Barcelona, så det är inte mötesplatsen.</p>
            </div>
          </div>
          <div class="flight">
            <div>
              <b>Mån 19</b>
              <div class="tiny">Till flygplatsen</div>
            </div>
            <div>
              <div class="route">Flygplats ungefär ${esc(AIRPORT_BUS.departure.airportFrom)}–${esc(AIRPORT_BUS.departure.airportTo)}</div>
              <div class="times small">Lämna hotellet cirka ${esc(AIRPORT_BUS.departure.hotelLeave)} · checka ut senast ${esc(AIRPORT_BUS.departure.checkout)} · ${esc(AIRPORT_BUS.departure.flight)} kl ${esc(AIRPORT_BUS.departure.flightTime)}</div>
              <p class="tiny" style="margin-top:6px">Hemresans buss är ${esc(AIRPORT_BUS.departure.rule)}. ${esc(AIRPORT_BUS.departure.flight)} går ${esc(AIRPORT_BUS.departure.flightTime)}, så det blir cirka ${esc(AIRPORT_BUS.departure.hotelLeave)}. Samma körning lägger gruppen på flygplatsen ungefär ${esc(AIRPORT_BUS.departure.airportFrom)}–${esc(AIRPORT_BUS.departure.airportTo)}.</p>
            </div>
          </div>
          <p class="tiny" style="margin-top:8px">Bussen går till ålderskontrollen på Futbol Salou och sedan till hotellet. Fredagens kontroll är öppen ${esc(AGE_CHECK.start)}–${esc(AGE_CHECK.end)}. På den långsammare körningen är fönstret redan stängt, och kontrollen flyttas till lördag före första matchen.</p>
          <p class="tiny" style="margin-top:8px">${esc(HOTEL.name)} till Futbol Salou är ungefär ${esc(RIDES.pitchKm)} km och 10 minuter med bil. Räkna ${esc(RIDES.pitchMin)} minuter för lagbussen. Det här är kartuppskattningar. Arrangören har inte tryckt klockslag för shutteln.</p>
          <p class="tiny" style="margin-top:8px">Färre än ${esc(AIRPORT_BUS.minOnFlight)} personer på samma flyg betyder att arrangören inte ordnar den här flygbussen. Truppen har 17 spelare, och resebladet säger inte hur många som är bokade på de här flygen. Föräldrar och supportrar som är bokade via arrangören åker samma transfer. Den som har ett annat flyg ordnar egen transfer. Lördag och söndag går bussarna mellan hotellet och planerna ändå.</p>
          <p class="tiny" style="margin-top:8px">Cupkontor: <a href="mailto:${esc(AIRPORT_BUS.officeEmail)}">${esc(AIRPORT_BUS.officeEmail)}</a> · ${esc(AIRPORT_BUS.officePhone)}. Källor: <a href="${esc(META.officialFaq)}">FAQ</a> · <a href="${esc(META.officialTerms)}">juridiska villkor</a>.</p>
        </div>
      </div>

      <div class="section">
        <div class="section-head"><h2>Boende och matchdag</h2></div>
        <div class="card pad"><ul class="list">${STAY.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
      </div>

      <div class="section">
        <div class="callout">
          Motståndarna är ordnade som en prognos från öppna källor, researchad ${esc(META.researched)}. Den är inte den officiella tabellen. Spånga här är F11-U Gul, 2011-truppen, som spelar ett år upp. Kilcullen vann KDUL U16 Girls och cupen. Castle Villa blev tvåa i den serien. Gavà är licensierade i Segona Divisió Cadet Femení och hade spelat 0 matcher den 4 oktober. Varje lag i gruppen har en publicerad trupp. Bästa klubbträffen för St Patricks är St Patrick’s i Graiguecullen, Carlow.
          <div style="margin-top:8px"><button class="text-btn" data-go="#rank">Se motståndarna</button></div>
        </div>
      </div>
    </section>`;
}

function hotelCard() {
  return `
    <div class="section">
      <div class="section-head">
        <h2>Hotellet</h2>
        <a class="text-btn" href="${esc(HOTEL.url)}" target="_blank" rel="noopener">Hotellets sida</a>
      </div>
      <div class="card pad">
        <div class="hotel-photos">
          ${HOTEL.photos.map((photo) => `
            <figure>
              <img src="${esc(photo.src)}" alt="${esc(photo.alt)}">
              <figcaption>${esc(photo.caption)}</figcaption>
            </figure>`).join("")}
        </div>
        <p class="small"><b>${esc(HOTEL.name)}</b> ${esc(HOTEL.stars)}</p>
        <p class="small">${esc(HOTEL.address)}</p>
        <ul class="list">${HOTEL.facts.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
        <p class="small" style="margin-top:10px"><a href="tel:${esc(HOTEL.phone.replaceAll(" ", ""))}">${esc(HOTEL.phone)}</a> · ${esc(HOTEL.phoneHours)} · <a href="mailto:${esc(HOTEL.email)}">${esc(HOTEL.email)}</a></p>
        <p class="small" style="margin-top:6px"><a href="${esc(HOTEL.map)}" target="_blank" rel="noopener">Karta</a></p>
        <p class="tiny" style="margin-top:8px">${esc(HOTEL.photoCredit)}</p>
      </div>
    </div>`;
}

function earlierMine(match) {
  return MATCHES.some((other) => other.mine && other.day === match.day && other.time < match.time);
}

function rideLine(time, staying) {
  const plan = pitchPlan(time);
  if (staying) return `Stanna på Futbol Salou. Var på den här planen senast ${plan.arrive}.`;
  return `Lämna ${HOTEL.name} ${plan.leave}. Var på planen senast ${plan.arrive}.`;
}

function matchButton(match) {
  const home = teamById(match.home);
  const away = teamById(match.away);
  const note = match.mine ? rideLine(match.time, earlierMine(match)) : "";
  const ends = pitchPlan(match.time).ends;
  return `
    <article class="match game ${match.mine ? "mine" : ""}">
      <button type="button" class="match-hit" data-go="#match/${match.id}">
        <div>
          <time>${esc(match.time)}</time>
          <div class="field">till ${esc(ends)}</div>
          <div class="field">Plan ${esc(match.field)}</div>
          <div class="field">${esc(fieldSurface(match.field).label)}</div>
        </div>
        <div class="teams-mini">
          <div class="vs-row">${crest(home, "mini")}${flag(home.flag)} ${esc(home.short)}${home.yours ? ' <span class="pill">Ni</span>' : ""}</div>
          <div class="vs-row">${crest(away, "mini")}${flag(away.flag)} ${esc(away.short)}${away.yours ? ' <span class="pill">Ni</span>' : ""}</div>
          ${note ? `<p class="tiny meal-note">${esc(note)}</p>` : ""}
        </div>
        <span class="tiny">2×20<br><span class="field">${esc(RIDES.breakMin)} min paus</span></span>
      </button>
    </article>`;
}

function travelCard(item) {
  const endLabel = item.end ? (item.start === "före" ? item.end : `till ${item.end}`) : "";
  return `
    <div class="match travel">
      <div>
        <time>${esc(item.start)}</time>
        ${endLabel ? `<div class="field">${esc(endLabel)}</div>` : ""}
      </div>
      <div>
        <div class="teams-mini">${esc(item.name)}</div>
        <div class="field">${esc(item.place)}</div>
        ${item.note ? `<p class="tiny meal-note">${esc(item.note)}</p>` : ""}
      </div>
      <span class="pill ink">${esc(item.pill)}</span>
    </div>`;
}

function checkCard(check) {
  return `
    <div class="match check">
      <div>
        <time>${esc(check.start)}</time>
        <div class="field">till ${esc(check.end)}</div>
      </div>
      <div>
        <div class="teams-mini">${esc(check.name)}</div>
        <div class="field">${esc(check.place)}</div>
        ${check.note ? `<p class="tiny meal-note">${esc(check.note)}</p>` : ""}
      </div>
      <span class="pill ink">Kontroll</span>
    </div>`;
}

function mealCard(meal) {
  const label = meal.missed ? "Missar" : "Måltid";
  return `
    <div class="match meal">
      <div>
        <time>${esc(meal.start)}</time>
        <div class="field">till ${esc(meal.end)}</div>
      </div>
      <div>
        <div class="teams-mini">${esc(meal.name)}</div>
        <div class="field">${esc(meal.place)}</div>
        ${meal.note ? `<p class="tiny meal-note">${esc(meal.note)}</p>` : ""}
      </div>
      <span class="pill green">${label}</span>
    </div>`;
}

function prepCard(prep) {
  return `
    <div class="match prep">
      <div>
        <time>${esc(prep.start)}</time>
        <div class="field">till ${esc(prep.end)}</div>
      </div>
      <div>
        <div class="teams-mini">${esc(prep.name)}</div>
        <div class="field">${esc(prep.place)}</div>
        ${prep.note ? `<p class="tiny meal-note">${esc(prep.note)}</p>` : ""}
      </div>
      <span class="pill ink">15 min</span>
    </div>`;
}

function snackCard(snack) {
  return `
    <button type="button" class="match snack" data-go="#snacks">
      <div>
        <time>${esc(snack.start)}</time>
        <div class="field">till ${esc(snack.end)}</div>
      </div>
      <div>
        <div class="teams-mini">${esc(snack.name)}</div>
        <div class="field">${esc(snack.place)}</div>
        <p class="tiny meal-note">Klicka för mer om mellanmålet</p>
      </div>
      <span class="pill ink">Mellis</span>
    </button>`;
}

function playoffCard(game) {
  const ends = pitchPlan(game.time).ends;
  return `
    <article class="match game">
      <div class="match-hit">
        <div>
          <time>${esc(game.time)}</time>
          <div class="field">till ${esc(ends)}</div>
          <div class="field">Plan ${esc(game.field)}</div>
          <div class="field">${esc(fieldSurface(game.field).label)}</div>
        </div>
        <div class="teams-mini">
          <div class="vs-row">${esc(game.label)}</div>
          <div class="vs-row">${esc(game.pairing)}</div>
          <p class="tiny meal-note">${esc(rideLine(game.time, true))}</p>
        </div>
        <span class="tiny">2×20<br><span class="field">${esc(RIDES.breakMin)} min paus</span></span>
      </div>
    </article>`;
}

function dayRideNote(day) {
  const mine = MATCHES.filter((match) => match.mine && match.day === day).sort((a, b) => a.time.localeCompare(b.time));
  if (!mine.length) return "";
  const last = day === "sun" ? "13:00" : mine[mine.length - 1].time;
  const back = pitchPlan(last).back;
  const hops = mine.slice(0, -1).every((match, index) => !canReturnBetween(match.time, mine[index + 1].time));
  const nextAfterGroups = day === "sun" ? "13:00" : null;
  const noReturnToPlayoff = nextAfterGroups ? !canReturnBetween(mine[mine.length - 1].time, nextAfterGroups) : true;
  if (!hops || !noReturnToPlayoff) return "";
  return `Ingen tid att åka tillbaka till ${HOTEL.name} mellan de här matcherna. En match är 40 minuter plus 5 minuters paus, och nästa kräver att ni är på planen en timme före. Klicka på mellanmålet i listan. Efter matchen ${last} kan ni vara tillbaka ungefär ${back}. Lunchkortet är den del av 13:00–14:30 som ni hinner om matchen inte drar ut på tiden.`;
}

function viewSchedule() {
  const games = MATCHES.filter((match) => state.day === match.day).filter((match) => state.filter === "all" || match.mine);
  const meals = MEALS.filter((meal) => meal.day === state.day).flatMap((meal) => usableMeal(meal));
  const prep = morningPrep(state.day);
  const snacks = snackStops(state.day);
  const playoffs = state.day === "sun" ? PLAYOFFS : [];
  const checks = AGE_CHECK.day === state.day ? [AGE_CHECK] : [];
  const travel = travelStops(state.day);
  const kindRank = { travel: 0, check: 1, meal: 2, prep: 3, match: 4, snack: 5, playoff: 6 };
  const items = [
    ...travel.map((item) => ({ sort: item.sort, kind: "travel", item })),
    ...checks.map((check) => ({ sort: check.start, kind: "check", check })),
    ...meals.map((meal) => ({ sort: meal.start, kind: "meal", meal })),
    ...(prep ? [{ sort: prep.start, kind: "prep", prep }] : []),
    ...games.map((match) => ({ sort: match.time, kind: "match", match })),
    ...snacks.map((snack) => ({ sort: snack.start, kind: "snack", snack })),
    ...playoffs.map((game) => ({ sort: game.time, kind: "playoff", game })),
  ].sort((a, b) => a.sort.localeCompare(b.sort) || kindRank[a.kind] - kindRank[b.kind]);
  const days = [
    ["fri", "Fredag 16"],
    ["sat", "Lördag 17"],
    ["sun", "Söndag 18"],
    ["mon", "Måndag 19"],
  ];
  return `
    <section class="view">
      <header class="topbar">
        <div>
          <p class="eyebrow">Grupp A · 2×20</p>
          <h1>Schema</h1>
          <p class="sub">Femton gruppmatcher, sedan en placeringsmatch. Måltidskorten är den del av hotellbuffén som Spånga hinner runt matcherna.</p>
        </div>
      </header>
      <div class="filters">
        ${days.map(([day, label]) => `<button class="chip ${state.day === day ? "on" : ""}" data-day="${day}">${label}</button>`).join("")}
      </div>
      <div class="filters">
        <button class="chip ${state.filter === "mine" ? "on" : ""}" data-filter="mine">Bara Spånga</button>
        <button class="chip ${state.filter === "all" ? "on" : ""}" data-filter="all">Hela gruppen</button>
      </div>
      ${weatherCard(state.day)}
      ${dayRideNote(state.day) ? `<div class="card pad small" style="margin-bottom:12px">${esc(dayRideNote(state.day))}</div>` : ""}
      <div class="stack">
        ${items.length ? items.map((item) => {
          if (item.kind === "travel") return travelCard(item.item);
          if (item.kind === "check") return checkCard(item.check);
          if (item.kind === "meal") return mealCard(item.meal);
          if (item.kind === "prep") return prepCard(item.prep);
          if (item.kind === "snack") return snackCard(item.snack);
          if (item.kind === "match") return matchButton(item.match);
          return playoffCard(item.game);
        }).join("") : `<div class="card pad small">Inget på den här dagen.</div>`}
      </div>
      ${state.day === "sun" ? `<p class="tiny">Motståndaren i en placeringsmatch kommer från grupptabellen. Oavgjort går direkt till straffar, fem straffar och sedan sudden death.</p>` : ""}
      <div class="section">
        <p class="tiny">Måltider: <a href="${esc(META.officialRules)}">programmet 17–18 oktober</a>. Buffén är frukost 07:00–10:00, lunch 13:00–14:30, middag 19:00–21:30. Korten visar den del Spånga kan äta när bussen till planen är borträknad. På matchmorgnar slutar frukosten 15 minuter före bussen, så det finns tid att byta om och samla ihop saker. Fredag är bara middag. Måndag är bara frukost, sedan utcheckning senast 11:00. Arrangören kan ändra tiderna. Plan 2, 3 och 4 är naturgräs. Övriga planer är konstgräs. ${esc(VENUE.studs)} Matcher: <a href="${esc(META.officialGroups)}">grupplista</a> · <a href="${esc(META.officialPlayoffs)}">slutspel</a> · <a href="${esc(VENUE.source)}">venuesidan</a>. Spångas fem matcher stämmer också med resebladet.</p>
      </div>
    </section>`;
}

function viewRank() {
  const teams = rankedTeams();
  return `
    <section class="view">
      <header class="topbar">
        <div>
          <p class="eyebrow">Prognos · inte tabellen</p>
          <h1>Motståndare</h1>
          <p class="sub">Byggd på publicerade matcher, gemensamma motståndare tre steg ut, och den serie varje klubb faktiskt spelar i. Tryck på ett lag för trupp och matcher. Identiteten är kollad mot grupplistan. Spelare nämns bara när en sida nämner dem.</p>
        </div>
      </header>
      <div class="stack">
        ${teams.map((team) => {
          const left = team.range[0];
          const right = team.range[1];
          return `
            <button class="rank-card" data-go="#team/${team.id}">
              <div class="rank-no">${team.rank}</div>
              <div>
                <div class="name">${crest(team, "rank")}${flag(team.flag)} ${esc(team.name)}${team.yours ? ' <span class="pill">Ni</span>' : ""}</div>
                <div class="meta">${esc(team.place)} · tillförlitlighet ${esc(team.confidenceLabel)}</div>
                <div class="bar" aria-hidden="true">
                  <i style="left:${left}%; width:${right - left}%"></i>
                  <b style="left:calc(${team.index}% - 5px)"></b>
                </div>
              </div>
              <div class="index">${team.index.toFixed(1)}<small>spann ${left}–${right}</small></div>
            </button>`;
        }).join("")}
      </div>
      <div class="section">
        <div class="callout green">
          Järna leder på matcher mot äldre motstånd. Spånga F11-U Gul är tvåa. Gavà är trea: en partnerklubb till Villarreal, licensierad i en cadetgrupp i Segona Divisió med 15 lag, och ännu utan resultat. Kilcullen vann en U16-flickserie i Kildare med fem lag, och cupen. Castle Villa blev tvåa. De har redan delat två seriematcher, 2–0 och 5–3. Den serien har inte kopplats till en svensk eller katalansk motståndare. St Patricks spelar inte i den Kildare-serien. Deras bästa klubbträff är St Patrick’s i Graiguecullen, Carlow. Varje trupplista på lagets sida är turneringstruppen.
        </div>
      </div>
      <div class="section">
        <div class="section-head"><h2>Så blir siffran</h2><button class="text-btn" data-go="#method">Hela metoden</button></div>
        <div class="card pad small">
          Resultat ${Math.round(WEIGHTS.results * 100)} % · serie ${Math.round(WEIGHTS.league * 100)} % · väg ${Math.round(WEIGHTS.pathway * 100)} % · den här cupen ${Math.round(WEIGHTS.tournament * 100)} %.
          Inga publicerade matcher ger 50, vilket är neutralt. Stapeln visar spannet. Pricken är punktestimatet.
        </div>
      </div>
      <div class="section">
        <div class="section-head"><h2>Där kedjorna tar slut</h2></div>
        <div class="stack">
          ${CHAINS.map((chain) => `
            <article class="card pad">
              <h3>${esc(chain.depth)}</h3>
              <p class="small" style="margin-top:6px">${esc(chain.text)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function viewMethod() {
  return `
    <section class="view">
      <button class="back" data-go="#rank">Tillbaka till motståndarna</button>
      <p class="eyebrow">Metod</p>
      <h1>Det som vägde in</h1>
      <div class="card pad" style="margin-top:14px"><ul class="list">${METHOD.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
      <div class="section">
        <h2>Nationella serier</h2>
        <div class="stack" style="margin-top:10px">
          ${LEAGUES.map((league) => `
            <article class="card pad">
              <h3>${esc(league.country)}</h3>
              <p class="small" style="margin-top:6px">${esc(league.body)}</p>
            </article>`).join("")}
        </div>
      </div>
      <div class="section">
        <h2>Öppna punkter</h2>
        <div class="card pad" style="margin-top:10px"><ul class="list">${ASSUMPTIONS.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
      </div>
      <div class="section">
        <p class="tiny">Researchat ${esc(META.researched)}. Regler: <a href="${esc(META.officialRules)}">turneringssidan</a>. Formatet i korthet: ${esc(META.format)}</p>
      </div>
    </section>`;
}

function placeCard(place) {
  return `
    <article class="card pad">
      <div class="section-head">
        <h3>${esc(place.name)}</h3>
        ${place.time ? `<span class="pill ink">${esc(place.time)}</span>` : ""}
      </div>
      <p class="small" style="margin-top:8px">${esc(place.text)}</p>
      ${place.href ? `<p class="small" style="margin-top:8px"><a href="${esc(place.href)}" target="_blank" rel="noopener">${esc(place.hrefLabel)}</a></p>` : ""}
    </article>`;
}

function viewArea() {
  return `
    <section class="view">
      <header class="topbar">
        <div>
          <h1>${esc(AREA.title)}</h1>
          <p class="sub">${esc(AREA.lead)}</p>
        </div>
      </header>
      <div class="section">
        <div class="section-head"><h2>${esc(AREA.hotelTitle)}</h2></div>
        <div class="stack">${AREA.hotel.map(placeCard).join("")}</div>
      </div>
      <div class="section">
        <div class="section-head"><h2>${esc(AREA.walkTitle)}</h2></div>
        <div class="stack">${AREA.nearby.map(placeCard).join("")}</div>
      </div>
      <div class="section">
        <div class="section-head"><h2>${esc(AREA.shopTitle)}</h2></div>
        <div class="stack">${AREA.shops.map(placeCard).join("")}</div>
      </div>
      <div class="section">
        <div class="callout">${esc(AREA.farther)}</div>
      </div>
      <div class="section">
        <div class="card pad">
          <p class="small">${esc(AREA.limits)}</p>
          <p class="small" style="margin-top:8px">${esc(AREA.free)}</p>
        </div>
      </div>
      <div class="section">
        <p class="tiny">${AREA.sources.map((source) => `<a href="${esc(source.url)}">${esc(source.label)}</a>`).join(" · ")}</p>
      </div>
    </section>`;
}

function componentRows(team) {
  const rows = [
    ["Resultat", team.components.results, "45 %"],
    ["Serie", team.components.league, "25 %"],
    ["Väg", team.components.pathway, "20 %"],
    ["Den här cupen", team.components.tournament, "10 %"],
  ];
  return `<div class="components">${rows.map(([label, value, weight]) => `<span>${esc(label)} <span class="tiny">${weight}</span></span><span>${value}</span>`).join("")}</div>`;
}

function viewTeam(id) {
  const team = teamById(id);
  if (!team) return `<section class="view"><p>Laget finns inte.</p></section>`;
  const games = MATCHES.filter((match) => match.home === id || match.away === id);
  return `
    <section class="view team-theme">
      <button class="back" data-go="#rank">Tillbaka till motståndarna</button>
      <div class="team-head">
        ${crest(team, "hero")}
        <div>
          <p class="eyebrow">${flag(team.flag)} ${esc(team.country)} · plats ${team.rank}</p>
          <h1>${esc(team.name)}</h1>
          <div class="kit" aria-hidden="true"><span style="background:${esc(team.colors[0])}"></span><span style="background:${esc(team.colors[1])}"></span></div>
          <p class="sub">${esc(team.place)} · index ${team.index.toFixed(1)} · spann ${team.range[0]}–${team.range[1]}</p>
        </div>
      </div>
      <div class="section" style="margin-top:14px">
        <div class="callout ${team.rank <= 2 ? "green" : ""}">${esc(team.recordLine)}</div>
      </div>
      <div class="section">
        <h2>Vilka de är</h2>
        <div class="card pad" style="margin-top:10px">
          <p class="small">${esc(team.verified)}</p>
          <p class="small" style="margin-top:8px">${esc(team.identity)}</p>
          <p class="small" style="margin-top:8px">${esc(team.league)}</p>
        </div>
      </div>
      <div class="section">
        <div class="section-head"><h2>Därför den här platsen</h2></div>
        <div class="card pad">
          ${componentRows(team)}
          <p class="tiny" style="margin-top:8px">Tillförlitlighet: ${esc(team.confidenceLabel)} (${team.confidence}/100). Ett brett spann betyder att ett nytt faktum kan flytta dem.</p>
        </div>
      </div>
      <div class="section">
        <h2>Spel och form</h2>
        <div class="card pad" style="margin-top:10px">
          <span class="pill ink">${esc(team.style.status)}</span>
          <p class="small" style="margin-top:8px"><b>Startformation:</b> ${esc(team.style.formation)}. ${esc(team.style.summary)}</p>
          ${team.lineup ? lineupPitch(team.lineup) : ""}
          <ul class="list">${team.style.points.map((point) => `<li>${esc(point)}</li>`).join("")}</ul>
          ${team.id === "gava" ? gavaPitch() : ""}
        </div>
      </div>
      <div class="section">
        <h2>Turneringstrupp</h2>
        <p class="tiny">Efternamn visas som en initial.</p>
        <div class="card pad" style="margin-top:10px">
          ${team.players.length ? team.players.map((player) => `
            <div class="player">
              <div class="who"><span>${esc(player.name)}</span><span class="num">${esc(player.number)}</span></div>
              ${player.role ? `<div class="tiny" style="margin-top:2px">${esc(player.role)}</div>` : ""}
              ${player.why ? `<p class="small" style="margin-top:4px">${esc(player.why)}</p>` : ""}
            </div>`).join("") : `<p class="empty">${esc(team.playersNote)}</p>`}
          ${team.players.length ? `<p class="tiny" style="margin-top:8px">${esc(team.playersNote || "")}</p>` : ""}
          <p class="small" style="margin-top:10px"><b>Ledare.</b> ${esc(team.staff)}</p>
          ${team.otherNames ? `<p class="small" style="margin-top:8px">${esc(team.otherNames)}</p>` : ""}
        </div>
      </div>
      <div class="section">
        <h2>För Spånga</h2>
        <div class="card pad" style="margin-top:10px"><p class="small">${esc(team.approach)}</p></div>
      </div>
      <div class="section">
        <h2>Matcher vi kunde belägga</h2>
        <div class="card pad" style="margin-top:10px">
          ${team.results.length ? `<table class="score-table"><thead><tr><th>När</th><th>Resultat</th></tr></thead><tbody>
            ${team.results.map((result) => `<tr><td>${esc(result.date)}<div class="tiny">${esc(result.comp)}</div></td><td>${esc(result.score)}${result.implied ? ' <span class="pill">Härlett</span>' : ""}${result.note ? `<div class="tiny">${esc(result.note)}</div>` : ""}</td></tr>`).join("")}
          </tbody></table>` : `<p class="empty">Inget resultat i åldersklassen var publicerat.</p>`}
          ${team.contextResults ? `<p class="tiny" style="margin-top:10px">${team.contextResults.map((result) => `${esc(result.score)}. ${esc(result.note)}`).join(" ")}</p>` : ""}
          ${(team.tables || (team.table ? [team.table] : [])).map((table) => tableHtml(table, team.short)).join("")}
        </div>
      </div>
      <div class="section">
        <h2>I den här gruppen</h2>
        <div class="stack" style="margin-top:10px">${games.map(matchButton).join("")}</div>
      </div>
      <div class="section">
        <h2>Källor</h2>
        <div class="card pad sources" style="margin-top:10px">
          ${team.sources.map((source) => `<a href="${esc(source.url)}">${esc(source.label)}</a>`).join("")}
        </div>
      </div>
    </section>`;
}

function tableHtml(table, mark) {
  const head = table.head || ["#", "Lag", "M", "Poäng", "MS"];
  return `
    <p class="small" style="margin-top:12px"><b>${esc(table.title)}</b></p>
    <table class="score-table${table.head ? " full" : ""}">
      <thead><tr>${head.map((cell) => `<th>${esc(cell)}</th>`).join("")}</tr></thead>
      <tbody>
        ${table.rows.map((row) => `<tr class="${mark && row[1].includes(mark) ? "you" : ""}">${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>`;
}

function lineupPitch(lineup) {
  const written = lineup.written
    ? `
    <p class="small" style="margin-top:12px"><b>${esc(lineup.written.title)}</b></p>
    <div class="xi-list">
      ${lineup.written.players.map((player) => `<span class="dot">${esc(player.name)}<br>${esc(player.number)}${player.tag ? `<br><span class="tiny">${esc(player.tag)}</span>` : ""}</span>`).join("")}
    </div>
    <p class="tiny" style="margin-top:8px">${esc(lineup.written.note)}</p>`
    : "";
  return `
    ${lineup.label ? `<p class="small" style="margin-top:12px"><b>${esc(lineup.label)}</b></p>` : ""}
    <div class="pitch xi" aria-label="${esc(lineup.label || "uppställning")}">
      ${lineup.rows.map((row) => `<div class="xi-row">${row.map((player) => `<span class="dot">${esc(player.name)}<br>${esc(player.number)}</span>`).join("")}</div>`).join("")}
    </div>
    <p class="tiny" style="margin-top:8px">${esc(lineup.note)}</p>
    ${written}`;
}

function gavaPitch() {
  return `
    <div class="pitch" aria-label="Akademins idé, inte en startuppställning">
      <div class="zone" style="left:8%; top:28%; width:28%">Uppbyggnad</div>
      <div class="zone" style="left:36%; top:28%; width:28%">Halvrum</div>
      <div class="zone" style="left:64%; top:28%; width:28%">Beslut</div>
      <div class="zone" style="left:12%; bottom:18px; width:76%">Bara vanor från samarbetet. Truppen har nummer och inga positioner.</div>
    </div>`;
}

function viewSnacks() {
  const blocks = [
    [SNACK_PAGE.packTitle, SNACK_PAGE.pack],
    [SNACK_PAGE.leaveTitle, SNACK_PAGE.leave],
    [SNACK_PAGE.playTitle, SNACK_PAGE.play],
  ];
  return `
    <section class="view">
      <button class="back" data-go="#schedule">Tillbaka till schemat</button>
      <h1>${esc(SNACK_PAGE.title)}</h1>
      <p class="sub">${esc(SNACK_PAGE.lead)}</p>
      ${blocks.map(([title, items]) => `
        <div class="section">
          <h2>${esc(title)}</h2>
          <div class="card pad" style="margin-top:10px"><ul class="list">${items.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
        </div>`).join("")}
      <div class="section">
        <div class="callout">${esc(SNACK_PAGE.when)}</div>
      </div>
    </section>`;
}

function viewMatch(id) {
  const match = MATCHES.find((item) => item.id === id);
  if (!match) return `<section class="view"><p>Matchen finns inte.</p></section>`;
  const home = teamById(match.home);
  const away = teamById(match.away);
  const yours = match.mine;
  const opponent = home.yours ? away : away.yours ? home : null;
  const surface = fieldSurface(match.field);
  const ends = pitchPlan(match.time).ends;
  return `
    <section class="view">
      <button class="back" data-go="#schedule">Schema</button>
      <p class="eyebrow">${esc(match.date)} · Plan ${esc(match.field)} · ${esc(surface.label)}</p>
      <h1>${esc(match.time)}–${esc(ends)}</h1>
      <p class="sub">2×20 minuter, ${esc(RIDES.breakMin)} minuters paus · Grupp A</p>
      <p class="tiny" style="margin-top:8px">${esc(VENUE.studs)}</p>
      <div class="stack" style="margin-top:14px">
        ${sideCard(home)}
        <div class="tiny" style="text-align:center">står först på det officiella kortet, sedan tvåa. Sidan markerar inte hemma och borta.</div>
        ${sideCard(away)}
      </div>
      ${yours && opponent ? `
        <div class="section">
          <h2>Läsning inför matchen</h2>
          <div class="card pad" style="margin-top:10px"><p class="small">${esc(opponent.approach)}</p></div>
        </div>` : `
        <div class="section">
          <div class="callout">Den här matchen är det som händer på planen, det som rankingen före cupen saknar. ${esc(home.short)} är prognos ${placeWord(home.rank)}, ${esc(away.short)} ${placeWord(away.rank)}.</div>
        </div>`}
    </section>`;
}

function placeWord(n) {
  return n === 1 || n === 2 ? `${n}:a` : `${n}:e`;
}

function sideCard(team) {
  return `
    <button class="team-row" data-go="#team/${team.id}">
      ${crest(team, "row")}
      <div class="grow">
        <b>${esc(team.name)}</b>${team.yours ? ' <span class="pill">Ni</span>' : ""}
        <div class="tiny">Prognos ${placeWord(team.rank)} · ${team.index.toFixed(1)}</div>
      </div>
    </button>`;
}

tabs.innerHTML = ["trip", "schedule", "rank", "area"].map((id) => {
  return `<button type="button" data-tab="${id}" data-go="#${id}">${ICONS[id]}<span>${TAB_LABELS[id]}</span></button>`;
}).join("");

tabs.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  go(button.dataset.go);
});

window.addEventListener("hashchange", render);
render();
