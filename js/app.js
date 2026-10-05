import {
  ASSUMPTIONS,
  CHAINS,
  AIRPORT_BUS,
  FLIGHTS,
  HOTEL,
  LEAGUES,
  MATCHES,
  MEALS,
  META,
  METHOD,
  PLAYOFFS,
  STAY,
  TEAMS,
  WEIGHTS,
  RIDES,
  canReturnBetween,
  morningPrep,
  pitchPlan,
  rankedTeams,
  teamById,
  usableMeal,
} from "./data.js?v=pack";

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
  teams: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="9" r="2.2"/><circle cx="16" cy="9" r="2.2"/><path d="M4.8 18c.5-2 2-3.2 3.2-3.2S10.7 16 11.2 18M12.8 18c.5-2 2-3.2 3.2-3.2S19.2 16 19.7 18"/></svg>`,
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

function teamName(id) {
  return teamById(id).short;
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
  const titles = { trip: "Trip", schedule: "Schedule", rank: "Rank", teams: "Teams", team: "Teams", match: "Schedule", method: "Rank" };
  tabs.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("on", button.dataset.tab === (titles[page] ? pageMap(page) : "trip"));
  });
  const views = {
    trip: viewTrip,
    schedule: viewSchedule,
    rank: viewRank,
    teams: viewTeams,
    team: () => viewTeam(arg),
    match: () => viewMatch(arg),
    method: viewMethod,
  };
  app.innerHTML = (views[page] || viewTrip)();
  window.scrollTo(0, 0);
  bind();
}

function pageMap(page) {
  if (page === "team") return "teams";
  if (page === "match") return "schedule";
  if (page === "method") return "rank";
  return page;
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

function viewTrip() {
  const clock = countdown();
  const next = MATCHES.find((match) => match.mine);
  return `
    <section class="view">
      <header class="topbar">
        <div>
          <p class="eyebrow">${esc(META.competition)}</p>
          <h1>${esc(META.title)}</h1>
          <p class="sub">${esc(META.age)} · Salou · ${esc(META.dates)}</p>
        </div>
      </header>
      <div class="hero">
        <div class="kicker">Spånga IS F11-U Gul · first kick</div>
        <h2>${clock.started ? "Tournament day" : `${clock.days} days`}</h2>
        <p>${clock.started ? "Group games are underway." : `${clock.hours} hours until Saturday 09:50, Field 1, against St Patricks.`}</p>
        <div class="countdown">
          <div class="count"><b>${clock.days}</b><span>days</span></div>
          <div class="count"><b>5</b><span>group games</span></div>
          <div class="count"><b>2×20</b><span>minutes</span></div>
        </div>
      </div>
      <div class="grid-2">
        <div class="stat"><b>Futbol Salou</b><span>${esc(META.address)}</span></div>
        <div class="stat"><b>Group of six</b><span>Ireland, Sweden, Catalonia</span></div>
      </div>

      <div class="section">
        <div class="section-head"><h2>Next on your sheet</h2><button class="text-btn" data-go="#schedule">Full schedule</button></div>
        ${matchButton(next)}
      </div>

      <div class="section">
        <div class="section-head"><h2>Flights</h2></div>
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
          <p class="tiny" style="margin-top:8px">Times are printed as on the travel sheet. They are local times at each airport.</p>
        </div>
      </div>

      <div class="section">
        <div class="section-head"><h2>Airport bus</h2></div>
        <div class="card pad">
          <p class="small">The organiser’s shuttle to ${esc(HOTEL.name)}, ${esc(HOTEL.address)}. No coach company and no bus number are published.</p>
          <div class="flight">
            <div>
              <b>Fri 16</b>
              <div class="tiny">To the hotel</div>
            </div>
            <div>
              <div class="route">Hotel about ${esc(AIRPORT_BUS.arrival.hotelFrom)}–${esc(AIRPORT_BUS.arrival.hotelTo)}</div>
              <div class="times small">${esc(AIRPORT_BUS.arrival.flight)} lands ${esc(AIRPORT_BUS.arrival.land)}</div>
              <p class="tiny" style="margin-top:6px">${esc(AIRPORT_BUS.arrival.meet)}</p>
              <p class="tiny" style="margin-top:6px">The drive is about ${esc(RIDES.airportKm)} km. Clear roads are about 1 hour 10 minutes. A transfer quote for this hotel says 1 hour 40 minutes. The hotel window assumes the bus leaves about an hour after landing. Dinner is 19:00–21:30.</p>
              <p class="tiny" style="margin-top:6px">At Reus and Girona the bus waits in the parking area with the team name. This flight is Barcelona, so that is not the meeting point.</p>
            </div>
          </div>
          <div class="flight">
            <div>
              <b>Mon 19</b>
              <div class="tiny">To the airport</div>
            </div>
            <div>
              <div class="route">Airport about ${esc(AIRPORT_BUS.departure.airportFrom)}–${esc(AIRPORT_BUS.departure.airportTo)}</div>
              <div class="times small">Leave the hotel ${esc(AIRPORT_BUS.departure.hotelLeave)} · check out by ${esc(AIRPORT_BUS.departure.checkout)} · ${esc(AIRPORT_BUS.departure.flight)} at ${esc(AIRPORT_BUS.departure.flightTime)}</div>
              <p class="tiny" style="margin-top:6px">The bus leaves the hotel ${esc(AIRPORT_BUS.departure.rule)}. ${esc(AIRPORT_BUS.departure.flight)} is ${esc(AIRPORT_BUS.departure.flightTime)}, which makes ${esc(AIRPORT_BUS.departure.hotelLeave)}. The same drive then puts the group at the airport about ${esc(AIRPORT_BUS.departure.airportFrom)}–${esc(AIRPORT_BUS.departure.airportTo)}.</p>
            </div>
          </div>
          <p class="tiny" style="margin-top:8px">The bus goes to the age check at Futbol Salou, then to the hotel. Friday’s age check closes at 18:00. On the slower drive that window is already shut, and the check moves to Saturday before the first match.</p>
          <p class="tiny" style="margin-top:8px">${esc(HOTEL.name)} to Futbol Salou is about ${esc(RIDES.pitchKm)} km and 10 minutes by car. Allow ${esc(RIDES.pitchMin)} minutes for the team bus. These are map estimates. The organiser has not printed the shuttle clock times.</p>
          <p class="tiny" style="margin-top:8px">Fewer than ${esc(AIRPORT_BUS.minOnFlight)} people on the same flight means the organiser does not arrange this airport bus. The roster has 17 players, and the travel sheet does not say how many people are booked on these flights. Parents and supporters booked through the organiser ride the same shuttle. Anyone on a different flight arranges their own transfer. The Saturday and Sunday buses between the hotel and the fields are still arranged.</p>
          <p class="tiny" style="margin-top:8px">Tournament office: <a href="mailto:${esc(AIRPORT_BUS.officeEmail)}">${esc(AIRPORT_BUS.officeEmail)}</a> · ${esc(AIRPORT_BUS.officePhone)}. Sources: <a href="${esc(META.officialFaq)}">FAQ</a> · <a href="${esc(META.officialTerms)}">legal terms</a>.</p>
        </div>
      </div>

      <div class="section">
        <div class="section-head"><h2>Stay and match day</h2></div>
        <div class="card pad"><ul class="list">${STAY.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
      </div>

      <div class="section">
        <div class="callout">
          The ranking is a public-data projection, researched ${esc(META.researched)}. It is not the official table. Spånga here is F11-U Gul, the 2011 squad, playing up a year. Kilcullen won KDUL U16 Girls and the cup. Castle Villa finished second in that division. Gavà are licensed in Segona Divisió Cadet Femení and had played 0 games on 4 October. Every team in the group has a published roster. St Patricks’ best club match is St Patrick’s of Graiguecullen, Carlow.
          <div style="margin-top:8px"><button class="text-btn" data-go="#rank">See the order</button></div>
        </div>
      </div>
    </section>`;
}

function earlierMine(match) {
  return MATCHES.some((other) => other.mine && other.day === match.day && other.time < match.time);
}

function rideLine(time, staying) {
  const plan = pitchPlan(time);
  if (staying) return `Stay at Futbol Salou. Be at this field by ${plan.arrive}.`;
  return `Leave ${HOTEL.name} ${plan.leave}. Be at the field by ${plan.arrive}.`;
}

function matchButton(match) {
  const home = teamById(match.home);
  const away = teamById(match.away);
  const note = match.mine ? rideLine(match.time, earlierMine(match)) : "";
  return `
    <button class="match ${match.mine ? "mine" : ""}" data-go="#match/${match.id}">
      <div>
        <time>${esc(match.time)}</time>
        <div class="field">Field ${esc(match.field)}</div>
      </div>
      <div class="teams-mini">
        <div class="vs-row">${flag(home.flag)} ${esc(home.short)}${home.yours ? ' <span class="pill">You</span>' : ""}</div>
        <div class="vs-row">${flag(away.flag)} ${esc(away.short)}${away.yours ? ' <span class="pill">You</span>' : ""}</div>
        ${note ? `<p class="tiny meal-note">${esc(note)}</p>` : ""}
      </div>
      <span class="tiny">2×20</span>
    </button>`;
}

function mealCard(meal) {
  const label = meal.missed ? "Missed" : "Meal";
  return `
    <div class="match meal">
      <div>
        <time>${esc(meal.start)}</time>
        <div class="field">until ${esc(meal.end)}</div>
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
        <div class="field">until ${esc(prep.end)}</div>
      </div>
      <div>
        <div class="teams-mini">${esc(prep.name)}</div>
        <div class="field">${esc(prep.place)}</div>
        ${prep.note ? `<p class="tiny meal-note">${esc(prep.note)}</p>` : ""}
      </div>
      <span class="pill ink">15 min</span>
    </div>`;
}

function playoffCard(game) {
  return `
    <div class="match">
      <div>
        <time>${esc(game.time)}</time>
        <div class="field">Field ${esc(game.field)}</div>
      </div>
      <div class="teams-mini">
        <div class="vs-row">${esc(game.label)}</div>
        <div class="vs-row">${esc(game.pairing)}</div>
        <p class="tiny meal-note">${esc(rideLine(game.time, true))}</p>
      </div>
      <span class="tiny">2×20</span>
    </div>`;
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
  return `No time to go back to ${HOTEL.name} between these games. A game is 40 minutes, and the next one needs you at the field an hour before it. After the ${last} game you can be back about ${back}. The lunch card is the part of 13:00–14:30 you can still reach if the game does not run long.`;
}

function viewSchedule() {
  const games = MATCHES.filter((match) => state.day === match.day).filter((match) => state.filter === "all" || match.mine);
  const meals = MEALS.filter((meal) => meal.day === state.day).flatMap((meal) => usableMeal(meal));
  const prep = morningPrep(state.day);
  const playoffs = state.day === "sun" ? PLAYOFFS : [];
  const kindRank = { meal: 0, prep: 1, match: 2, playoff: 3 };
  const items = [
    ...meals.map((meal) => ({ sort: meal.start, kind: "meal", meal })),
    ...(prep ? [{ sort: prep.start, kind: "prep", prep }] : []),
    ...games.map((match) => ({ sort: match.time, kind: "match", match })),
    ...playoffs.map((game) => ({ sort: game.time, kind: "playoff", game })),
  ].sort((a, b) => a.sort.localeCompare(b.sort) || kindRank[a.kind] - kindRank[b.kind]);
  const days = [
    ["fri", "Friday 16"],
    ["sat", "Saturday 17"],
    ["sun", "Sunday 18"],
    ["mon", "Monday 19"],
  ];
  return `
    <section class="view">
      <header class="topbar">
        <div>
          <p class="eyebrow">Group A · 2×20</p>
          <h1>Schedule</h1>
          <p class="sub">Fifteen group games, then a placement match. Meal cards are the part of the hotel buffet Spånga can reach around those games.</p>
        </div>
      </header>
      <div class="filters">
        ${days.map(([day, label]) => `<button class="chip ${state.day === day ? "on" : ""}" data-day="${day}">${label}</button>`).join("")}
      </div>
      <div class="filters">
        <button class="chip ${state.filter === "mine" ? "on" : ""}" data-filter="mine">Spånga only</button>
        <button class="chip ${state.filter === "all" ? "on" : ""}" data-filter="all">Full group</button>
      </div>
      ${dayRideNote(state.day) ? `<div class="card pad small" style="margin-bottom:12px">${esc(dayRideNote(state.day))}</div>` : ""}
      <div class="stack">
        ${items.length ? items.map((item) => {
          if (item.kind === "meal") return mealCard(item.meal);
          if (item.kind === "prep") return prepCard(item.prep);
          if (item.kind === "match") return matchButton(item.match);
          return playoffCard(item.game);
        }).join("") : `<div class="card pad small">Nothing listed for this day.</div>`}
      </div>
      ${state.day === "sun" ? `<p class="tiny">Opponent in a placement match comes from the group table. A draw goes straight to penalties, five kicks then sudden death.</p>` : ""}
      <div class="section">
        <p class="tiny">Meals: <a href="${esc(META.officialRules)}">17–18 October programme</a>. The buffet is breakfast 07:00–10:00, lunch 13:00–14:30, dinner 19:00–21:30. Cards show the part Spånga can eat once the bus to the field is taken off. On match mornings breakfast ends 15 minutes before the bus, so there is time to change and collect things. Friday is dinner only. Monday is breakfast only, then check out by 11:00. The organiser can change these times. Matches: <a href="${esc(META.officialGroups)}">group list</a> · <a href="${esc(META.officialPlayoffs)}">playoffs</a>. Spånga’s five games also match the travel sheet.</p>
      </div>
    </section>`;
}

function viewRank() {
  const teams = rankedTeams();
  return `
    <section class="view">
      <header class="topbar">
        <div>
          <p class="eyebrow">Projection · not the table</p>
          <h1>Ranking</h1>
          <p class="sub">Built from published matches, common opponents searched three steps out, and the league each club actually plays in.</p>
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
                <div class="name">${flag(team.flag)} ${esc(team.name)}${team.yours ? ' <span class="pill">You</span>' : ""}</div>
                <div class="meta">${esc(team.place)} · confidence ${esc(team.confidenceLabel)}</div>
                <div class="bar" aria-hidden="true">
                  <i style="left:${left}%; width:${right - left}%"></i>
                  <b style="left:calc(${team.index}% - 5px)"></b>
                </div>
              </div>
              <div class="index">${team.index.toFixed(1)}<small>range ${left}–${right}</small></div>
            </button>`;
        }).join("")}
      </div>
      <div class="section">
        <div class="callout green">
          Järna lead on matches against older opposition. Spånga F11-U Gul are second. Gavà are third: a Villarreal partner school, licensed in a 15-team Segona Divisió cadet group, with no score yet. Kilcullen won a five-team Kildare U16 girls division and the cup, and Castle Villa were second. They have already split two league games, 2–0 and 5–3. That division has not been linked to a Swedish or Catalan opponent. St Patricks are not in that Kildare division. Their best club match is St Patrick’s of Graiguecullen in Carlow. Every squad list below is the tournament roster.
        </div>
      </div>
      <div class="section">
        <div class="section-head"><h2>How the number is made</h2><button class="text-btn" data-go="#method">Full method</button></div>
        <div class="card pad small">
          Results ${Math.round(WEIGHTS.results * 100)}% · league ${Math.round(WEIGHTS.league * 100)}% · pathway ${Math.round(WEIGHTS.pathway * 100)}% · this tournament ${Math.round(WEIGHTS.tournament * 100)}%.
          No published matches scores 50, which is neutral. The bar shows the range. The dot is the point estimate.
        </div>
      </div>
      <div class="section">
        <div class="section-head"><h2>Where the chains stop</h2></div>
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
      <button class="back" data-go="#rank">Back to ranking</button>
      <p class="eyebrow">Method</p>
      <h1>What went into the order</h1>
      <div class="card pad" style="margin-top:14px"><ul class="list">${METHOD.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
      <div class="section">
        <h2>National leagues</h2>
        <div class="stack" style="margin-top:10px">
          ${LEAGUES.map((league) => `
            <article class="card pad">
              <h3>${esc(league.country)}</h3>
              <p class="small" style="margin-top:6px">${esc(league.body)}</p>
            </article>`).join("")}
        </div>
      </div>
      <div class="section">
        <h2>Open points</h2>
        <div class="card pad" style="margin-top:10px"><ul class="list">${ASSUMPTIONS.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div>
      </div>
      <div class="section">
        <p class="tiny">Researched ${esc(META.researched)}. Rules: <a href="${esc(META.officialRules)}">tournament page</a>. Format in short: ${esc(META.format)}</p>
      </div>
    </section>`;
}

