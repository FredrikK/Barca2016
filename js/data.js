/**
 * Public-data dossier for Football Cup Barcelona, Girls 2010, Group A.
 * Scores and names below are copied from pages that were opened.
 * Implied scores are marked implied: true and are not printed line scores.
 * Nothing here is a confirmed 2026 starting lineup.
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

export const META = {
  title: "Group A",
  competition: "Football Cup Barcelona",
  age: "Girls 2010",
  code: "G2010",
  dates: "17–18 October 2026",
  venue: "Futbol Salou",
  address: "Vial Salou Cambrils, 43840 Salou",
  kickoff: "2026-10-17T09:50:00+02:00",
  format:
    "11v11, 2×20 minutes, size 5 ball, offside, three referees. Squad 13–25. Up to four players may be one year older (born 2009). Each team plays five group games plus a placement match.",
  officialGroups:
    "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/groups",
  officialPlayoffs:
    "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/playoffs",
  officialRules:
    "https://www.footballcupbarcelona.com/en/tournament/17-18-october-2026",
  researched: "4 October 2026",
};

const jarnaComponents = { results: 74, league: 52, pathway: 70, tournament: 78 };
const gavaComponents = { results: 50, league: 62, pathway: 78, tournament: 72 };
const kilcullenComponents = { results: 70, league: 58, pathway: 48, tournament: 42 };
const spangaComponents = { results: 70, league: 62, pathway: 66, tournament: 48 };
const villaComponents = { results: 62, league: 56, pathway: 46, tournament: 40 };
const patsComponents = { results: 50, league: 44, pathway: 40, tournament: 42 };

export const TEAMS = [
  {
    id: "jarna",
    name: "Järna SK",
    short: "Järna",
    country: "Sweden",
    flag: "se",
    place: "Järna, Södermanland",
    colors: ["#1f6b45", "#f4efe6"],
    rank: 1,
    components: jarnaComponents,
    index: indexOf(jarnaComponents),
    range: [62, 74],
    confidence: 72,
    confidenceLabel: "Medium-high",
    verified:
      "The club on the group list is Järna SK from Järna. The same girls’ group played this tournament in October 2024 (entered as G10) and Gothia Cup Girls 15 in July 2025.",
    identity:
      "Järna SK’s oldest girls’ team. In February 2025 Länstidningen Södertälje described the squad as mostly born 2010–2011, with two players born 2009, one born 2012 and one born 2013. That mix fits the tournament rule that allows four players a year older.",
    league:
      "No 2025 or 2026 Södermanland league table for this team was found. Södermanlands FF invited clubs to a regional F15–16 series (born 2011 and 2010) for 2026. That invitation is not proof Järna entered it. Their level is taken from matches, not from a domestic table.",
    style: {
      status: "Inferred from results",
      formation: "Not published",
      summary:
        "No formation or match report describes how they line up. The scorelines say they are dangerous when the game opens and lose clearly to well-organised Nordic teams.",
      points: [
        "At Gothia 2025 they scored 15 goals in three group games, including 7–0 and 5–1.",
        "Against Frösö IF the goals were shared: Sofia Vall (3' and 35'), Josefine Malmia (12'), Valentina Saavedra (14') and Freja Goddard (20'). Vall is 10, Malmia is 12 and Goddard is 8 on the 2026 roster. Saavedra is not on this list.",
        "They still lost the matches that mattered against structure: Stabæk 4–0, Stureby 0–4, Sjöstaden 3–5, Täby 0–1, Phénix de Québec 0–1.",
        "Sofia Vall scored all four of Järna’s goals at this tournament in 2024. She is number 10 on the 2026 roster. No positions are printed.",
      ],
    },
    approach:
      "Treat the first 10 minutes as the match. Games here are only 40 minutes. Järna’s best public games became blowouts once they scored early. A compact block and no early transition goal is the pattern that has actually beaten them. If the game stretches, they have several finishers.",
    players: [
      { name: "Molly Haglöf", number: "1", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Ebba Boija", number: "3", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Anna Auregård", number: "4", role: "Tournament roster", why: "Named on the Girls 2010 team page. The 2024 coaches included Kjell Magnus Auregård. This page does not say they are related." },
      { name: "Patricia Okoro-Omaka", number: "5", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Alexis Abrahamsson", number: "6", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Fanny Fredriksson", number: "7", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Freja Goddard", number: "8", role: "Tournament roster", why: "Named on the Girls 2010 team page. She scored the 4–1 against Frösö IF at Gothia 2025 (20'). She was not on the 2024 roster." },
      { name: "Ritta Chamoun", number: "9", role: "Tournament roster", why: "Named on the Girls 2010 team page. Shirt 9 is not a published position." },
      { name: "Sofia Vall", number: "10", role: "Tournament roster", why: "Named on the Girls 2010 team page. The 2024 roster marked her with four goals, and Järna scored four in that tournament. She scored at 3' and 35' against Frösö IF at Gothia 2025." },
      { name: "Josefine Malmia", number: "12", role: "Tournament roster", why: "Named on the Girls 2010 team page. She scored the 2–1 against Frösö IF at Gothia 2025 (12')." },
      { name: "Lea Vang", number: "14", role: "Tournament roster", why: "Named on the Girls 2010 team page. The coach is Are Vang. The page does not say they are related." },
      { name: "Pavlina Gospodinova", number: "15", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Rebecka Kesenci", number: "19", role: "Tournament roster", why: "Named on the Girls 2010 team page. The February 2025 newspaper caption names her. She was not on the 2024 roster." },
      { name: "Emma Gustavsson", number: "21", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Julia Kucheriavyi", number: "22", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Cecilia Jonsson", number: "23", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Imra Hansson", number: "27", role: "Tournament roster", why: "Named on the Girls 2010 team page. Länstidningen quoted her about the fundraising for the 2024 trip. Her number on that roster was 26." },
    ],
    playersNote: "Numbers and names are copied from the 2026 tournament team page. No positions are printed. Numbers 2, 11, 13, 16, 17, 18 and 20 are unused.",
    staff: "Coach Are Vang. Assistant coach Lars Fredrik Nicklas Larsson. Both titles are on the tournament page.",
    results: [
      { date: "19 Oct 2024", comp: "This cup, group", score: "Stabæk JF 4–0 Järna SK", note: "Printed on the team page." },
      { date: "19 Oct 2024", comp: "This cup, group", score: "Järna SK 0–1 Täby FK", note: "Hedda Hamrin. Täby won the group with 12 points." },
      { date: "19 Oct 2024", comp: "This cup, group", score: "Järna SK 0–1 Phénix de Québec", note: "Annabelle Roussy." },
      { date: "19 Oct 2024", comp: "This cup, group", score: "Merville United 2–2 Järna SK", note: "Implied. The group totals are 2–8 with one draw, and the three printed losses add up to 0–6. The fourth game has to be 2–2. The line itself was not printed.", implied: true },
      { date: "20 Oct 2024", comp: "This cup, 9th–13th", score: "Järna SK beat Lough Derg FC 2–1", note: "Implied. Tournament totals are 4–9 from five games. After a 2–8 group, the placement game adds one win, two goals for and one against.", implied: true },
      { date: "14 Jul 2025", comp: "Gothia Girls 15", score: "TSV Weyhe-Lahausen 0–7 Järna SK", note: "Group 11." },
      { date: "15 Jul 2025", comp: "Gothia Girls 15", score: "Järna SK 5–1 Frösö IF", note: "Vall 3', 35'; Malmia 12'; Saavedra 14'; Goddard 20'." },
      { date: "16 Jul 2025", comp: "Gothia Girls 15", score: "Järna SK 3–5 Sjöstaden DFF", note: "Sjöstaden won the group." },
      { date: "17 Jul 2025", comp: "Gothia, 1/64", score: "Järna SK 0–4 Stureby FF", note: "Play off A. Stureby is a Stockholm club." },
    ],
    recordLine: "Barcelona 2024: 10th. 1 win, 1 draw, 3 losses, 4–9. Gothia 2025 group: 2nd, 2 wins, 1 loss, 15–6, then out 0–4.",
    sources: [
      { label: "Tournament roster", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/12782/jarna-sk" },
      { label: "Barcelona 2024 team page", url: "https://www.footballcupbarcelona.com/en/results/2024-OCT-1/G10/team/11058" },
      { label: "Järna 0–1 Täby", url: "https://www.footballcupbarcelona.com/en/results/2024-OCT-1/G10/match/9799" },
      { label: "Järna 0–1 Phénix de Québec", url: "https://www.footballcupbarcelona.com/en/results/2024-OCT-1/G10/match/9797" },
      { label: "Gothia 2025 matches", url: "https://results.cupmanager.net/661795,2025,sv,wrap=false/team/66312311/matches" },
      { label: "Frösö IF goal log", url: "https://results.gothiacup.se/2025/matches/66846830" },
      { label: "Länstidningen, 28 Feb 2025", url: "https://www.lt.se/sport/salde-klader-och-kakor-for-att-fa-spela-cup-i-barcelona/" },
    ],
  },
  {
    id: "gava",
    name: "EF Gavà Villarreal CF",
    short: "Gavà",
    country: "Catalonia",
    flag: "ct",
    place: "Gavà, Baix Llobregat, Catalonia",
    colors: ["#8c1d40", "#f2c14e"],
    rank: 3,
    components: gavaComponents,
    index: indexOf(gavaComponents),
    range: [54, 70],
    confidence: 54,
    confidenceLabel: "Medium on the division, low on the score",
    verified:
      "The entry is Escola de Futbol Gavà, the Villarreal CF partner school in Gavà. It is not Villarreal CF’s own girls’ cadete team in Castellón, and it is not the senior club CF Gavà.",
    identity:
      "Escola de Futbol Gavà was founded in 2000. On 30 December 2021 Villarreal announced a collaboration agreement. Gavà’s sporting director Ramón López is quoted in that piece. A Villarreal campus article in February 2026 still calls EF Gavà an associated club. The tournament name EF Gava Villarreal CF is the name Gavà uses for these entries.",
    league:
      "The 2026–27 licence table puts girls born in 2010 in juvenil femenino, with 2008 and 2009. This club has no juvenil femenino team. The Salou squad is licensed in Segona Divisió Femení Cadet F11, Grup 8, a 15-team group. On 4 October 2026 that table showed Escola F. Gavà A with 0 games. Santboià had played and won 3–2, Viladecans B and Ciudad Cooperativa had drawn 1–1, and Atlètic Sant Just had lost 2–3. Gavà’s place at 14th is an empty row, not a result. Jornada 1 is against Espluguenc and jornada 2 is away at Casablanca. No score for Gavà was on the page.",
    style: {
      status: "Club method, not a scout",
      formation: "Not published",
      summary:
        "No match report describes this squad’s shape. What is published is the school’s link to Villarreal’s academy: technical work, understanding of the game, and decision-making, described by Villarreal as aligned with the groguet identity.",
      points: [
        "Expect them to try to play, because that is the published point of the partnership. That is a prior, not a video scout.",
        "Do not copy a Villarreal first-team shape onto this team. The convenio does not publish a formation for the 2010 girls.",
        "They are the home side: no flight, familiar climate, and the fields are in their region.",
        "The 2026 tournament page lists 20 players and two coaches. No positions are printed. The federation cadet list that loaded has 17 names and overlaps this squad. An older Gavà girls’ juvenil team played Segona Divisió in 2025–26. Those players and their coaches are not this list.",
      ],
    },
    approach:
      "Gavà are third because the division is now known and they still have no score. They are a Villarreal partner school in a 15-team Segona Divisió cadet group, not a juvenil side with a table. For Spånga this is the last group game, Sunday 11:00. The coaches on the tournament page are Ania Torres Torres and David Pelay Cortes. The federation page did not print a coach. No shape is printed. If they are still playing for a place they will not sit off. The practical problem is their rest defence if they do keep the ball: wait for the pass that sticks, and don’t spend the first half chasing wide centre-backs.",
    players: [
      { name: "Lluna Puente Carnice", number: "1", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Candela Ruiz Rosa", number: "2", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Valentina Romero Perona", number: "3", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Anna Chafer Tercero", number: "4", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Noa Verdu Leal", number: "5", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Carlota Cañada Corrales", number: "6", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Idaira Parra Molina", number: "7", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Olivia Delgado Tarrega", number: "8", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Thais Ibañez Vargas", number: "9", role: "Tournament roster", why: "Named on the Girls 2010 team page. Shirt 9 is not a published position." },
      { name: "Valentina Bousetta Fernandez", number: "10", role: "Tournament roster", why: "Named on the Girls 2010 team page. Shirt 10 is not a published position." },
      { name: "Julietta Puigdomenech Navia", number: "11", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Ariadna Cabello Arceredillo", number: "14", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Alba Romero Ternero", number: "15", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Laia Premuda Medina", number: "16", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Noa Mostazo Salvatierra", number: "17", role: "Tournament roster", why: "Named on the Girls 2010 team page. The federation cadet list spells the surname Mostazo." },
      { name: "Valentina Peacock", number: "18", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Marina Garcia Caseiro", number: "19", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Mila Lorch Restiau", number: "20", role: "Tournament roster", why: "Named on the Girls 2010 team page. The federation list that loaded shows a player named Mila and does not print the rest of the name." },
      { name: "Adriana Vila Mengual", number: "21", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Katalella Ventura Lara", number: "22", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
    ],
    playersNote: "Numbers and names are copied from the tournament team page. No positions are printed. Numbers 12 and 13 are unused.",
    otherNames:
      "The federation cadet list that loaded has 17 names. It includes Carla Helena Millán Menis, who is not on the Salou roster. Four Salou names were not on that list: Valentina Romero Perona, Noa Verdu Leal, Idaira Parra Molina and Olivia Delgado Tarrega.",
    staff: "Coach Ania Torres Torres. Coach David Pelay Cortes. Both titles are on the tournament page. The federation cadet page did not print a coach.",
    results: [],
    recordLine: "Licensed in Segona Divisió Femení Cadet F11, Grup 8. On 4 October 2026 the table showed 0 games. The results score stays neutral.",
    contextResults: [
      { date: "2025–26", comp: "Older age group only", score: "Escola F. Gavà A in Segona Divisió Femení Juvenil, Grup 8", note: "Born 2007–2009 under that season’s licence table. Not this tournament team. Sample: 3–1 and 2–0 vs Begues, 2–1 at Sant Just, 1–3 vs Viladecans, and a 5–2 acta at Fontsanta-Fatjó." },
    ],
    sources: [
      { label: "Tournament roster", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/13380/ef-gava-villarreal-cf" },
      { label: "Cadet girls licence list", url: "https://www.fcf.cat/clubs/1255/categories/58156838" },
      { label: "Segona Divisió Cadet Femení, Grup 8", url: "https://www.fcf.cat/ca/competicio?temporadaId=22&disciplinaId=19308237&competicioId=59922684&grupId=59924024" },
      { label: "Villarreal convenio, 30 Dec 2021", url: "https://villarrealcf.es/el-villarreal-expande-sus-horizontes-en-futbol-formativo/" },
      { label: "Still a partner club, Feb 2026", url: "https://campusytorneos.villarrealcf.es/es/yellow-cup-easter/multimedia/noticias/item/2567-talento-desde-el-baix-llobregat" },
      { label: "FCF ages 2026–27", url: "https://www.fcf.cat/docs/edat2026-2027.pdf" },
      { label: "School site", url: "https://efgava.com/" },
    ],
  },
  {
    id: "kilcullen",
    name: "Kilcullen AFC",
    short: "Kilcullen",
    country: "Ireland",
    flag: "ie",
    place: "Kilcullen, County Kildare",
    colors: ["#c9842a", "#1a2332"],
    rank: 4,
    components: kilcullenComponents,
    index: indexOf(kilcullenComponents),
    range: [52, 68],
    confidence: 62,
    confidenceLabel: "Medium",
    verified:
      "This is Kilcullen AFC’s U16 girls, the side in the Kilcullen Diary going to Cambrils. The KDUL page for team 160768 in competition 13331 is titled U16 Girls, and the cup final on that site is Kilcullen against Maynooth on 23 August 2026, the Sunday the Diary named.",
    identity:
      "Kildare & District Underage League. Home games are at Kilcullen Community Centre. They finished the U16 Girls division above Castle Villa AFC, whose home ground in the same fixtures is Mullarney Park in Castledermot. That is the Kildare club, not Castle Villa of Moynalty.",
    league:
      "KDUL U16 Girls, 2026. Five teams, each played eight games. Kilcullen are first on 19 points: 6 wins, 1 draw, 1 loss, 31–11. They also won the U16 Girls Cup, 7–0 against Maynooth United on 23 August at Corrigan Park, after beating Prosperous United 3–0 on 12 July.",
    style: {
      status: "Inferred from results",
      formation: "Not published",
      summary:
        "No shape or lineup is published. The scores say they score in bursts and can also be opened up. Four of the eight league games were won by three goals or more. The game they lost was 0–2, and the game they won against the same team was 5–3.",
      points: [
        "League goals against the bottom two were 5–0 and 6–3 versus Maynooth, and 2–0 and 7–1 versus Derry Rovers. The cup final was another 7–0 against Maynooth.",
        "Against the other two contenders the record is a draw and a win versus Prosperous (2–2, 4–0, plus 3–0 in the cup) and a loss and a win versus Castle Villa (0–2, 5–3).",
        "First tournament abroad. The Diary calls them the club’s first juvenile all-girls team to represent Kilcullen outside Ireland.",
      ],
    },
    approach:
      "Spånga meet them Sunday at 09:00, first game of the day, after three Saturday matches. They are league winners and cup winners in a five-team Kildare division, not an unknown. The only team that shut them out in that league was Castle Villa, 2–0 on 30 April, with Abbie Landon scoring both. Kilcullen won the return 5–3. If Saturday’s 13:10 game is another open score, Sunday morning will be too.",
    players: [
      { name: "Ella-Louise Donnelly", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page. The 19 April card lists Ella-louise donnelly twice in the 5–0 against Maynooth. A December 2025 award named Ella Louise Donnelly as Players’ Player." },
      { name: "Isabel Connolly", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page. A coach is listed as Rob Comnolly. The page does not say they are related." },
      { name: "Lauren Dunne", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Zoe Corrigan", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Katie Marshall", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page. The 19 April goal tooltip lists Katie Marshall." },
      { name: "Maya Tyrrell", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page. A coach is John Tyrrell. The page does not say they are related." },
      { name: "Ciara Kirwin", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Emily Deane", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Amelia Reddy", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page. The 19 April tooltip spells a scorer Ameila Reddy. The December 2025 awards named Amelia Reddy as Player of the Year." },
      { name: "Sophie Grant", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Emily Kate Monks", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Katie Duignan", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Gracie-Mae Brady", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Izzy Middleton", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page. The 8 May card, Derry Rovers 0–2 Kilcullen, names Izzy Mae Middleton." },
      { name: "Ella O'Byrne", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page. The 19 April tooltip spells a scorer Eila O'Byrne." },
      { name: "Amelia Matthews", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Caoimhe Wilson", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Sophia Dempsey", number: "0", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
    ],
    playersNote: "Numbers and names are copied from the tournament team page. The page prints 0 as the shirt number for every player, so no shirt number is confirmed. No positions are printed. The December 2025 under-14 awards are a younger group and are not on this list.",
    staff: "Coach Rob Comnolly. Coach John Tyrrell. Both titles are on the tournament page. The page spells the first coach Comnolly.",
    results: [
      { date: "19 Apr 2026", comp: "KDUL U16 Girls", score: "Kilcullen 5–0 Maynooth United", note: "Kilcullen Community Centre. Scorers on the card: Katie Marshall, Ella-Louise Donnelly 2, Amelia Reddy, Eila O'Byrne." },
      { date: "30 Apr 2026", comp: "KDUL U16 Girls", score: "Kilcullen 0–2 Castle Villa", note: "Kilcullen Community Centre. Abbie Landon scored both. Kilcullen’s only league defeat." },
      { date: "8 May 2026", comp: "KDUL U16 Girls", score: "Derry Rovers 0–2 Kilcullen", note: "Oaklands, Edenderry. Izzy Mae Middleton is the name on the card." },
      { date: "17 May 2026", comp: "KDUL U16 Girls", score: "Prosperous United 2–2 Kilcullen", note: "St Farnan's. No scorers on the card." },
      { date: "24 May 2026", comp: "KDUL U16 Girls", score: "Kilcullen 7–1 Derry Rovers", note: "Kilcullen Community Centre. Scorers not itemised." },
      { date: "11 Jun 2026", comp: "KDUL U16 Girls", score: "Maynooth United 3–6 Kilcullen", note: "Maynooth Education Campus. Scorers not itemised." },
      { date: "21 Jun 2026", comp: "KDUL U16 Girls", score: "Castle Villa 3–5 Kilcullen", note: "The fixture list gives the venue as Kilcullen Community Centre. Scorers not itemised." },
      { date: "5 Jul 2026", comp: "KDUL U16 Girls", score: "Kilcullen 4–0 Prosperous United", note: "Kilcullen Community Centre. Scorers not itemised." },
      { date: "12 Jul 2026", comp: "KDUL U16 Girls Cup", score: "Kilcullen 3–0 Prosperous United", note: "Kilcullen Community Centre. The win before the final." },
      { date: "23 Aug 2026", comp: "KDUL U16 Girls Cup final", score: "Kilcullen 7–0 Maynooth United", note: "Corrigan Park, 10:00. This is the final the Diary of 16 August said was the following Sunday." },
    ],
    recordLine: "U16 Girls league, 1st of 5: 8 games, 6 wins, 1 draw, 1 loss, 31–11, 19 points. Cup winners, 7–0 in the final.",
    table: {
      title: "KDUL U16 Girls, 2026, season complete",
      rows: [
        ["1", "Kilcullen AFC", "8", "19", "+20"],
        ["2", "Castle Villa AFC", "8", "17", "+9"],
        ["3", "Prosperous United", "8", "15", "+14"],
        ["4", "Maynooth United FC", "8", "4", "−21"],
        ["5", "Derry Rovers", "8", "1", "−22"],
      ],
    },
    sources: [
      { label: "Tournament roster", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/12981/kilcullen-afc" },
      { label: "U16 Girls fixtures, team 160768", url: "https://soccerleagues.comortais.com/fixtures.aspx?teamID=160768&compId=13331&oid=1012" },
      { label: "U16 Girls table", url: "https://soccerleagues.comortais.com/competition.aspx?id=13331&oid=1012" },
      { label: "U16 Girls Cup, including the 7–0", url: "https://soccerleagues.comortais.com/fixtures.aspx?compId=13428&oid=1012" },
      { label: "Kilcullen Diary, 16 Aug 2026", url: "https://kilcullenbridge.blogspot.com/2026/08/strong-support-for-afc-girls.html" },
      { label: "December 2025 awards", url: "https://kilcullenbridge.blogspot.com/2025/12/presentations-to-kilcullen-afc.html" },
    ],
  },
  {
    id: "spanga",
    name: "Spånga IS F11-U Gul",
    short: "Spånga",
    country: "Sweden",
    flag: "se",
    place: "Spånga, Stockholm",
    colors: ["#8d6b12", "#f4efe6"],
    rank: 2,
    yours: true,
    components: spangaComponents,
    index: indexOf(spangaComponents),
    range: [54, 72],
    confidence: 64,
    confidenceLabel: "Medium-high on the season, medium on playing up",
    verified:
      "The traveling team is Spånga IS F11-U Gul. The club’s own page for that squad says they play Stockholm F2011-2A in 2026, and the fixtures on that page are in the name Spånga IS FK F2011U 1. The sponsor page calls the same squad Spånga IS FK F2011-U Gul. Kungsängen listed them as Spånga U11 Gul in December 2025. This is not the F10U squad.",
    identity:
      "Girls born in 2011. The club describes 17 players who train three times a week, plus matches, and at least three cups. Girls 2010 at this tournament is for players born on or after 1 January 2010, so a 2011 squad is eligible and a year younger than the oldest players in the age class. There is also an F2011U 2 side in F2011-3A. That is a different team, and its results are not used here.",
    league:
      "Stockholm F2011-2A, the second tier of the 2011 birth-year series. On 4 October 2026 the published table had Spånga 3rd: 16 matches, 9 wins, 1 draw, 6 losses, 56–37, 28 points. Bollstanäs SK U led on 34 points, Enebybergs IF 1 were second on 32.",
    style: {
      status: "Inferred from the 2026 series",
      formation: "Not published",
      summary:
        "No lineup or shape is published for F11-U Gul. The season says they score a lot and also give chances away. 56 goals in 16 games is 3.5 per match. They have conceded 37.",
      points: [
        "They beat MHFF 8–4 at home and 5–3 away in May, and won 7–2 at Kungsängen on 1 May.",
        "Bollstanäs, the team above them, has beaten them in the three meetings found: 7–2 on 11 April, 2–1 on 29 August, and 3–2 on 5 September.",
        "After 10 games they led the series, 7 wins, 1 draw, 2 losses, 46–22. The later table has them third after a harder autumn.",
        "The tournament page lists 17 players and two coaches. No positions are printed. Lineups on Bollstanäs and Kungsängen match pages are those clubs’ players. They are not this squad.",
      ],
    },
    approach:
      "This is your group, and you are a year young for it. The tournament page names the squad and the coaches, Thomas Gustafsson and Malin Drougge. It does not print a shape. What the league record knows is that games against your own age open up: you have won 8–4, 5–3 and 7–2, and you have also lost 2–7 to the league leaders. Järna and Gavà are the matches where that age gap is the question. Saturday is still three games in about four hours, 09:50, 11:30 and 13:10.",
    players: [
      { name: "Alma Karlsson Rydberg", number: "1", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Ellen Widén", number: "2", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Blanca Montes Karlsson", number: "3", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Clara Eld", number: "4", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Sara Gustafsson Arrhén", number: "5", role: "Tournament roster", why: "Named on the Girls 2010 team page. A coach is Thomas Gustafsson. The page does not say they are related." },
      { name: "Elvira Mattes", number: "6", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Isabelle Ahlmalm", number: "7", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Felicia Orostica", number: "8", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Mira Drougge", number: "10", role: "Tournament roster", why: "Named on the Girls 2010 team page. A coach is Malin Drougge. The page does not say they are related." },
      { name: "Edessa Baykal", number: "11", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Louise Bruhn Axäll", number: "12", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Kristina Gustafsson", number: "13", role: "Tournament roster", why: "Named on the Girls 2010 team page. A coach is Thomas Gustafsson. The page does not say they are related." },
      { name: "Ellie Åsbrink", number: "14", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Smilla Haglund Lundstedt", number: "17", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Lova Hedberg Andersson", number: "18", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Felicia Jonsson", number: "20", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Olivia Norberg", number: "22", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
    ],
    playersNote: "Numbers and names are copied from the tournament team page. No positions are printed. Numbers 9, 15, 16, 19 and 21 are unused.",
    staff: "Coach Thomas Gustafsson. Coach Malin Drougge. Both titles are on the tournament page.",
    results: [
      { date: "11 Apr 2026", comp: "Stockholm F2011-2A", score: "Bollstanäs SK 7–2 Spånga IS FK F2011U 1", note: "Bollstanäs IP 1. The lineup on that page is Bollstanäs." },
      { date: "1 May 2026", comp: "Stockholm F2011-2A", score: "Kungsängens IF 2–7 Spånga IS FK F2011U 1", note: "Kungsängens IP 2." },
      { date: "23 May 2026", comp: "Stockholm F2011-2A", score: "Spånga IS FK F2011U 1 8–4 MHFF 2", note: "From MHFF’s series fixture list." },
      { date: "31 May 2026", comp: "Stockholm F2011-2A", score: "MHFF 2 3–5 Spånga IS FK F2011U 1", note: "From the same MHFF list." },
      { date: "29 Aug 2026", comp: "Stockholm F2011-2A", score: "Spånga IS FK F2011U 1 1–2 Bollstanäs SK", note: "Spånga IP 4." },
      { date: "5 Sep 2026", comp: "Stockholm F2011-2A", score: "Bollstanäs SK 3–2 Spånga IS FK F2011U 1", note: "Bollstanäs IP 1." },
    ],
    recordLine: "F2011-2A, 4 October 2026: 3rd. 16 games, 9 wins, 1 draw, 6 losses, 56–37, 28 points. After 10 games they had led the series.",
    table: {
      title: "Stockholm F2011-2A, 4 Oct 2026",
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
      { label: "Tournament roster", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/13115/sp-nga-is" },
      { label: "F11-U Gul club page", url: "https://www.spangafotboll.se/start/?ID=466714" },
      { label: "F2011-2A table", url: "https://www.laget.se/Malarhojden-HagerstenFF-MHFFF2011/Division/Standings/577175" },
      { label: "MHFF results, including 8–4 and 5–3", url: "https://www.laget.se/Malarhojden-HagerstenFF-MHFFF2011/Division/Games/577175" },
      { label: "Kungsängen 2–7", url: "https://www.kifen.se/kungsangensif-fotboll-u-15flick/match/20027367/spanga-is-fk-f2011u-1" },
      { label: "Bollstanäs 7–2", url: "https://www.svenskalag.se/bollstanassk-fotboll-f15u2011/match/20023066/spanga-is-fk-f2011u-1" },
    ],
  },
  {
    id: "castlevilla",
    name: "Castle Villa FC",
    short: "Castle Villa",
    country: "Ireland",
    flag: "ie",
    place: "Castledermot, County Kildare",
    colors: ["#1d4e89", "#f4efe6"],
    rank: 5,
    components: villaComponents,
    index: indexOf(villaComponents),
    range: [48, 64],
    confidence: 58,
    confidenceLabel: "Medium",
    verified:
      "Castle Villa AFC in KDUL U16 Girls is the Castledermot club. Their home fixtures in that division are at Mullarney Park. Castle Villa of Moynalty play at Villa Park and are a different club. The same five-team division contains Kilcullen.",
    identity:
      "The club was formed in 1969 by Walter Brookes. The usual suffix is AFC. The tournament entry says FC. Kits are described as solid blue with white trim, or blue and white stripes. The club site still lists a U15 girls group born 2010 and 2011. A year on, this U16 girls division is the matching squad.",
    league:
      "KDUL U16 Girls, 2026, second of five on 17 points: 5 wins, 2 draws, 1 loss, 21–12. The only league loss is 3–5 to Kilcullen, after they had beaten Kilcullen 2–0. In the U16 Girls Cup they lost 0–2 to Prosperous. In the shield they lost 4–3 at Prosperous.",
    style: {
      status: "Inferred from results",
      formation: "Not published",
      summary:
        "No shape is published. The league record is tighter than Kilcullen’s: fewer goals, and two draws with Prosperous, 1–1 and 3–3. The one heavy defeat is the 3–5 against Kilcullen.",
      points: [
        "Abbie Landon scored both goals in the 2–0 at Kilcullen on 30 April. That is the only published shutout of the league winners.",
        "At Derry Rovers on 15 May the 3–1 scorers on the card are Lauren O'Sullivan, Kyia Bird and Annabelle Leigh.",
        "They drew the two league games with third-placed Prosperous, then lost to them in the cup and again in the shield.",
      ],
    },
    approach:
      "Spånga play them Saturday at 11:30, the middle of three games, on Field 10. They are the league runners-up, and they have already played Kilcullen twice. The series is one win each. Abbie Landon is number 11 on the tournament roster. She scored both in the 2–0. Kilcullen against them at 13:10 the same day is the third meeting of 2026, and you will have already played Castle Villa by then.",
    players: [
      { name: "Lena Daskiewicz", number: "1", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Amelia Cosgrave", number: "2", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Sofia Frusci", number: "3", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Ciara Kelly", number: "4", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Kate Kelly", number: "5", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Gráinne Horan", number: "6", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Kacie Mooney", number: "7", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Lauren O'Sullivan", number: "8", role: "Tournament roster", why: "Named on the Girls 2010 team page. The 15 May card lists her in the 3–1 at Derry Rovers, with Kyia Bird and Annabelle Leigh." },
      { name: "Lucy Fadian", number: "9", role: "Tournament roster", why: "Named on the Girls 2010 team page. Shirt 9 is not a published position." },
      { name: "Ellen Byrne", number: "10", role: "Tournament roster", why: "Named on the Girls 2010 team page. Shirt 10 is not a published position." },
      { name: "Abbie Landon", number: "11", role: "Tournament roster", why: "Named on the Girls 2010 team page. The 30 April card lists her twice in the 2–0 at Kilcullen. That is Kilcullen’s only league defeat." },
      { name: "Ruby Sheridan", number: "12", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Annabelle Leigh", number: "13", role: "Tournament roster", why: "Named on the Girls 2010 team page. The 15 May card lists her in the 3–1 at Derry Rovers." },
      { name: "Sibéal O'Neill", number: "14", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Lily Foxe", number: "15", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Sarah Cogan", number: "16", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Jessica Clow", number: "17", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Grace Murphy", number: "18", role: "Tournament roster", why: "Named on the Girls 2010 team page. A coach is Holly Evelyn Murphy. The page does not say they are related." },
      { name: "Kyia Bird", number: "19", role: "Tournament roster", why: "Named on the Girls 2010 team page. The 15 May card lists Kyia Bird in the 3–1 at Derry Rovers." },
    ],
    playersNote: "Numbers and names are copied from the tournament team page. No positions are printed.",
    staff: "Coach Holly Evelyn Murphy. Coach Aisling Oreilly. Both titles are on the tournament page.",
    results: [
      { date: "26 Apr 2026", comp: "KDUL U16 Girls", score: "Castle Villa 1–1 Prosperous United", note: "Mullarney Park." },
      { date: "30 Apr 2026", comp: "KDUL U16 Girls", score: "Kilcullen 0–2 Castle Villa", note: "Kilcullen Community Centre. Abbie Landon 2." },
      { date: "10 May 2026", comp: "KDUL U16 Girls", score: "Castle Villa 3–0 Maynooth United", note: "Mullarney Park." },
      { date: "15 May 2026", comp: "KDUL U16 Girls", score: "Derry Rovers 1–3 Castle Villa", note: "Oaklands. Castle Villa scorers: Lauren O'Sullivan, Kyia Bird, Annabelle Leigh. Derry: Yara Elbahlawan." },
      { date: "21 Jun 2026", comp: "KDUL U16 Girls", score: "Castle Villa 3–5 Kilcullen", note: "Venue listed as Kilcullen Community Centre. Their only league defeat." },
      { date: "28 Jun 2026", comp: "KDUL U16 Girls Cup", score: "Castle Villa 0–2 Prosperous United", note: "Mullarney Park." },
      { date: "5 Jul 2026", comp: "KDUL U16 Girls", score: "Maynooth United 2–4 Castle Villa", note: "Maynooth Education Campus." },
      { date: "16 Jul 2026", comp: "KDUL U16 Girls", score: "Prosperous United 3–3 Castle Villa", note: "St Farnan's." },
      { date: "9 Aug 2026", comp: "KDUL U16 Girls Shield", score: "Prosperous United 4–3 Castle Villa", note: "St Farnan's." },
      { date: "30 Aug 2026", comp: "KDUL U16 Girls", score: "Castle Villa 2–0 Derry Rovers", note: "Mullarney Park." },
    ],
    recordLine: "U16 Girls league, 2nd of 5: 8 games, 5 wins, 2 draws, 1 loss, 21–12, 17 points. Cup exit 0–2 to Prosperous. Shield exit 3–4 to Prosperous.",
    table: {
      title: "KDUL U16 Girls, 2026, season complete",
      rows: [
        ["1", "Kilcullen AFC", "8", "19", "+20"],
        ["2", "Castle Villa AFC", "8", "17", "+9"],
        ["3", "Prosperous United", "8", "15", "+14"],
        ["4", "Maynooth United FC", "8", "4", "−21"],
        ["5", "Derry Rovers", "8", "1", "−22"],
      ],
    },
    sources: [
      { label: "Tournament roster", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/12851/castle-villa-fc" },
      { label: "U16 Girls fixtures", url: "https://soccerleagues.comortais.com/fixtures.aspx?compId=13331&oid=1012" },
      { label: "U16 Girls table", url: "https://soccerleagues.comortais.com/competition.aspx?id=13331&oid=1012" },
      { label: "U16 Girls Cup", url: "https://soccerleagues.comortais.com/fixtures.aspx?compId=13428&oid=1012" },
      { label: "U16 Girls Shield", url: "https://soccerleagues.comortais.com/fixtures.aspx?compId=13429&oid=1012" },
      { label: "Club teams page", url: "https://www.castlevilla.ie/teams/" },
    ],
  },
  {
    id: "stpatricks",
    name: "St Patricks FC",
    short: "St Patricks",
    country: "Ireland",
    flag: "ie",
    place: "Graiguecullen, County Carlow — best match",
    colors: ["#1f7a43", "#f4efe6"],
    rank: 6,
    components: patsComponents,
    index: indexOf(patsComponents),
    range: [38, 56],
    confidence: 46,
    confidenceLabel: "Low on the club, high on the squad list",
    verified:
      "The tournament publishes this squad. The page is Ireland, St Patricks FC, Girls 2010, with 17 players and two coaches. The best club match is St Patrick’s Boys AFC of Graiguecullen, Carlow. That is not printed on the roster page itself.",
    identity:
      "Ciara Cahoon is number 7 on the roster. On 28 January 2026 the Carlow Nationalist called her 15, so she is a 2010 birth, the right age for this tournament. Her racing biography says she plays soccer for St Pats in Carlow. St Patrick’s Boys AFC play at The Meadows, Sleaty Street, Graiguecullen. Their boys’ 2011 side played this same tournament in October 2025 under the name St Patrick’s Boys. The girls’ entry drops Boys and says FC. St Patrick’s Athletic of Dublin is a different club, and its women’s youth teams are older than this squad.",
    league:
      "No girls’ league table for this squad was found. They are not in KDUL U16 Girls. They are also not in the Carlow juvenile U16 or U15 girls leagues that are open for 2026/27. Those tables are St Anne’s, Hanover Harps, Killeshin and Ballymurphy at U16, and Killeshin, Parkville, Hanover, Vale Wanderers and New Oak at U15. No score from those pages is used.",
    style: {
      status: "Unknown",
      formation: "Not published",
      summary:
        "The roster gives shirt numbers and nothing else. No shape, no league score, no scorer. Spånga open the tournament against them, so the first ten minutes are still the scout.",
      points: [
        "Seventeen names are on the list. Number 17 is not used. Niamh O'Rourke is 18.",
        "Saturday 09:50, Field 1, is Spånga’s first kick. A short tournament punishes a slow start even when the names are known.",
        "They play Järna at 11:30. That score is the first result you can use to place them against a team with a public record.",
      ],
    },
    approach:
      "You know the names and the coach, not the system. Play your own game for the first twenty minutes and see who wears 9 and 10, Leah O'Sullivan and Roisin Murphy, and whether Garry Doody changes the shape after the first goal. There is still no public match to copy a plan from.",
    players: [
      { name: "Alex Kelly", number: "1", role: "Tournament roster", why: "Named on the Girls 2010 team page. No position or league goal is published." },
      { name: "Caitlin Byrne", number: "2", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Ciara Cox", number: "3", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Emma Canning", number: "4", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Sophia Rea", number: "5", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Mia Doody", number: "6", role: "Tournament roster", why: "Named on the Girls 2010 team page. The head coach is Garry Doody. The page does not say they are related." },
      { name: "Ciara Cahoon", number: "7", role: "The name that places the club", why: "On the roster. The Carlow Nationalist of 28 January 2026 calls her 15, from Killerig. Her racing page says she plays soccer for St Pats in Carlow." },
      { name: "Sienna Murnane", number: "8", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Leah O'Sullivan", number: "9", role: "Tournament roster", why: "Named on the Girls 2010 team page. Shirt 9 is not a published position." },
      { name: "Roisin Murphy", number: "10", role: "Tournament roster", why: "Named on the Girls 2010 team page. Shirt 10 is not a published position." },
      { name: "Aoibhinn Cadinot", number: "11", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Kiyah Mahony", number: "12", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Erika Owens", number: "13", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Ellie Walker", number: "14", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Holly O'Donoghue", number: "15", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Erin Walker", number: "16", role: "Tournament roster", why: "Named on the Girls 2010 team page." },
      { name: "Niamh O'Rourke", number: "18", role: "Tournament roster", why: "Named on the Girls 2010 team page. The assistant coach is David O'Rourke. The page does not say they are related." },
    ],
    playersNote:
      "Numbers and names are copied from the tournament team page. No positions are printed. Number 17 is unused.",
    staff: "Coach Garry Doody. Assistant coach David O'Rourke. Both titles are on the tournament page.",
    results: [],
    recordLine: "Roster of 17 is published. No league score was found. Ranked last because the results score stays neutral, not because the squad is unknown.",
    sources: [
      { label: "Tournament roster", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/team/12985/st-patricks-fc" },
      { label: "Ciara Cahoon, 15 in January 2026", url: "https://www.carlow-nationalist.ie/sport/other-sports/ciara-cahoons-race-to-glory_arid-85559.html" },
      { label: "Plays soccer for St Pats in Carlow", url: "https://ciaracahoonracing.co.uk/" },
      { label: "St Patrick's Boys AFC, Graiguecullen", url: "https://www.igp-web.com/Carlow/St_Patricks_AFC.htm" },
      { label: "Carlow U16 girls table, they are not on it", url: "https://soccerleagues.comortais.com/competition.aspx?id=14227&oid=1016" },
    ],
  },
];

export const MATCHES = [
  { id: "m1", day: "sat", date: "Sat 17 Oct", time: "09:50", field: "1", home: "spanga", away: "stpatricks", mine: true },
  { id: "m2", day: "sat", date: "Sat 17 Oct", time: "09:50", field: "3", home: "gava", away: "castlevilla" },
  { id: "m3", day: "sat", date: "Sat 17 Oct", time: "09:50", field: "4", home: "jarna", away: "kilcullen" },
  { id: "m4", day: "sat", date: "Sat 17 Oct", time: "11:30", field: "3", home: "stpatricks", away: "jarna" },
  { id: "m5", day: "sat", date: "Sat 17 Oct", time: "11:30", field: "5", home: "gava", away: "kilcullen" },
  { id: "m6", day: "sat", date: "Sat 17 Oct", time: "11:30", field: "10", home: "spanga", away: "castlevilla", mine: true },
  { id: "m7", day: "sat", date: "Sat 17 Oct", time: "13:10", field: "1", home: "jarna", away: "spanga", mine: true },
  { id: "m8", day: "sat", date: "Sat 17 Oct", time: "13:10", field: "5", home: "castlevilla", away: "kilcullen" },
  { id: "m9", day: "sat", date: "Sat 17 Oct", time: "13:10", field: "10", home: "stpatricks", away: "gava" },
  { id: "m10", day: "sun", date: "Sun 18 Oct", time: "09:00", field: "1", home: "castlevilla", away: "stpatricks" },
  { id: "m11", day: "sun", date: "Sun 18 Oct", time: "09:00", field: "3", home: "kilcullen", away: "spanga", mine: true },
  { id: "m12", day: "sun", date: "Sun 18 Oct", time: "09:00", field: "4", home: "gava", away: "jarna" },
  { id: "m13", day: "sun", date: "Sun 18 Oct", time: "11:00", field: "1", home: "gava", away: "spanga", mine: true },
  { id: "m14", day: "sun", date: "Sun 18 Oct", time: "11:00", field: "3", home: "jarna", away: "castlevilla" },
  { id: "m15", day: "sun", date: "Sun 18 Oct", time: "11:00", field: "4", home: "kilcullen", away: "stpatricks" },
];

export const PLAYOFFS = [
  { id: "p1", day: "sun", date: "Sun 18 Oct", time: "13:00", field: "4", label: "Final", pairing: "1st vs 2nd" },
  { id: "p2", day: "sun", date: "Sun 18 Oct", time: "13:00", field: "3", label: "3rd place", pairing: "3rd vs 4th" },
  { id: "p3", day: "sun", date: "Sun 18 Oct", time: "13:00", field: "1", label: "5th place", pairing: "5th vs 6th" },
];

// Clock times from the 17–18 October programme page. Meals are the hotel buffet.
// Friday has dinner only. Monday has breakfast only. No Monday lunch is printed.
export const MEALS = [
  { id: "fri-dinner", day: "fri", date: "Fri 16 Oct", start: "19:00", end: "21:30", name: "Dinner", place: "Hotel buffet", note: "Full board starts with this dinner." },
  { id: "sat-breakfast", day: "sat", date: "Sat 17 Oct", start: "07:00", end: "10:00", name: "Breakfast", place: "Hotel buffet", note: "The 09:50 kick-offs are inside this window." },
  { id: "sat-lunch", day: "sat", date: "Sat 17 Oct", start: "13:00", end: "14:30", name: "Lunch", place: "Hotel buffet", note: "The 13:10 kick-offs are inside this window." },
  { id: "sat-dinner", day: "sat", date: "Sat 17 Oct", start: "19:00", end: "21:30", name: "Dinner", place: "Hotel buffet" },
  { id: "sun-breakfast", day: "sun", date: "Sun 18 Oct", start: "07:00", end: "10:00", name: "Breakfast", place: "Hotel buffet", note: "The 09:00 kick-offs are inside this window." },
  { id: "sun-lunch", day: "sun", date: "Sun 18 Oct", start: "13:00", end: "14:30", name: "Lunch", place: "Hotel buffet", note: "The 13:00 placement matches are inside this window." },
  { id: "sun-dinner", day: "sun", date: "Sun 18 Oct", start: "19:00", end: "21:30", name: "Dinner", place: "Hotel buffet" },
  { id: "mon-breakfast", day: "mon", date: "Mon 19 Oct", start: "07:00", end: "10:00", name: "Breakfast", place: "Hotel buffet", note: "Check out of rooms by 11:00. Full board ends with this breakfast." },
];

export const FLIGHTS = [
  { date: "Fri 16 Oct", no: "LH 801", from: "Stockholm", to: "Frankfurt", dep: "09:50", arr: "12:00" },
  { date: "Fri 16 Oct", no: "LH 1130", from: "Frankfurt", to: "Barcelona", dep: "13:25", arr: "15:30" },
  { date: "Mon 19 Oct", no: "LH 1135", from: "Barcelona", to: "Frankfurt", dep: "19:00", arr: "21:10" },
  { date: "Mon 19 Oct", no: "LH 810", from: "Frankfurt", to: "Stockholm", dep: "22:15", arr: "00:20", arrNote: "Arrives Tuesday 20 Oct" },
];

export const STAY = [
  "Three nights in a 3–4 star hotel in Salou.",
  "Full board from dinner on 16 October (19:00–21:30) through breakfast on 19 October (07:00–10:00). Lunch on Saturday and Sunday is 13:00–14:30. Water is included with lunch and dinner.",
  "Sheets are included. Bring an extra towel for the pool or the beach.",
  "The final travel document is sent about one week before departure. The hotel’s name is not on the sheet.",
  "Matches are at Futbol Salou, on the Salou–Cambrils road. The organiser runs the transfers between hotel and fields.",
  "Passports or ID cards are checked. A photo of the document on a phone is accepted. Shirt numbers must match the team list.",
  "The European Health Insurance Card does not cover sports injuries in Spain. The club’s own insurance is the cover that matters.",
];

export const CHAINS = [
  {
    depth: "One direct meeting",
    text: "Kilcullen and Castle Villa have played twice in KDUL U16 Girls. Kilcullen lost 0–2 at home on 30 April, then won 5–3 on 21 June. One win each, aggregate 5–5. Saturday at 13:10 is the third meeting. No other pair in this group has a published match.",
  },
  {
    depth: "One step from Järna",
    text: "Järna’s published opponents at this age are Stabæk JF, Täby FK, Phénix de Québec, Merville United, Lough Derg FC, TSV Weyhe-Lahausen, Frösö IF, Sjöstaden DFF and Stureby FF. Täby, Stureby and Sjöstaden are Stockholm clubs. Stabæk is Norwegian.",
  },
  {
    depth: "One step from Spånga",
    text: "F11-U Gul’s published 2026 opponents in F2011-2A include Bollstanäs SK U, Kungsängens IF, and MHFF 2. The rest of that series is Enebybergs IF, Rotebro IS, and Sollentuna FK F15 U. Bollstanäs SK U is the 2011 team. It is not the Bollstanäs 2A or 3A side from the 2010 series.",
  },
  {
    depth: "Two and three steps",
    text: "No page that was opened puts Bollstanäs SK U, MHFF, Kungsängen, Enebyberg, Rotebro or Sollentuna F15 U in a match against Täby, Stureby, Sjöstaden or Järna. The Swedish chain stops at one step. There is no third-level bridge, and the Bollstanäs team in Spånga’s series is a year younger than the Bollstanäs teams in the 2010 series.",
  },
  {
    depth: "Ireland, one step",
    text: "The other three clubs in that division are Prosperous United, Maynooth United and Derry Rovers. Kilcullen took four league points from Prosperous (2–2, 4–0) and beat Maynooth 5–0, 6–3 and 7–0 in the cup final. Castle Villa drew Prosperous 1–1 and 3–3, then lost to them 0–2 in the cup and 3–4 in the shield, and beat Maynooth 3–0 and 4–2. St Patricks are not in the division. Prosperous, Maynooth and Derry have no published match against Järna, Spånga or Gavà, so the chain stops at one step.",
  },
  {
    depth: "Spain and across borders",
    text: "Gavà’s cadet group includes Santboià, Viladecans B, Ciudad Cooperativa, Atlètic Sant Just, Espluguenc and Casablanca. None of those clubs has a published match against Järna, Spånga, Kilcullen or Castle Villa. The chain still stops inside Catalonia. No common opponent was found between Sweden, Ireland and Catalonia.",
  },
];

export const LEAGUES = [
  {
    country: "Sweden",
    body: "Youth girls play district series under Svenska Fotbollförbundet. Stockholm’s birth-year 2010 league is split into numbered groups. 2A sits above 3A. Södermanland is a smaller district. A 2026 regional F15–16 series was offered. Järna’s entry in it was not confirmed. Swedish 11v11 at this age is a weekly league with published tables when a club site mirrors them. That volume is why a Stockholm 2A team is not ranked as an unknown, even when the known scores are poor.",
  },
  {
    country: "Ireland",
    body: "Kilcullen and Castle Villa both play KDUL U16 Girls, a five-team Kildare division that finished in 2026. Kilcullen won it on 19 points and won the cup 7–0. Castle Villa were second on 17. The bottom two, Maynooth and Derry Rovers, conceded 31 and 27. That is a real league, and it is a small one. It is not treated as the same standard as a Stockholm series until a common opponent says so. St Patricks are not in this division.",
  },
  {
    country: "Spain",
    body: "The Catalan federation sets the age bands. In 2026–27, girls born in 2010 are juvenil, in a three-year band with 2008 and 2009. Cadet femenino is 2011 and 2012. Escola F. Gavà have no juvenil femenino team. The Salou squad is licensed in Segona Divisió Femení Cadet F11, Grup 8, and had played 0 games on 4 October 2026. The older girls’ juvenil team from 2025–26 is a different squad.",
  },
];

export const METHOD = [
  "Each team has four scores from 0 to 100. Results count 45%, the league they actually play in counts 25%, the pathway (academy link, international games, squad continuity) counts 20%, and familiarity with this tournament counts 10%.",
  "A team with no published matches gets 50 for results. That is neutral. It is not a zero, and it is not a reward. Absence of a loss is not treated as a clean sheet.",
  "Common opponents were searched three clubs deep: the team, their opponents, and their opponents’ opponents. Where the chain stopped, the rank uses the league prior instead of an invented link.",
  "Implied scores are arithmetic from official totals. They are labeled and they are not worth as much as a printed line. They were not used to add extra credit beyond the official win-draw-loss record.",
  "The number is a projection for a 2×20 tournament, not a prediction of the final table. A single group game will move teams 3 to 6 past each other.",
];

export const ASSUMPTIONS = [
  "Spånga’s entry is F11-U Gul, confirmed on the club page as the F2011U 1 squad in F2011-2A. They are born in 2011, so they are a year young for Girls 2010. The model uses that season and does not treat them as an F10 team. The people on the Spånga page are the tournament roster, the same rule as the other five teams.",
  "Kilcullen on the KDUL U16 Girls page, team 160768, is the Cambrils side. The 23 August 2026 cup final against Maynooth is the final the Diary named, and the score is 7–0. Castle Villa in that division play at Mullarney Park, so they are the Castledermot club.",
  "St Patricks FC has a published roster of 17. The best club match is St Patrick’s Boys AFC, Graiguecullen, Carlow, because Ciara Cahoon is on the roster and plays for St Pats in Carlow. The roster page itself does not print the town, and no girls’ league score was found.",
  "Non-Spånga pairings were read from the official group page, which blocks a plain download. All five Spånga group lines match the club travel sheet on date, time, field and opponent. The other ten games are the rest of that same grid.",
  "Hotel name, rooming and the Sunday play-off opponent depend on documents that were not in the PDF.",
];

export function teamById(id) {
  return TEAMS.find((team) => team.id === id);
}

export function rankedTeams() {
  return [...TEAMS].sort((a, b) => a.rank - b.rank);
}
