import { MATCHES, TEAMS, indexOf, teamById } from "../js/data.js";

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
if (order.join() !== "jarna,gava,kilcullen,spanga,castlevilla,stpatricks") {
  throw new Error(`unexpected order ${order.join()}`);
}

if (!teamById("jarna").players.some((player) => player.name === "Sofia Vall")) {
  throw new Error("Vall missing");
}

const phone = JSON.stringify({ TEAMS, MATCHES });
if (/\b08\d{6,}\b/.test(phone) || /\+353/.test(phone)) {
  throw new Error("personal phone number leaked into the data");
}

console.log("ok", TEAMS.map((team) => `${team.rank} ${team.short} ${team.index}`).join(" · "));
