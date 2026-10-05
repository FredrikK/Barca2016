import { AIRPORT_BUS, HOTEL, MATCHES, MEALS, TEAMS, awayBlocks, canReturnBetween, indexOf, pitchPlan, teamById, usableMeal } from "../js/data.js";

const ids = TEAMS.map((team) => team.id);
if (new Set(ids).size !== 6) throw new Error("expected 6 teams");

const ranks = TEAMS.map((team) => team.rank).sort((a, b) => a - b);
if (ranks.join() !== "1,2,3,4,5,6") throw new Error("ranks must be 1 through 6");

for (const team of TEAMS) {
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
if (!jarna.players.some((player) => player.name === "Sofia Vall" && player.number === "10")) {
  throw new Error("Vall missing from the 2026 roster");
}
if (jarna.players.length !== 17) throw new Error("Järna roster length");

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
  if (!team.sources.some((source) => source.label === "Tournament roster")) {
    throw new Error(`${id} missing tournament roster source`);
  }
}

const spangaTeam = teamById("spanga");
if (!spangaTeam.players.some((player) => player.name === "Mira Drougge" && player.number === "10")) {
  throw new Error("Spånga roster missing Mira Drougge");
}
if (!spangaTeam.staff.includes("Thomas Gustafsson") || !spangaTeam.staff.includes("Malin Drougge")) {
  throw new Error("Spånga coaches missing");
}
const spangaText = JSON.stringify(spangaTeam);
if (spangaText.includes("Vendela") || spangaText.includes("Michelle Rojas") || spangaText.includes("Persbeck")) {
  throw new Error("Spånga page still names people who are not on the tournament roster");
}