function viewTeams() {
  return `
    <section class="view">
      <header class="topbar">
        <div>
          <p class="eyebrow">Six clubs · three countries</p>
          <h1>Teams</h1>
          <p class="sub">Identity checked against the group list and public club records. Players are named only when a page names them.</p>
        </div>
      </header>
      <div class="stack">
        ${rankedTeams().map((team) => `
          <button class="team-row" data-go="#team/${team.id}">
            <div class="mark" style="background:${esc(team.colors[0])}">${esc(team.short.slice(0, 2).toUpperCase())}</div>
            <div class="grow">
              <b>${esc(team.name)}</b>${team.yours ? ' <span class="pill">You</span>' : ""}
              <div class="tiny">${flag(team.flag)} ${esc(team.place)}</div>
            </div>
            <div class="index" style="font-size:18px">${team.rank}</div>
          </button>`).join("")}
      </div>
    </section>`;
}

function componentRows(team) {
  const rows = [
    ["Results", team.components.results, "45%"],
    ["League", team.components.league, "25%"],
    ["Pathway", team.components.pathway, "20%"],
    ["This cup", team.components.tournament, "10%"],
  ];
  return `<div class="components">${rows.map(([label, value, weight]) => `<span>${esc(label)} <span class="tiny">${weight}</span></span><span>${value}</span>`).join("")}</div>`;
}

