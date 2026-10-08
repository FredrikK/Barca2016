import fs from "node:fs";
import { AGE_CHECK, AIRPORT_BUS, AREA, FLIGHT_CHECK, FLIGHTS, HOTEL, MATCHES, MEALS, PLAYOFFS, RIDES, SNACK_PAGE, TEAMS, WEATHER, awayBlocks, canReturnBetween, fieldSurface, indexOf, morningPrep, pitchPlan, snackStops, teamById, teamTheme, travelStops, usableMeal } from "../js/data.js";

const ids = TEAMS.map((team) => team.id);
if (new Set(ids).size !== 6) throw new Error("expected 6 teams");

const ranks = TEAMS.map((team) => team.rank).sort((a, b) => a - b);
if (ranks.join() !== "1,2,3,4,5,6") throw new Error("ranks must be 1 through 6");

for (const team of TEAMS) {
  if (!team.logo || !fs.existsSync(new URL(`../${team.logo}`, import.meta.url))) {
    throw new Error(`${team.id} logo missing`);
  }
  const computed = indexOf(team.components);
  if (computed !== team.index) {
    throw new Error(`${team.id} index ${team.index} != computed ${computed}`);
  }
  if (team.range[0] > team.index || team.range[1] < team.index) {
    throw new Error(`${team.id} index outside published range`);
  }
}

if (MATCHES.length !== 15) throw new Error("expected 15 group matches");

const pairKey = (match) => [match.home, match.away].sort().join("|");
const pairs = new Set(MATCHES.map(pairKey));
if (pairs.size !== 15) throw new Error("duplicate pairing");

for (const id of ids) {
  const opponents = new Set();
  for (const match of MATCHES) {
    if (match.home === id) opponents.add(match.away);
    if (match.away === id) opponents.add(match.home);
  }
  if (opponents.size !== 5) throw new Error(`${id} plays ${opponents.size} opponents`);
}

const spanga = MATCHES.filter((match) => match.mine);
const expected = [
  ["09:50", "1", "stpatricks"],
  ["11:30", "10", "castlevilla"],
  ["13:10", "1", "jarna"],
  ["09:00", "3", "kilcullen"],
  ["11:00", "1", "gava"],
];
spanga.forEach((match, index) => {
  const [time, field, opponent] = expected[index];
  const other = match.home === "spanga" ? match.away : match.home;
  if (match.time !== time || match.field !== field || other !== opponent) {
    throw new Error(`Spånga fixture ${index} drifted`);
  }
});

const order = [...TEAMS].sort((a, b) => b.index - a.index).map((team) => team.id);
if (order.join() !== "jarna,spanga,gava,kilcullen,castlevilla,stpatricks") {
  throw new Error(`unexpected order ${order.join()}`);
}

const jarna = teamById("jarna");
if (!jarna.players.some((player) => player.name === "Sofia V." && player.number === "10")) {
  throw new Error("Vall missing from the 2026 roster");
}
if (jarna.players.length !== 17) throw new Error("Järna roster length");
if (jarna.style.formation !== "4-3-3") throw new Error("Järna formation drifted");
const jarnaXi = jarna.lineup.rows.flat().map((player) => player.number).sort((a, b) => Number(a) - Number(b));
if (jarnaXi.join() !== "1,3,4,6,7,10,12,19,21,22,23") throw new Error("Järna lineup drifted");
const jarnaWritten = jarna.lineup.written.players.map((player) => player.number).sort((a, b) => Number(a) - Number(b));
if (jarnaWritten.join() !== "1,3,4,6,7,8,9,10,12,19,21") throw new Error("Järna written eleven drifted");
if (!jarna.lineup.note.includes("inte en bekräftad startelva")) throw new Error("the shown lineup was treated as the Salou eleven");
if (!jarna.style.summary.includes("Freja G.") || !jarna.style.summary.includes("avbytare")) {
  throw new Error("the drawn 4-3-3 was treated as the written eleven");
}
if (!jarna.league.includes("16–10") || !jarna.league.includes("10–21") || !jarna.league.includes("4:a")) {
  throw new Error("Järna league tables missing");
}
if (!jarna.tables || jarna.tables.length !== 2) throw new Error("Järna needs both autumn tables");
for (const table of jarna.tables) {
  const row = table.rows.find((item) => item[1] === "Järna SK");
  if (!row || row[0] !== "4") throw new Error(`Järna is not 4th in ${table.title}`);
}
if (jarna.tables[0].rows[3].join() !== "4,Järna SK,7,3,2,2,11,16–10") {
  throw new Error("Södermanland row drifted");
}
if (jarna.tables[1].rows[3].join() !== "4,Järna SK,6,3,0,3,9,10–21") {
  throw new Error("Värmland row drifted");
}
if (jarna.league.includes("syns inte")) throw new Error("draws and losses still described as missing");

