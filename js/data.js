/**
 * Public-data dossier for Football Cup Barcelona, Girls 2010, Group A.
 * Scores and names below are copied from pages that were opened.
 * Implied scores are marked implied: true and are not printed line scores.
 * Järna's drawn 4-3-3 is the Linköping graphic on 4 Oct 2026.
 * The written eleven that day is a different set of names. Neither is a confirmed Salou XI.
 */

export const WEIGHTS = {
  results: 0.45,
  league: 0.25,
  pathway: 0.2,
  tournament: 0.1,
};

export function indexOf(components) {
  const raw =
    WEIGHTS.results * components.results +
    WEIGHTS.league * components.league +
    WEIGHTS.pathway * components.pathway +
    WEIGHTS.tournament * components.tournament;
  return Math.round(raw * 10) / 10;
}

// Cup form, 0–100, from the official group row. A full points haul is 70.
// Each goal of difference is worth 3, and 15 keeps a blank game off zero.
export function cupForm(row) {
  const points = (row.pts / (row.p * 3)) * 70;
  const goals = (row.gf - row.ga) * 3;
  return Math.round(Math.max(0, Math.min(100, points + goals + 15)));
}

const RANGE_WIDTH = {
  jarna: 12,
  gava: 16,
  kilcullen: 16,
  spanga: 18,
  castlevilla: 16,
  stpatricks: 18,
};

// Placement match counts like one more group game: 3 points for a win.
// The printed group table stays the five group matches.
export function tournamentRow(teamId) {
  const row = GROUP.rows.find((item) => item.team === teamId);
  const game = PLAYOFFS.find((item) => item.home === teamId || item.away === teamId);
  if (!game || !game.score) return row;
  const home = game.home === teamId;
  const gf = home ? game.score[0] : game.score[1];
  const ga = home ? game.score[1] : game.score[0];
  const pts = gf > ga ? 3 : gf === ga ? 1 : 0;
  return { ...row, p: row.p + 1, gf: row.gf + gf, ga: row.ga + ga, pts: row.pts + pts };
}

export function cupFinish(teamId) {
  const places = { p1: [1, 2], p2: [3, 4], p3: [5, 6] };
  for (const game of PLAYOFFS) {
    if (!game.score || game.score[0] === game.score[1]) continue;
    const winner = game.score[0] > game.score[1] ? game.home : game.away;
    const loser = winner === game.home ? game.away : game.home;
    const pair = places[game.id];
    if (!pair) continue;
    if (teamId === winner) return pair[0];
    if (teamId === loser) return pair[1];
  }
  return null;
}

export function applyCupResults() {
  for (const team of TEAMS) {
    const form = cupForm(tournamentRow(team.id));
    team.components.cup = form;
    team.components.results = Math.round((team.components.priorResults + form) / 2);
    team.index = indexOf(team.components);
    const width = RANGE_WIDTH[team.id];
    const low = Math.round(team.index - width / 2);
    team.range = [low, low + width];
    team.confidence = Math.min(90, team.confidence + 8);
  }
  [...TEAMS]
    .sort((a, b) => b.index - a.index)
    .forEach((team, index) => {
      team.rank = index + 1;
    });
}

export const VENUE = {
  name: "Futbol Salou",
  source: "https://www.footballcupbarcelona.com/en/venue",
  studs: "Metalldobbar är förbjudna.",
};

// Plan 2, 3 and 4 are natural grass. Every other field is artificial.
export function fieldSurface(field) {
  const n = Number(field);
  if (n === 2 || n === 3 || n === 4) return { label: "Naturgräs" };
  return { label: "Konstgräs" };
}

export const SNACK_PAGE = {
  title: "Mellanmål vid planen",
  lead: "Mellan matcherna hinner ni inte till hotellet. Mellanmålet är bränsle till nästa match. Det är inte en måltid, och det är inte något ni hoppar över.",
  packTitle: "Det som ska ner i påsen",
  pack: [
    "En banan, en liten fralla eller en müslibar. Välj en sak.",
    "Vatten i er egen flaska. Drick i luckan, inte bara när ni redan är törstiga.",
    "Några klunkar sportdryck om det är varmt, utöver vattnet. Lördagens matcher är varmare än söndagsmorgonen.",
  ],
  leaveTitle: "Det som stannar hemma",
  leave: [
    "Ingen energidryck. Den kan göra er yra när det är varmt.",
    "Inget tungt. Ingen stor portion, ingen friterad mat och ingen maträtt ni inte har ätit förut.",
  ],
  playTitle: "Så ni orkar nästa match",
  play: [
    "Ät även om ni inte känner er hungriga. Nästa avspark kommer fort.",
    "Hoppa inte över mellanmålet för att hålla er lätta. En banan eller en fralla är det som bär nästa halvlek. Att gå tom gör det inte.",
    "Ät klart ungefär en kvart före avspark, så ni inte springer med full mage.",
    "Om magen krånglar: bara vatten, och säg till en ledare.",
  ],
  when: "Korten i schemat visar luckan, från det att matchen är slut till en kvart före nästa avspark. Packa påsen på frukosten.",
};

// The team's suggested packing list, rewritten to "ni". It is a suggestion, not a published kit rule.
export const PACK = {
  title: "Packlista",
  lead: "Ett förslag. Ha det här på er på flyget. Resten ska ner i den incheckade väskan.",
  weights: {
    cabin: "Högst 8 kg. Ryggsäcken får vara högst 55 × 40 × 23 cm.",
    checked: "Högst 23 kg.",
    note: "Lufthansa, kollat 9 oktober 2026. 8 kg och 23 kg är gränserna när handbagage och en incheckad väska ingår. En väska tyngre än 32 kg tar de inte emot.",
    source: "https://www.lufthansa.com/xx/en/carry-on-baggage",
    sourceLabel: "Lufthansa",
  },
  passport: {
    title: "Passet först",
    text: "Varje person ska ha sitt pass, eller ett giltigt id-kort för flygresa, med sig. Det är det viktigaste i packningen. Ha det på er, inte i den incheckade väskan.",
  },
  groups: [
    {
      title: "På flyget",
      items: [
        "Ha på er Spånga-hoodien och cup-t-shirten när ni reser.",
        "Ha jeans eller långbyxor på er. Det kan vara kallt på flyget.",
        "Ha gympadojorna på er när ni åker.",
        "Spångaryggsäck eller en annan ryggsäck som handbagage. Packa gärna badkläderna i handbagaget.",
        "Fotbollsskorna i handbagaget. Gärna flera par om ni har.",
        "Telefon och laddare.",
        "Lite fickpengar, om ni vill köpa något att ha med på planet. Lunch ingår inte. Köp med en dricka och en macka från Arlanda. I Frankfurt kan ni också köpa lunch, om LH 801 är i tid. Det finns flera restauranger i terminal 1, till exempel mackor, pasta och hämtmat. Mellanlandningen är bara 12:00–13:25, så ta med maten och gå till gaten för LH 1130.",
      ],
    },
    {
      title: "I incheckad väska",
      items: [
        "Matchställ i blått och rött: matchtröja, shorts och strumpor. Ta gärna med flera shorts och strumpor om ni har. Det är många matcher.",
        "Benskydd.",
        "Träningsoverall och en extra träningströja.",
        "En tom vattenflaska.",
        "Underkläder och strumpor, minst tre ombyten. Ta med flera träningstoppar. Det är flera matcher, och ni vill kunna byta inför söndagen.",
        "Vardagskläder om ni vill: byxor, jeans eller shorts, en t-shirt och en tjocktröja till kvällarna.",
        "Sovkläder eller pyjamas.",
        "Badkläder, om ni vill bada i poolen.",
        "Pool- eller strandhandduk.",
        "Regnjacka, Spånga om ni har. Kläder efter väder: solglasögon, keps, jacka och paraply.",
        "Tofflor.",
        "En liten handväska med blixtlås. Den kan packas i väskan, inte i ryggsäcken. Det är mycket ficktjuvar i Barcelona.",
        "Necessär och eventuella mediciner. Ta med schampo, tandborste, tandkräm och hårborste.",
        "Mellisbars till båda cupdagarna.",
        "Fickpengar till resan, och pengar till middag på resan hem.",
      ],
    },
  ],
  notes: [
    "Ta inte med något ni inte får ha med på en flygresa.",
    "Märk kläderna. Mycket är likadant.",
  ],
};

export const META = {
  title: "Grupp A",
  competition: "Football Cup Barcelona",
  age: "Flickor 2010",
  code: "G2010",
  dates: "17–18 oktober 2026",
  venue: "Futbol Salou",
  address: "Vial Salou Cambrils, 43840 Salou",
  kickoff: "2026-10-17T09:50:00+02:00",
  format:
    "11 mot 11, 2×20 minuter, boll storlek 5, offside, tre domare. Trupp 13–25. Upp till fyra spelare får vara ett år äldre (födda 2009). Varje lag spelar fem gruppmatcher plus en placeringsmatch. Guiden räknar med 5 minuters paus i varje match. Arrangören har inte tryckt den pausen.",
  officialGroups:
    "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/groups",
  officialPlayoffs:
    "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/playoffs",
  officialRules:
    "https://www.footballcupbarcelona.com/en/tournament/17-18-october-2026",
  officialFaq:
    "https://www.footballcupbarcelona.com/en/tournament/17-18-october-2026/faq",
  officialTerms: "https://www.footballcupbarcelona.com/en/legal/legal-notices",
  researched: "4 oktober 2026",
};

// Open-Meteo, 16 October 2026, Alannia Salou 41.0732°N 1.1548°E, Europe/Madrid.
// Whole degrees and km/h are rounded. Game rows use the nearest full hour.
// The day summary is the weather the team meets, not the day's worst code.
// Rain percent and millimetres stay in the data and are not shown.
export const WEATHER = {
  fetched: "16 oktober 2026",
  source: "https://open-meteo.com/",
  sourceLabel: "Open-Meteo",
  place: "Salou",
  note: "Dimma fredag kväll från omkring 23:00 och lördag morgon fram till 09:00. Lördagens matcher är uppehåll. Söndag regnar det under matcherna. Måndag regnar det under dagen, även vid bussen 15:00.",
  days: {
    fri: { summary: "Växlande molnighet", high: 24, low: 17, rain: 0, wind: 10, advice: "Under dagen uppehåll, upp mot 24°. Dimma från omkring 23:00." },
    sat: {
      summary: "Mestadels klart",
      high: 26,
      low: 16,
      rain: 75,
      wind: 13,
      advice: "Vid 09:50 är det mulet, omkring 19°, och uppehåll. Vid 11:30 och 13:10 mestadels klart, 23–24°. Dimma tidigt på morgonen, borta vid 09:00.",
      games: [
        { time: "09:50", hour: "10:00", temp: 19, summary: "Mulet", rain: 0, mm: 0, wind: 3 },
        { time: "11:30", hour: "12:00", temp: 23, summary: "Mestadels klart", rain: 0, mm: 0, wind: 7 },
        { time: "13:10", hour: "13:00", temp: 24, summary: "Mestadels klart", rain: 0, mm: 0, wind: 9 },
      ],
    },
    sun: {
      summary: "Regn",
      high: 19,
      low: 16,
      rain: 91,
      wind: 9,
      advice: "Regnskurar vid 09:00, omkring 17°. Regn vid 11:00 och 13:00, omkring 16°.",
      games: [
        { time: "09:00", hour: "09:00", temp: 17, summary: "Regnskurar", rain: 85, mm: 0.2, wind: 5 },
        { time: "11:00", hour: "11:00", temp: 16, summary: "Regn", rain: 90, mm: 1.8, wind: 7 },
        { time: "13:00", hour: "13:00", temp: 16, summary: "Regn", rain: 91, mm: 3, wind: 8 },
      ],
    },
    mon: { summary: "Regn", high: 16, low: 14, rain: 86, wind: 6, advice: "Regn på förmiddagen. Vid bussen, 15:00, är det mulet och omkring 15°, med lätt regn." },
  },
};

const jarnaComponents = { priorResults: 74, results: 74, league: 52, pathway: 70, tournament: 78 };
const gavaComponents = { priorResults: 50, results: 50, league: 62, pathway: 78, tournament: 72 };
const kilcullenComponents = { priorResults: 70, results: 70, league: 58, pathway: 48, tournament: 42 };
const spangaComponents = { priorResults: 70, results: 70, league: 62, pathway: 66, tournament: 48 };
const villaComponents = { priorResults: 62, results: 62, league: 56, pathway: 46, tournament: 40 };
const patsComponents = { priorResults: 50, results: 50, league: 44, pathway: 40, tournament: 42 };