if (!teamById("castlevilla").players.some((player) => player.name === "Abbie Landon" && player.number === "11")) {
  throw new Error("Castle Villa roster missing Landon");
}
if (!teamById("gava").staff.includes("Ania Torres Torres")) throw new Error("Gavà coach missing");
if (!teamById("gava").players.some((player) => player.name === "Noa Mostazo Salvatierra")) {
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
if (!pats.players.some((player) => player.name === "Ciara Cahoon" && player.number === "7")) {
  throw new Error("St Patricks roster missing Cahoon");
}
if (pats.players.length !== 17) throw new Error("St Patricks roster length");

function expectMeal(day, name, start, end) {
  const meal = MEALS.find((item) => item.day === day && item.name === name);
  if (!meal || meal.start !== start || meal.end !== end || meal.place !== "Hotel buffet") {
    throw new Error(`${day} ${name} meal time drifted`);
  }
}
expectMeal("fri", "Dinner", "19:00", "21:30");
expectMeal("sat", "Breakfast", "07:00", "10:00");
expectMeal("sat", "Lunch", "13:00", "14:30");
expectMeal("sat", "Dinner", "19:00", "21:30");
expectMeal("sun", "Breakfast", "07:00", "10:00");
expectMeal("sun", "Lunch", "13:00", "14:30");
expectMeal("sun", "Dinner", "19:00", "21:30");
expectMeal("mon", "Breakfast", "07:00", "10:00");
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
expectUsable("fri", "Dinner", "19:00", "21:30");
expectUsable("sat", "Breakfast", "07:00", "08:35");
expectUsable("sat", "Lunch", "14:05", "14:30");
expectUsable("sat", "Dinner", "19:00", "21:30");
expectUsable("sun", "Breakfast", "07:00", "07:45");
expectUsable("sun", "Lunch", "13:55", "14:30");
expectUsable("sun", "Dinner", "19:00", "21:30");
expectUsable("mon", "Breakfast", "07:00", "10:00");
const satLunch = usableMeal(MEALS.find((meal) => meal.id === "sat-lunch"))[0];
const sunLunch = usableMeal(MEALS.find((meal) => meal.id === "sun-lunch"))[0];
if (satLunch.start <= "13:10" || sunLunch.start <= "13:00") throw new Error("lunch still sorts inside a game");
if (!satLunch.note.includes("13:00") || !sunLunch.note.includes("13:00")) throw new Error("clipped lunch hid the buffet open time");
const satAway = awayBlocks("sat");
const sunAway = awayBlocks("sun");
if (satAway.length !== 1 || satAway[0].start !== "08:35" || satAway[0].end !== "14:05") throw new Error("Saturday away block drifted");
if (sunAway.length !== 1 || sunAway[0].start !== "07:45" || sunAway[0].end !== "13:55") throw new Error("Sunday away block drifted");
if (awayBlocks("fri").length || awayBlocks("mon").length) throw new Error("a rest day invented an away block");
if (MEALS.length !== 8) throw new Error("expected 8 meals");
if (MEALS.some((meal) => meal.day === "fri" && meal.name !== "Dinner")) throw new Error("Friday should list dinner only");
if (MEALS.some((meal) => meal.day === "mon" && meal.name !== "Breakfast")) throw new Error("Monday should list breakfast only");

if (AIRPORT_BUS.company || AIRPORT_BUS.routeNumber) throw new Error("airport bus company was not published");
if (AIRPORT_BUS.arrival.flight !== "LH 1130" || AIRPORT_BUS.arrival.land !== "15:30") throw new Error("arrival bus flight drifted");
if (AIRPORT_BUS.arrival.airport !== "Barcelona El Prat") throw new Error("arrival airport drifted");
if (!AIRPORT_BUS.arrival.meet.includes("arrivals area")) throw new Error("Barcelona meeting point missing");
if (AIRPORT_BUS.departure.flight !== "LH 1135" || AIRPORT_BUS.departure.flightTime !== "19:00") throw new Error("departure flight drifted");
if (AIRPORT_BUS.departure.hotelLeave !== "15:00" || AIRPORT_BUS.departure.checkout !== "11:00") throw new Error("hotel departure drifted");
if (AIRPORT_BUS.minOnFlight !== 20) throw new Error("minimum group for the airport bus drifted");
if (AIRPORT_BUS.officePhone !== "+34 932 808 062") throw new Error("office phone drifted");
if (JSON.stringify(AIRPORT_BUS).includes("679")) throw new Error("unverified arrivals mobile leaked");
if (JSON.stringify(AIRPORT_BUS).toLowerCase().includes("plana")) throw new Error("unnamed coach company was guessed");

if (HOTEL.name !== "Alannia Salou" || !HOTEL.address.includes("Pompeu Fabra 37")) throw new Error("hotel address drifted");
if (AIRPORT_BUS.arrival.hotelFrom !== "17:40" || AIRPORT_BUS.arrival.hotelTo !== "18:10") throw new Error("Friday hotel window drifted");
if (AIRPORT_BUS.departure.airportFrom !== "16:10" || AIRPORT_BUS.departure.airportTo !== "16:40") throw new Error("Monday airport window drifted");
const first = pitchPlan("09:50");
if (first.leave !== "08:35" || first.arrive !== "08:50" || first.back !== "10:45") throw new Error("first pitch plan drifted");
if (pitchPlan("09:00").leave !== "07:45" || pitchPlan("13:10").back !== "14:05" || pitchPlan("13:00").back !== "13:55") {
  throw new Error("later pitch plan drifted");
}
if (canReturnBetween("09:50", "11:30") || canReturnBetween("11:30", "13:10") || canReturnBetween("09:00", "11:00") || canReturnBetween("11:00", "13:00")) {
  throw new Error("a return to the hotel was allowed inside a match gap");
}

const phone = JSON.stringify({ TEAMS, MATCHES, MEALS });
if (/\b08\d{6,}\b/.test(phone) || /\+353/.test(phone)) {
  throw new Error("personal phone number leaked into the data");
}

console.log("ok", TEAMS.map((team) => `${team.rank} ${team.short} ${team.index}`).join(" · "));
