/* ════════════════════════════════════════════════════════════════
   FIFA WORLD CUP 2026 — script.js
   College Case Study Project
   ════════════════════════════════════════════════════════════════
   SECTIONS:
    1.  DATA — Matches, Groups, Teams, Players, Scorers, Stadiums, Gallery, WC Winners
    2.  STATUS ENGINE — getMatchStatus() — date-aware match logic
    3.  CLOCK — live clock updating every second
    4.  NAVBAR — scroll shrink + mobile hamburger
    5.  HERO PARTICLES — floating dots
    6.  HERO COUNTDOWN — countdown to opening match (Jun 11, 2026)
    7.  MATCH CARDS — render + auto-refresh every 30s
    8.  MODAL — match detail popup (lineups, head-to-head, key players)
    9.  GROUPS — render all 12 groups
   10.  TEAMS — render FIFA ranking cards
   11.  PLAYERS — render + position filter
   12.  SCORERS — all-time WC top scorers table
   13.  STADIUMS — all 16 venue cards
   14.  GALLERY — football photo grid
   15.  WC WINNERS — history table
   16.  SCROLL REVEAL — IntersectionObserver animations
   17.  ACTIVE NAV — highlight current section
════════════════════════════════════════════════════════════════ */

"use strict";

/* ════════════════════════════════════════════════════════════════
   1. DATA
════════════════════════════════════════════════════════════════ */