export const TEAMS = [
  {
    id: "jarna",
    name: "Järna SK",
    short: "Järna",
    country: "Sverige",
    flag: "se",
    place: "Järna, Södermanland",
    colors: ["#c8102e", "#8e1220"],
    logo: "assets/crests/jarna.png",
    instagram: { handle: "@jskfungdom", url: "https://www.instagram.com/jskfungdom/" },
    facebook: { url: "https://www.facebook.com/jarnask/" },
    rank: 1,
    components: jarnaComponents,
    index: indexOf(jarnaComponents),
    range: [62, 74],
    confidence: 72,
    confidenceLabel: "Medelhög",
    verified:
      "Klubben på grupplistan är Järna SK från Järna. Samma flickgrupp spelade den här cupen i oktober 2024 (anmälda som G10) och Gothia Cup Girls 15 i juli 2025.",
    identity:
      "Järna SK:s äldsta flicklag. Matchtröjan är röd. I februari 2025 beskrev Länstidningen Södertälje truppen som mest födda 2010–2011, med två spelare födda 2009, en född 2012 och en född 2013. Den mixen ryms i cupregeln som tillåter fyra spelare ett år äldre.",
    league:
      "Läst 6 oktober 2026. 4:a av 9 i båda, serierna inte färdigspelade. Södermanland: 7 matcher, 3 vinster, 2 oavgjorda, 2 förluster, 11 poäng, 16–10. Värmland grupp B: 6 matcher, 3 vinster, 0 oavgjorda, 3 förluster, 9 poäng, 10–21.",
    style: {
      status: "Möjlig elva från hösten",
      formation: "4-3-3",
      summary:
        "Ritad 4-3-3 mot Linköping 4 oktober. Freja G. och Ritta C. står i den skrivna elvan. Julia K. och Cecilia J. står på bilden och är avbytare. Inte en bekräftad startelva för Salou.",
      points: [
        "Nyckelspelare: Sofia V., Fanny F., Freja G., Ritta C. och Rebecka K. Alexis A. var kapten 4 oktober.",
        "De gör mål i öppna matcher och kan släppa in många mot ett organiserat lag. Linköping vann med 9–2.",
      ],
    },
    lineup: {
      label: "Ritad 4-3-3 mot Linköping, 4 oktober",
      note: "Julia K. och Cecilia J. är avbytare i den skrivna truppen. Freja G. och Ritta C. syns inte här. Det är inte en bekräftad startelva för Salou.",
      rows: [
        [
          { name: "Sofia V.", number: "10" },
          { name: "Fanny F.", number: "7" },
          { name: "Rebecka K.", number: "19" },
        ],
        [
          { name: "Emma G.", number: "21" },
          { name: "Julia K.", number: "22" },
          { name: "Cecilia J.", number: "23" },
        ],
        [
          { name: "Ebba B.", number: "3" },
          { name: "Alexis A.", number: "6" },
          { name: "Josefine M.", number: "12" },
          { name: "Anna A.", number: "4" },
        ],
        [{ name: "Molly H.", number: "1" }],
      ],
      written: {
        title: "Skriven elva samma match",
        note: "Namnen före avbytare mot Linköping. Samma nummer som på Salou-truppen.",
        players: [
          { name: "Molly H.", number: "1", tag: "Målvakt" },
          { name: "Ebba B.", number: "3" },
          { name: "Anna A.", number: "4" },
          { name: "Alexis A.", number: "6", tag: "Kapten" },
          { name: "Fanny F.", number: "7" },
          { name: "Freja G.", number: "8" },
          { name: "Ritta C.", number: "9" },
          { name: "Sofia V.", number: "10" },
          { name: "Josefine M.", number: "12" },
          { name: "Rebecka K.", number: "19" },
          { name: "Emma G.", number: "21" },
        ],
      },
    },
    approach:
      "Söndagen blev 3–0 borta mot Gavà. Sofia V. gjorde tre. Sedan 3–1 mot Castle Villa. Fanny F. gjorde två och Anna A. ett. De har 15 poäng och 17–1, och de vann gruppen. Sofia V. har sju mål i cupen. Rebecka K. har fyra. Finalen mot Spånga slutade 2–0. Rebecka K. och Sofia V. gjorde målen. Den ritade 4-3-3:an är inte den skrivna elvan.",
    players: [
      { name: "Molly H.", number: "1", role: "Målvakt", why: "" },
      { name: "Ebba B.", number: "3", role: "", why: "" },
      { name: "Anna A.", number: "4", role: "", why: "" },
      { name: "Patricia O.", number: "5", role: "", why: "" },
      { name: "Alexis A.", number: "6", role: "Kapten 4 oktober", why: "" },
      { name: "Fanny F.", number: "7", role: "Nyckelspelare", why: "" },
      { name: "Freja G.", number: "8", role: "Nyckelspelare", why: "" },
      { name: "Ritta C.", number: "9", role: "Nyckelspelare", why: "" },
      { name: "Sofia V.", number: "10", role: "Nyckelspelare", why: "Fyra mål i den här cupen 2024." },
      { name: "Josefine M.", number: "12", role: "", why: "" },
      { name: "Lea V.", number: "14", role: "", why: "" },
      { name: "Pavlina G.", number: "15", role: "", why: "" },
      { name: "Rebecka K.", number: "19", role: "Nyckelspelare", why: "" },
      { name: "Emma G.", number: "21", role: "", why: "" },
      { name: "Julia K.", number: "22", role: "Avbytare 4 oktober", why: "" },
      { name: "Cecilia J.", number: "23", role: "Avbytare 4 oktober", why: "" },
      { name: "Imra H.", number: "27", role: "", why: "" },
    ],
    playersNote: "Nummer från Salou-truppen 2026. Elvan är från 4 oktober, inte bekräftad för cupen.",
    staff: "Tränare Are Vang. Assisterande tränare Lars Fredrik Nicklas Larsson. Båda titlarna står på turneringssidan.",
    results: [
      { date: "19 okt 2024", comp: "Den här cupen, grupp", score: "Stabæk JF 4–0 Järna SK", note: "" },
      { date: "19 okt 2024", comp: "Den här cupen, grupp", score: "Järna SK 0–1 Täby FK", note: "" },
      { date: "19 okt 2024", comp: "Den här cupen, grupp", score: "Järna SK 0–1 Phénix de Québec", note: "" },
      { date: "19 okt 2024", comp: "Den här cupen, grupp", score: "Merville United 2–2 Järna SK", note: "Härlett från grupptotalen.", implied: true },
      { date: "20 okt 2024", comp: "Den här cupen, plats 9–13", score: "Järna SK 2–1 Lough Derg FC", note: "Härlett från cupens total.", implied: true },
      { date: "14 jul 2025", comp: "Gothia Girls 15", score: "TSV Weyhe-Lahausen 0–7 Järna SK", note: "" },
      { date: "15 jul 2025", comp: "Gothia Girls 15", score: "Järna SK 5–1 Frösö IF", note: "" },
      { date: "16 jul 2025", comp: "Gothia Girls 15", score: "Järna SK 3–5 Sjöstaden DFF", note: "" },
      { date: "17 jul 2025", comp: "Gothia, 1/64", score: "Järna SK 0–4 Stureby FF", note: "" },
      { date: "8 aug 2026", comp: "Värmland, regional grupp 1", score: "Gamla Upsala SK 1–4 Järna SK", note: "" },
      { date: "19 aug 2026", comp: "Södermanland, DM", score: "Järna SK 2–1 Nyköpings BIS", note: "" },
      { date: "30 aug 2026", comp: "Södermanland, grön 4", score: "Nyköpings BIS 0–8 Järna SK", note: "" },
      { date: "6 sep 2026", comp: "Värmland, regional grupp B", score: "IK Brage 0–2 Järna SK", note: "" },
      { date: "9 sep 2026", comp: "Värmland, regional grupp B", score: "Järna SK 2–1 Skiljebo SK", note: "" },
      { date: "20 sep 2026", comp: "Södermanland, grön 4", score: "Järna SK 3–0 Arboga Södra IF", note: "" },
      { date: "30 sep 2026", comp: "Värmland, regional grupp B", score: "Järna SK 3–2 Skogstorps GOIF", note: "" },
      { date: "4 okt 2026", comp: "Värmland, regional grupp B", score: "Linköping FC 9–2 Järna SK", note: "Elvan och 4-3-3-bilden." },
    ],
    recordLine: "I cupen: 2–0 mot Kilcullen, 6–0 mot St Patricks och 3–0 mot Spånga, 9 poäng och 11–0. Barcelona 2024: 10:a. 1 vinst, 1 oavgjord, 3 förluster, 4–9. Gothia 2025 grupp: 2:a, 2 vinster, 1 förlust, 15–6, sedan ut 0–4. Höst 2026: 4:a i Södermanland, 3–2–2, 16–10. 4:a i Värmland grupp B, 3–0–3, 10–21.",
    tables: [
      {
        title: "Södermanland, Flickor grön 4 höst 2026, läst 6 oktober",
        head: ["#", "Lag", "M", "V", "O", "F", "P", "Mål"],
        rows: [
          ["1", "IK Sturehov", "7", "6", "1", "0", "19", "26–3"],
          ["2", "Triangelns IK", "7", "5", "2", "0", "17", "23–8"],
          ["3", "Örebro SK FK", "6", "4", "0", "2", "12", "16–7"],
          ["4", "Järna SK", "7", "3", "2", "2", "11", "16–10"],
          ["5", "Trosa-Vagnhärad SK", "6", "1", "2", "3", "5", "9–11"],
          ["6", "Lillån FK", "6", "1", "2", "3", "5", "4–11"],
          ["7", "Skogstorps GOIF", "6", "1", "2", "3", "5", "6–23"],
          ["8", "Arboga Södra IF", "6", "1", "0", "5", "3", "6–15"],
          ["9", "Nyköpings BIS", "5", "0", "1", "4", "1", "1–19"],
        ],
      },
      {
        title: "Värmland, regional grupp B hösten 2026, läst 6 oktober",
        head: ["#", "Lag", "M", "V", "O", "F", "P", "Mål"],
        rows: [
          ["1", "Karlslunds IF FK", "6", "5", "1", "0", "16", "22–8"],
          ["2", "Stångebro United BK", "5", "4", "1", "0", "13", "29–7"],
          ["3", "Örebro SK FK", "5", "3", "1", "1", "10", "18–9"],
          ["4", "Järna SK", "6", "3", "0", "3", "9", "10–21"],
          ["5", "Linköping FC", "6", "2", "2", "2", "8", "23–18"],
          ["6", "IK Brage", "6", "2", "0", "4", "6", "14–12"],
          ["7", "Skogstorps GOIF", "6", "1", "2", "3", "5", "7–18"],
          ["8", "Skiljebo SK", "5", "1", "1", "3", "4", "4–14"],
          ["9", "Slätta SK", "7", "0", "2", "5", "2", "8–28"],
        ],
      },
    ],
    sources: [
      { label: "Turneringstrupp", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/12782/jarna-sk" },
      { label: "Barcelona 2024, lagsida", url: "https://www.footballcupbarcelona.com/en/results/2024-OCT-1/G10/team/11058" },
      { label: "Järna 0–1 Täby", url: "https://www.footballcupbarcelona.com/en/results/2024-OCT-1/G10/match/9799" },
      { label: "Järna 0–1 Phénix de Québec", url: "https://www.footballcupbarcelona.com/en/results/2024-OCT-1/G10/match/9797" },
      { label: "Gothia 2025, matcher", url: "https://results.cupmanager.net/661795,2025,sv,wrap=false/team/66312311/matches" },
      { label: "Frösö IF, mållogg", url: "https://results.gothiacup.se/2025/matches/66846830" },
      { label: "Länstidningen, 28 feb 2025", url: "https://www.lt.se/sport/salde-klader-och-kakor-for-att-fa-spela-cup-i-barcelona/" },
      { label: "Gamla Upsala 1–4, 8 aug 2026", url: "https://minfotboll.svenskfotboll.se/#/magazinegameview/1989485" },
      { label: "Nyköping 2–1, DM 19 aug 2026", url: "https://minfotboll.svenskfotboll.se/#/magazinegameview/2157801" },
      { label: "Nyköping 0–8, 30 aug 2026", url: "https://minfotboll.svenskfotboll.se/#/magazinegameview/2198827" },
      { label: "Brage 0–2, 6 sep 2026", url: "https://minfotboll.svenskfotboll.se/#/magazinegameview/2214269" },
      { label: "Skiljebo 2–1, 9 sep 2026", url: "https://minfotboll.svenskfotboll.se/#/magazinegameview/2214251" },
      { label: "Arboga 3–0, 20 sep 2026", url: "https://minfotboll.svenskfotboll.se/#/magazinegameview/2198813" },
      { label: "Skogstorp 3–2, 30 sep 2026", url: "https://minfotboll.svenskfotboll.se/#/magazinegameview/2214246" },
      { label: "Linköping 9–2, 4 okt 2026", url: "https://minfotboll.svenskfotboll.se/#/magazinegameview/2214257" },
      { label: "Södermanland, grön 4, tabell", url: "https://minfotboll.svenskfotboll.se/#/leaguesite/79685/table" },
      { label: "Värmland, grupp B hösten, tabell", url: "https://minfotboll.svenskfotboll.se/#/leaguesite/80879/table" },
    ],
  },
  {
    id: "gava",
    name: "EF Gavà Villarreal CF",
    short: "Gavà",
    country: "Katalonien",
    flag: "ct",
    place: "Gavà, Baix Llobregat, Katalonien",
    colors: ["#8c1d40", "#f2c14e"],
    logo: "assets/crests/gava.png",
    instagram: { handle: "@efgava", url: "https://www.instagram.com/efgava/" },
    facebook: { url: "https://www.facebook.com/efgava/" },
    rank: 3,
    components: gavaComponents,
    index: indexOf(gavaComponents),
    range: [54, 70],
    confidence: 54,
    confidenceLabel: "Medel",
    verified:
      "Anmälan är Escola de Futbol Gavà, Villarreal CF:s partnerskola i Gavà. Det är inte Villarreal CF:s eget flickcadete-lag i Castellón, och det är inte seniorlaget CF Gavà.",
    identity:
      "Escola de Futbol Gavà grundades 2000. Den 30 december 2021 meddelade Villarreal ett samarbetsavtal. Gavàs sportchef Ramón López citeras i den texten. En campusartikel från Villarreal i februari 2026 kallar fortfarande EF Gavà en associerad klubb. Turneringsnamnet EF Gava Villarreal CF är namnet Gavà använder för de här anmälningarna.",
    league:
      "Licenstabellen 2026–27 lägger flickor födda 2010 i juvenil femenino, tillsammans med 2008 och 2009. Den här klubben har inget juvenil femenino-lag. Salou-truppen är licensierad i Segona Divisió Femení Cadet F11, Grup 8, en grupp med 15 lag. Den 4 oktober 2026 visade tabellen Escola F. Gavà A med 0 matcher. Santboià hade spelat och vunnit 3–2, Viladecans B och Ciudad Cooperativa hade kryssat 1–1, och Atlètic Sant Just hade förlorat 2–3. Gavàs plats som 14:e är en tom rad, inte ett resultat. Jornada 1 är mot Espluguenc och jornada 2 är borta mot Casablanca. Inget resultat för Gavà fanns på sidan.",
    style: {
      status: "Klubbens metod, inte en scout",
      formation: "Inte publicerad",
      summary:
        "Ingen matchrapport beskriver den här truppens form. Det som är publicerat är skolans koppling till Villarreals akademi: teknik, spelförståelse och beslut, beskrivet av Villarreal som i linje med den grogueta identiteten.",
      points: [
        "Räkna med att de försöker spela, för det är det publicerade syftet med samarbetet. Det är en prior, inte en videoscout.",
        "Kopiera inte Villarreals A-lagsform på det här laget. Avtalet publicerar ingen formation för 2010-flickorna.",
        "De är hemmalaget: inget flyg, bekant klimat, och planerna ligger i deras region.",
        "Turneringssidan 2026 listar 20 spelare och två tränare. Inga positioner är tryckta. Förbundets cadetlista som laddade har 17 namn och överlappar den här truppen. Ett äldre flickjuvenil-lag i Gavà spelade Segona Divisió 2025–26. De spelarna och deras tränare är inte den här listan.",
      ],
    },
    approach:
      "Gavà är tvåa i prognosen, fyra i grupptabellen och trea i cupen. I gruppen: 0–1 mot Castle Villa, 4–0 mot Kilcullen, 2–1 mot St Patricks, 0–3 mot Järna och 0–1 mot Spånga. Valentina R. P. gjorde båda i 2–1. Sofia V. gjorde tre i 0–3. Mira D. gjorde Spångas mål. De är en partnerklubb till Villarreal i en cadetgrupp i Segona Divisió med 15 lag. Tränarna på turneringssidan är Ania Torres Torres och David Pelay Cortes. Bronsmatchen mot Kilcullen slutade 1–0. Carlota C. C. gjorde målet. Gavà är trea i cupen.",
    players: [
      { name: "Lluna P. C.", number: "1", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Candela R. R.", number: "2", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Valentina R. P.", number: "3", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Anna C. T.", number: "4", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Noa V. L.", number: "5", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Carlota C. C.", number: "6", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Idaira P. M.", number: "7", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Olivia D. T.", number: "8", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Thais I. V.", number: "9", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Nummer 9 är inte en publicerad position." },
      { name: "Valentina B. F.", number: "10", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Nummer 10 är inte en publicerad position." },
      { name: "Julietta P. N.", number: "11", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Ariadna C. A.", number: "14", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Alba R. T.", number: "15", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Laia P. M.", number: "16", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Noa M. S.", number: "17", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Förbundets cadetlista matchar den här spelaren." },
      { name: "Valentina P.", number: "18", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Marina G. C.", number: "19", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Mila L. R.", number: "20", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Förbundslistan som laddade visar en spelare som heter Mila och trycker inte resten av namnet." },
      { name: "Adriana V. M.", number: "21", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Katalella V. L.", number: "22", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
    ],
    playersNote: "Nummer och namn är kopierade från turneringens lagsida. Inga positioner är tryckta. Nummer 12 och 13 är lediga.",
    otherNames:
      "Förbundets cadetlista som laddade har 17 namn. Den innehåller Carla H. M. M., som inte står på Salou-truppen. Fyra Salou-namn fanns inte på den listan: Valentina R. P., Noa V. L., Idaira P. M. och Olivia D. T.",
    staff: "Tränare Ania Torres Torres. Tränare David Pelay Cortes. Båda titlarna står på turneringssidan. Förbundets cadetsida tryckte ingen tränare.",
    results: [],
    recordLine: "I cupen: 0–1 mot Castle Villa, 4–0 mot Kilcullen och 2–1 mot St Patricks, 6 poäng och 6–2. Licensierade i Segona Divisió Femení Cadet F11, Grup 8. Den 4 oktober 2026 visade tabellen 0 matcher.",
    contextResults: [
      { date: "2025–26", comp: "Bara en äldre åldersklass", score: "Escola F. Gavà A i Segona Divisió Femení Juvenil, Grup 8", note: "Födda 2007–2009 enligt den säsongens licenstabell. Inte det här turneringslaget. Urval: 3–1 och 2–0 mot Begues, 2–1 borta mot Sant Just, 1–3 mot Viladecans, och en 5–2-akt på Fontsanta-Fatjó." },
    ],
    sources: [
      { label: "Turneringstrupp", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/13380/ef-gava-villarreal-cf" },
      { label: "Licenslista, cadet flickor", url: "https://www.fcf.cat/clubs/1255/categories/58156838" },
      { label: "Segona Divisió Cadet Femení, Grup 8", url: "https://www.fcf.cat/ca/competicio?temporadaId=22&disciplinaId=19308237&competicioId=59922684&grupId=59924024" },
      { label: "Villarreal-avtalet, 30 dec 2021", url: "https://villarrealcf.es/el-villarreal-expande-sus-horizontes-en-futbol-formativo/" },
      { label: "Fortfarande partnerklubb, feb 2026", url: "https://campusytorneos.villarrealcf.es/es/yellow-cup-easter/multimedia/noticias/item/2567-talento-desde-el-baix-llobregat" },
      { label: "FCF-åldrar 2026–27", url: "https://www.fcf.cat/docs/edat2026-2027.pdf" },
      { label: "Skolans sida", url: "https://efgava.com/" },
    ],
  },
  {
    id: "kilcullen",
    name: "Kilcullen AFC",
    short: "Kilcullen",
    country: "Irland",
    flag: "ie",
    place: "Kilcullen, grevskapet Kildare",
    colors: ["#c9842a", "#1a2332"],
    logo: "assets/crests/kilcullen.png",
    instagram: { handle: "@kilcullenafc", url: "https://www.instagram.com/kilcullenafc/" },
    facebook: { url: "https://www.facebook.com/131886103548159" },
    rank: 4,
    components: kilcullenComponents,
    index: indexOf(kilcullenComponents),
    range: [52, 68],
    confidence: 62,
    confidenceLabel: "Medel",
    verified:
      "Det här är Kilcullen AFC:s U16-flickor, laget som Kilcullen Diary skickar till Cambrils. KDUL-sidan för lag 160768 i tävling 13331 heter U16 Girls, och cupfinalen där är Kilcullen mot Maynooth den 23 augusti 2026, söndagen som Diary namngav.",
    identity:
      "Kildare & District Underage League. Hemmamatcherna spelas på Kilcullen Community Centre. De vann U16 Girls-serien före Castle Villa AFC, vars hemmaplan i samma spelschema är Mullarney Park i Castledermot. Det är Kildare-klubben, inte Castle Villa från Moynalty.",
    league:
      "KDUL U16 Girls, 2026. Fem lag, åtta matcher var. Kilcullen är etta på 19 poäng: 6 vinster, 1 oavgjord, 1 förlust, 31–11. De vann också U16 Girls Cup, 7–0 mot Maynooth United den 23 augusti på Corrigan Park, efter 3–0 mot Prosperous United den 12 juli.",
    style: {
      status: "Härlett från resultat",
      formation: "Inte publicerad",
      summary:
        "Ingen form eller startuppställning är publicerad. Resultaten säger att de gör mål i sjok och att de också kan öppnas upp. Fyra av åtta seriematcher vanns med tre mål eller mer. Matchen de förlorade var 0–2, och matchen de vann mot samma lag var 5–3.",
      points: [
        "Seriemålen mot de två sista var 5–0 och 6–3 mot Maynooth, och 2–0 och 7–1 mot Derry Rovers. Cupfinalen var ytterligare ett 7–0 mot Maynooth.",
        "Mot de andra två utmanarna är facit en oavgjord och en vinst mot Prosperous (2–2, 4–0, plus 3–0 i cupen) och en förlust och en vinst mot Castle Villa (0–2, 5–3).",
        "Första cupen utomlands. Diary kallar dem klubbens första rena flickungdomslag som representerar Kilcullen utanför Irland.",
      ],
    },
    approach:
      "Söndag 09:00 blev 1–0 mot Spånga. Ella O. gjorde målet. 11:00 blev 3–0 mot St Patricks. Amelia R. gjorde två och Izzy M. ett. De är trea på 7 poäng, efter Spånga på målskillnad. Dessförinnan i cupen: 0–2 mot Järna, 0–4 mot Gavà och 1–1 mot Castle Villa. Bronsmatchen mot Gavà slutade 0–1. Carlota C. C. gjorde målet. Kilcullen är fyra. Hemma är de serie- och cupvinnare i en Kildare-serie med fem lag.",
    players: [
      { name: "Ella-Louise D.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Kortet 19 april listar Ella-Louise D. två gånger i 5–0 mot Maynooth. En utmärkelse i december 2025 utsåg Ella-Louise D. till Spelarnas spelare." },
      { name: "Isabel C.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. En tränare står som Rob Comnolly. Sidan säger inte att de är släkt." },
      { name: "Lauren D.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Zoe C.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Katie M.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Målverktygstipset 19 april listar Katie M." },
      { name: "Maya T.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. En tränare är John Tyrrell. Sidan säger inte att de är släkt." },
      { name: "Ciara K.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Emily D.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Amelia R.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Verktygstipset 19 april stavar en målskytt Amelia R. Utmärkelserna i december 2025 utsåg Amelia R. till Årets spelare." },
      { name: "Sophie G.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Emily K. M.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Katie D.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Gracie-Mae B.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Izzy M.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Kortet 8 maj, Derry Rovers 0–2 Kilcullen, nämner Izzy M." },
      { name: "Ella O.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Verktygstipset 19 april stavar en målskytt Ella O." },
      { name: "Amelia M.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Caoimhe W.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Sophia D.", number: "0", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
    ],
    playersNote: "Nummer och namn är kopierade från turneringens lagsida. Sidan trycker 0 som tröjnummer för varje spelare, så inget tröjnummer är bekräftat. Inga positioner är tryckta. U14-utmärkelserna i december 2025 gäller en yngre grupp och står inte på den här listan.",
    staff: "Tränare Rob Comnolly. Tränare John Tyrrell. Båda titlarna står på turneringssidan. Sidan stavar den första tränaren Comnolly.",
    results: [
      { date: "19 apr 2026", comp: "KDUL U16 Girls", score: "Kilcullen 5–0 Maynooth United", note: "Kilcullen Community Centre. Målskyttar på kortet: Katie M., Ella-Louise D. 2, Amelia R., Ella O." },
      { date: "30 apr 2026", comp: "KDUL U16 Girls", score: "Kilcullen 0–2 Castle Villa", note: "Kilcullen Community Centre. Abbie L. gjorde båda. Kilcullens enda serieförlust." },
      { date: "8 maj 2026", comp: "KDUL U16 Girls", score: "Derry Rovers 0–2 Kilcullen", note: "Oaklands, Edenderry. Izzy M. är namnet på kortet." },
      { date: "17 maj 2026", comp: "KDUL U16 Girls", score: "Prosperous United 2–2 Kilcullen", note: "St Farnan's. Inga målskyttar på kortet." },
      { date: "24 maj 2026", comp: "KDUL U16 Girls", score: "Kilcullen 7–1 Derry Rovers", note: "Kilcullen Community Centre. Målskyttar inte specificerade." },
      { date: "11 jun 2026", comp: "KDUL U16 Girls", score: "Maynooth United 3–6 Kilcullen", note: "Maynooth Education Campus. Målskyttar inte specificerade." },
      { date: "21 jun 2026", comp: "KDUL U16 Girls", score: "Castle Villa 3–5 Kilcullen", note: "Spelschemat anger platsen som Kilcullen Community Centre. Målskyttar inte specificerade." },
      { date: "5 jul 2026", comp: "KDUL U16 Girls", score: "Kilcullen 4–0 Prosperous United", note: "Kilcullen Community Centre. Målskyttar inte specificerade." },
      { date: "12 jul 2026", comp: "KDUL U16 Girls Cup", score: "Kilcullen 3–0 Prosperous United", note: "Kilcullen Community Centre. Vinsten före finalen." },
      { date: "23 aug 2026", comp: "KDUL U16 Girls Cup, final", score: "Kilcullen 7–0 Maynooth United", note: "Corrigan Park, 10:00. Det här är finalen som Diary den 16 augusti sa var söndagen efter." },
    ],
    recordLine: "I cupen: 0–2 mot Järna, 0–4 mot Gavà och 1–1 mot Castle Villa, 1 poäng och 1–7. U16 Girls-serien, 1:a av 5: 8 matcher, 6 vinster, 1 oavgjord, 1 förlust, 31–11, 19 poäng. Cupvinnare, 7–0 i finalen.",
    table: {
      title: "KDUL U16 Girls, 2026, säsongen klar",
      rows: [
        ["1", "Kilcullen AFC", "8", "19", "+20"],
        ["2", "Castle Villa AFC", "8", "17", "+9"],
        ["3", "Prosperous United", "8", "15", "+14"],
        ["4", "Maynooth United FC", "8", "4", "−21"],
        ["5", "Derry Rovers", "8", "1", "−22"],
      ],
    },
    sources: [
      { label: "Turneringstrupp", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/12981/kilcullen-afc" },
      { label: "U16 Girls, spelschema, lag 160768", url: "https://soccerleagues.comortais.com/fixtures.aspx?teamID=160768&compId=13331&oid=1012" },
      { label: "U16 Girls, tabell", url: "https://soccerleagues.comortais.com/competition.aspx?id=13331&oid=1012" },
      { label: "U16 Girls Cup, med 7–0", url: "https://soccerleagues.comortais.com/fixtures.aspx?compId=13428&oid=1012" },
      { label: "Kilcullen Diary, 16 aug 2026", url: "https://kilcullenbridge.blogspot.com/2026/08/strong-support-for-afc-girls.html" },
      { label: "Utmärkelser december 2025", url: "https://kilcullenbridge.blogspot.com/2025/12/presentations-to-kilcullen-afc.html" },
    ],
  },
  {
    id: "spanga",
    name: "Spånga IS F11-U Gul",
    short: "Spånga",
    country: "Sverige",
    flag: "se",
    place: "Spånga, Stockholm",
    colors: ["#003671", "#ffffff"],
    logo: "assets/spanga-crest.png",
    instagram: { handle: "@spanga_f2011u_gul", url: "https://www.instagram.com/spanga_f2011u_gul" },
    rank: 2,
    yours: true,
    components: spangaComponents,
    index: indexOf(spangaComponents),
    range: [54, 72],
    confidence: 64,
    confidenceLabel: "Medelhög på säsongen, medel på att spela upp",
    verified:
      "Laget som reser är Spånga IS F11-U Gul. Klubbens egen sida för den truppen säger att de spelar Stockholm F2011-2A 2026, och matcherna på den sidan står i namnet Spånga IS FK F2011U 1. Sponsorsidan kallar samma trupp Spånga IS FK F2011-U Gul. Kungsängen listade dem som Spånga U11 Gul i december 2025. Det här är inte F10U-truppen.",
    identity:
      "Flickor födda 2011. Klubben beskriver 17 spelare som tränar tre gånger i veckan, plus matcher, och minst tre cuper. Flickor 2010 i den här cupen är för spelare födda 1 januari 2010 eller senare, så en 2011-trupp är spelberättigad och ett år yngre än de äldsta i klassen. Det finns också ett F2011U 2 i F2011-3A. Det är ett annat lag, och dess resultat används inte här.",
    league:
      "Stockholm F2011-2A, den näst högsta nivån i serien för födda 2011. Den 4 oktober 2026 hade den publicerade tabellen Spånga på 3:e plats: 16 matcher, 9 vinster, 1 oavgjord, 6 förluster, 56–37, 28 poäng. Bollstanäs SK U ledde på 34 poäng, Enebybergs IF 1 var tvåa på 32.",
    style: {
      status: "Härlett från 2026 års serie",
      formation: "Inte publicerad",
      summary:
        "Ingen startuppställning eller form är publicerad för F11-U Gul. Säsongen säger att de gör många mål och också ger bort chanser. 56 mål på 16 matcher är 3,5 per match. De har släppt in 37.",
      points: [
        "De slog MHFF 8–4 hemma och 5–3 borta i maj, och vann 7–2 på Kungsängen den 1 maj.",
        "Bollstanäs, laget ovanför, har slagit dem i de tre möten som hittades: 7–2 den 11 april, 2–1 den 29 augusti och 3–2 den 5 september.",
        "Efter 10 matcher ledde de serien, 7 vinster, 1 oavgjord, 2 förluster, 46–22. Den senare tabellen har dem på tredje plats efter en tyngre höst.",
        "Turneringssidan listar 17 spelare och två tränare. Inga positioner är tryckta. Startuppställningarna på Bollstanäs och Kungsängens matchsidor är de klubbarnas spelare. De är inte den här truppen.",
      ],
    },
    approach:
      "Det här är ert lag, och ni är ett år yngre än klassen. Turneringssidan namnger truppen och tränarna, Thomas Gustafsson och Malin Drougge. I gruppen: 1–1 mot St Patricks, 3–0 mot Castle Villa, 0–3 mot Järna, 0–1 mot Kilcullen och 1–0 mot Gavà. Mira D. gjorde målet mot Gavà. Tabellen har er tvåa på 7 poäng, samma poäng som Kilcullen, före på målskillnad. Finalen mot Järna slutade 0–2. Rebecka K. och Sofia V. gjorde målen. Spånga är tvåa i cupen.",
    players: [
      { name: "Alma K. R.", number: "1", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Ellen W.", number: "2", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Blanca M. K.", number: "3", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Clara E.", number: "4", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Sara G. A.", number: "5", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. En tränare är Thomas Gustafsson. Sidan säger inte att de är släkt." },
      { name: "Elvira M.", number: "6", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Isabelle A.", number: "7", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Felicia O.", number: "8", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Mira D.", number: "10", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. En tränare är Malin Drougge. Sidan säger inte att de är släkt." },
      { name: "Edessa B.", number: "11", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Louise B. A.", number: "12", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Kristina G.", number: "13", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. En tränare är Thomas Gustafsson. Sidan säger inte att de är släkt." },
      { name: "Ellie Å.", number: "14", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Smilla H. L.", number: "17", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Lova H. A.", number: "18", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Felicia J.", number: "20", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Olivia N.", number: "22", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
    ],
    playersNote: "Nummer och namn är kopierade från turneringens lagsida. Inga positioner är tryckta. Nummer 9, 15, 16, 19 och 21 är lediga.",
    staff: "Tränare Thomas Gustafsson. Tränare Malin Drougge. Båda titlarna står på turneringssidan.",
    results: [
      { date: "11 apr 2026", comp: "Stockholm F2011-2A", score: "Bollstanäs SK 7–2 Spånga IS FK F2011U 1", note: "Bollstanäs IP 1. Startuppställningen på den sidan är Bollstanäs." },
      { date: "1 maj 2026", comp: "Stockholm F2011-2A", score: "Kungsängens IF 2–7 Spånga IS FK F2011U 1", note: "Kungsängens IP 2." },
      { date: "23 maj 2026", comp: "Stockholm F2011-2A", score: "Spånga IS FK F2011U 1 8–4 MHFF 2", note: "Från MHFF:s seriespelschema." },
      { date: "31 maj 2026", comp: "Stockholm F2011-2A", score: "MHFF 2 3–5 Spånga IS FK F2011U 1", note: "Från samma MHFF-lista." },
      { date: "29 aug 2026", comp: "Stockholm F2011-2A", score: "Spånga IS FK F2011U 1 1–2 Bollstanäs SK", note: "Spånga IP 4." },
      { date: "5 sep 2026", comp: "Stockholm F2011-2A", score: "Bollstanäs SK 3–2 Spånga IS FK F2011U 1", note: "Bollstanäs IP 1." },
    ],
    recordLine: "I cupen: 1–1 mot St Patricks, 3–0 mot Castle Villa och 0–3 mot Järna, 4 poäng och 4–4. F2011-2A, 4 oktober 2026: 3:a. 16 matcher, 9 vinster, 1 oavgjord, 6 förluster, 56–37, 28 poäng. Efter 10 matcher hade de lett serien.",
    table: {
      title: "Stockholm F2011-2A, 4 okt 2026",
      rows: [
        ["1", "Bollstanäs SK U", "16", "34", "16"],
        ["2", "Enebybergs IF 1", "17", "32", "3"],
        ["3", "Spånga IS FK F2011U 1", "16", "28", "19"],
        ["4", "MHFF 2", "17", "25", "7"],
        ["5", "Rotebro IS FF", "15", "22", "−8"],
        ["6", "Sollentuna FK F15 U", "15", "14", "−9"],
        ["7", "Kungsängens IF 1", "16", "5", "−28"],
      ],
    },
    sources: [
      { label: "Turneringstrupp", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/13115/sp-nga-is" },
      { label: "Klubbsida, F11-U Gul", url: "https://www.spangafotboll.se/start/?ID=466714" },
      { label: "Tabell, F2011-2A", url: "https://www.laget.se/Malarhojden-HagerstenFF-MHFFF2011/Division/Standings/577175" },
      { label: "MHFF-resultat, bland annat 8–4 och 5–3", url: "https://www.laget.se/Malarhojden-HagerstenFF-MHFFF2011/Division/Games/577175" },
      { label: "Kungsängen 2–7", url: "https://www.kifen.se/kungsangensif-fotboll-u-15flick/match/20027367/spanga-is-fk-f2011u-1" },
      { label: "Bollstanäs 7–2", url: "https://www.svenskalag.se/bollstanassk-fotboll-f15u2011/match/20023066/spanga-is-fk-f2011u-1" },
    ],
  },
  {
    id: "castlevilla",
    name: "Castle Villa FC",
    short: "Castle Villa",
    country: "Irland",
    flag: "ie",
    place: "Castledermot, grevskapet Kildare",
    colors: ["#1d4e89", "#f4efe6"],
    logo: "assets/crests/castlevilla.png",
    instagram: { handle: "@castle_villa_afc", url: "https://www.instagram.com/castle_villa_afc/" },
    facebook: { url: "https://www.facebook.com/CastleVilla.AFC/" },
    rank: 5,
    components: villaComponents,
    index: indexOf(villaComponents),
    range: [48, 64],
    confidence: 58,
    confidenceLabel: "Medel",
    verified:
      "Castle Villa AFC i KDUL U16 Girls är Castledermot-klubben. Deras hemmamatcher i den serien spelas på Mullarney Park. Castle Villa från Moynalty spelar på Villa Park och är en annan klubb. Samma serie med fem lag innehåller Kilcullen.",
    identity:
      "Klubben bildades 1969 av Walter Brookes. Det vanliga tillägget är AFC. Turneringsanmälan säger FC. Ställen beskrivs som helblå med vita kanter, eller blåvita ränder. Klubbsidan listar fortfarande en U15-flickgrupp född 2010 och 2011. Ett år senare är den här U16-flickserien den matchande truppen.",
    league:
      "KDUL U16 Girls, 2026, tvåa av fem på 17 poäng: 5 vinster, 2 oavgjorda, 1 förlust, 21–12. Den enda serieförlusten är 3–5 mot Kilcullen, efter att de slagit Kilcullen 2–0. I U16 Girls Cup förlorade de 0–2 mot Prosperous. I shield förlorade de 4–3 borta mot Prosperous.",
    style: {
      status: "Härlett från resultat",
      formation: "Inte publicerad",
      summary:
        "Ingen form är publicerad. Seriefaciten är tajtare än Kilcullens: färre mål, och två oavgjorda mot Prosperous, 1–1 och 3–3. Den enda stora förlusten är 3–5 mot Kilcullen.",
      points: [
        "Abbie L. gjorde båda målen i 2–0 på Kilcullen den 30 april. Det är den enda publicerade nollan mot serievinnarna.",
        "På Derry Rovers den 15 maj är målskyttarna i 3–1 på kortet Lauren O., Kyia B. och Annabelle L.",
        "De kryssade de två seriematcherna mot trean Prosperous, och förlorade sedan mot dem i cupen och igen i shield.",
      ],
    },
    approach:
      "Ni vann 3–0 mot dem 11:30, på plan 10. Ellie Å., Elvira M. och Felicia O. gjorde målen. De kryssade 1–1 mot Kilcullen, Ellen B. och Izzy M. Söndag blev 2–2 mot St Patricks, Abbie L. och Ruby S., och 1–3 mot Järna, Grace M. De är femma på 5 poäng. Matchen om plats 5 mot St Patricks slutade 2–0. Grace M. gjorde båda. Castle Villa är femma.",
    players: [
      { name: "Lena D.", number: "1", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Amelia C.", number: "2", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Sofia F.", number: "3", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Ciara K.", number: "4", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Kate K.", number: "5", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Gráinne H.", number: "6", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Kacie M.", number: "7", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Lauren O.", number: "8", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Kortet 15 maj listar henne i 3–1 på Derry Rovers, tillsammans med Kyia B. och Annabelle L." },
      { name: "Lucy F.", number: "9", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Nummer 9 är inte en publicerad position." },
      { name: "Ellen B.", number: "10", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Nummer 10 är inte en publicerad position." },
      { name: "Abbie L.", number: "11", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Kortet 30 april listar henne två gånger i 2–0 på Kilcullen. Det är Kilcullens enda serieförlust." },
      { name: "Ruby S.", number: "12", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Annabelle L.", number: "13", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Kortet 15 maj listar henne i 3–1 på Derry Rovers." },
      { name: "Sibéal O.", number: "14", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Lily F.", number: "15", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Sarah C.", number: "16", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Jessica C.", number: "17", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Grace M.", number: "18", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. En tränare är Holly Evelyn Murphy. Sidan säger inte att de är släkt." },
      { name: "Kyia B.", number: "19", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Kortet 15 maj listar Kyia B. i 3–1 på Derry Rovers." },
    ],
    playersNote: "Nummer och namn är kopierade från turneringens lagsida. Inga positioner är tryckta.",
    staff: "Tränare Holly Evelyn Murphy. Tränare Aisling Oreilly. Båda titlarna står på turneringssidan.",
    results: [
      { date: "26 apr 2026", comp: "KDUL U16 Girls", score: "Castle Villa 1–1 Prosperous United", note: "Mullarney Park." },
      { date: "30 apr 2026", comp: "KDUL U16 Girls", score: "Kilcullen 0–2 Castle Villa", note: "Kilcullen Community Centre. Abbie L. 2." },
      { date: "10 maj 2026", comp: "KDUL U16 Girls", score: "Castle Villa 3–0 Maynooth United", note: "Mullarney Park." },
      { date: "15 maj 2026", comp: "KDUL U16 Girls", score: "Derry Rovers 1–3 Castle Villa", note: "Oaklands. Målskyttar Castle Villa: Lauren O., Kyia B., Annabelle L. Derry: Yara E." },
      { date: "21 jun 2026", comp: "KDUL U16 Girls", score: "Castle Villa 3–5 Kilcullen", note: "Platsen anges som Kilcullen Community Centre. Deras enda serieförlust." },
      { date: "28 jun 2026", comp: "KDUL U16 Girls Cup", score: "Castle Villa 0–2 Prosperous United", note: "Mullarney Park." },
      { date: "5 jul 2026", comp: "KDUL U16 Girls", score: "Maynooth United 2–4 Castle Villa", note: "Maynooth Education Campus." },
      { date: "16 jul 2026", comp: "KDUL U16 Girls", score: "Prosperous United 3–3 Castle Villa", note: "St Farnan's." },
      { date: "9 aug 2026", comp: "KDUL U16 Girls Shield", score: "Prosperous United 4–3 Castle Villa", note: "St Farnan's." },
      { date: "30 aug 2026", comp: "KDUL U16 Girls", score: "Castle Villa 2–0 Derry Rovers", note: "Mullarney Park." },
    ],
    recordLine: "I cupen: 1–0 mot Gavà, 0–3 mot Spånga och 1–1 mot Kilcullen, 4 poäng och 2–4. U16 Girls-serien, 2:a av 5: 8 matcher, 5 vinster, 2 oavgjorda, 1 förlust, 21–12, 17 poäng. Ute ur cupen med 0–2 mot Prosperous. Ute ur shield med 3–4 mot Prosperous.",
    table: {
      title: "KDUL U16 Girls, 2026, säsongen klar",
      rows: [
        ["1", "Kilcullen AFC", "8", "19", "+20"],
        ["2", "Castle Villa AFC", "8", "17", "+9"],
        ["3", "Prosperous United", "8", "15", "+14"],
        ["4", "Maynooth United FC", "8", "4", "−21"],
        ["5", "Derry Rovers", "8", "1", "−22"],
      ],
    },
    sources: [
      { label: "Turneringstrupp", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/12851/castle-villa-fc" },
      { label: "U16 Girls, spelschema", url: "https://soccerleagues.comortais.com/fixtures.aspx?compId=13331&oid=1012" },
      { label: "U16 Girls, tabell", url: "https://soccerleagues.comortais.com/competition.aspx?id=13331&oid=1012" },
      { label: "U16 Girls Cup", url: "https://soccerleagues.comortais.com/fixtures.aspx?compId=13428&oid=1012" },
      { label: "U16 Girls Shield", url: "https://soccerleagues.comortais.com/fixtures.aspx?compId=13429&oid=1012" },
      { label: "Klubbens lagsida", url: "https://www.castlevilla.ie/teams/" },
    ],
  },
  {
    id: "stpatricks",
    name: "St Patricks FC",
    short: "St Patricks",
    country: "Irland",
    flag: "ie",
    place: "Graiguecullen, grevskapet Carlow — bästa träff",
    colors: ["#1f7a43", "#f4efe6"],
    logo: "assets/crests/stpatricks.svg",
    instagram: { handle: "@stpatricksafc", url: "https://www.instagram.com/stpatricksafc/" },
    rank: 6,
    components: patsComponents,
    index: indexOf(patsComponents),
    range: [38, 56],
    confidence: 46,
    confidenceLabel: "Låg på klubben, hög på truppen",
    verified:
      "Cupen publicerar den här truppen. Sidan är Irland, St Patricks FC, Flickor 2010, med 17 spelare och två tränare. Bästa klubbträffen är St Patrick’s Boys AFC i Graiguecullen, Carlow. Det står inte på själva truppsidan. Kontrollerat 16 oktober 2026 fanns ingen flickserie. I cupen blev det 1–1 mot Spånga och 0–6 mot Järna.",
    identity:
      "Ciara C. är nummer 7 på truppen. Den 28 januari 2026 kallade Carlow Nationalist henne 15, alltså född 2010, rätt ålder för den här cupen. Hennes racingbiografi säger att hon spelar fotboll för St Pats i Carlow. St Patrick’s Boys AFC spelar på The Meadows, Sleaty Street, Graiguecullen. Deras pojklag 2011 spelade samma cup i oktober 2025 under namnet St Patrick’s Boys. Flickanmälan tar bort Boys och säger FC. St Patrick’s Athletic i Dublin är en annan klubb, och dess damungdomslag är äldre än den här truppen.",
    league:
      "Kontrollerat igen 16 oktober 2026. Fortfarande ingen öppen flickserie för den här truppen. Carlow U16-flickor, Carlow U15-flickor, Kildare U16-flickor och Midlands U16-flickor listar dem inte. Senaste publicerade U16-flickmatchen i Carlow är Killeshin 5–0 St Anne’s den 8 oktober. Den nationella U16-cupen för flickor har St Fiacc’s, Hanover Harps, Vale Wanderers och Killeshin, inte St Patricks. Den tidigare genomgången 7 oktober står kvar för de serier som inte laddades om: Kildares övriga flickserier, Midlands U15, Wicklow, Wexford och Kilkenny. St Patrick’s AFC i pojkserierna är inte den här truppen, så de resultaten används inte.",
    style: {
      status: "Okänt",
      formation: "Inte publicerad",
      summary:
        "Truppen ger tröjnummer och inget mer från en serie. I cupen: 1–1 mot Spånga, med målet av Erin W., 0–6 mot Järna, 1–2 mot Gavà, med målet av Ciara C. (7), 2–2 mot Castle Villa, med mål av Aoibhinn C. och Roisin M., och 0–3 mot Kilcullen.",
      points: [
        "Sjutton namn står på listan. Nummer 17 används inte. Niamh O. är 18.",
        "Erin W. gjorde deras mål i 1–1. Leah O. och Roisin M. är 9 och 10.",
        "0–6 mot Järna, 1–2 mot Gavà och 0–3 mot Kilcullen ger 2 poäng och sista plats. Kryssen kom mot Spånga och Castle Villa.",
      ],
    },
    approach:
      "Första matchen blev 1–1. Erin W. gjorde deras mål, Mira D. ert. Sedan 0–6 mot Järna, 1–2 mot Gavà, 2–2 mot Castle Villa och 0–3 mot Kilcullen. Ciara C. (7) gjorde målet mot Gavà. Aoibhinn C. och Roisin M. gjorde målen i 2–2. De är sexa på 2 poäng. Matchen om plats 5 mot Castle Villa slutade 0–2. Grace M. gjorde båda. St Patricks är sexa.",
    players: [
      { name: "Alex K.", number: "1", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Ingen position eller seriemål är publicerad." },
      { name: "Caitlin B.", number: "2", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Ciara C.", number: "3", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Emma C.", number: "4", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Sophia R.", number: "5", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Mia D.", number: "6", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Huvudtränaren är Garry Doody. Sidan säger inte att de är släkt." },
      { name: "Ciara C.", number: "7", role: "Namnet som placerar klubben", why: "Står på truppen. Carlow Nationalist den 28 januari 2026 kallar henne 15, från Killerig. Hennes racingsida säger att hon spelar fotboll för St Pats i Carlow." },
      { name: "Sienna M.", number: "8", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Leah O.", number: "9", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Nummer 9 är inte en publicerad position." },
      { name: "Roisin M.", number: "10", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Nummer 10 är inte en publicerad position." },
      { name: "Aoibhinn C.", number: "11", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Kiyah M.", number: "12", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Erika O.", number: "13", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Ellie W.", number: "14", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Holly O.", number: "15", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Erin W.", number: "16", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010." },
      { name: "Niamh O.", number: "18", role: "Turneringstrupp", why: "Står på sidan för Flickor 2010. Assisterande tränare är David O'Rourke. Sidan säger inte att de är släkt." },
    ],
    playersNote:
      "Nummer och namn är kopierade från turneringens lagsida. Inga positioner är tryckta. Nummer 17 är ledigt.",
    staff: "Tränare Garry Doody. Assisterande tränare David O'Rourke. Båda titlarna står på turneringssidan.",
    results: [],
    recordLine: "I cupen: 1–1 mot Spånga, 0–6 mot Järna och 1–2 mot Gavà, 1 poäng och 2–9. Kontrollerat 16 oktober 2026. Truppen på 17 står kvar. Ingen flickserie hittades. Prognosen har dem sist för att cupformen och den neutrala seriepoängen båda ligger lågt.",
    sources: [
      { label: "Turneringstrupp", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/12985/st-patricks-fc" },
      { label: "Instagram", url: "https://www.instagram.com/stpatricksafc/" },
      { label: "Ciara C., 15 i januari 2026", url: "https://www.carlow-nationalist.ie/sport/other-sports/ciara-cahoons-race-to-glory_arid-85559.html" },
      { label: "Spelar fotboll för St Pats i Carlow", url: "https://ciaracahoonracing.co.uk/" },
      { label: "St Patrick's Boys AFC, Graiguecullen", url: "https://www.igp-web.com/Carlow/St_Patricks_AFC.htm" },
      { label: "Carlow U16 flickor, läst 7 oktober, de står inte med", url: "https://soccerleagues.comortais.com/competition.aspx?id=14227&oid=1016" },
      { label: "Carlow U15 flickor, de står inte med", url: "https://soccerleagues.comortais.com/competition.aspx?id=14228&oid=1016" },
      { label: "Carlow U16 pojkar division 2, inte den här truppen", url: "https://soccerleagues.comortais.com/competition.aspx?id=14203&oid=1016" },
      { label: "Kildare U16 flickor, de står inte med", url: "https://soccerleagues.comortais.com/competition.aspx?id=13331&oid=1012" },
      { label: "Midlands U16 flickor, de står inte med", url: "https://soccerleagues.comortais.com/competition.aspx?id=13747&oid=1052" },
      { label: "Wicklow U16 flickor", url: "https://wdsl.ie/league/219656" },
      { label: "Carlow, nationella U16-cupen för flickor", url: "https://soccerleagues.comortais.com/competition.aspx?id=14307&oid=1016" },
    ],
  },
];

// The shirt on each Spånga match is the decision. No home/away explanation is shown.
export const KIT = {
  homeName: "Blåvit tröja",
  awayName: "Röd tröja",
};

// Group table after all five rounds, 18 October 2026, from the official group page.
// Goal scorers are initials. The match pages do not give the minute.
const OFFICIAL = "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/match";
export const GROUP = {
  updated: "18 oktober 2026",
  round: "gruppspelet",
  source: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/groups",
  rows: [
    { place: "1", team: "jarna", p: 5, w: 5, d: 0, l: 0, gf: 17, ga: 1, pts: 15 },
    { place: "2", team: "spanga", p: 5, w: 2, d: 1, l: 2, gf: 5, ga: 5, pts: 7 },
    { place: "3", team: "kilcullen", p: 5, w: 2, d: 1, l: 2, gf: 5, ga: 7, pts: 7 },
    { place: "4", team: "gava", p: 5, w: 2, d: 0, l: 3, gf: 6, ga: 6, pts: 6 },
    { place: "5", team: "castlevilla", p: 5, w: 1, d: 2, l: 2, gf: 5, ga: 9, pts: 5 },
    { place: "6", team: "stpatricks", p: 5, w: 0, d: 2, l: 3, gf: 4, ga: 14, pts: 2 },
  ],
};

export const MATCHES = [
  {
    id: "m1", day: "sat", date: "Lör 17 okt", time: "09:50", field: "1", home: "spanga", away: "stpatricks", mine: true, kit: "home",
    official: `${OFFICIAL}/13582/sp-nga-is-vs-st-patricks-fc`,
    score: [1, 1],
    goals: [
      { side: "home", name: "Mira D." },
      { side: "away", name: "Erin W." },
    ],
  },
  {
    id: "m2", day: "sat", date: "Lör 17 okt", time: "09:50", field: "3", home: "gava", away: "castlevilla",
    official: `${OFFICIAL}/13581/ef-gava-villarreal-cf-vs-castle-villa-fc`,
    score: [0, 1],
    goals: [{ side: "away", name: "Ellen B." }],
  },
  {
    id: "m3", day: "sat", date: "Lör 17 okt", time: "09:50", field: "4", home: "jarna", away: "kilcullen",
    official: `${OFFICIAL}/13580/j-rna-sk-vs-kilcullen-afc`,
    score: [2, 0],
    goals: [
      { side: "home", name: "Freja G." },
      { side: "home", name: "Sofia V." },
    ],
  },
  {
    id: "m4", day: "sat", date: "Lör 17 okt", time: "11:30", field: "3", home: "stpatricks", away: "jarna",
    official: `${OFFICIAL}/13583/st-patricks-fc-vs-j-rna-sk`,
    score: [0, 6],
    goals: [
      { side: "away", name: "Rebecka K.", n: 4 },
      { side: "away", name: "Julia K." },
      { side: "away", name: "Sofia V." },
    ],
  },
  {
    id: "m5", day: "sat", date: "Lör 17 okt", time: "11:30", field: "5", home: "gava", away: "kilcullen",
    official: `${OFFICIAL}/13585/ef-gava-villarreal-cf-vs-kilcullen-afc`,
    score: [4, 0],
    goals: [
      { side: "home", name: "Thais I. V.", n: 2 },
      { side: "home", name: "Mila L. R." },
      { side: "home", name: "Valentina R. P." },
    ],
  },
  {
    id: "m6", day: "sat", date: "Lör 17 okt", time: "11:30", field: "10", home: "spanga", away: "castlevilla", mine: true, kit: "home",
    official: `${OFFICIAL}/13584/sp-nga-is-vs-castle-villa-fc`,
    score: [3, 0],
    goals: [
      { side: "home", name: "Ellie Å." },
      { side: "home", name: "Elvira M." },
      { side: "home", name: "Felicia O." },
    ],
  },
  {
    id: "m7", day: "sat", date: "Lör 17 okt", time: "13:10", field: "1", home: "jarna", away: "spanga", mine: true, kit: "home",
    official: `${OFFICIAL}/13586/j-rna-sk-vs-sp-nga-is`,
    score: [3, 0],
    goals: [
      { side: "home", name: "Sofia V.", n: 2 },
      { side: "home", name: "Julia K." },
    ],
  },
  {
    id: "m8", day: "sat", date: "Lör 17 okt", time: "13:10", field: "5", home: "castlevilla", away: "kilcullen",
    official: `${OFFICIAL}/13588/castle-villa-fc-vs-kilcullen-afc`,
    score: [1, 1],
    goals: [
      { side: "home", name: "Ellen B." },
      { side: "away", name: "Izzy M." },
    ],
  },
  {
    id: "m9", day: "sat", date: "Lör 17 okt", time: "13:10", field: "10", home: "stpatricks", away: "gava",
    official: `${OFFICIAL}/13587/st-patricks-fc-vs-ef-gava-villarreal-cf`,
    score: [1, 2],
    goals: [
      { side: "home", name: "Ciara C. (7)" },
      { side: "away", name: "Valentina R. P.", n: 2 },
    ],
  },
  {
    id: "m10", day: "sun", date: "Sön 18 okt", time: "09:00", field: "1", home: "castlevilla", away: "stpatricks",
    official: `${OFFICIAL}/13591/castle-villa-fc-vs-st-patricks-fc`,
    score: [2, 2],
    goals: [
      { side: "home", name: "Abbie L." },
      { side: "home", name: "Ruby S." },
      { side: "away", name: "Aoibhinn C." },
      { side: "away", name: "Roisin M." },
    ],
  },
  {
    id: "m11", day: "sun", date: "Sön 18 okt", time: "09:00", field: "3", home: "kilcullen", away: "spanga", mine: true, kit: "away",
    official: `${OFFICIAL}/13590/kilcullen-afc-vs-sp-nga-is`,
    score: [1, 0],
    goals: [{ side: "home", name: "Ella O." }],
  },
  {
    id: "m12", day: "sun", date: "Sön 18 okt", time: "09:00", field: "4", home: "gava", away: "jarna",
    official: `${OFFICIAL}/13589/ef-gava-villarreal-cf-vs-j-rna-sk`,
    score: [0, 3],
    goals: [{ side: "away", name: "Sofia V.", n: 3 }],
  },
  {
    id: "m13", day: "sun", date: "Sön 18 okt", time: "11:00", field: "1", home: "gava", away: "spanga", mine: true, kit: "away",
    official: `${OFFICIAL}/13594/ef-gava-villarreal-cf-vs-sp-nga-is`,
    score: [0, 1],
    goals: [{ side: "away", name: "Mira D." }],
  },
  {
    id: "m14", day: "sun", date: "Sön 18 okt", time: "11:00", field: "3", home: "jarna", away: "castlevilla",
    official: `${OFFICIAL}/13592/j-rna-sk-vs-castle-villa-fc`,
    score: [3, 1],
    goals: [
      { side: "home", name: "Fanny F.", n: 2 },
      { side: "home", name: "Anna A." },
      { side: "away", name: "Grace M." },
    ],
  },
  {
    id: "m15", day: "sun", date: "Sön 18 okt", time: "11:00", field: "4", home: "kilcullen", away: "stpatricks",
    official: `${OFFICIAL}/13593/kilcullen-afc-vs-st-patricks-fc`,
    score: [3, 0],
    goals: [
      { side: "home", name: "Amelia R.", n: 2 },
      { side: "home", name: "Izzy M." },
    ],
  },
];

export const PLAYOFFS = [
  {
    id: "p1", day: "sun", date: "Sön 18 okt", time: "13:00", field: "4", label: "Final", pairing: "Järna mot Spånga", home: "jarna", away: "spanga",
    official: `${OFFICIAL}/13595/j-rna-sk-vs-sp-nga-is`,
    score: [2, 0],
    goals: [
      { side: "home", name: "Rebecka K." },
      { side: "home", name: "Sofia V." },
    ],
  },
  {
    id: "p2", day: "sun", date: "Sön 18 okt", time: "13:00", field: "8", label: "Bronsmatch", pairing: "Kilcullen mot Gavà", home: "kilcullen", away: "gava",
    official: `${OFFICIAL}/13596/kilcullen-afc-vs-ef-gava-villarreal-cf`,
    score: [0, 1],
    goals: [{ side: "away", name: "Carlota C. C." }],
  },
  {
    id: "p3", day: "sun", date: "Sön 18 okt", time: "13:00", field: "1", label: "Match om plats 5", pairing: "Castle Villa mot St Patricks", home: "castlevilla", away: "stpatricks",
    official: `${OFFICIAL}/13597/castle-villa-fc-vs-st-patricks-fc`,
    score: [2, 0],
    goals: [{ side: "home", name: "Grace M.", n: 2 }],
  },
];

applyCupResults();

// Saturday player meeting at the hotel, after breakfast and before the 08:20 change.
export const PLAYER_MEET = {
  day: "sat",
  date: "Lör 17 okt",
  start: "07:40",
  end: "08:00",
  name: "Spelarmöte",
  place: "Alannia Salou",
};

// Sunday gathering in the reception, after the change and before bus 6 at 07:45.
export const SUN_MEET = {
  day: "sun",
  date: "Sön 18 okt",
  start: "07:40",
  end: "",
  name: "Samling",
  place: "Receptionen",
  note: "Rött ställ på. Blått ställ i väskan.",
};

// Sunday 14:00, still at the pitches, before bus 6 leaves at 14:45.
export const CEREMONY = {
  day: "sun",
  date: "Sön 18 okt",
  time: "14:00",
  name: "Prisutdelning",
  place: "Futbol Salou",
  note: "Alla lag i Flickor 2010. Alla spelare och tränare får medalj.",
};

// Official team programme. Friday dinner stays the earlier hotel window; this sheet does not list Friday.
// Saturday, Sunday and Monday meals are start times only. No end is printed, so none is invented.
export const MEALS = [
  { id: "fri-dinner", day: "fri", date: "Fre 16 okt", start: "19:00", end: "21:30", name: "Middag", place: "Hotellbuffé", note: "Helpensionen börjar med den här middagen." },
  { id: "sat-breakfast", day: "sat", date: "Lör 17 okt", start: "07:00", end: "", name: "Frukost", place: "Hotellbuffé", note: "Buss 6 går 08:35." },
  { id: "sat-lunch", day: "sat", date: "Lör 17 okt", start: "15:00", end: "", name: "Lunch", place: "Hotellbuffé", note: "Efter buss 6 kl 14:20." },
  { id: "sat-dinner", day: "sat", date: "Lör 17 okt", start: "19:30", end: "", name: "Middag", place: "Hotellbuffé" },
  { id: "sun-breakfast", day: "sun", date: "Sön 18 okt", start: "07:00", end: "", name: "Frukost", place: "Hotellbuffé", note: "Buss 6 går 07:45." },
  { id: "sun-lunch", day: "sun", date: "Sön 18 okt", start: "15:00", end: "", name: "Lunch", place: "Hotellbuffé", note: "Efter buss 6 kl 14:45." },
  { id: "sun-dinner", day: "sun", date: "Sön 18 okt", start: "19:30", end: "", name: "Middag", place: "Hotellbuffé" },
  { id: "mon-breakfast", day: "mon", date: "Mån 19 okt", start: "09:00", end: "", name: "Frukost", place: "Hotellbuffé", note: "Utcheckning senast 11:00." },
  { id: "mon-lunch", day: "mon", date: "Mån 19 okt", start: "13:00", end: "", name: "Lunch", place: "Hotellbuffé", note: "Buss D20 går 15:00." },
];

// The desk is open 11:00–18:00, but this group is not there then.
// Bus A36 stops at the age check after the flight, before the hotel.
export const AGE_CHECK = {
  day: "fri",
  date: "Fre 16 okt",
  sort: "15:31",
  start: "",
  end: "",
  name: "Ålderskontroll",
  place: "Futbol Salou",
  note: "Buss A36 stannar här före hotellet. Varje spelare är med och visar pass eller id-kort. Ett foto i telefonen räcker. Armbandet bärs till söndag. Högst två tränare. Kontoret stänger 18:00. Hinner ni inte före 18:00 görs kontrollen lördag före första matchen. LH 1130 landar 15:30.",
};

// Friday morning cars to Arlanda, first names as on the team's sheet. No pickup time is printed.
export const ARLANDA_CARS = {
  title: "Bil till Arlanda",
  lead: "Fredag morgon åker ni till Arlanda i de här bilarna. Föraren står under bilnumret. Listan säger inte när bilarna går.",
  cars: [
    { car: "Bil 1", driver: "Kristina", people: ["Edessa", "Mira", "Malin"] },
    { car: "Bil 2", driver: "Louise", people: ["Clara", "Ellen", "Fredrik", "Alma"] },
    { car: "Bil 3", driver: "Sara", people: ["Ellie", "Isabelle", "Blanca"] },
    { car: "Bil 4", driver: "Åsa", people: ["Smilla", "Mackan", "Olivia"] },
    { car: "Bil 5", driver: "Fredrik", people: ["Lova", "Felicia J"] },
    { car: "Bil 6", driver: "Daniel", people: ["Lollo", "Felicia O", "Elvira", "Johan"] },
    { car: "Bil 7", driver: "Helena", people: ["Stina", "Thomas", "Sara"] },
  ],
};

export const FLIGHTS = [
  { date: "Fre 16 okt", no: "LH 801", from: "Stockholm", to: "Frankfurt", dep: "09:50", arr: "12:00" },
  { date: "Fre 16 okt", no: "LH 1130", from: "Frankfurt", to: "Barcelona", dep: "13:25", arr: "15:30" },
  {
    date: "Mån 19 okt",
    no: "LH 1135",
    from: "Barcelona",
    to: "Frankfurt",
    dep: "20:10",
    arr: "22:07",
    sheet: "19:00–21:10",
    note: "Beräknad tid från Barcelonas tavla 19 oktober 2026. Resebladet har 19:00–21:10.",
  },
  { date: "Mån 19 okt", no: "LH 810", from: "Frankfurt", to: "Stockholm", dep: "22:15", arr: "00:20", arrNote: "Framme tisdag 20 okt" },
];

// Friday clocks stay the sheet. Monday clocks follow a board for 19 October.
// Checked 19 October 2026 at 16:26 Barcelona time. Barcelona's own LH 1135 page
// says Delayed, planned departure 20:10, arrival Frankfurt 22:07. The sheet is 19:00–21:10.
// FlightStats for the same date says the same estimate, delayed 1 h 10 min.
// LH 810 is still scheduled 22:15–00:20 and on time on the Frankfurt board.
export const FLIGHT_CHECK = {
  result: "Klockan 16:26 den 19 oktober sa Barcelonas tavla beräknad avgång 20:10 och ankomst Frankfurt 22:07. Sedan blev LH 1135 senare och landade 23:34. LH 810 gick 22:29. Gruppen var inte med. Fredagens flyg står kvar som på resebladet: LH 801 09:50–12:00 och LH 1130 13:25–15:30.",
  text: "Lufthansa bokade om alla till VL 800 tisdag 20 oktober. Planet skulle gå 07:10 och landade på Arlanda 10:33. Ersättningen står under flygen.",
  boards: [
    { label: "Arlanda", url: "https://www.swedavia.se/arlanda/avgangar/" },
    { label: "Frankfurt", url: "https://www.frankfurt-airport.com/de/fluege-und-airlines/abfluege.html?flighttype=departures&q=" },
    { label: "Barcelona", url: "https://www.aeropuertobarcelona-elprat.com/ingl/flight-departure-LH1135" },
  ],
};

// What happened on the way home, and the EU compensation that follows from those clocks.
// LH 1135 landing 23:34 and LH 810 departure 22:29 are FlightRadar24 times converted from UTC to local (CEST, UTC+2).
// Barcelona's board recorded the LH 1135 departure as 165 minutes late, about 21:45.
// VL 800 on 20 October: the passenger's ticket says 07:10. FlightRadar24 scheduled 05:10 UTC, which is 07:10 local,
// scheduled arrival 07:15 UTC = 09:15 local, takeoff 06:49 UTC = 08:49, landing 08:33 UTC = 10:33.
// Great-circle BCN–ARN is 2,317 km, so the intra-EU band over 1,500 km is 400 euro.
// Arrival 10:33 is 10 hours 13 minutes after the booked 00:20, so the 50 percent reduction does not apply.
// The public logs do not say why LH 1135 was late. Extraordinary circumstances stay a question for Lufthansa.
export const CLAIM = {
  title: "Ersättning",
  amount: 400,
  unit: "euro per person",
  distanceKm: 2317,
  originalArrival: "00:20",
  landed: "10:33",
  late: "10 timmar och 13 minuter",
  // The agency sent the same form on the India site (/in/en/fast-compensation). This is the Swedish site.
  form: "https://www.lufthansa.com/se/en/fast-compensation",
  feedback: "https://www.lufthansa.com/se/en/feedback",
  power: "https://www.lufthansa.com/content/dam/lh/documents/common/power-of-attorney/lh_power-of-attorney_EN.pdf",
  rights: "https://europa.eu/youreurope/citizens/travel/passenger-rights/air/index_sv.htm",
  booked: [
    {
      no: "LH 1135",
      date: "Mån 19 okt",
      route: "Barcelona → Frankfurt",
      sheet: "19:00–21:10",
      actual: "Landade i Frankfurt 23:34.",
    },
    {
      no: "LH 810",
      date: "Mån 19 okt",
      route: "Frankfurt → Stockholm",
      sheet: "22:15–00:20",
      actual: "Gick 22:29 och landade 00:14. Gruppen var inte med.",
    },
  ],
  taken: {
    no: "VL 800",
    airline: "Lufthansa City",
    date: "Tis 20 okt",
    route: "Frankfurt → Stockholm",
    dep: "07:10",
    arr: "09:15",
    takeoff: "08:49",
    landed: "10:33",
  },
  facts: [
    "Hela gruppen åkte med VL 800.",
    "Lufthansa bokade om resan.",
    "Gruppen sov över i Frankfurt. Lufthansa betalade.",
    "Väskorna kom med till Arlanda.",
  ],
  // Fields that are the same on every power of attorney. Names and addresses are not here.
  lathund: {
    title: "Lathund",
    perForm: 2,
    flight: "LH 1135",
    flightDate: "19 October 2026",
    booking: "87ZRTJ",
    payment: "No",
  },
};

// Official airport buses from the tournament list. A36 and D20 are the bus codes, not a coach company.
// Friday has no separate departure clock: the bus leaves after LH 1130 lands at 15:30 and the group has gathered.
// Monday 15:00 is the printed hotel departure. The hotel and airport windows below are still ride estimates.
export const AIRPORT_BUS = {
  company: "",
  routeNumber: "",
  arrival: {
    date: "Fre 16 okt",
    flight: "LH 1130",
    airport: "Barcelona El Prat",
    land: "15:30",
    bus: "Buss A36",
    pax: 23,
    meet: "Hämta bagaget, gå ut till ankomsthallen och samla hela gruppen. Cupens personal möter gruppen där.",
  },
  departure: {
    date: "Mån 19 okt",
    flight: "LH 1135",
    airport: "Barcelona El Prat",
    flightTime: "20:10",
    hotelLeave: "15:00",
    checkout: "11:00",
    bus: "Buss D20",
    pax: 23,
    rule: "planerad utifrån flygtiderna och avgår från boendet cirka 4 timmar innan flyget går",
  },
  minOnFlight: 20,
  officePhone: "+34 932 808 062",
  officeEmail: "info@footballcupbarcelona.com",
};

export const HOTEL = {
  name: "Alannia Salou",
  address: "Avinguda de Pompeu Fabra 37, 43840 Salou",
  stars: "★★★★",
  url: "https://alanniaresorts.com/en/resorts/alannia-salou/",
  phone: "+34 965 48 49 45",
  phoneHours: "10:00–20:00",
  email: "reservas@alannia.com",
  map: "https://www.google.com/maps/search/?api=1&query=Alannia+Salou+Avinguda+de+Pompeu+Fabra+37+43840+Salou",
  facts: [
    "Poolen är till för alla åldrar. Poolhandduk ingår inte.",
    "Spa och gym är från 16 år.",
    "Miniclubben är till för de yngre barnen.",
    "Det finns en multisportplan för fotboll och basket.",
    "Bufférestaurangen Cós Blanc serverar frukost, lunch och middag.",
  ],
  photos: [
    { src: "assets/hotel/pool.jpg", alt: "Pool och gröna rutschkanor framför det vita hotellet", caption: "Pool och rutschkanor" },
    { src: "assets/hotel/plan.jpg", alt: "Hotellets konstgräsplan för fotboll, med basketkorg", caption: "Fotbollsplanen" },
    { src: "assets/hotel/room.jpg", alt: "Hotellrum med två sängar och balkong mot palmerna", caption: "Ett rum" },
  ],
  photoCredit: "Bilderna kommer från hotellets officiella sida.",
};

// Things to do at Alannia Salou and within about a 20-minute walk.
// Capellans time is the hotel's own. Other times are map distance at about 5 km/h.
export const AREA = {
  title: "Området",
  lead: "Saker ni kan göra på hotellet, promenader inom ungefär 20 minuter, och var butikerna ligger.",
  hotelTitle: "På hotellet",
  map: {
    src: "assets/hotel/omrade.jpg",
    alt: "Karta över Alannia Salou med pool, hus, multisportplan, scen och restaurang",
    caption: "Karta över hotellområdet, från Alannia Salou.",
    href: "https://alanniaresorts.com/images/webkit/planos_tarifas/AS_PLANO.pdf",
    hrefLabel: "Öppna kartan",
  },
  walkTitle: "Inom 20 minuters promenad",
  hotel: [
    {
      name: "Poolen och rutschkanorna",
      text: "Poolen är till för alla åldrar, så ni får bada. Det finns också en barnpool och en vattenpark i samma område, 1000 m². Poolhandduk ingår inte. Solsängar går inte att reservera.",
    },
    {
      name: "Hotellets program",
      text: "Tiderna är från hotellets evenemangssida, hämtade 5 oktober 2026. Listan kan ändras. Här är passen som ryms när ni är på hotellet. Flera är märkta för vuxna och tonåringar. Miniclubben har egna pyssel samma dagar. Den är för yngre barn.",
      href: "https://as.alanniaresorts.com/all-events/",
      hrefLabel: "Alla evenemang",
    },
    {
      name: "Fredag kväll",
      time: "20:30",
      text: "Buss A36 stannar först på ålderskontrollen. Ni är på hotellet ungefär 17:40–18:10. Alannia Fun, dans vid poolen, är 18:00–18:30, så den kan redan ha börjat. Minidisco på scenen är 20:30–21:15, för hela familjen. Showen Addams Family är 21:30–22:30 på scenen. Middagen är 19:00–21:30, så showen börjar under buffén.",
    },
    {
      name: "Lördag efter matcherna",
      time: "16:00",
      text: "Buss 6 från planerna går 14:20. Med ungefär 15 minuters körning är ni tillbaka omkring 14:35. Lunchen är 15:00. Feria Game vid poolen är 16:00–17:00, spel för alla. Bowling vid poolen är 17:00–18:00, märkt för vuxna och tonåringar. Alannia Fun, dans vid poolen, är 18:00–18:30. Minidisco är 20:30–21:15. Showen Jaque Mate är 21:30–22:30 på scenen. Förmiddagens Zumba och pingpong krockar med matcherna.",
    },
    {
      name: "Söndag efter matcherna",
      time: "16:00",
      text: "Prisutdelningen är 14:00 på Futbol Salou. Buss 6 från planerna går 14:45. Med ungefär 15 minuters körning är ni tillbaka omkring 15:00. Lunchen är 15:00. Bingo Musical på scenen är 16:00–17:00. Dart vid poolen är 17:00–18:00. Alannia Fun är 18:00–18:30. Minidisco är 20:30–21:15. Kahoot Night är 21:30–22:30 på scenen. Hotellet skriver att det gäller att vara snabb, och att mobilen behöver batteri. PS5-turneringen 10:45–12:30 krockar med matcherna.",
    },
    {
      name: "Måndag före bussen",
      time: "11:30",
      text: "Frukost är 09:00. Utcheckning senast 11:00. Lunchen är 13:00. Buss D20 går 15:00 till flygplatsen. Pingpong på scenen är 11:30–12:30. Alannia Game vid poolen är 12:30–13:00. Där tävlar barn och vuxna var för sig. Kvällens minidisco är efter att bussen har gått.",
    },
    {
      name: "Multisportplanen",
      text: "Fotboll och basket på planen inne på hotellet. På sommaren ordnar de tävlingar. Oktober är inte den säsongen, men planen finns kvar.",
    },
    {
      name: "Junior club",
      text: "Hotellet har en junior club. Sidan anger ingen ålder, så fråga i receptionen om ni får vara med. Miniclubben är för yngre barn, från 4 år.",
    },
    {
      name: "Trädgården",
      text: "Hotellet är byggt som en trädgård med gångar mellan husen. Det är ett ställe att gå runt på utan att lämna området.",
    },
  ],
  nearby: [
    {
      name: "Platja dels Capellans",
      time: "10 minuter",
      text: "Hotellet skriver att stranden ligger 10 minuters promenad bort. Blå flagg, ungefär 200 meter lång, klippor och tallar, och ett område för vattensport. Gå direkt, eller ta Camí de Ronda längs kusten. Fyren ligger längre bort än 20 minuter, så vänd innan den om ni bara har en kort stund.",
      href: "https://www.google.com/maps/dir/?api=1&origin=Alannia+Salou&destination=Platja+dels+Capellans+Salou&travelmode=walking",
      hrefLabel: "Promenad",
    },
    {
      name: "Passeig Jaume I och Platja de Llevant",
      time: "omkring 17 minuter",
      text: "Strandpromenaden och den långa stadsstranden. Hotellet nämner Jaume I-promenaden som en promenad från området. Kartan ger ungefär 1,4 km, omkring 17 minuter i vanlig takt. Llevant är en av de centrala stränderna, ungefär 1200 meter, med service och vattensport. Turistbyrån skriver att det också finns butiker och restauranger längs promenaden, främst under säsongen.",
      href: "https://www.google.com/maps/dir/?api=1&origin=Alannia+Salou&destination=Passeig+Jaume+I+Salou&travelmode=walking",
      hrefLabel: "Promenad",
    },
  ],
  shopTitle: "Butiker",
  shops: [
    {
      name: "Carles Buïgas och Saragossa",
      time: "omkring 10 minuter",
      text: "Turistbyrån kallar stråket Zona Est. Där finns kläder, presenter och restauranger, främst på sommaren. Carrer de Saragossa ligger ungefär 0,8 km bort, omkring 10 minuter i vanlig takt. Carles Buïgas börjar närmare. I mitten av oktober kan flera butiker ha stängt eller ha kortare tider.",
      href: "https://www.google.com/maps/dir/?api=1&origin=Alannia+Salou&destination=Carrer+de+Saragossa+Salou&travelmode=walking",
      hrefLabel: "Promenad",
    },
    {
      name: "Centrum",
      time: "omkring 30 minuter",
      text: "Butikerna kring Carrer de Barcelona och Via Roma är öppna året runt, från småbutiker till kända märken. Gågatorna i gamla stan är Carrer de Ponent och Carrer de València. Kartan ger ungefär 2,6 km, omkring 30 minuter. Det är längre än en kort promenad.",
      href: "https://www.google.com/maps/dir/?api=1&origin=Alannia+Salou&destination=Via+de+Roma+Salou&travelmode=walking",
      hrefLabel: "Promenad",
    },
    {
      name: "Parc Central",
      time: "inte en promenad",
      text: "Köpcentret ligger i Tarragona, ungefär 10 km bort. Där finns Primark, Zara och H&M, och en biograf. Från 1 oktober är butikerna öppna måndag till lördag 09:00–21:00. Söndag är butikerna stängda. Det finns inget köpcentrum inom 20 minuters promenad från hotellet.",
      href: "https://www.ccparccentral.com/en/",
      hrefLabel: "Parc Central",
    },
  ],
  farther: "Fyren, Cala Crancs och hamnen är längre än 20 minuter till fots. PortAventura är flera kilometer bort. Hotellets tid dit är inte en promenad.",
  limits: "Spa och gym kräver 16 år. Alkohol är från 18, också i poolbaren.",
  free: "Ledig tid: fredag efter att ni kommit till hotellet. Lördag går buss 6 från planerna 14:20 och lunchen är 15:00. Söndag går bussen 14:45, efter prisutdelningen 14:00, och lunchen är 15:00. Måndag är lunchen 13:00. Ni checkar ut senast 11:00 och buss D20 går 15:00.",
  sources: [
    { label: "Underhållning", url: "https://alanniaresorts.com/en/resorts/alannia-salou/entertainment" },
    { label: "Alla evenemang", url: "https://as.alanniaresorts.com/all-events/" },
    { label: "Anläggningen", url: "https://alanniaresorts.com/en/resorts/alannia-salou/facilities" },
    { label: "Stränderna", url: "https://alanniaresorts.com/en/resorts/alannia-salou/beaches" },
    { label: "Under vistelsen", url: "https://alanniaresorts.com/en/resorts/alannia-salou/your-stay/during-your-stay" },
    { label: "Handel i Salou", url: "https://www.visitsalou.eu/ca/descobreix-salou/que-trobaras/comerc" },
    { label: "Parc Central", url: "https://www.ccparccentral.com/en/" },
  ],
};

// Official Bus 6, departures between the hotel and the pitches.
// The 15-minute pitch ride below is still an allowance, not a printed arrival.
export const PITCH_BUSES = [
  { day: "sat", date: "Lör 17 okt", time: "08:35", line: "Buss 6", from: "Alannia Salou", to: "Futbol Salou" },
  { day: "sat", date: "Lör 17 okt", time: "14:20", line: "Buss 6", from: "Futbol Salou", to: "Alannia Salou" },
  { day: "sun", date: "Sön 18 okt", time: "07:45", line: "Buss 6", from: "Alannia Salou", to: "Futbol Salou" },
  { day: "sun", date: "Sön 18 okt", time: "14:45", line: "Buss 6", from: "Futbol Salou", to: "Alannia Salou" },
];

// Driving estimates, not printed shuttle times.
// Airport fast: OpenStreetMap route, Terminal 1 to the hotel, about 97 km.
// Airport slow: a transfer quote for this hotel, 1 hour 40 minutes.
// Pitch: about 5 km and 10 minutes by car. 15 minutes is the allowance for the team bus.
export const RIDES = {
  airportKm: 97,
  airportFastMin: 70,
  airportSlowMin: 100,
  pitchKm: 5,
  pitchMin: 15,
  earlyMin: 60,
  playMin: 40,
  breakMin: 5,
  luggageMin: 60,
  packMin: 15,
  snackLeadMin: 15,
};

function matchMinutes() {
  return RIDES.playMin + RIDES.breakMin;
}

function minutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function clock(total) {
  const wrapped = ((total % 1440) + 1440) % 1440;
  const h = Math.floor(wrapped / 60);
  const m = wrapped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function pitchPlan(time) {
  const kick = minutes(time);
  return {
    leave: clock(kick - RIDES.earlyMin - RIDES.pitchMin),
    arrive: clock(kick - RIDES.earlyMin),
    ends: clock(kick + matchMinutes()),
    back: clock(kick + matchMinutes() + RIDES.pitchMin),
  };
}

export function canReturnBetween(thisKick, nextKick) {
  const free = minutes(nextKick) - RIDES.earlyMin - (minutes(thisKick) + matchMinutes());
  return free >= RIDES.pitchMin * 2;
}

function spangaKicks(day) {
  const kicks = MATCHES.filter((match) => match.mine && match.day === day).map((match) => match.time);
  if (day === "sun") {
    for (const game of PLAYOFFS) {
      if (game.day === day) kicks.push(game.time);
    }
  }
  return [...new Set(kicks)].sort((a, b) => minutes(a) - minutes(b));
}

// Time the team is away from the hotel: leave for the first game through
// getting back from the last, with no gap when a return is impossible.
export function pitchBus(day, direction) {
  const rows = PITCH_BUSES.filter((bus) => bus.day === day);
  if (!direction) return rows;
  return rows.find((bus) => (direction === "out" ? bus.to === "Futbol Salou" : bus.from === "Futbol Salou")) || null;
}

export function hotelBack(day) {
  const back = pitchBus(day, "back");
  if (!back) return "";
  return clock(minutes(back.time) + RIDES.pitchMin);
}

export function awayBlocks(day) {
  const kicks = spangaKicks(day);
  if (!kicks.length) return [];
  const out = pitchBus(day, "out");
  const back = pitchBus(day, "back");
  if (out && back) return [{ start: out.time, end: hotelBack(day) }];
  const blocks = [];
  let from = minutes(pitchPlan(kicks[0]).leave);
  let to = minutes(pitchPlan(kicks[0]).back);
  for (let i = 1; i < kicks.length; i += 1) {
    const nextFrom = minutes(pitchPlan(kicks[i]).leave);
    const nextTo = minutes(pitchPlan(kicks[i]).back);
    if (canReturnBetween(kicks[i - 1], kicks[i]) && nextFrom > to) {
      blocks.push({ start: clock(from), end: clock(to) });
      from = nextFrom;
    }
    to = Math.max(to, nextTo);
  }
  blocks.push({ start: clock(from), end: clock(to) });
  return blocks;
}

function clipNote(meal, start, end) {
  const open = minutes(meal.start);
  const close = minutes(meal.end);
  const from = minutes(start);
  const to = minutes(end);
  const clippedStart = from > open;
  const clippedEnd = to < close;
  if (clippedStart && clippedEnd) {
    return `Buffén är öppen ${meal.start}–${meal.end}. Det här är luckan mellan matcherna.`;
  }
  if (clippedEnd && meal.name === "Frukost") {
    return `Buffén är öppen till ${meal.end}. Bussen går ${clock(to + RIDES.packMin)}.`;
  }
  if (clippedEnd) {
    return `Buffén är öppen till ${meal.end}. Bussen går ${end}.`;
  }
  if (clippedStart) {
    return `Buffén öppnar ${meal.start}. Ni är tillbaka ungefär ${start}. En match räknas som 40 minuter plus 5 minuters paus, sedan 15 minuter på bussen. Drar den ut på tiden kan luckan försvinna.`;
  }
  return meal.note || "";
}

// A printed start with no end stays a point. A window is clipped around the time away from the hotel.
export function usableMeal(meal) {
  const point = !meal.end;
  let segments = [[minutes(meal.start), point ? minutes(meal.start) : minutes(meal.end)]];
  for (const block of awayBlocks(meal.day)) {
    let awayStart = minutes(block.start);
    const awayEnd = minutes(block.end);
    if (!point && meal.name === "Frukost") awayStart -= RIDES.packMin;
    const next = [];
    for (const [from, to] of segments) {
      if (point) {
        if (from >= awayStart && from < awayEnd) continue;
        next.push([from, to]);
        continue;
      }
      if (awayEnd <= from || awayStart >= to) {
        next.push([from, to]);
        continue;
      }
      if (from < awayStart) next.push([from, Math.min(to, awayStart)]);
      if (awayEnd < to) next.push([Math.max(from, awayEnd), to]);
    }
    segments = next.filter(([from, to]) => point || to - from >= 1);
  }
  if (!segments.length) {
    const back = pitchBus(meal.day, "back");
    const note = back
      ? `${back.line} från planerna går ${back.time}. Den här tiden ligger medan laget är på Futbol Salou.`
      : "Laget är på Futbol Salou hela tiden.";
    return [{
      ...meal,
      missed: true,
      officialStart: meal.start,
      officialEnd: meal.end,
      note,
    }];
  }
  return segments.map(([from, to]) => {
    const start = clock(from);
    const end = point ? "" : clock(to);
    return {
      ...meal,
      start,
      end,
      officialStart: meal.start,
      officialEnd: meal.end,
      missed: false,
      note: point ? (meal.note || "") : clipNote(meal, start, end),
    };
  });
}

// Fifteen minutes at the hotel before the morning bus. The programme prints a breakfast start, not an end.
export function morningPrep(day) {
  const out = pitchBus(day, "out");
  const breakfast = MEALS.find((meal) => meal.day === day && meal.name === "Frukost");
  if (!out || !breakfast) return null;
  const bus = minutes(out.time);
  if (minutes(breakfast.start) >= bus) return null;
  if (day === "sun") {
    return {
      id: "sun-prep",
      day,
      date: breakfast.date,
      start: "07:20",
      end: "07:40",
      name: "Byt om och packa",
      place: HOTEL.name,
      note: "Byt till rött ställ. Lägg det blå stället i väskan.",
    };
  }
  const from = bus - RIDES.packMin;
  return {
    id: `${day}-prep`,
    day,
    date: breakfast.date,
    start: clock(from),
    end: clock(bus),
    name: "Byt om och packa",
    place: HOTEL.name,
    note: "Femton minuter före bussen. Byt om och samla ihop era saker.",
  };
}

const SNACK = "En banan, en liten fralla eller en müslibar. Vatten i flaskan. Några klunkar sportdryck om det är varmt. Inget tungt, och ingen energidryck.";

// Gaps at the pitches, after one game ends and 15 minutes before the next kick.
export function snackStops(day) {
  const kicks = spangaKicks(day);
  const breakfast = MEALS.find((meal) => meal.day === day && meal.name === "Frukost");
  const stops = [];
  for (let i = 0; i < kicks.length - 1; i += 1) {
    const done = pitchPlan(kicks[i]).ends;
    const nextKick = kicks[i + 1];
    const until = clock(minutes(nextKick) - RIDES.snackLeadMin);
    if (minutes(until) - minutes(done) < RIDES.snackLeadMin) continue;
    const after = i === 0 ? "första matchen" : `matchen ${kicks[i]}`;
    stops.push({
      id: `${day}-snack-${i + 1}`,
      day,
      date: breakfast ? breakfast.date : "",
      start: done,
      end: until,
      name: "Mellanmål",
      place: "Vid planerna",
      note: `Efter ${after}, före avspark ${nextKick}. Packa det på frukosten. ${SNACK}`,
    });
  }
  return stops;
}

const land = minutes(AIRPORT_BUS.arrival.land);
const hotelLeave = minutes(AIRPORT_BUS.departure.hotelLeave);
AIRPORT_BUS.arrival.hotelFrom = clock(land + RIDES.luggageMin + RIDES.airportFastMin);
AIRPORT_BUS.arrival.hotelTo = clock(land + RIDES.luggageMin + RIDES.airportSlowMin);
AIRPORT_BUS.departure.airportFrom = clock(hotelLeave + RIDES.airportFastMin);
AIRPORT_BUS.departure.airportTo = clock(hotelLeave + RIDES.airportSlowMin);

function flightPlace(name) {
  return name === "Stockholm" ? "Arlanda" : name;
}

function flightStop(flight) {
  const note = flight.note
    ? flight.note
    : flight.arrNote
      ? `${flight.arrNote}. Tiderna är lokal tid på varje flygplats, som på resebladet.`
      : "Tiderna är lokal tid på varje flygplats, som på resebladet.";
  return {
    id: flight.no.replaceAll(" ", "").toLowerCase(),
    kind: "flight",
    sort: flight.dep,
    start: flight.dep,
    end: flight.arr,
    name: flight.no,
    place: `${flightPlace(flight.from)} → ${flightPlace(flight.to)}`,
    note,
    pill: "Flyg",
  };
}

// Travel rows for the schedule. Friday gathering is 07:30 at Arlanda.
export function travelStops(day) {
  const flights = FLIGHTS.filter((flight) => {
    if (day === "fri") return flight.date.startsWith("Fre");
    if (day === "mon") return flight.date.startsWith("Mån");
    return false;
  }).map(flightStop);
  if (day === "fri") {
    return [
      {
        id: "meet-arn",
        kind: "meet",
        sort: "07:30",
        start: "07:30",
        end: "",
        name: "Samling",
        place: "Arlanda, terminal 5",
        note: "Terminal 5. LH 801 går 09:50.",
        pill: "Möte",
      },
      ...flights,
      {
        id: "bus-in",
        kind: "bus",
        sort: AIRPORT_BUS.arrival.land,
        start: AIRPORT_BUS.arrival.land,
        end: "",
        name: AIRPORT_BUS.arrival.bus,
        place: "Barcelona El Prat → Futbol Salou → Alannia Salou",
        note: `${AIRPORT_BUS.arrival.meet} ${AIRPORT_BUS.arrival.bus}, ${AIRPORT_BUS.arrival.pax} personer. Bussen åker först till ålderskontrollen på Futbol Salou, sedan till hotellet. Hotellet ungefär ${AIRPORT_BUS.arrival.hotelFrom}–${AIRPORT_BUS.arrival.hotelTo}, räknat från landning, bagage och körning.`,
        pill: "Buss",
      },
    ];
  }
  if (day === "mon") {
    return [
      {
        id: "bus-out",
        kind: "bus",
        sort: AIRPORT_BUS.departure.hotelLeave,
        start: AIRPORT_BUS.departure.hotelLeave,
        end: "",
        name: AIRPORT_BUS.departure.bus,
        place: `${HOTEL.name} → Barcelona El Prat`,
        note: `${AIRPORT_BUS.departure.bus}, ${AIRPORT_BUS.departure.pax} personer, från hotellet ${AIRPORT_BUS.departure.hotelLeave}. ${AIRPORT_BUS.departure.flight} går ${AIRPORT_BUS.departure.flightTime}. Flygplatsen ungefär ${AIRPORT_BUS.departure.airportFrom}–${AIRPORT_BUS.departure.airportTo}. Checka ut senast ${AIRPORT_BUS.departure.checkout}.`,
        pill: "Buss",
      },
      ...flights,
    ];
  }
  return [];
}

export const RULES = {
  title: "Lagregler",
  kicker: "Barcelona Cup 2026",
  lead: "Vi har satt ihop tio regler för att vi ska få en rolig och trygg resa tillsammans.",
  rules: [
    {
      title: "Vi representerar laget hela tiden",
      text: "När vi bär lagkläder eller rör oss tillsammans representerar vi både laget, föreningen och Sverige. Vi visar respekt för andra lag, domare, hotellpersonal och lokalbefolkningen.",
    },
    {
      title: "Ingen lämnar hotellet på egen hand",
      text: "Ingen får lämna hotellet eller gruppen utan att en ledare vet om det och har godkänt det.",
    },
    {
      title: "Vi går alltid minst tre tillsammans",
      text: "Ingen går ensam. Om ni ska någonstans på hotellet eller i närheten gör ni det tillsammans.",
    },
    {
      title: "Vi håller tiderna",
      text: "Kom i tid till samlingar, måltider, matcher och bussavgångar. Är du sen påverkar det hela laget.",
    },
    {
      title: "Respektera rumskamraterna",
      text: "Alla hjälps åt att hålla ordning på rummet, visa hänsyn och se till att alla trivs.",
    },
    {
      title: "Lugnt på rummen efter kvällstid",
      text: "Vid ledarnas bestämda kvällstid ska ni vara på era rum. Därefter är det lugnt och tyst så att alla får sova och återhämta sig.",
    },
    {
      title: "Mobiltelefoner används med omtanke",
      text: "Mobiler är okej, men inte så att de stör sömn, måltider, lagaktiviteter eller gemenskapen.",
    },
    {
      title: "Vi äter tillsammans",
      text: "Alla kommer till måltiderna och ser till att få i sig ordentligt med mat och dryck för att orka prestera och må bra.",
    },
    {
      title: "Säkerhet först",
      text: "Meddela alltid en ledare om något händer, om du känner dig sjuk, orolig eller om det uppstår problem.",
    },
    {
      title: "Ta ansvar för laget",
      text: "Var en bra lagkamrat. Hjälp varandra, inkludera alla och bidra till en positiv stämning under hela resan.",
    },
  ],
  consequencesTitle: "Konsekvenser om reglerna inte följs",
  consequences: [
    "Samtal med ledare.",
    "Kontakt med vårdnadshavare vid allvarligare eller upprepade överträdelser.",
    "Begränsad fritid eller särskilda regler för den som inte följer överenskommelserna.",
  ],
  mottoLabel: "Lagets motto för resan",
  motto: "Vi tar hand om oss själva, varandra och vårt lag. Vi gör vårt bästa på planen och utanför planen, varje dag.",
};

export const STAY = [
  "Alannia Salou, Avinguda de Pompeu Fabra 37. Tre nätter. Resebladet namngav inte hotellet.",
  "Helpension: middag 16 oktober 19:00–21:30, sedan frukost 07:00, lunch 15:00 och middag 19:30 lördag och söndag, och frukost 09:00 plus lunch 13:00 måndag 19 oktober. Vatten ingår till lunch och middag.",
  "Lakan ingår. Ta med en extra handduk till poolen eller stranden.",
  "Det slutliga resedokumentet skickas ungefär en vecka före avresa.",
  "Matcherna spelas på Futbol Salou, vid vägen Salou–Cambrils. Buss 6 går lördag 08:35 och söndag 07:45 till planerna, och tillbaka 14:20 respektive 14:45.",
  "Pass eller id-kort kontrolleras. Ett foto av dokumentet i telefonen räcker. Tröjnummer ska stämma med laglistan.",
  "Det europeiska sjukförsäkringskortet täcker inte idrottsskador i Spanien. Klubbens egen försäkring är skyddet som gäller.",
];

export const CHAINS = [
  {
    depth: "Ett direkt möte",
    text: "Kilcullen och Castle Villa har mötts två gånger i KDUL U16 Girls. Kilcullen förlorade 0–2 hemma den 30 april och vann sedan 5–3 den 21 juni. En vinst var, målskillnad 5–5. Lördag 13:10 är det tredje mötet. Inget annat par i den här gruppen har en publicerad match.",
  },
  {
    depth: "Ett steg från Järna",
    text: "Järnas publicerade motståndare i den här åldern är Stabæk JF, Täby FK, Phénix de Québec, Merville United, Lough Derg FC, TSV Weyhe-Lahausen, Frösö IF, Sjöstaden DFF och Stureby FF. Täby, Stureby och Sjöstaden är Stockholmsklubbar. Stabæk är norskt.",
  },
  {
    depth: "Ett steg från Spånga",
    text: "F11-U Guls publicerade motståndare 2026 i F2011-2A är bland andra Bollstanäs SK U, Kungsängens IF och MHFF 2. Resten av serien är Enebybergs IF, Rotebro IS och Sollentuna FK F15 U. Bollstanäs SK U är 2011-laget. Det är inte Bollstanäs 2A eller 3A från 2010-serien.",
  },
  {
    depth: "Två och tre steg",
    text: "Ingen öppnad sida ställer Bollstanäs SK U, MHFF, Kungsängen, Enebyberg, Rotebro eller Sollentuna F15 U mot Täby, Stureby, Sjöstaden eller Järna. Den svenska kedjan stannar efter ett steg. Det finns ingen bro på tredje nivån, och Bollstanäs-laget i Spångas serie är ett år yngre än Bollstanäs-lagen i 2010-serien.",
  },
  {
    depth: "Irland, ett steg",
    text: "De andra tre klubbarna i den serien är Prosperous United, Maynooth United och Derry Rovers. Kilcullen tog fyra seriepoäng mot Prosperous (2–2, 4–0) och slog Maynooth 5–0, 6–3 och 7–0 i cupfinalen. Castle Villa kryssade mot Prosperous 1–1 och 3–3, förlorade sedan 0–2 i cupen och 3–4 i shield, och slog Maynooth 3–0 och 4–2. St Patricks spelar inte i serien. Prosperous, Maynooth och Derry har ingen publicerad match mot Järna, Spånga eller Gavà, så kedjan stannar efter ett steg.",
  },
  {
    depth: "Spanien och över gränserna",
    text: "Gavàs cadetgrupp innehåller Santboià, Viladecans B, Ciudad Cooperativa, Atlètic Sant Just, Espluguenc och Casablanca. Ingen av de klubbarna har en publicerad match mot Järna, Spånga, Kilcullen eller Castle Villa. Kedjan stannar inne i Katalonien. Ingen gemensam motståndare hittades mellan Sverige, Irland och Katalonien.",
  },
];

export const LEAGUES = [
  {
    country: "Sverige",
    body: "Flickor i ungdomsålder spelar distriktsserier under Svenska Fotbollförbundet. Stockholms serie för födda 2010 är uppdelad i numrerade grupper. 2A ligger över 3A. Järna spelar hösten 2026 i två serier. Den 6 oktober var de 4:a av 9 i Södermanland, Flickor grön 4, med 3 vinster, 2 oavgjorda, 2 förluster, 11 poäng och 16–10, och 4:a av 9 i Värmland, regional grupp B, med 3 vinster, 3 förluster, 9 poäng och 10–21. Serierna var inte färdigspelade. Svensk 11 mot 11 i den här åldern är en veckoserie. Den volymen är skälet till att ett Stockholm 2A-lag inte rankas som okänt, även när de kända resultaten är svaga.",
  },
  {
    country: "Irland",
    body: "Kilcullen och Castle Villa spelar båda KDUL U16 Girls, en Kildare-serie med fem lag som avgjordes 2026. Kilcullen vann den på 19 poäng och vann cupen med 7–0. Castle Villa blev tvåa på 17. De två sista, Maynooth och Derry Rovers, släppte in 31 och 27. Det är en riktig serie, och den är liten. Den räknas inte som samma nivå som en Stockholmsserie förrän en gemensam motståndare säger det. St Patricks spelar inte i den här serien, och inte i Kildares övriga flickserier, Midlands, Wicklow eller Carlow. Carlows egen U16-flickserie hade den 7 oktober startat utan dem.",
  },
  {
    country: "Spanien",
    body: "Det katalanska förbundet sätter åldersbanden. 2026–27 är flickor födda 2010 juvenil, i ett treårsband med 2008 och 2009. Cadet femenino är 2011 och 2012. Escola F. Gavà har inget juvenil femenino-lag. Salou-truppen är licensierad i Segona Divisió Femení Cadet F11, Grup 8, och hade spelat 0 matcher den 4 oktober 2026. Det äldre flickjuvenil-laget från 2025–26 är en annan trupp.",
  },
];

export const METHOD = [
  "Varje lag har fyra poäng från 0 till 100. Resultat väger 45 %, serien de faktiskt spelar i väger 25 %, vägen (akademikoppling, landskamper, truppkontinuitet) väger 20 %, och vanan vid den här cupen väger 10 %.",
  "Efter cupen är resultatpoängen ett medel av två tal. Det ena är resultatpoängen från före cupen. Det andra är cupformen: 70 gånger andelen av de poäng som går att ta, plus 3 per mål i målskillnad, plus 15. Talet kapas till 0–100. Placeringsmatchen räknas som en match till, med tre poäng för vinst. Grupptabellen är de fem gruppmatcherna. Serie, väg och vana vid cupen är oförändrade.",
  "Ett lag utan publicerade matcher får 50 i resultat. Det är neutralt. Det är inte en nolla, och det är inte en belöning. Avsaknad av förlust räknas inte som en hållen nolla.",
  "Gemensamma motståndare söktes tre klubbar djupt: laget, deras motståndare och motståndarnas motståndare. Där kedjan tog slut använder rankingen seriepriorn i stället för en påhittad länk.",
  "Härledda resultat är räkning från officiella totaler. De är märkta och de väger mindre än en tryckt rad. De användes inte för att lägga på extra utöver den officiella vinst-oavgjort-förlust-raden.",
  "Siffran väger hela cupen, gruppspel och placeringsmatch, mot researchen från före cupen. Den är inte en kopia av grupptabellen och inte slutplaceringen. Cupen är färdigspelad.",
];

export const ASSUMPTIONS = [
  "Spångas anmälan är F11-U Gul, bekräftad på klubbsidan som F2011U 1-truppen i F2011-2A. De är födda 2011, alltså ett år yngre än Flickor 2010. Modellen använder den säsongen och behandlar dem inte som ett F10-lag. Personerna på Spångas sida är turneringstruppen, samma regel som för de andra fem lagen.",
  "Kilcullen på KDUL U16 Girls-sidan, lag 160768, är Cambrils-laget. Cupfinalen 23 augusti 2026 mot Maynooth är finalen som Diary namngav, och resultatet är 7–0. Castle Villa i den serien spelar på Mullarney Park, alltså Castledermot-klubben.",
  "St Patricks FC har en publicerad trupp på 17. Bästa klubbträffen är St Patrick’s Boys AFC, Graiguecullen, Carlow, eftersom Ciara C. står på truppen och spelar för St Pats i Carlow. Truppsidan själv trycker inte orten. Den 16 oktober 2026 var cuptruppen oförändrad. I cupen blev det 1–1 mot Spånga, 0–6 mot Järna och 1–2 mot Gavà. De står inte i de öppna flickserierna i Carlow, Kildare U16 eller Midlands U16. St Patrick’s AFC i Carlows pojkserier är inte den här truppen.",
  "Par utan Spånga lästes från den officiella gruppsidan, som stoppar en vanlig nedladdning. Alla fem grupprader för Spånga stämmer med klubbens reseblad på datum, tid, plan och motståndare. De andra tio matcherna är resten av samma rutnät.",
  "Hotellnamn och rumsfördelning beror på dokument som inte fanns i pdf:en. Söndagens slutspel är satt från grupplistan: final Järna mot Spånga på plan 4, bronsmatch Kilcullen mot Gavà på plan 8, och match om plats 5 Castle Villa mot St Patricks på plan 1.",
];

export function teamById(id) {
  return TEAMS.find((team) => team.id === id);
}

export function rankedTeams() {
  return [...TEAMS].sort((a, b) => a.rank - b.rank);
}

export function groupRow(id) {
  return GROUP.rows.find((row) => row.team === id);
}

function channelLinear(hex, index) {
  const value = parseInt(hex.slice(1), 16);
  const channel = [(value >> 16) & 255, (value >> 8) & 255, value & 255][index] / 255;
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  return 0.2126 * channelLinear(hex, 0) + 0.7152 * channelLinear(hex, 1) + 0.0722 * channelLinear(hex, 2);
}

function mixWhite(hex, amount) {
  const value = parseInt(hex.slice(1), 16);
  const mixed = [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((channel) =>
    Math.round(channel + (255 - channel) * amount)
      .toString(16)
      .padStart(2, "0"),
  );
  return `#${mixed.join("")}`;
}

// Text uses the darker kit colour. Marks use the other colour when it is still visible on white.
export function teamTheme(colors) {
  const [primary, secondary] = colors;
  const dark = (hex) => luminance(hex) <= 0.18;
  const ink = dark(primary) ? primary : dark(secondary) ? secondary : "#111111";
  const accent = luminance(secondary) < 0.75 && secondary.toLowerCase() !== ink.toLowerCase() ? secondary : primary;
  return { ink, accent, soft: mixWhite(ink, 0.9) };
}
