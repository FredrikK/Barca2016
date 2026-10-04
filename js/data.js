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
const gavaComponents = { results: 50, league: 78, pathway: 82, tournament: 72 };
const kilcullenComponents = { results: 70, league: 58, pathway: 48, tournament: 42 };
const spangaComponents = { results: 70, league: 62, pathway: 66, tournament: 48 };
const villaComponents = { results: 62, league: 56, pathway: 46, tournament: 40 };
const patsComponents = { results: 50, league: 42, pathway: 35, tournament: 40 };

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
        "Against Frösö IF the goals were shared: Sofia Vall (3' and 35'), Josefine Malmia (12'), Valentina Saavedra (14') and Freja Goddard (20'). The attack is not a one-player team on a good day.",
        "They still lost the matches that mattered against structure: Stabæk 4–0, Stureby 0–4, Sjöstaden 3–5, Täby 0–1, Phénix de Québec 0–1.",
        "Sofia Vall scored all four of Järna’s goals at this tournament in 2024. Stopping her supply does not, by itself, stop the 2025 version of the team.",
      ],
    },
    approach:
      "Treat the first 10 minutes as the match. Games here are only 40 minutes. Järna’s best public games became blowouts once they scored early. A compact block and no early transition goal is the pattern that has actually beaten them. If the game stretches, they have several finishers.",
    players: [
      {
        name: "Sofia Vall",
        number: "10",
        role: "Reference attacker",
        why: "Marked with four goals on the October 2024 tournament roster. Järna scored four in that tournament, so every goal was hers. She also scored twice against Frösö IF at Gothia 2025.",
      },
      {
        name: "Josefine Malmia",
        number: "12",
        role: "Attacker who has scored on this stage",
        why: "On the 2024 roster and scored the 2–1 against Frösö IF at Gothia 2025 (12').",
      },
      {
        name: "Valentina Saavedra",
        number: "11",
        role: "Attacker who has scored on this stage",
        why: "On the 2024 roster. The Gothia live page spells the Frösö goal (14') as Valentina Saveedra. Treated as the same player.",
      },
      {
        name: "Freja Goddard",
        number: "—",
        role: "Gothia scorer, not on the 2024 roster",
        why: "Scored the 4–1 against Frösö IF (20'). She is not the same public entry as Freja Wahlberg (number 15 in 2024). Do not merge them.",
      },
      {
        name: "Siri Alexandersson",
        number: "7",
        role: "Named in the Gothia match stats",
        why: "On the 2024 roster and listed beside the scorers on the Frösö match page. No goal time was printed for her in the text that loaded.",
      },
      {
        name: "Imra Hansson",
        number: "26",
        role: "Public voice of the 2024 trip",
        why: "Quoted by Länstidningen about the fundraising that paid for the 2024 Barcelona cup. She was on that roster. That is not a scouting grade.",
      },
      {
        name: "Kelly Wahlberg",
        number: "30",
        role: "Named in local coverage",
        why: "Named in the same February 2025 article and on the 2024 roster. No goals were attached to her name.",
      },
    ],
    staff: "October 2024 coaches on the official roster: Kjell Magnus Auregård and Esteban Ricardo Saveedra. No 2026 coach was found.",
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
    otherNames:
      "Rebecka Kesenci is named in the 2025 newspaper caption and was not on the 2024 tournament roster. A September 2026 article about a Järna girls’ team that plays boys’ leagues describes 11–12 and 14–15 year olds. That is a younger group, not this one.",
    sources: [
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
    rank: 2,
    components: gavaComponents,
    index: indexOf(gavaComponents),
    range: [50, 82],
    confidence: 38,
    confidenceLabel: "Low",
    verified:
      "The entry is Escola de Futbol Gavà, the Villarreal CF partner school in Gavà. It is not Villarreal CF’s own girls’ cadete team in Castellón, and it is not the senior club CF Gavà.",
    identity:
      "Escola de Futbol Gavà was founded in 2000. On 30 December 2021 Villarreal announced a collaboration agreement. Gavà’s sporting director Ramón López is quoted in that piece. A Villarreal campus article in February 2026 still calls EF Gavà an associated club. The tournament name EF Gava Villarreal CF is the name Gavà uses for these entries.",
    league:
      "Girls born in 2010 are juvenil in the Catalan federation’s 2026–27 age table (juvenil femenino covers 2008, 2009 and 2010). No classification was found for an Escola F. Gavà juvenil or cadete femenino side made up of the 2010 age group. Their division this season is unknown.",
    style: {
      status: "Club method, not a scout",
      formation: "Not published",
      summary:
        "No match report describes this squad’s shape. What is published is the school’s link to Villarreal’s academy: technical work, understanding of the game, and decision-making, described by Villarreal as aligned with the groguet identity.",
      points: [
        "Expect them to try to play, because that is the published point of the partnership. That is a prior, not a video scout.",
        "Do not copy a Villarreal first-team shape onto this team. The convenio does not publish a formation for the 2010 girls.",
        "They are the home side: no flight, familiar climate, and the fields are in their region.",
        "An older Gavà girls’ juvenil team (born 2007–2009) played Segona Divisió in 2025–26. Those players are too old for this age class, apart from a possible 2009 inside the four-player dispensation. They are not listed here as the opposition.",
      ],
    },
    approach:
      "The model has Gavà two points behind Järna only because Järna has matches and Gavà does not. On the day Gavà can be the best team in the group. For Spånga this is the last group game, Sunday 11:00. If Gavà are still playing for first place they will not sit off. The practical problem is their rest defence if they do keep the ball: wait for the pass that sticks, and don’t spend the first half chasing wide centre-backs.",
    players: [],
    playersNote:
      "No player born in 2010 is named in a public squad list that could be tied to this entry. Names from Gavà’s older juvenil femenino, and from a 2014 girls’ cup team coached by Rubén Raya López, belong to other age groups and are left out on purpose.",
    staff: "No coach is publicly tied to the 2010 girls. Ramón López is the school’s sporting director in the 2021 Villarreal announcement, not the proven match coach of this squad.",
    results: [],
    recordLine: "No published match for the 2010 girls was found. The ranking uses a neutral results score of 50, then adds the academy and home context.",
    contextResults: [
      { date: "2025–26", comp: "Older age group only", score: "Escola F. Gavà A in Segona Divisió Femení Juvenil, Grup 8", note: "Born 2007–2009 under that season’s licence table. Not this tournament team. Sample: 3–1 and 2–0 vs Begues, 2–1 at Sant Just, 1–3 vs Viladecans, and a 5–2 acta at Fontsanta-Fatjó." },
    ],
    sources: [
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
      {
        name: "Ella-Louise Donnelly",
        number: "—",
        role: "Two goals in the 5–0",
        why: "The 19 April card lists Ella-louise donnelly twice in the 5–0 against Maynooth. The registered squad has E. donnelly. A December 2025 club award named Ella Louise Donnelly as Players’ Player. Shirt number unpublished.",
      },
      {
        name: "Amelia Reddy",
        number: "—",
        role: "Scorer in the 5–0, club player of the year",
        why: "The same card lists Ameila Reddy, the spelling on the league tooltip. The squad list has A. Reddy. The December 2025 awards named Amelia Reddy as Player of the Year.",
      },
      {
        name: "Katie Marshall",
        number: "—",
        role: "Scorer in the 5–0",
        why: "Listed on the 19 April goal tooltip. The squad register has K. Marshall.",
      },
      {
        name: "Eila O'Byrne",
        number: "—",
        role: "Scorer in the 5–0",
        why: "Listed on the 19 April goal tooltip. The squad register has E. O'Byrne.",
      },
      {
        name: "Izzy Mae Middleton",
        number: "—",
        role: "Named on the 2–0 at Derry",
        why: "The 8 May card, Derry Rovers 0–2 Kilcullen, names Izzy Mae Middleton. The squad register has I. Middleton. The card does not say she scored both.",
      },
    ],
    playersNote:
      "The competition page registers 18 players by initial and surname. Only the names written on goal tooltips are listed here. No formation or shirt number is published. The December 2025 under-14 awards (Molly Furlong, Emily Browne, Lauren Barrett, Bailey Conn) are a younger group and are not this squad.",
    staff: "No under-16 coach is named on the league page or in the Diary note. Yvonne Carey Tyrrell wrote the fundraising note. The page does not call her the coach.",
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
    rank: 3,
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
        "Lineups on Bollstanäs and Kungsängen match pages are those clubs’ players. They are not this squad.",
      ],
    },
    approach:
      "This is your group, and you are a year young for it. The public record does not know your shape. What it does know is that games against your own age open up: you have won 8–4, 5–3 and 7–2, and you have also lost 2–7 to the league leaders. Järna and Gavà are the matches where that age gap is the question. Saturday is still three games in about four hours, 09:50, 11:30 and 13:10.",
    players: [],
    playersNote:
      "The club page does not name the 17 players. Opponent lineups were not copied across, and the F2011U 2 squad is a different team.",
    staff:
      "On 18 September 2025 the club announced Vendela Persbeck and Michelle Rojas as coaching reinforcement for that autumn. The club says both play in Elitettan and have Damallsvenskan and youth-national-team experience. Persbeck’s published 2025 Elitettan record is as a goalkeeper: 9 matches for Bollstanäs and 1 for Gamla Upsala, after 9 Damallsvenskan matches for AIK in 2024. That post does not say they are the 2026 match coaches in Salou. Malin Drougge is the contact the club lists for friendlies. Her email is not repeated here.",
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
      { label: "F11-U Gul club page", url: "https://www.spangafotboll.se/start/?ID=466714" },
      { label: "F2011-2A table", url: "https://www.laget.se/Malarhojden-HagerstenFF-MHFFF2011/Division/Standings/577175" },
      { label: "MHFF results, including 8–4 and 5–3", url: "https://www.laget.se/Malarhojden-HagerstenFF-MHFFF2011/Division/Games/577175" },
      { label: "Kungsängen 2–7", url: "https://www.kifen.se/kungsangensif-fotboll-u-15flick/match/20027367/spanga-is-fk-f2011u-1" },
      { label: "Bollstanäs 7–2", url: "https://www.svenskalag.se/bollstanassk-fotboll-f15u2011/match/20023066/spanga-is-fk-f2011u-1" },
      { label: "Coaching note, 18 Sep 2025", url: "https://www.spangafotboll.se/nyheter/?ID=466715&NID=1293736" },
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
      "Spånga play them Saturday at 11:30, the middle of three games, on Field 10. They are the league runners-up, and they have already played Kilcullen twice. The series is one win each. Watch whether Abbie Landon is the player they look for: she scored both in the 2–0. Kilcullen against them at 13:10 the same day is the third meeting of 2026, and you will have already played Castle Villa by then.",
    players: [
      {
        name: "Abbie Landon",
        number: "—",
        role: "Both goals in the 2–0 at Kilcullen",
        why: "The 30 April card lists Abbie Landon twice in Castle Villa’s 2–0 win. That is Kilcullen’s only league defeat. No shirt number is published.",
      },
      {
        name: "Lauren O'Sullivan",
        number: "—",
        role: "Scorer in the 3–1 at Derry",
        why: "Named with Kyia Bird and Annabelle Leigh on the 15 May card, Derry Rovers 1–3 Castle Villa.",
      },
      {
        name: "Kyia Bird",
        number: "—",
        role: "Scorer in the 3–1 at Derry",
        why: "On the same 15 May goal tooltip. No other goal of hers is itemised on the pages opened.",
      },
      {
        name: "Annabelle Leigh",
        number: "—",
        role: "Scorer in the 3–1 at Derry",
        why: "On the same 15 May goal tooltip.",
      },
    ],
    playersNote:
      "These four names are the scorers written on the league cards. A full Castle Villa squad list was not on the pages opened. Holly and John are Friday contacts for the U15 girls on the club site. They are not titled as the U16 coach, and their numbers are not repeated here.",
    staff: "No U16 girls coach is named on the league pages.",
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
    place: "Club not identified",
    colors: ["#1f7a43", "#f4efe6"],
    rank: 6,
    components: patsComponents,
    index: indexOf(patsComponents),
    range: [30, 72],
    confidence: 15,
    confidenceLabel: "Very low",
    verified:
      "The group list says St Patricks FC, with no apostrophe. A reading of the official schedule cards put the same Irish flag on St Patricks as on Kilcullen and Castle Villa. That flag could not be re-checked here, because a plain download of the page gets a captcha. No club website, league or girls’ team born in 2010 could be tied to the exact name.",
    identity:
      "Several Irish clubs were checked and do not fit. St Patrick’s Athletic of Dublin uses Athletic, not FC, and its published women’s youth team in 2026 is under-17, about a year older than Girls 2010. A Girls Emerging Talent Programme launched in Dublin in June 2026 with 22 players and no published ages. St Patrick’s Boys of Graiguecullen played the boys’ section of this tournament in 2025. None of those is evidence for this entry.",
    league:
      "Not the KDUL U16 Girls division. That table is Kilcullen, Castle Villa, Prosperous, Maynooth and Derry Rovers. St Patricks are not on it. If they are a different Irish community side, the rank stays near the bottom. If they are a Dublin academy entered under a shortened name, the rank is too low. The range 30–72 is the honest version of that.",
    style: {
      status: "Unknown",
      formation: "Not published",
      summary:
        "No players, coach, formation or match. Inventing a shape would only look like information. Spånga open the tournament against them, so the first ten minutes are the scout.",
      points: [
        "Saturday 09:50, Field 1, is Spånga’s first kick. A short tournament punishes a slow start against an unknown team.",
        "They also play Järna at 11:30 on Saturday. That score, if you can see it or hear it, is the first real ranking evidence of the weekend.",
        "Do not import the St Patrick’s Athletic under-17 squad. Wrong age group, unconfirmed club.",
      ],
    },
    approach:
      "Play your own game for the first twenty minutes and collect information: which side they attack, who takes the second ball, whether the goalkeeper plays short. There is nothing public to confirm before then.",
    players: [],
    playersNote: "No player can be named without guessing the club.",
    staff: "Unknown.",
    results: [],
    recordLine: "No matched results. Ranked last because there is no positive evidence, not because they were shown to be the weakest.",
    sources: [
      { label: "Official group page", url: "https://www.footballcupbarcelona.com/en/schedule/2026-october-1/g2010/groups" },
      { label: "Namesake checked and set aside", url: "https://stpatsfc.com/womens-under17s.php" },
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

export const FLIGHTS = [
  { date: "Fri 16 Oct", no: "LH 801", from: "Stockholm", to: "Frankfurt", dep: "09:50", arr: "12:00" },
  { date: "Fri 16 Oct", no: "LH 1130", from: "Frankfurt", to: "Barcelona", dep: "13:25", arr: "15:30" },
  { date: "Mon 19 Oct", no: "LH 1135", from: "Barcelona", to: "Frankfurt", dep: "19:00", arr: "21:10" },
  { date: "Mon 19 Oct", no: "LH 810", from: "Frankfurt", to: "Stockholm", dep: "22:15", arr: "00:20", arrNote: "Arrives Tuesday 20 Oct" },
];

export const STAY = [
  "Three nights in a 3–4 star hotel in Salou.",
  "Full board from dinner on 16 October through breakfast on 19 October. Water is included with lunch and dinner.",
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
    text: "The 2010 Gavà girls have no published opponent, so they cannot be linked in one, two or three steps. No common opponent was found between Sweden, Ireland and Catalonia.",
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
    body: "The Catalan federation sets the age bands. In 2026–27, girls born in 2010 are juvenil, in a three-year band with 2008 and 2009. A juvenil team is therefore not a pure 2010 squad. Gavà’s 2010 division was not found. The older Gavà girls’ team in Segona Divisió is cited only as the level of the school’s previous girls’ juvenil group, and those players are mostly too old to play here.",
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
  "Spånga’s entry is F11-U Gul, confirmed on the club page as the F2011U 1 squad in F2011-2A. They are born in 2011, so they are a year young for Girls 2010. The model uses that season and does not treat them as an F10 team.",
  "Kilcullen on the KDUL U16 Girls page, team 160768, is the Cambrils side. The 23 August 2026 cup final against Maynooth is the final the Diary named, and the score is 7–0. Castle Villa in that division play at Mullarney Park, so they are the Castledermot club.",
  "St Patricks FC is Irish because the official schedule card carries the Irish flag. The club itself is unidentified, and it is not one of the five teams in KDUL U16 Girls.",
  "Non-Spånga pairings were read from the official group page, which blocks a plain download. All five Spånga group lines match the club travel sheet on date, time, field and opponent. The other ten games are the rest of that same grid.",
  "Hotel name, rooming and the Sunday play-off opponent depend on documents that were not in the PDF.",
];

export function teamById(id) {
  return TEAMS.find((team) => team.id === id);
}

export function rankedTeams() {
  return [...TEAMS].sort((a, b) => a.rank - b.rank);
}