// ── MATCHES ─────────────────────────────────────────────────────
// Each match has a real `kickoff` Date. The status engine below
// reads the clock and decides: UPCOMING / LIVE / FINISHED.
// Scores are ONLY shown for LIVE or FINISHED matches — never for UPCOMING.
const matchesData = [
  {
    id:1,
    homeTeam:{ name:"Mexico",    flag:"🇲🇽", score:2 },
    awayTeam:{ name:"Ecuador",   flag:"🇪🇨", score:1 },
    stage:"Opening Match — Group A",
    stadium:"Estadio Azteca, Mexico City",
    kickoff: new Date("2026-06-11T21:00:00"),   // OPENING MATCH
    lineup:{
      home:["Ochoa","Sanchez","Montes","Moreno","Gallardo","Herrera","Álvarez","Lozano","Vega","Rodriguez","Jiménez"],
      away:["Dominguez","Porozo","Hincapié","Arreaga","Estupiñán","Caicedo","Gruezo","Plata","Cifuentes","Valencia","Estrada"]
    },
    keyPlayers:["Hirving Lozano (MEX) — Winger","Raúl Jiménez (MEX) — Striker","Moisés Caicedo (ECU) — Midfielder"],
    history:[
      { year:"2022", tournament:"WC Group Stage", result:"MEX 2–1 ECU" },
      { year:"2018", tournament:"WC Group Stage", result:"ECU not qualified" }
    ]
  },
  {
    id:2,
    homeTeam:{ name:"USA",       flag:"🇺🇸", score:3 },
    awayTeam:{ name:"Bolivia",   flag:"🇧🇴", score:0 },
    stage:"Group C",
    stadium:"MetLife Stadium, New Jersey",
    kickoff: new Date("2026-06-13T21:00:00"),
    lineup:{
      home:["Turner","Dest","Richards","Zimmerman","Robinson","McKennie","Adams","Musah","Pulisic","Reyna","Balogun"],
      away:["Viscarra","Jusino","Lema","Haquin","Algarañaz","Saucedo","Vaca","Menacho","Arce","Alustiza","Martins"]
    },
    keyPlayers:["Christian Pulisic (USA) — Captain","Gio Reyna (USA) — Playmaker","Weston McKennie (USA) — Midfielder"],
    history:[
      { year:"2022", tournament:"Bolivia not qualified", result:"—" },
      { year:"2018", tournament:"USA not qualified", result:"—" }
    ]
  },
  {
    id:3,
    homeTeam:{ name:"Spain",     flag:"🇪🇸", score:2 },
    awayTeam:{ name:"Brazil",    flag:"🇧🇷", score:1 },
    stage:"Group E",
    stadium:"AT&T Stadium, Dallas",
    kickoff: new Date("2026-06-15T21:00:00"),
    lineup:{
      home:["Unai Simón","Carvajal","Le Normand","Laporte","Cucurella","Pedri","Busquets","Gavi","Yamal","Morata","Williams"],
      away:["Alisson","Danilo","Marquinhos","Militão","Wendy","Casemiro","Gomes","Vinicius","Rodrygo","Endrick","Savinho"]
    },
    keyPlayers:["Lamine Yamal (ESP) — 18-year-old sensation","Vinicius Jr (BRA) — Ballon d'Or contender","Pedri (ESP) — Creative maestro"],
    history:[
      { year:"2022", tournament:"WC Group Stage", result:"No meeting" },
      { year:"2018", tournament:"FIFA ranking clash", result:"ESP ranked above BRA" }
    ]
  },
  {
    id:4,
    homeTeam:{ name:"Argentina", flag:"🇦🇷", score:1 },
    awayTeam:{ name:"Croatia",   flag:"🇭🇷", score:0 },
    stage:"Group G",
    stadium:"Rose Bowl, Pasadena",
    kickoff: new Date("2026-06-14T18:00:00"),
    lineup:{
      home:["E.Martínez","Montiel","Romero","Otamendi","Acuña","De Paul","Paredes","Mac Allister","Di María","Lautaro","Messi"],
      away:["Livaković","Stanišić","Šutalo","Gvardiol","Sosa","Brozović","Kovačić","Modrić","Ivanušec","Kramarić","Perišić"]
    },
    keyPlayers:["Lionel Messi (ARG) — Defending champion captain","Luka Modrić (CRO) — 40-year-old legend","Lautaro Martínez (ARG) — Top striker"],
    history:[
      { year:"2022", tournament:"WC Semi-Final", result:"ARG 3–0 CRO" },
      { year:"2018", tournament:"WC Group Stage", result:"ARG 0–3 CRO" }
    ]
  },
  {
    id:5,
    homeTeam:{ name:"France",    flag:"🇫🇷", score:2 },
    awayTeam:{ name:"England",   flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", score:2 },
    stage:"Group D",
    stadium:"SoFi Stadium, Los Angeles",
    kickoff: new Date("2026-06-16T21:00:00"),
    lineup:{
      home:["Maignan","Koundé","Upamecano","Saliba","T.Hernandez","Camavinga","Tchouaméni","Griezmann","Dembélé","Mbappé","Giroud"],
      away:["Pickford","Alexander-Arnold","Maguire","Stones","Trippier","Rice","Bellingham","Gallagher","Saka","Kane","Palmer"]
    },
    keyPlayers:["Kylian Mbappé (FRA) — Star striker","Jude Bellingham (ENG) — Creative force","Harry Kane (ENG) — All-time WC top scorer hunt"],
    history:[
      { year:"2022", tournament:"WC Quarter-Final", result:"FRA 2–1 ENG" },
      { year:"2017", tournament:"Friendly", result:"FRA 3–2 ENG" }
    ]
  },
  {
    id:6,
    homeTeam:{ name:"Germany",   flag:"🇩🇪", score:3 },
    awayTeam:{ name:"Japan",     flag:"🇯🇵", score:2 },
    stage:"Group F",
    stadium:"Allegiant Stadium, Las Vegas",
    kickoff: new Date("2026-06-17T18:00:00"),
    lineup:{
      home:["Neuer","Rüdiger","Tah","Schlotterbeck","Raum","Kimmich","Goretzka","Musiala","Gnabry","Wirtz","Havertz"],
      away:["Gonda","Yamane","Yoshida","Itakura","Nagatomo","Endo","Morita","Doan","Kamada","Minamino","Ueda"]
    },
    keyPlayers:["Florian Wirtz (GER) — Bayer Leverkusen sensation","Jamal Musiala (GER) — Creative forward","Wataru Endo (JPN) — Liverpool captain"],
    history:[
      { year:"2022", tournament:"WC Group Stage", result:"GER 1–2 JPN" },
      { year:"2018", tournament:"WC Group Stage", result:"GER 2–1 SWE (unrelated)" }
    ]
  },
  {
    id:7,
    homeTeam:{ name:"Morocco",   flag:"🇲🇦", score:1 },
    awayTeam:{ name:"Portugal",  flag:"🇵🇹", score:0 },
    stage:"Group B",
    stadium:"Arrowhead Stadium, Kansas City",
    kickoff: new Date("2026-06-18T15:00:00"),
    lineup:{
      home:["Bono","Hakimi","Saïss","El Yamiq","Mazraoui","Amrabat","Ounahi","Ziyech","En-Nesyri","Boufal","Dari"],
      away:["R.Patrício","J.Cancelo","Pepe","R.Dias","Guerreiro","Vitinha","B.Fernandes","Bernardo","R.Leão","Ronaldo","Conceição"]
    },
    keyPlayers:["Achraf Hakimi (MAR) — PSG fullback","Hakim Ziyech (MAR) — Creative winger","Cristiano Ronaldo (POR) — All-time top scorer"],
    history:[
      { year:"2022", tournament:"WC Quarter-Final", result:"MAR 1–0 POR" },
      { year:"2018", tournament:"WC Group Stage", result:"POR 1–0 MAR" }
    ]
  },
  {
    id:8,
    homeTeam:{ name:"Netherlands",flag:"🇳🇱", score:2 },
    awayTeam:{ name:"Senegal",   flag:"🇸🇳", score:1 },
    stage:"Group H",
    stadium:"Levi's Stadium, San Jose",
    kickoff: new Date("2026-06-19T21:00:00"),
    lineup:{
      home:["Flekken","Dumfries","de Vrij","van Dijk","Blind","de Jong","Koopmeiners","Xavi Simons","Gakpo","Depay","Zirkzee"],
      away:["E.Mendy","B.Sarr","Diallo","Kouyaté","A.Sarr","Kouyaté","Nampalys","Gueye","Mané","Dia","Diatta"]
    },
    keyPlayers:["Virgil van Dijk (NED) — Team captain","Xavi Simons (NED) — Leipzig powerhouse","Sadio Mané (SEN) — African champion"],
    history:[
      { year:"2022", tournament:"WC Group Stage", result:"NED 2–0 SEN" },
      { year:"2018", tournament:"SEN qualified, NED did not", result:"—" }
    ]
  }
];

// ── GROUPS (Official FIFA WC 2026 Groups) ───────────────────────
const groupsData = [
  {
    letter:"A",
    teams:[
      { name:"Mexico",     flag:"🇲🇽", rank:"FIFA #16" },
      { name:"Ecuador",    flag:"🇪🇨", rank:"FIFA #46" },
      { name:"Paraguay",   flag:"🇵🇾", rank:"FIFA #55" },
      { name:"Uzbekistan", flag:"🇺🇿", rank:"FIFA #74" }
    ]
  },
  {
    letter:"B",
    teams:[
      { name:"Morocco",    flag:"🇲🇦", rank:"FIFA #8" },
      { name:"Portugal",   flag:"🇵🇹", rank:"FIFA #6" },
      { name:"Argentina",  flag:"🇦🇷", rank:"FIFA #2" },
      { name:"Indonesia",  flag:"🇮🇩", rank:"FIFA #127" }
    ]
  },
  {
    letter:"C",
    teams:[
      { name:"USA",        flag:"🇺🇸", rank:"FIFA #15" },
      { name:"Panama",     flag:"🇵🇦", rank:"FIFA #43" },
      { name:"Bolivia",    flag:"🇧🇴", rank:"FIFA #82" },
      { name:"New Zealand",flag:"🇳🇿", rank:"FIFA #98" }
    ]
  },
  {
    letter:"D",
    teams:[
      { name:"France",     flag:"🇫🇷", rank:"FIFA #3" },
      { name:"England",    flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", rank:"FIFA #4" },
      { name:"Tunisia",    flag:"🇹🇳", rank:"FIFA #34" },
      { name:"Iraq",       flag:"🇮🇶", rank:"FIFA #63" }
    ]
  },
  {
    letter:"E",
    teams:[
      { name:"Spain",      flag:"🇪🇸", rank:"FIFA #1" },
      { name:"Brazil",     flag:"🇧🇷", rank:"FIFA #5" },
      { name:"Japan",      flag:"🇯🇵", rank:"FIFA #18" },
      { name:"Serbia",     flag:"🇷🇸", rank:"FIFA #26" }
    ]
  },
  {
    letter:"F",
    teams:[
      { name:"Germany",    flag:"🇩🇪", rank:"FIFA #10" },
      { name:"Australia",  flag:"🇦🇺", rank:"FIFA #22" },
      { name:"Ukraine",    flag:"🇺🇦", rank:"FIFA #24" },
      { name:"Costa Rica", flag:"🇨🇷", rank:"FIFA #51" }
    ]
  },
  {
    letter:"G",
    teams:[
      { name:"Netherlands",flag:"🇳🇱", rank:"FIFA #7" },
      { name:"Croatia",    flag:"🇭🇷", rank:"FIFA #11" },
      { name:"Colombia",   flag:"🇨🇴", rank:"FIFA #14" },
      { name:"Egypt",      flag:"🇪🇬", rank:"FIFA #39" }
    ]
  },
  {
    letter:"H",
    teams:[
      { name:"Portugal",   flag:"🇵🇹", rank:"FIFA #6" },
      { name:"Belgium",    flag:"🇧🇪", rank:"FIFA #9" },
      { name:"Senegal",    flag:"🇸🇳", rank:"FIFA #20" },
      { name:"Kenya",      flag:"🇰🇪", rank:"FIFA #113" }
    ]
  },
  {
    letter:"I",
    teams:[
      { name:"Argentina",  flag:"🇦🇷", rank:"FIFA #2" },
      { name:"Chile",      flag:"🇨🇱", rank:"FIFA #21" },
      { name:"Saudi Arabia",flag:"🇸🇦", rank:"FIFA #59" },
      { name:"Trinidad & T",flag:"🇹🇹", rank:"FIFA #88" }
    ]
  },
  {
    letter:"J",
    teams:[
      { name:"Canada",     flag:"🇨🇦", rank:"FIFA #29" },
      { name:"Uruguay",    flag:"🇺🇾", rank:"FIFA #19" },
      { name:"Côte d'Ivoire",flag:"🇨🇮", rank:"FIFA #32" },
      { name:"Lithuania",  flag:"🇱🇹", rank:"FIFA #129" }
    ]
  },
  {
    letter:"K",
    teams:[
      { name:"South Korea",flag:"🇰🇷", rank:"FIFA #17" },
      { name:"Iran",       flag:"🇮🇷", rank:"FIFA #23" },
      { name:"Switzerland",flag:"🇨🇭", rank:"FIFA #13" },
      { name:"Honduras",   flag:"🇭🇳", rank:"FIFA #66" }
    ]
  },
  {
    letter:"L",
    teams:[
      { name:"Turkey",     flag:"🇹🇷", rank:"FIFA #28" },
      { name:"Nigeria",    flag:"🇳🇬", rank:"FIFA #35" },
      { name:"Austria",    flag:"🇦🇹", rank:"FIFA #25" },
      { name:"Venezuela",  flag:"🇻🇪", rank:"FIFA #47" }
    ]
  }
];

// ── TEAMS (FIFA Rankings Jan 19, 2026) ───────────────────────────
const teamsData = [
  {
    flag:"🇪🇸", name:"Spain",
    ranking:"#1 — 1,877 pts",
    coach:"Luis de la Fuente",
    confederation:"UEFA",
    titles:"1 (2010)",
    stars:"Lamine Yamal, Pedri, Morata"
  },
  {
    flag:"🇦🇷", name:"Argentina",
    ranking:"#2 — 1,873 pts",
    coach:"Lionel Scaloni",
    confederation:"CONMEBOL",
    titles:"3 (1978, 1986, 2022)",
    stars:"Messi, Lautaro, Mac Allister"
  },
  {
    flag:"🇫🇷", name:"France",
    ranking:"#3 — 1,870 pts",
    coach:"Didier Deschamps",
    confederation:"UEFA",
    titles:"2 (1998, 2018)",
    stars:"Mbappé, Griezmann, Camavinga"
  },
  {
    flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", name:"England",
    ranking:"#4 — 1,823 pts",
    coach:"Thomas Tuchel",
    confederation:"UEFA",
    titles:"1 (1966)",
    stars:"Bellingham, Kane, Saka"
  },
  {
    flag:"🇧🇷", name:"Brazil",
    ranking:"#5 — 1,782 pts",
    coach:"Carlo Ancelotti",
    confederation:"CONMEBOL",
    titles:"5 (1958,62,70,94,2002)",
    stars:"Vinicius Jr, Rodrygo, Endrick"
  },
  {
    flag:"🇵🇹", name:"Portugal",
    ranking:"#6 — 1,764 pts",
    coach:"Roberto Martínez",
    confederation:"UEFA",
    titles:"0 (Best: 3rd, 1966)",
    stars:"Cristiano Ronaldo, Bruno F, Bernardo S"
  },
  {
    flag:"🇳🇱", name:"Netherlands",
    ranking:"#7 — 1,751 pts",
    coach:"Ronald Koeman",
    confederation:"UEFA",
    titles:"0 (Runners-up x3)",
    stars:"van Dijk, Xavi Simons, Gakpo"
  },
  {
    flag:"🇲🇦", name:"Morocco",
    ranking:"#8 — 1,736 pts ⬆️",
    coach:"Walid Regragui",
    confederation:"CAF",
    titles:"0 (Best: 4th, 2022)",
    stars:"Hakimi, En-Nesyri, Ziyech"
  },
  {
    flag:"🇧🇪", name:"Belgium",
    ranking:"#9 — 1,730 pts",
    coach:"Rudi García",
    confederation:"UEFA",
    titles:"0 (Best: 3rd, 1986)",
    stars:"De Bruyne, Lukaku, Trossard"
  },
  {
    flag:"🇩🇪", name:"Germany",
    ranking:"#10 — 1,724 pts",
    coach:"Julian Nagelsmann",
    confederation:"UEFA",
    titles:"4 (1954,74,90,2014)",
    stars:"Musiala, Kimmich, Wirtz"
  },
  {
    flag:"🇺🇸", name:"USA",
    ranking:"#15 — Host Nation",
    coach:"Mauricio Pochettino",
    confederation:"CONCACAF",
    titles:"0 (Best: 3rd, 1930)",
    stars:"Pulisic, Reyna, McKennie"
  },
  {
    flag:"🇲🇽", name:"Mexico",
    ranking:"#16 — Host Nation",
    coach:"Javier Aguirre",
    confederation:"CONCACAF",
    titles:"0 (Best: QF x3)",
    stars:"Jiménez, Lozano, Álvarez"
  }
];

// ── PLAYERS ─────────────────────────────────────────────────────
const playersData = [
  {
    name:"Kylian Mbappé",     country:"France",      pos:"forward",
    num:9,  goals:40,  assists:26, caps:80,
    club:"Real Madrid",
    img:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80"
  },
  {
    name:"Lionel Messi",      country:"Argentina",   pos:"forward",
    num:10, goals:106, assists:56, caps:188,
    club:"Inter Miami",
    img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&q=80"
  },
  {
    name:"Cristiano Ronaldo", country:"Portugal",    pos:"forward",
    num:7,  goals:133, assists:42, caps:214,
    club:"Al Nassr",
    img:"https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&q=80"
  },
  {
    name:"Vinicius Jr",       country:"Brazil",      pos:"forward",
    num:7,  goals:31,  assists:25, caps:54,
    club:"Real Madrid",
    img:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80"
  },
  {
    name:"Lamine Yamal",      country:"Spain",       pos:"forward",
    num:19, goals:8,   assists:14, caps:22,
    club:"FC Barcelona",
    img:"https://images.unsplash.com/photo-1551854838-212c9a5cd888?w=400&q=80"
  },
  {
    name:"Jude Bellingham",   country:"England",     pos:"midfielder",
    num:22, goals:18,  assists:12, caps:50,
    club:"Real Madrid",
    img:"https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&q=80"
  },
  {
    name:"Florian Wirtz",     country:"Germany",     pos:"midfielder",
    num:10, goals:12,  assists:18, caps:34,
    club:"Bayer Leverkusen",
    img:"https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=400&q=80"
  },
  {
    name:"Pedri",             country:"Spain",       pos:"midfielder",
    num:8,  goals:7,   assists:16, caps:42,
    club:"FC Barcelona",
    img:"https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&q=80"
  },
  {
    name:"Achraf Hakimi",     country:"Morocco",     pos:"defender",
    num:2,  goals:11,  assists:22, caps:80,
    club:"Paris Saint-Germain",
    img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80"
  },
  {
    name:"Virgil van Dijk",   country:"Netherlands", pos:"defender",
    num:4,  goals:10,  assists:5,  caps:72,
    club:"Liverpool",
    img:"https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80"
  },
  {
    name:"Rúben Dias",        country:"Portugal",    pos:"defender",
    num:3,  goals:4,   assists:2,  caps:60,
    club:"Manchester City",
    img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80"
  },
  {
    name:"Manuel Neuer",      country:"Germany",     pos:"goalkeeper",
    num:1,  goals:0,   assists:0,  caps:124,
    club:"Bayern Munich",
    img:"https://images.unsplash.com/photo-1552667466-07770ae110d0?w=400&q=80"
  }
];

// ── ALL-TIME WC TOP SCORERS ──────────────────────────────────────
const scorersData = [
  { rank:1,  name:"Miroslav Klose",    flag:"🇩🇪", country:"Germany",     goals:16, tours:4, best:"Champion 2014" },
  { rank:2,  name:"Ronaldo Nazário",   flag:"🇧🇷", country:"Brazil",      goals:15, tours:4, best:"Champion 1994, 2002" },
  { rank:3,  name:"Gerd Müller",       flag:"🇩🇪", country:"Germany",     goals:14, tours:2, best:"Champion 1974" },
  { rank:4,  name:"Just Fontaine",     flag:"🇫🇷", country:"France",      goals:13, tours:1, best:"3rd Place 1958" },
  { rank:5,  name:"Pelé",              flag:"🇧🇷", country:"Brazil",      goals:12, tours:4, best:"Champion 1958,62,70" },
  { rank:6,  name:"Sandor Kocsis",     flag:"🇭🇺", country:"Hungary",     goals:11, tours:1, best:"Runner-up 1954" },
  { rank:6,  name:"Jürgen Klinsmann", flag:"🇩🇪", country:"Germany",     goals:11, tours:4, best:"Champion 1990" },
  { rank:8,  name:"Teófilo Cubillas",  flag:"🇵🇪", country:"Peru",        goals:10, tours:2, best:"QF 1970" },
  { rank:8,  name:"Gregorz Lato",      flag:"🇵🇱", country:"Poland",      goals:10, tours:3, best:"3rd Place 1974" },
  { rank:8,  name:"Gary Lineker",      flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", country:"England",     goals:10, tours:2, best:"QF 1986" },
  { rank:8,  name:"Gabriel Batistuta", flag:"🇦🇷", country:"Argentina",   goals:10, tours:3, best:"Champion 1986" },
  { rank:12, name:"Cristiano Ronaldo", flag:"🇵🇹", country:"Portugal",    goals:8,  tours:5, best:"3rd Place 2006" }
];

// ── STADIUMS (All 16 WC 2026 Venues) ────────────────────────────
const stadiumsData = [
  { name:"MetLife Stadium",        city:"East Rutherford, NJ", country:"🇺🇸 USA",    capacity:"82,500",  matches:8,  img:"https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80",  note:"FINAL venue" },
  { name:"AT&T Stadium",           city:"Arlington, Dallas TX",country:"🇺🇸 USA",    capacity:"80,000",  matches:8,  img:"https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",  note:"Semi-Final venue" },
  { name:"SoFi Stadium",           city:"Inglewood, Los Angeles",country:"🇺🇸 USA",  capacity:"70,000",  matches:8,  img:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80",  note:"SF + QF venue" },
  { name:"Estadio Azteca",         city:"Mexico City",         country:"🇲🇽 Mexico", capacity:"87,523",  matches:5,  img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80",  note:"OPENING MATCH" },
  { name:"Arrowhead Stadium",      city:"Kansas City, MO",     country:"🇺🇸 USA",    capacity:"76,000",  matches:6,  img:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",  note:"QF venue" },
  { name:"Rose Bowl",              city:"Pasadena, CA",        country:"🇺🇸 USA",    capacity:"92,542",  matches:6,  img:"https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80",  note:"Largest WC 2026 venue" },
  { name:"Levi's Stadium",         city:"Santa Clara, CA",     country:"🇺🇸 USA",    capacity:"68,500",  matches:6,  img:"https://images.unsplash.com/photo-1551854838-212c9a5cd888?w=600&q=80",  note:"Group stage" },
  { name:"Estadio Guadalajara",    city:"Guadalajara",         country:"🇲🇽 Mexico", capacity:"49,850",  matches:5,  img:"https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=600&q=80",  note:"Group stage" },
  { name:"NRG Stadium",            city:"Houston, TX",         country:"🇺🇸 USA",    capacity:"72,220",  matches:6,  img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",  note:"QF venue" },
  { name:"Allegiant Stadium",      city:"Las Vegas, NV",       country:"🇺🇸 USA",    capacity:"65,000",  matches:6,  img:"https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=600&q=80",  note:"Group stage" },
  { name:"Empower Field",          city:"Denver, CO",          country:"🇺🇸 USA",    capacity:"76,125",  matches:6,  img:"https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80",  note:"Group stage" },
  { name:"BC Place",               city:"Vancouver, BC",       country:"🇨🇦 Canada", capacity:"54,500",  matches:6,  img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80",  note:"Group stage" },
  { name:"BMO Field",              city:"Toronto, ON",         country:"🇨🇦 Canada", capacity:"45,736",  matches:6,  img:"https://images.unsplash.com/photo-1552667466-07770ae110d0?w=600&q=80",  note:"Group stage" },
  { name:"Stade Olympique",        city:"Montreal, QC",        country:"🇨🇦 Canada", capacity:"61,004",  matches:6,  img:"https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?w=600&q=80",  note:"Group stage" },
  { name:"Lincoln Financial Field",city:"Philadelphia, PA",    country:"🇺🇸 USA",    capacity:"69,796",  matches:7,  img:"https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600&q=80",  note:"R16 venue" },
  { name:"Estadio BBVA",           city:"Monterrey",           country:"🇲🇽 Mexico", capacity:"51,348",  matches:5,  img:"https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&q=80",  note:"Group stage" }
];

// ── GALLERY PHOTOS ───────────────────────────────────────────────
const galleryData = [
  { img:"https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=700&q=85", cap:"🏟 World Cup Stadium at Night" },
  { img:"https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=700&q=85", cap:"🌿 Aerial View of Perfect Pitch" },
  { img:"https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=700&q=85", cap:"⚡ Explosive Speed on the Wing" },
  { img:"https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=700&q=85", cap:"🎯 Precision Strike on Goal" },
  { img:"https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=700&q=85", cap:"🔥 Dribbling Past Defenders" },
  { img:"https://images.unsplash.com/photo-1552667466-07770ae110d0?w=700&q=85", cap:"🧤 Stunning Goalkeeper Save" },
  { img:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&q=85", cap:"💪 Midfield Battle" },
  { img:"https://images.unsplash.com/photo-1551854838-212c9a5cd888?w=700&q=85", cap:"🎉 Goal Celebration Moment" },
  { img:"https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=700&q=85", cap:"⚽ Corner Kick Set Piece" },
  { img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85", cap:"🌟 Star Player in Action" },
  { img:"https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=700&q=85", cap:"🏆 The Beautiful Game" },
  { img:"https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=700&q=85", cap:"🥅 Goal — The World Erupts" }
];

// ── WORLD CUP WINNERS (1930 – 2022) ─────────────────────────────
const wcWinners = [
  { year:"2022", winner:"🇦🇷 Argentina",  host:"Qatar" },
  { year:"2018", winner:"🇫🇷 France",     host:"Russia" },
  { year:"2014", winner:"🇩🇪 Germany",    host:"Brazil" },
  { year:"2010", winner:"🇪🇸 Spain",      host:"South Africa" },
  { year:"2006", winner:"🇮🇹 Italy",      host:"Germany" },
  { year:"2002", winner:"🇧🇷 Brazil",     host:"Korea/Japan" },
  { year:"1998", winner:"🇫🇷 France",     host:"France" },
  { year:"1994", winner:"🇧🇷 Brazil",     host:"USA" },
  { year:"1990", winner:"🇩🇪 Germany",    host:"Italy" },
  { year:"1986", winner:"🇦🇷 Argentina",  host:"Mexico" },
  { year:"1982", winner:"🇮🇹 Italy",      host:"Spain" },
  { year:"1978", winner:"🇦🇷 Argentina",  host:"Argentina" },
  { year:"1974", winner:"🇩🇪 Germany",    host:"West Germany" },
  { year:"1970", winner:"🇧🇷 Brazil",     host:"Mexico" },
  { year:"1966", winner:"🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", host:"England" },
  { year:"1962", winner:"🇧🇷 Brazil",     host:"Chile" },
  { year:"1958", winner:"🇧🇷 Brazil",     host:"Sweden" },
  { year:"1954", winner:"🇩🇪 Germany",    host:"Switzerland" },
  { year:"1950", winner:"🇺🇾 Uruguay",    host:"Brazil" },
  { year:"1938", winner:"🇮🇹 Italy",      host:"France" },
  { year:"1934", winner:"🇮🇹 Italy",      host:"Italy" },
  { year:"1930", winner:"🇺🇾 Uruguay",    host:"Uruguay" }
];

/* ════════════════════════════════════════════════════════════════
   2. STATUS ENGINE
   ────────────────────────────────────────────────────────────────
   Compares match kickoff time to NOW.
   ┌──────────────────────────────────┬────────────────────────────┐
   │  Condition                       │  Status                    │
   ├──────────────────────────────────┼────────────────────────────┤
   │  kickoff > now                   │  UPCOMING — show VS        │
   │  kickoff ≤ now < kickoff+105min  │  LIVE — show score         │
   │  kickoff + 105min ≤ now          │  FINISHED — show score     │
   └──────────────────────────────────┴────────────────────────────┘
════════════════════════════════════════════════════════════════ */
function getMatchStatus(match) {
  const now  = new Date();
  const diff = now - match.kickoff;          // ms since kickoff (negative = future)
  const mins = Math.floor(diff / 60000);     // convert to minutes

  if (diff < 0) {
    // Match hasn't started yet
    return { label:"UPCOMING", showScore:false, minStr:"" };
  }
  if (mins < 105) {
    // Within match window — show as LIVE
    return { label:"LIVE", showScore:true, minStr:Math.min(mins,90)+"'" };
  }
  // Finished
  return { label:"FINISHED", showScore:true, minStr:"FT" };
}

/* ════════════════════════════════════════════════════════════════
   3. LIVE CLOCK
════════════════════════════════════════════════════════════════ */
function updateClock() {
  const now = new Date();
  const str = now.toLocaleString("en-US",{
    weekday:"short", year:"numeric", month:"short",
    day:"numeric", hour:"2-digit", minute:"2-digit", second:"2-digit"
  });
  const el = document.getElementById("matchClock");
  if (el) el.textContent = str;
}
updateClock();
setInterval(updateClock, 1000);

/* ════════════════════════════════════════════════════════════════
   4. NAVBAR — scroll shrink + mobile hamburger
════════════════════════════════════════════════════════════════ */
const navbar    = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

window.addEventListener("scroll", function() {
  if (window.scrollY > 70) navbar.classList.add("scrolled");
  else                      navbar.classList.remove("scrolled");
});

hamburger.addEventListener("click", function() {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach(function(l) {
  l.addEventListener("click", function() { navLinks.classList.remove("open"); });
});

/* ════════════════════════════════════════════════════════════════
   5. HERO PARTICLES
════════════════════════════════════════════════════════════════ */
(function createParticles() {
  const wrap = document.getElementById("particles");
  if (!wrap) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    const size = Math.random() * 7 + 3;
    p.style.cssText = `
      left:${Math.random()*100}%;
      width:${size}px; height:${size}px;
      animation-duration:${Math.random()*10+6}s;
      animation-delay:${Math.random()*12}s;
    `;
    wrap.appendChild(p);
  }
})();

/* ════════════════════════════════════════════════════════════════
   6. HERO COUNTDOWN — counts down to opening match Jun 11, 2026
════════════════════════════════════════════════════════════════ */
const OPENING_MATCH = new Date("2026-06-11T21:00:00");

function updateHeroCountdown() {
  const diff = OPENING_MATCH - new Date();
  const dEl  = document.getElementById("hcdDays");
  const hEl  = document.getElementById("hcdHours");
  const mEl  = document.getElementById("hcdMins");
  const sEl  = document.getElementById("hcdSecs");

  if (!dEl) return;

  if (diff <= 0) {
    // Tournament has started!
    dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = "00";
    document.querySelector(".countdown-label-main").textContent = "🔴 TOURNAMENT IS LIVE! Go to Schedule ⬇";
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000)  / 60000);
  const s = Math.floor((diff % 60000)    / 1000);

  dEl.textContent = String(d).padStart(2,"0");
  hEl.textContent = String(h).padStart(2,"0");
  mEl.textContent = String(m).padStart(2,"0");
  sEl.textContent = String(s).padStart(2,"0");
}
updateHeroCountdown();
setInterval(updateHeroCountdown, 1000);

/* ════════════════════════════════════════════════════════════════
   7. MATCH CARDS
════════════════════════════════════════════════════════════════ */
function buildMatchCard(match) {
  const st = getMatchStatus(match);

  // Status badge HTML
  let badge = "";
  if (st.label === "LIVE") {
    badge = `<span class="mc-status st-live"><span class="dot-live"></span> LIVE ${st.minStr}</span>`;
  } else if (st.label === "FINISHED") {
    badge = `<span class="mc-status st-done">✅ FINISHED</span>`;
  } else {
    const ko = match.kickoff;
    const kStr = ko.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})
               + " · " + ko.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
    badge = `<span class="mc-status st-soon">🕐 ${kStr}</span>`;
  }

  // Score or VS
  let mid = "";
  if (st.showScore) {
    mid = `<div class="mc-score score-live">
             <span class="sc-nums">${match.homeTeam.score} – ${match.awayTeam.score}</span>
             <span class="sc-time">${st.minStr}</span>
           </div>`;
  } else {
    mid = `<div class="mc-score score-upcoming">
             <span class="sc-vs">VS</span>
             <span class="sc-time">Not Started</span>
           </div>`;
  }

  return `
    <div class="match-card reveal" onclick="openModal(${match.id})">
      <div class="mc-head">
        <span class="mc-stage">${match.stage}</span>
        ${badge}
      </div>
      <div class="mc-teams">
        <div class="mc-team">
          <span class="mc-flag">${match.homeTeam.flag}</span>
          <span class="mc-name">${match.homeTeam.name}</span>
        </div>
        ${mid}
        <div class="mc-team">
          <span class="mc-flag">${match.awayTeam.flag}</span>
          <span class="mc-name">${match.awayTeam.name}</span>
        </div>
      </div>
      <div class="mc-foot">
        <span><i class="fa fa-location-dot"></i>${match.stadium}</span>
        <span class="mc-hint">Details →</span>
      </div>
    </div>`;
}

function renderMatches() {
  const grid = document.getElementById("matchGrid");
  if (!grid) return;
  grid.innerHTML = matchesData.map(buildMatchCard).join("");
  // Re-observe new elements
  observeReveal();
}
renderMatches();
// Refresh match statuses every 30 seconds (in case a match starts mid-session)
setInterval(renderMatches, 30000);

/* ════════════════════════════════════════════════════════════════
   8. MODAL
════════════════════════════════════════════════════════════════ */
const modalBg = document.getElementById("modalBg");
const modalX  = document.getElementById("modalX");

function openModal(id) {
  const match = matchesData.find(m => m.id === id);
  if (!match) return;

  const st = getMatchStatus(match);

  const homeLL = match.lineup.home.map(p => `<li>${p}</li>`).join("");
  const awayLL = match.lineup.away.map(p => `<li>${p}</li>`).join("");
  const keyLL  = match.keyPlayers.map(p => `<li>⭐ ${p}</li>`).join("");
  const histRows = match.history.map(h => `
    <tr>
      <td>${h.year}</td>
      <td>${h.tournament}</td>
      <td><strong>${h.result}</strong></td>
    </tr>`).join("");

  // Score block — respect status
  let scoreBlock = "";
  if (st.showScore) {
    scoreBlock = `
      <div class="modal-center-score">
        <div class="modal-scoreline">
          ${match.homeTeam.score} – ${match.awayTeam.score}
          <small>${st.minStr} · ${match.stage}</small>
        </div>
      </div>`;
  } else {
    const kStr = match.kickoff.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"});
    const tStr = match.kickoff.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});
    scoreBlock = `
      <div class="modal-center-score">
        <div class="modal-vs-text">VS</div>
        <div class="modal-kickoff">🗓 ${kStr} at ${tStr}</div>
        <div class="modal-not-started">⏳ Match has not started — no score available yet</div>
      </div>`;
  }

  document.getElementById("modalContent").innerHTML = `
    <div class="modal-teams-row">
      <div class="modal-team">
        <div class="modal-team-flag">${match.homeTeam.flag}</div>
        <div class="modal-team-name">${match.homeTeam.name}</div>
      </div>
      ${scoreBlock}
      <div class="modal-team">
        <div class="modal-team-flag">${match.awayTeam.flag}</div>
        <div class="modal-team-name">${match.awayTeam.name}</div>
      </div>
    </div>

    <p style="font-size:.8rem;color:var(--muted);margin-bottom:1.2rem">
      <i class="fa fa-location-dot" style="color:var(--green)"></i> ${match.stadium}
    </p>

    <div class="m-sec-title">📋 Expected Line-ups (4-3-3)</div>
    <div class="lineup-cols">
      <div class="lineup-col"><h5>${match.homeTeam.name}</h5><ul>${homeLL}</ul></div>
      <div class="lineup-col"><h5>${match.awayTeam.name}</h5><ul>${awayLL}</ul></div>
    </div>

    <div class="m-sec-title">⭐ Key Players to Watch</div>
    <ul class="key-players">${keyLL}</ul>

    <div class="m-sec-title">📊 Head-to-Head History</div>
    <table class="h2h-table">
      <thead><tr><th>Year</th><th>Tournament</th><th>Result</th></tr></thead>
      <tbody>${histRows}</tbody>
    </table>`;

  modalBg.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalBg.classList.remove("open");
  document.body.style.overflow = "";
}

modalX.addEventListener("click", closeModal);
modalBg.addEventListener("click", e => { if (e.target === modalBg) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

/* ════════════════════════════════════════════════════════════════
   9. GROUPS
════════════════════════════════════════════════════════════════ */
function renderGroups() {
  const grid = document.getElementById("groupsGrid");
  if (!grid) return;

  grid.innerHTML = groupsData.map(g => {
    const rows = g.teams.map(t => `
      <div class="group-team">
        <span class="group-team-flag">${t.flag}</span>
        <span>${t.name}</span>
        <span class="group-team-rank">${t.rank}</span>
      </div>`).join("");
    return `
      <div class="group-card reveal">
        <div class="group-header">
          <span class="group-letter">GROUP ${g.letter}</span>
          <span class="group-badge">4 Teams</span>
        </div>
        <div class="group-teams">${rows}</div>
      </div>`;
  }).join("");
  observeReveal();
}
renderGroups();

/* ════════════════════════════════════════════════════════════════
   10. TEAMS
════════════════════════════════════════════════════════════════ */
function renderTeams() {
  const grid = document.getElementById("teamsGrid");
  if (!grid) return;

  grid.innerHTML = teamsData.map(t => `
    <div class="team-card reveal">
      <span class="tc-flag">${t.flag}</span>
      <div class="tc-name">${t.name}</div>
      <div class="tc-rank">📊 ${t.ranking}</div>
      <div class="tc-row"><span>Head Coach</span><span>${t.coach}</span></div>
      <div class="tc-row"><span>Confederation</span><span>${t.confederation}</span></div>
      <div class="tc-row"><span>WC Titles</span><span>${t.titles}</span></div>
      <div class="tc-stars">⭐ ${t.stars}</div>
    </div>`).join("");
  observeReveal();
}
renderTeams();

/* ════════════════════════════════════════════════════════════════
   11. PLAYERS + FILTER
════════════════════════════════════════════════════════════════ */
function renderPlayers(filter) {
  const grid = document.getElementById("playersGrid");
  if (!grid) return;

  // Build all cards on first render
  if (grid.children.length === 0) {
    grid.innerHTML = playersData.map(p => `
      <div class="player-card reveal" data-pos="${p.pos}">
        <div class="pc-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy"
               onerror="this.src='https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&q=80'"/>
          <span class="pc-num">${p.num}</span>
        </div>
        <div class="pc-body">
          <div class="pc-country">${p.country}</div>
          <div class="pc-name">${p.name}</div>
          <span class="pc-pos">${p.pos.toUpperCase()}</span>
          <div class="pc-stats">
            <div class="stat-pill"><span class="sn">${p.goals}</span><span class="sl">Goals</span></div>
            <div class="stat-pill"><span class="sn">${p.assists}</span><span class="sl">Assists</span></div>
            <div class="stat-pill"><span class="sn">${p.caps}</span><span class="sl">Caps</span></div>
          </div>
        </div>
      </div>`).join("");
    observeReveal();
  }

  // Show / hide by position
  grid.querySelectorAll(".player-card").forEach(function(c) {
    c.classList.toggle("hidden", filter !== "all" && c.dataset.pos !== filter);
  });
}

document.querySelectorAll(".f-btn").forEach(function(b) {
  b.addEventListener("click", function() {
    document.querySelectorAll(".f-btn").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
    renderPlayers(b.dataset.pos);
  });
});
renderPlayers("all");

/* ════════════════════════════════════════════════════════════════
   12. ALL-TIME WC SCORERS
════════════════════════════════════════════════════════════════ */
function renderScorers() {
  const tbody = document.getElementById("scorersBody");
  if (!tbody) return;
  tbody.innerHTML = scorersData.map(s => {
    const rc = s.rank <= 3 ? " r" + s.rank : "";
    return `<tr>
      <td><span class="rank-badge${rc}">${s.rank}</span></td>
      <td><strong>${s.name}</strong></td>
      <td>${s.flag} ${s.country}</td>
      <td><span class="goals-big">${s.goals}</span></td>
      <td>${s.tours}</td>
      <td>${s.best}</td>
    </tr>`;
  }).join("");
}
renderScorers();

/* ════════════════════════════════════════════════════════════════
   13. STADIUMS
════════════════════════════════════════════════════════════════ */
function renderStadiums() {
  const grid = document.getElementById("stadiumsGrid");
  if (!grid) return;
  grid.innerHTML = stadiumsData.map(s => `
    <div class="stadium-card reveal">
      <div class="stadium-img">
        <img src="${s.img}" alt="${s.name}" loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80'"/>
        <span class="stadium-country-tag">${s.country}</span>
      </div>
      <div class="stadium-body">
        <div class="stadium-name">${s.name}</div>
        <div class="stadium-city">📍 ${s.city} &nbsp;·&nbsp; <em>${s.note}</em></div>
        <div class="stadium-details">
          <div class="sd-item"><span class="sd-val">${s.capacity}</span><span class="sd-key">Capacity</span></div>
          <div class="sd-item"><span class="sd-val">${s.matches}</span><span class="sd-key">Matches</span></div>
        </div>
      </div>
    </div>`).join("");
  observeReveal();
}
renderStadiums();

/* ════════════════════════════════════════════════════════════════
   14. GALLERY
════════════════════════════════════════════════════════════════ */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = galleryData.map(g => `
    <div class="gallery-item reveal">
      <img src="${g.img}" alt="${g.cap}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=700&q=85'"/>
      <div class="gallery-cap"><span>${g.cap}</span></div>
    </div>`).join("");
  observeReveal();
}
renderGallery();

/* ════════════════════════════════════════════════════════════════
   15. WC WINNERS HISTORY
════════════════════════════════════════════════════════════════ */
function renderWCHistory() {
  const el = document.getElementById("wcHistory");
  if (!el) return;
  el.innerHTML = wcWinners.map((w,i) => `
    <div class="wh-row${i===0?" gold-row":""}">
      <span class="wh-year">${w.year}</span>
      <span class="wh-winner">${w.winner}</span>
      <span class="wh-host">${w.host}</span>
    </div>`).join("");
}
renderWCHistory();

/* ════════════════════════════════════════════════════════════════
   16. SCROLL REVEAL — fade-in elements as they enter viewport
════════════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold:0.08, rootMargin:"0px 0px -40px 0px" });

function observeReveal() {
  document.querySelectorAll(".reveal:not(.visible)").forEach(function(el) {
    revealObserver.observe(el);
  });
}
observeReveal();

// Observe newly-added elements (e.g. after filter change)
new MutationObserver(observeReveal).observe(document.body, { childList:true, subtree:true });

/* ════════════════════════════════════════════════════════════════
   17. ACTIVE NAV LINK — highlight on scroll
════════════════════════════════════════════════════════════════ */
window.addEventListener("scroll", function() {
  let current = "";
  document.querySelectorAll("section[id]").forEach(function(sec) {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.id;
  });
  document.querySelectorAll(".nav-link").forEach(function(link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});