function viewTeam(id) {
  const team = teamById(id);
  if (!team) return `<section class="view"><p>Team not found.</p></section>`;
  const games = MATCHES.filter((match) => match.home === id || match.away === id);
  return `
    <section class="view">
      <button class="back" data-go="#teams">All teams</button>
      <p class="eyebrow">${flag(team.flag)} ${esc(team.country)} · rank ${team.rank}</p>
      <h1>${esc(team.name)}</h1>
      <p class="sub">${esc(team.place)} · index ${team.index.toFixed(1)} · range ${team.range[0]}–${team.range[1]}</p>
      <div class="section" style="margin-top:14px">
        <div class="callout ${team.rank <= 2 ? "green" : ""}">${esc(team.recordLine)}</div>
      </div>
      <div class="section">
        <h2>Who they are</h2>
        <div class="card pad" style="margin-top:10px">
          <p class="small">${esc(team.verified)}</p>
          <p class="small" style="margin-top:8px">${esc(team.identity)}</p>
          <p class="small" style="margin-top:8px">${esc(team.league)}</p>
        </div>
      </div>
      <div class="section">
        <div class="section-head"><h2>Why this rank</h2></div>
        <div class="card pad">
          ${componentRows(team)}
          <p class="tiny" style="margin-top:8px">Confidence: ${esc(team.confidenceLabel)} (${team.confidence}/100). A wide range means one new fact can move them.</p>
        </div>
      </div>
      <div class="section">
        <h2>Play and shape</h2>
        <div class="card pad" style="margin-top:10px">
          <span class="pill ink">${esc(team.style.status)}</span>
          <p class="small" style="margin-top:8px"><b>Starting formation:</b> ${esc(team.style.formation)}. ${esc(team.style.summary)}</p>
          <ul class="list">${team.style.points.map((point) => `<li>${esc(point)}</li>`).join("")}</ul>
          ${team.id === "gava" ? gavaPitch() : ""}
        </div>
      </div>
      <div class="section">
        <h2>Tournament roster</h2>
        <div class="card pad" style="margin-top:10px">
          ${team.players.length ? team.players.map((player) => `
            <div class="player">
              <div class="who"><span>${esc(player.name)}</span><span class="num">${esc(player.number)}</span></div>
              <div class="tiny" style="margin-top:2px">${esc(player.role)}</div>
              <p class="small" style="margin-top:4px">${esc(player.why)}</p>
            </div>`).join("") : `<p class="empty">${esc(team.playersNote)}</p>`}
          ${team.players.length ? `<p class="tiny" style="margin-top:8px">${esc(team.playersNote || "")}</p>` : ""}
          <p class="small" style="margin-top:10px"><b>Staff.</b> ${esc(team.staff)}</p>
          ${team.otherNames ? `<p class="small" style="margin-top:8px">${esc(team.otherNames)}</p>` : ""}
        </div>
      </div>
      <div class="section">
        <h2>For Spånga</h2>
        <div class="card pad" style="margin-top:10px"><p class="small">${esc(team.approach)}</p></div>
      </div>
      <div class="section">
        <h2>Matches we could verify</h2>
        <div class="card pad" style="margin-top:10px">
          ${team.results.length ? `<table class="score-table"><thead><tr><th>When</th><th>Score</th></tr></thead><tbody>
            ${team.results.map((result) => `<tr><td>${esc(result.date)}<div class="tiny">${esc(result.comp)}</div></td><td>${esc(result.score)}${result.implied ? ' <span class="pill">Implied</span>' : ""}<div class="tiny">${esc(result.note)}</div></td></tr>`).join("")}
          </tbody></table>` : `<p class="empty">No age-group score was published.</p>`}
          ${team.contextResults ? `<p class="tiny" style="margin-top:10px">${team.contextResults.map((result) => `${esc(result.score)}. ${esc(result.note)}`).join(" ")}</p>` : ""}
          ${team.table ? tableHtml(team.table) : ""}
        </div>
      </div>
      <div class="section">
        <h2>In this group</h2>
        <div class="stack" style="margin-top:10px">${games.map(matchButton).join("")}</div>
      </div>
      <div class="section">
        <h2>Sources</h2>
        <div class="card pad sources" style="margin-top:10px">
          ${team.sources.map((source) => `<a href="${esc(source.url)}">${esc(source.label)}</a>`).join("")}
        </div>
      </div>
    </section>`;
}