function contrastOnWhite(hex) {
  const value = parseInt(hex.slice(1), 16);
  const linear = [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  return 1.05 / (luminance + 0.05);
}
for (const team of TEAMS) {
  const theme = teamTheme(team.colors);
  if (contrastOnWhite(theme.ink) < 4.5) throw new Error(`${team.id} theme ink is too light`);
  if (![team.colors[0].toLowerCase(), team.colors[1].toLowerCase()].includes(theme.accent.toLowerCase())) {
    throw new Error(`${team.id} accent left the kit`);
  }
}
if (teamTheme(["#c9842a", "#1a2332"]).ink.toLowerCase() !== "#1a2332") {
  throw new Error("Kilcullen gold was used as text");
}
if (teamTheme(["#8c1d40", "#f2c14e"]).accent.toLowerCase() !== "#f2c14e") {
  throw new Error("Gavà gold accent missing");
}

const expectedRosters = {
  jarna: 17,
  gava: 20,
  kilcullen: 18,
  spanga: 17,
  castlevilla: 19,
  stpatricks: 17,
};
for (const [id, count] of Object.entries(expectedRosters)) {
  const team = teamById(id);
  if (team.players.length !== count) throw new Error(`${id} roster length ${team.players.length}`);
  if (!team.sources.some((source) => source.label === "Turneringstrupp")) {
    throw new Error(`${id} missing tournament roster source`);
  }
}

const spangaTeam = teamById("spanga");
if (!spangaTeam.players.some((player) => player.name === "Mira D." && player.number === "10")) {
  throw new Error("Spånga roster missing Mira Drougge");
}
if (!spangaTeam.staff.includes("Thomas Gustafsson") || !spangaTeam.staff.includes("Malin Drougge")) {
  throw new Error("Spånga coaches missing");
}
const spangaText = JSON.stringify(spangaTeam);
if (spangaText.includes("Vendela") || spangaText.includes("Michelle Rojas") || spangaText.includes("Persbeck")) {
  throw new Error("Spånga page still names people who are not on the tournament roster");
}

if (!teamById("castlevilla").players.some((player) => player.name === "Abbie L." && player.number === "11")) {
  throw new Error("Castle Villa roster missing Landon");
}
if (!teamById("gava").staff.includes("Ania Torres Torres")) throw new Error("Gavà coach missing");
if (!teamById("gava").players.some((player) => player.name === "Noa M. S.")) {
  throw new Error("Gavà roster spelling");
}
if (!teamById("gava").league.includes("Segona Divisió Femení Cadet")) {
  throw new Error("Gavà division missing");
}
if (teamById("gava").rank !== 3 || teamById("spanga").rank !== 2) {
  throw new Error("Gavà should be third and Spånga second");
}
if (!teamById("kilcullen").players.every((player) => player.number === "0")) {
  throw new Error("Kilcullen shirt numbers should stay 0, as printed");
}

const kilcullen = teamById("kilcullen");
if (!kilcullen.results.some((result) => result.score.includes("7–0"))) {
  throw new Error("Kilcullen cup final missing");
}
if (!kilcullen.results.some((result) => result.score === "Kilcullen 0–2 Castle Villa")) {
  throw new Error("Kilcullen league loss missing");
}
if (!teamById("castlevilla").results.some((result) => result.score === "Castle Villa 3–5 Kilcullen")) {
  throw new Error("Castle Villa return game missing");
}

const pats = teamById("stpatricks");
if (!pats.players.some((player) => player.name === "Ciara C." && player.number === "7")) {
  throw new Error("St Patricks roster missing Cahoon");
}
if (pats.players.length !== 17) throw new Error("St Patricks roster length");
if (pats.results.length !== 0) throw new Error("St Patricks still has no published girls result");
if (!pats.league.includes("7 oktober") || !pats.league.includes("inte den här truppen")) {
  throw new Error("St Patricks recheck missing");
}
if (!pats.league.includes("Midlands") || !pats.league.includes("Wicklow")) {
  throw new Error("neighbouring girls leagues missing");
}
if (pats.league.includes("1–4") || pats.recordLine.includes("1–4")) {
  throw new Error("boys U16 score must stay off the girls page");
}
const publicName = /^(?:\p{L}+(?:-\p{L}+)*)(?: \p{Lu}\.)+$/u;
for (const team of TEAMS) {
  for (const player of team.players) {
    if (!publicName.test(player.name)) throw new Error(`player name not anonymized: ${player.name}`);
  }
}
const visible = JSON.stringify(TEAMS.map((team) => ({
  ...team,
  staff: "",
  sources: team.sources.map((source) => source.label),
})));
for (const surname of ["Vall", "Landon", "Cahoon", "Fredriksson", "Mostazo", "Saavedra", "Donnelly", "O'Sullivan", "Elbahlawan", "Hamrin", "Roussy", "Menis", "Goddard", "Malmia"]) {
  if (visible.includes(surname)) throw new Error(`surname still on the page: ${surname}`);
}

function expectMeal(day, name, start, end) {
  const meal = MEALS.find((item) => item.day === day && item.name === name);
  if (!meal || meal.start !== start || meal.end !== end || meal.place !== "Hotellbuffé") {
    throw new Error(`${day} ${name} meal time drifted`);
  }
}
expectMeal("fri", "Middag", "19:00", "21:30");
expectMeal("sat", "Frukost", "07:00", "10:00");
expectMeal("sat", "Lunch", "13:00", "14:30");
expectMeal("sat", "Middag", "19:00", "21:30");
expectMeal("sun", "Frukost", "07:00", "10:00");
expectMeal("sun", "Lunch", "13:00", "14:30");
expectMeal("sun", "Middag", "19:00", "21:30");
expectMeal("mon", "Frukost", "07:00", "10:00");
function expectUsable(day, name, start, end) {
  const meal = MEALS.find((item) => item.day === day && item.name === name);
  const windows = usableMeal(meal);
  if (windows.length !== 1 || windows[0].missed || windows[0].start !== start || windows[0].end !== end) {
    throw new Error(`${day} ${name} usable window drifted: ${JSON.stringify(windows)}`);
  }
  if (windows[0].officialStart !== meal.start || windows[0].officialEnd !== meal.end) {
    throw new Error(`${day} ${name} lost the official buffet hours`);
  }
}
expectUsable("fri", "Middag", "19:00", "21:30");
expectUsable("sat", "Frukost", "07:00", "08:20");
expectUsable("sat", "Lunch", "14:10", "14:30");
expectUsable("sat", "Middag", "19:00", "21:30");
expectUsable("sun", "Frukost", "07:00", "07:30");
expectUsable("sun", "Lunch", "14:00", "14:30");
expectUsable("sun", "Middag", "19:00", "21:30");
expectUsable("mon", "Frukost", "07:00", "10:00");
const satLunch = usableMeal(MEALS.find((meal) => meal.id === "sat-lunch"))[0];
const sunLunch = usableMeal(MEALS.find((meal) => meal.id === "sun-lunch"))[0];
if (satLunch.start <= "13:10" || sunLunch.start <= "13:00") throw new Error("lunch still sorts inside a game");
if (!satLunch.note.includes("13:00") || !sunLunch.note.includes("13:00")) throw new Error("clipped lunch hid the buffet open time");
const satAway = awayBlocks("sat");
const sunAway = awayBlocks("sun");
if (satAway.length !== 1 || satAway[0].start !== "08:35" || satAway[0].end !== "14:10") throw new Error("Saturday away block drifted");
if (sunAway.length !== 1 || sunAway[0].start !== "07:45" || sunAway[0].end !== "14:00") throw new Error("Sunday away block drifted");
if (awayBlocks("fri").length || awayBlocks("mon").length) throw new Error("a rest day invented an away block");
const satPrep = morningPrep("sat");
const sunPrep = morningPrep("sun");
if (!satPrep || satPrep.start !== "08:20" || satPrep.end !== "08:35") throw new Error("Saturday packing window drifted");
if (!sunPrep || sunPrep.start !== "07:30" || sunPrep.end !== "07:45") throw new Error("Sunday packing window drifted");
if (morningPrep("fri") || morningPrep("mon")) throw new Error("a rest morning invented a packing window");
function expectSnack(day, index, start, end, kick) {
  const snack = snackStops(day)[index];
  if (!snack || snack.start !== start || snack.end !== end || !snack.note.includes(kick)) {
    throw new Error(`${day} snack ${index} drifted: ${JSON.stringify(snack)}`);
  }
  if (!snack.note.includes("banan") || !snack.note.toLowerCase().includes("vatten")) {
    throw new Error(`${day} snack ${index} is missing food or drink`);
  }
}
const satSnacks = snackStops("sat");
const sunSnacks = snackStops("sun");
if (satSnacks.length !== 2 || sunSnacks.length !== 2) throw new Error("match day should have two snacks");
expectSnack("sat", 0, "10:35", "11:15", "11:30");
expectSnack("sat", 1, "12:15", "12:55", "13:10");
expectSnack("sun", 0, "09:45", "10:45", "11:00");
expectSnack("sun", 1, "11:45", "12:45", "13:00");
if (snackStops("fri").length || snackStops("mon").length) throw new Error("a rest day invented a snack");
if (satSnacks[0].start <= "09:50" || satSnacks[1].start <= "11:30" || sunSnacks[0].start <= "09:00" || sunSnacks[1].start <= "11:00") {
  throw new Error("a snack sorts inside the game before it");
}
const satBreakfast = usableMeal(MEALS.find((meal) => meal.id === "sat-breakfast"))[0];
if (!satBreakfast.note.includes("08:35") || !sunPrep.note.toLowerCase().includes("byt")) {
  throw new Error("breakfast no longer names the bus or the packing time");
}
if (MEALS.length !== 8) throw new Error("expected 8 meals");
if (MEALS.some((meal) => meal.day === "fri" && meal.name !== "Middag")) throw new Error("Friday should list dinner only");
if (AGE_CHECK.day !== "fri" || AGE_CHECK.start !== "11:00" || AGE_CHECK.end !== "18:00") throw new Error("Friday age check drifted");
if (AGE_CHECK.place !== "Futbol Salou") throw new Error("age check place drifted");
if (!AGE_CHECK.note.includes("foto") || !AGE_CHECK.note.includes("lördag") || !AGE_CHECK.note.includes("15:30")) {
  throw new Error("age check note drifted");
}
if (MEALS.some((meal) => meal.day === "mon" && meal.name !== "Frukost")) throw new Error("Monday should list breakfast only");

const friTravel = travelStops("fri");
const monTravel = travelStops("mon");
if (travelStops("sat").length || travelStops("sun").length) throw new Error("a match day invented a flight");
const friNames = friTravel.map((item) => item.name).join(",");
if (friNames !== "Samling,LH 801,LH 1130,Flygbuss") throw new Error(`Friday travel drifted: ${friNames}`);
const meet = friTravel[0];
if (meet.start !== "07:50" || meet.end !== "" || meet.sort !== "07:50" || meet.place !== "Arlanda, terminal 5") throw new Error("Arlanda meeting drifted");
if (!meet.note.includes("ingen egen mötestid") || !meet.note.includes("två timmar")) throw new Error("meeting no longer says it is two hours before the flight");
if (friTravel[1].start !== "09:50" || friTravel[1].end !== "12:00" || friTravel[1].place !== "Arlanda → Frankfurt") throw new Error("LH 801 drifted");
if (friTravel[2].start !== "13:25" || friTravel[2].end !== "15:30") throw new Error("LH 1130 drifted");
if (friTravel[3].start !== "15:30" || !friTravel[3].note.includes("ankomsthallen") || !friTravel[3].note.includes("17:40")) {
  throw new Error("Friday bus drifted");
}
const monNames = monTravel.map((item) => item.name).join(",");
if (monNames !== "Flygbuss,LH 1135,LH 810") throw new Error(`Monday travel drifted: ${monNames}`);
if (monTravel[0].start !== "15:00" || !monTravel[0].note.includes("16:10")) throw new Error("Monday bus drifted");
if (!monTravel[0].note.includes("cirka 15:00") || !monTravel[0].note.includes("flygtiderna")) throw new Error("Monday bus no longer follows the cup's about-four-hours rule");
if (!AIRPORT_BUS.departure.rule.includes("cirka 4 timmar") || !AIRPORT_BUS.departure.rule.includes("flygtiderna")) throw new Error("home bus rule drifted");
if (AIRPORT_BUS.departure.rule.includes("Barcelona-flyg")) throw new Error("home bus still uses the old Barcelona wording");
if (monTravel[2].start !== "22:15" || monTravel[2].end !== "00:20" || !monTravel[2].note.includes("tisdag")) throw new Error("return flight drifted");
if (JSON.stringify(friTravel.concat(monTravel)).toLowerCase().includes("plana")) throw new Error("travel row guessed a coach company");

if (AIRPORT_BUS.company || AIRPORT_BUS.routeNumber) throw new Error("airport bus company was not published");
if (AIRPORT_BUS.arrival.flight !== "LH 1130" || AIRPORT_BUS.arrival.land !== "15:30") throw new Error("arrival bus flight drifted");
if (AIRPORT_BUS.arrival.airport !== "Barcelona El Prat") throw new Error("arrival airport drifted");
if (!AIRPORT_BUS.arrival.meet.includes("ankomsthallen")) throw new Error("Barcelona meeting point missing");
if (AIRPORT_BUS.departure.flight !== "LH 1135" || AIRPORT_BUS.departure.flightTime !== "19:00") throw new Error("departure flight drifted");
if (!FLIGHT_CHECK.text.includes("tre dagar") || !FLIGHT_CHECK.text.includes("13 oktober") || !FLIGHT_CHECK.text.includes("kvällen innan") || !FLIGHT_CHECK.text.includes("15 oktober") || !FLIGHT_CHECK.text.includes("18 oktober")) {
  throw new Error("flight board reminder drifted");
}
if (!FLIGHT_CHECK.result.includes("8 oktober 2026") || !FLIGHT_CHECK.result.includes("samma klockslag") || !FLIGHT_CHECK.result.includes("09:50–12:00") || !FLIGHT_CHECK.result.includes("22:15–00:20")) {
  throw new Error("flight check result drifted");
}
if (!FLIGHT_CHECK.result.includes("fredag 16 oktober") || !FLIGHT_CHECK.result.includes("måndag 19 oktober") || !FLIGHT_CHECK.result.includes("Beräknad avgång")) {
  throw new Error("flight check is no longer tied to the travel dates");
}
if (!FLIGHT_CHECK.boards.some((board) => board.url === "https://www.swedavia.se/arlanda/avgangar/")) throw new Error("Arlanda board missing");
if (FLIGHTS.find((flight) => flight.no === "LH 801").dep !== "09:50" || FLIGHTS.find((flight) => flight.no === "LH 1130").dep !== "13:25") {
  throw new Error("sheet departure times changed without a board for the travel date");
}
if (AIRPORT_BUS.departure.hotelLeave !== "15:00" || AIRPORT_BUS.departure.checkout !== "11:00") throw new Error("hotel departure drifted");
if (AIRPORT_BUS.minOnFlight !== 20) throw new Error("minimum group for the airport bus drifted");
if (AIRPORT_BUS.officePhone !== "+34 932 808 062") throw new Error("office phone drifted");
if (JSON.stringify(AIRPORT_BUS).includes("679")) throw new Error("unverified arrivals mobile leaked");
if (JSON.stringify(AIRPORT_BUS).toLowerCase().includes("plana")) throw new Error("unnamed coach company was guessed");

if (HOTEL.name !== "Alannia Salou" || !HOTEL.address.includes("Pompeu Fabra 37")) throw new Error("hotel address drifted");
if (!HOTEL.url.startsWith("https://alanniaresorts.com/")) throw new Error("hotel link drifted");
if (HOTEL.photos.length !== 3) throw new Error("hotel photos drifted");
const poolFact = HOTEL.facts.find((item) => item.includes("Poolerna är öppna"));
if (!poolFact || !poolFact.includes("13 mars") || !poolFact.includes("klockslag")) throw new Error("pool season drifted");
if (/\d{1,2}:\d{2}/.test(poolFact)) throw new Error("pool fact invented a daily clock time");
if (!HOTEL.facts.some((item) => item.includes("alla åldrar"))) throw new Error("pool access drifted");
const ageLimit = HOTEL.facts.find((item) => item.includes("16 år"));
if (!ageLimit || !ageLimit.includes("10:30")) throw new Error("spa age rule drifted");
for (const photo of HOTEL.photos) {
  if (!fs.existsSync(photo.src)) throw new Error(`hotel photo missing: ${photo.src}`);
}
if (AIRPORT_BUS.arrival.hotelFrom !== "17:40" || AIRPORT_BUS.arrival.hotelTo !== "18:10") throw new Error("Friday hotel window drifted");
if (AIRPORT_BUS.departure.airportFrom !== "16:10" || AIRPORT_BUS.departure.airportTo !== "16:40") throw new Error("Monday airport window drifted");
const first = pitchPlan("09:50");
if (first.leave !== "08:35" || first.arrive !== "08:50" || first.ends !== "10:35" || first.back !== "10:50") throw new Error("first pitch plan drifted");
if (pitchPlan("09:00").leave !== "07:45" || pitchPlan("13:10").back !== "14:10" || pitchPlan("13:00").back !== "14:00") {
  throw new Error("later pitch plan drifted");
}
if (RIDES.breakMin !== 5) throw new Error("half-time break drifted");
if (canReturnBetween("09:50", "11:30") || canReturnBetween("11:30", "13:10") || canReturnBetween("09:00", "11:00") || canReturnBetween("11:00", "13:00")) {
  throw new Error("a return to the hotel was allowed inside a match gap");
}

const forecast = {
  fri: [24, 18, 24, 8, "Lätt duggregn"],
  sat: [26, 17, 20, 12, "Mulet"],
  sun: [21, 15, 19, 25, "Mulet"],
  mon: [16, 12, 19, 18, "Tätt duggregn"],
};
for (const [day, [high, low, rain, wind, summary]] of Object.entries(forecast)) {
  const weather = WEATHER.days[day];
  if (!weather || weather.high !== high || weather.low !== low || weather.rain !== rain || weather.wind !== wind || weather.summary !== summary) {
    throw new Error(`weather ${day} drifted: ${JSON.stringify(weather)}`);
  }
}
if (WEATHER.fetched !== "5 oktober 2026" || !WEATHER.note.includes("0 mm")) {
  throw new Error("weather source note drifted");
}
const satGames = WEATHER.days.sat.games;
const sunGames = WEATHER.days.sun.games;
if (satGames.map((game) => game.time).join() !== "09:50,11:30,13:10") throw new Error("Saturday game weather drifted");
if (sunGames.map((game) => game.time).join() !== "09:00,11:00,13:00") throw new Error("Sunday game weather drifted");
if (satGames.some((game) => game.mm !== 0) || sunGames.some((game) => game.mm !== 0)) throw new Error("a game hour invented rain");
if (satGames[0].hour !== "10:00" || satGames[0].temp !== 20 || sunGames[0].temp !== 16 || sunGames[2].wind !== 4) {
  throw new Error("kickoff forecast drifted");
}
if (WEATHER.days.fri.games || WEATHER.days.mon.games) throw new Error("a rest day invented game weather");

const endsAt = { "09:50": "10:35", "11:30": "12:15", "13:10": "13:55", "09:00": "09:45", "11:00": "11:45", "13:00": "13:45" };
for (const match of [...MATCHES, ...PLAYOFFS]) {
  if (pitchPlan(match.time).ends !== endsAt[match.time]) throw new Error(`${match.id} end time drifted`);
  const surface = fieldSurface(match.field);
  const n = Number(match.field);
  const natural = n === 2 || n === 3 || n === 4;
  if (natural && surface.label !== "Naturgräs") throw new Error(`${match.id} should be natural grass`);
  if (!natural && surface.label !== "Konstgräs") throw new Error(`${match.id} should be artificial grass`);
}
if (fieldSurface("1").label !== "Konstgräs" || fieldSurface("10").label !== "Konstgräs") throw new Error("field 1 or 10 is not artificial");
if (fieldSurface("2").label !== "Naturgräs" || fieldSurface("4").label !== "Naturgräs") throw new Error("fields 2 and 4 are not natural");
const snackText = JSON.stringify(SNACK_PAGE).toLowerCase();
if (!snackText.includes("banan") || !snackText.includes("vatten") || !snackText.includes("energidryck")) {
  throw new Error("snack page lost the food guidance");
}
const appSource = fs.readFileSync(new URL("../js/app.js", import.meta.url), "utf8");
if (!appSource.includes('["trip", "schedule", "rank", "area"]')) throw new Error("tab bar drifted");
if (appSource.includes('teams: "Lag"') || appSource.includes('data-tab="teams"')) throw new Error("the team tab is still in the menu");
if (!appSource.includes('rank: "Motståndare"') || !appSource.includes("<h1>Motståndare</h1>")) throw new Error("the opponents page lost its name");
if (appSource.includes('rank: "Ranking"') || appSource.includes("<h1>Ranking</h1>")) throw new Error("the page is still called Ranking");
if (!appSource.includes('data-go="#rank">Tillbaka till motståndarna')) throw new Error("a team page no longer returns to the opponents page");
const areaText = JSON.stringify(AREA);
if (!areaText.includes("10 minuter") || !areaText.includes("Capellans") || !areaText.includes("17 minuter")) throw new Error("walk times drifted");
if (!areaText.includes("16 år") || !areaText.includes("PortAventura") || !areaText.includes("flera kilometer")) throw new Error("area limits drifted");
if (areaText.includes("PortAventura är flera kilometer") === false) throw new Error("PortAventura was listed as a short walk");
if (!areaText.includes("Carles Buïgas") || !areaText.includes("0,8 km") || !areaText.includes("mitten av oktober")) {
  throw new Error("the nearby shopping street drifted");
}
if (!areaText.includes("Parc Central") || !areaText.includes("Primark") || !areaText.includes("Söndag är butikerna stängda")) {
  throw new Error("the Tarragona mall drifted");
}
if (!areaText.includes("inget köpcentrum inom 20 minuters promenad")) throw new Error("a mall was placed inside the short walk");
if (!areaText.includes("2,6 km") || !areaText.includes("året runt")) throw new Error("the year-round centre shops drifted");
if (!AREA.hotel.some((item) => item.name.includes("Poolen")) || !AREA.hotel.some((item) => item.text.includes("tonåringar"))) {
  throw new Error("hotel programme drifted");
}
if (!areaText.includes("Addams Family") || !areaText.includes("Kahoot Night") || !areaText.includes("all-events")) {
  throw new Error("hotel events drifted");
}
if (areaText.includes("inga poster")) throw new Error("the empty events week is still on the page");
if (!areaText.includes("krockar med matcherna") || !areaText.includes("15:00")) throw new Error("events ignore the match days or the Monday bus");
const guideText = JSON.stringify({ HOTEL, SNACK_PAGE, AREA }) + appSource;
if (/15-år/.test(guideText)) throw new Error("an age-15 line is still in the guide");
if (appSource.includes('data-tab="snacks"') || !appSource.includes('data-go="#snacks"')) throw new Error("snack page landed in the menu or lost its link");
if (!appSource.includes("Klicka för mer om mellanmålet")) throw new Error("the schedule no longer asks you to open the snack page");
if (appSource.includes("${snack.note") || appSource.includes("Mellanmål mellan matcherna packas")) throw new Error("snack advice is still written on the schedule");
if (!appSource.includes("till ${esc(ends)}") || !appSource.includes("Plan ${esc(match.field)}")) throw new Error("a game card lost the end time or the field");
if (appSource.includes("pitch-link") || appSource.includes("futbol-salou-map")) throw new Error("the field image is still on the game card");

const phone = JSON.stringify({ TEAMS, MATCHES, MEALS });
if (/\b08\d{6,}\b/.test(phone) || /\+353/.test(phone)) {
  throw new Error("personal phone number leaked into the data");
}

console.log("ok", TEAMS.map((team) => `${team.rank} ${team.short} ${team.index}`).join(" · "));