function tableHtml(table) {
  return `
    <p class="small" style="margin-top:12px"><b>${esc(table.title)}</b></p>
    <table class="score-table">
      <thead><tr><th>#</th><th>Team</th><th>P</th><th>Pts</th><th>GD</th></tr></thead>
      <tbody>
        ${table.rows.map((row) => `<tr class="${row[1].includes("Spånga") ? "you" : ""}">${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}
      </tbody>
    </table>`;
}

function gavaPitch() {
  return `
    <div class="pitch" aria-label="Academy idea, not a lineup">
      <div class="zone" style="left:8%; top:28%; width:28%">Build</div>
      <div class="zone" style="left:36%; top:28%; width:28%">Half-spaces</div>
      <div class="zone" style="left:64%; top:28%; width:28%">Decisions</div>
      <div class="zone" style="left:12%; bottom:18px; width:76%">Partnership habits only. The roster has numbers and no positions.</div>
    </div>`;
}

function viewMatch(id) {
  const match = MATCHES.find((item) => item.id === id);
  if (!match) return `<section class="view"><p>Match not found.</p></section>`;
  const home = teamById(match.home);
  const away = teamById(match.away);
  const yours = match.mine;
  const opponent = home.yours ? away : away.yours ? home : null;
  return `
    <section class="view">
      <button class="back" data-go="#schedule">Schedule</button>
      <p class="eyebrow">${esc(match.date)} · Field ${esc(match.field)}</p>
      <h1>${esc(match.time)}</h1>
      <p class="sub">2×20 minutes · Group A</p>
      <div class="stack" style="margin-top:14px">
        ${sideCard(home)}
        <div class="tiny" style="text-align:center">listed first on the official card, then second. The page does not mark home and away.</div>
        ${sideCard(away)}
      </div>
      ${yours && opponent ? `
        <div class="section">
          <h2>Reading for this game</h2>
          <div class="card pad" style="margin-top:10px"><p class="small">${esc(opponent.approach)}</p></div>
        </div>` : `
        <div class="section">
          <div class="callout">This game is the live evidence the pre-tournament ranking does not have. ${esc(home.short)} are projected ${home.rank}${ordinal(home.rank)}, ${esc(away.short)} ${away.rank}${ordinal(away.rank)}.</div>
        </div>`}
    </section>`;
}

function ordinal(n) {
  return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
}

function sideCard(team) {
  return `
    <button class="team-row" data-go="#team/${team.id}">
      <div class="mark" style="background:${esc(team.colors[0])}">${esc(team.short.slice(0, 2).toUpperCase())}</div>
      <div class="grow">
        <b>${esc(team.name)}</b>${team.yours ? ' <span class="pill">You</span>' : ""}
        <div class="tiny">Projected ${team.rank}${ordinal(team.rank)} · ${team.index.toFixed(1)}</div>
      </div>
    </button>`;
}

tabs.innerHTML = ["trip", "schedule", "rank", "teams"].map((id) => {
  const label = id[0].toUpperCase() + id.slice(1);
  return `<button type="button" data-tab="${id}" data-go="#${id}">${ICONS[id]}<span>${label}</span></button>`;
}).join("");

tabs.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  go(button.dataset.go);
});

window.addEventListener("hashchange", render);
render();
