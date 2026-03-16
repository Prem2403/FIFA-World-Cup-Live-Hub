/* ================================================================
   FIFA WORLD CUP LIVE HUB — script.js
   College Case Study Project
   ================================================================
   HOW THIS FILE IS ORGANIZED:
   1.  DATA  — All sample match, team, player, and scorer data
   2.  CLOCK — Live clock shown in hero and match section
   3.  NAVBAR — Scroll effect + hamburger menu toggle
   4.  PARTICLES — Animated floating dots in the hero
   5.  MATCHES — Render live match cards + open modal
   6.  MODAL — Match detail popup (lineups, history, key players)
   7.  UPCOMING — Render upcoming match cards with countdown timers
   8.  TEAMS — Render team cards
   9.  PLAYERS — Render player cards + filter by position
  10.  SCORERS — Render top scorers leaderboard table
  11.  GALLERY — Render photo gallery
  12.  SCROLL REVEAL — Fade-in animation on scroll
  13.  ACTIVE NAV — Highlight the correct nav link on scroll
================================================================ */

// ================================================================
// 1. DATA
// ----------------------------------------------------------------
// All sample data is stored as JavaScript arrays of objects.
// Each object represents one match / team / player / scorer / photo.
// ================================================================

// ---------- LIVE MATCHES ----------
// Each match has two teams, a score, stage, stadium, and time/status.
const matchesData = [
  {
    id: 1,
    homeTeam:  { name: "Brazil",    flag: "🇧🇷", score: 2 },
    awayTeam:  { name: "Argentina", flag: "🇦🇷", score: 1 },
    stage:     "Quarter Final",
    stadium:   "MetLife Stadium, New Jersey",
    time:      "67'",
    status:    "LIVE",
    // Lineup, key players, and history for the modal popup
    lineup: {
      home: ["Alisson", "Danilo", "Marquinhos", "Silva", "Militão", "Casemiro", "Paquetá", "Neymar", "Vinicius Jr", "Rodrygo", "Richarlison"],
      away: ["E. Martínez", "Montiel", "Romero", "Otamendi", "Acuña", "De Paul", "Paredes", "Mac Allister", "Di María", "Lautaro", "Messi"]
    },
    keyPlayers: ["Vinicius Jr (BRA) — 2 Goals", "Lionel Messi (ARG) — 1 Assist", "Richarlison (BRA) — 1 Goal"],
    history: [
      { year: "2022", tournament: "WC Final", result: "ARG 3–3 BRA (pen)" },
      { year: "2021", tournament: "Copa América Final", result: "ARG 1–0 BRA" },
      { year: "2019", tournament: "Copa América SF", result: "BRA 2–0 ARG" },
    ]
  },
  {
    id: 2,
    homeTeam:  { name: "France",  flag: "🇫🇷", score: 0 },
    awayTeam:  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", score: 0 },
    stage:     "Quarter Final",
    stadium:   "Sofi Stadium, Los Angeles",
    time:      "45+2'",
    status:    "LIVE",
    lineup: {
      home: ["Lloris", "Pavard", "Varane", "Upamecano", "Theo", "Tchouaméni", "Camavinga", "Griezmann", "Dembélé", "Mbappé", "Giroud"],
      away: ["Pickford", "Alexander-Arnold", "Maguire", "Stones", "Shaw", "Henderson", "Rice", "Bellingham", "Saka", "Kane", "Sterling"]
    },
    keyPlayers: ["Kylian Mbappé (FRA) — Danger Man", "Harry Kane (ENG) — 1 Shot on Target", "Jude Bellingham (ENG) — 89% Pass Accuracy"],
    history: [
      { year: "2022", tournament: "WC Quarter Final", result: "FRA 2–1 ENG" },
      { year: "2017", tournament: "Friendly", result: "FRA 3–2 ENG" },
    ]
  },
  {
    id: 3,
    homeTeam:  { name: "Germany", flag: "🇩🇪", score: 3 },
    awayTeam:  { name: "Spain",   flag: "🇪🇸", score: 2 },
    stage:     "Semi Final",
    stadium:   "AT&T Stadium, Dallas",
    time:      "FT",
    status:    "FINISHED",
    lineup: {
      home: ["Neuer", "Rüdiger", "Tah", "Süle", "Raum", "Kimmich", "Goretzka", "Gnabry", "Müller", "Havertz", "Werner"],
      away: ["Unai Simón", "Carvajal", "Laporte", "Pau Torres", "Gayà", "Pedri", "Busquets", "Gavi", "Dani Olmo", "Morata", "Ferran Torres"]
    },
    keyPlayers: ["Thomas Müller (GER) — 2 Goals", "Álvaro Morata (ESP) — 1 Goal 1 Assist", "Joshua Kimmich (GER) — Man of the Match"],
    history: [
      { year: "2010", tournament: "WC Semi Final", result: "GER 1–0 ESP" },
      { year: "2016", tournament: "Euros SF", result: "GER 2–1 ESP (pen)" },
    ]
  },
  {
    id: 4,
    homeTeam:  { name: "Portugal", flag: "🇵🇹", score: 1 },
    awayTeam:  { name: "Uruguay",  flag: "🇺🇾", score: 0 },
    stage:     "Round of 16",
    stadium:   "Arrowhead Stadium, Kansas City",
    time:      "78'",
    status:    "LIVE",
    lineup: {
      home: ["Rui Patrício", "João Cancelo", "Pepe", "Rúben Dias", "Guerreiro", "Danilo", "Vitinha", "Bruno Fernandes", "Bernardo Silva", "Ronaldo", "João Félix"],
      away: ["Muslera", "Nández", "Godín", "Giménez", "Olivera", "Valverde", "Vecino", "Bentancur", "De Arrascaeta", "Cavani", "Suárez"]
    },
    keyPlayers: ["Cristiano Ronaldo (POR) — 1 Goal", "Federico Valverde (URU) — Most Tackles", "Bruno Fernandes (POR) — 2 Key Passes"],
    history: [
      { year: "2018", tournament: "WC Group Stage", result: "POR 1–0 URU" },
      { year: "2010", tournament: "WC Group Stage", result: "URU 0–0 POR" },
    ]
  }
];

// ---------- UPCOMING MATCHES ----------
// Dates are set relative to today so countdowns always work.
// We use JavaScript to calculate future dates dynamically.
function getFutureDate(daysFromNow, hour = 18, minute = 0) {
  // Helper function: returns a Date object N days from now at a given time
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, minute, 0, 0);
  return d;
}

const upcomingData = [
  {
    homeTeam: { name: "USA",   flag: "🇺🇸" },
    awayTeam: { name: "Mexico", flag: "🇲🇽" },
    stage:    "Semi Final",
    stadium:  "Rose Bowl, Pasadena",
    date:     getFutureDate(2, 18, 0)    // 2 days from now at 18:00
  },
  {
    homeTeam: { name: "Japan",  flag: "🇯🇵" },
    awayTeam: { name: "South Korea", flag: "🇰🇷" },
    stage:    "Quarter Final",
    stadium:  "Levi's Stadium, San Jose",
    date:     getFutureDate(3, 15, 0)
  },
  {
    homeTeam: { name: "Morocco",   flag: "🇲🇦" },
    awayTeam: { name: "Senegal",   flag: "🇸🇳" },
    stage:    "Round of 16",
    stadium:  "BC Place, Vancouver",
    date:     getFutureDate(4, 20, 0)
  },
  {
    homeTeam: { name: "Netherlands", flag: "🇳🇱" },
    awayTeam: { name: "Croatia",     flag: "🇭🇷" },
    stage:    "Quarter Final",
    stadium:  "Allegiant Stadium, Las Vegas",
    date:     getFutureDate(5, 17, 0)
  },
  {
    homeTeam: { name: "Italy",   flag: "🇮🇹" },
    awayTeam: { name: "Belgium", flag: "🇧🇪" },
    stage:    "Round of 16",
    stadium:  "NRG Stadium, Houston",
    date:     getFutureDate(6, 21, 0)
  },
  {
    homeTeam: { name: "Australia", flag: "🇦🇺" },
    awayTeam: { name: "Canada",    flag: "🇨🇦" },
    stage:    "Group Stage",
    stadium:  "Estadio Azteca, Mexico City",
    date:     getFutureDate(7, 16, 0)
  }
];

// ---------- TEAMS ----------
const teamsData = [
  { flag: "🇧🇷", name: "Brazil",      ranking: "#1 FIFA Ranking", coach: "Tite",           starPlayers: "Vinicius Jr, Rodrygo, Neymar" },
  { flag: "🇦🇷", name: "Argentina",   ranking: "#2 FIFA Ranking", coach: "Scaloni",         starPlayers: "Messi, Lautaro, Mac Allister" },
  { flag: "🇫🇷", name: "France",      ranking: "#3 FIFA Ranking", coach: "Deschamps",       starPlayers: "Mbappé, Griezmann, Camavinga" },
  { flag: "🇩🇪", name: "Germany",     ranking: "#4 FIFA Ranking", coach: "Nagelsmann",      starPlayers: "Müller, Kimmich, Gnabry" },
  { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "England",    ranking: "#5 FIFA Ranking", coach: "Southgate",       starPlayers: "Kane, Bellingham, Saka" },
  { flag: "🇪🇸", name: "Spain",       ranking: "#6 FIFA Ranking", coach: "de la Fuente",    starPlayers: "Pedri, Gavi, Morata" },
  { flag: "🇵🇹", name: "Portugal",    ranking: "#7 FIFA Ranking", coach: "Roberto Martínez", starPlayers: "Ronaldo, Bruno F, Bernardo S" },
  { flag: "🇳🇱", name: "Netherlands", ranking: "#8 FIFA Ranking", coach: "Koeman",          starPlayers: "van Dijk, de Jong, Gakpo" },
];

// ---------- PLAYERS ----------
// Using reliable placeholder image URLs from picsum / Wikipedia commons
const playersData = [
  {
    name: "Kylian Mbappé",
    country: "France",
    position: "forward",
    number: 10,
    goals: 8,
    assists: 5,
    matches: 7,
    // Football action — player sprinting
    img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80"
  },
  {
    name: "Lionel Messi",
    country: "Argentina",
    position: "forward",
    number: 10,
    goals: 7,
    assists: 8,
    matches: 7,
    // Football dribbling action
    img: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&q=80"
  },
  {
    name: "Cristiano Ronaldo",
    country: "Portugal",
    position: "forward",
    number: 7,
    goals: 6,
    assists: 2,
    matches: 6,
    // Football player kicking
    img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&q=80"
  },
  {
    name: "Vinicius Jr",
    country: "Brazil",
    position: "forward",
    number: 7,
    goals: 5,
    assists: 4,
    matches: 7,
    // Football action shot on pitch
    img: "https://images.unsplash.com/photo-1551854838-212c9a5cd888?w=400&q=80"
  },
  {
    name: "Jude Bellingham",
    country: "England",
    position: "midfielder",
    number: 22,
    goals: 4,
    assists: 3,
    matches: 7,
    // Player with ball midfield
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80"
  },
  {
    name: "Joshua Kimmich",
    country: "Germany",
    position: "midfielder",
    number: 6,
    goals: 1,
    assists: 6,
    matches: 7,
    // Tactical midfield play
    img: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=400&q=80"
  },
  {
    name: "Virgil van Dijk",
    country: "Netherlands",
    position: "defender",
    number: 4,
    goals: 2,
    assists: 1,
    matches: 6,
    // Defensive header
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80"
  },
  {
    name: "Manuel Neuer",
    country: "Germany",
    position: "goalkeeper",
    number: 1,
    goals: 0,
    assists: 0,
    matches: 7,
    // Goalkeeper diving save
    img: "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=400&q=80"
  }
];

// ---------- TOP SCORERS ----------
const scorersData = [
  { rank: 1, name: "Kylian Mbappé",   country: "🇫🇷 France",    goals: 8, assists: 5, matches: 7 },
  { rank: 2, name: "Lionel Messi",    country: "🇦🇷 Argentina", goals: 7, assists: 8, matches: 7 },
  { rank: 3, name: "Cristiano Ronaldo", country: "🇵🇹 Portugal", goals: 6, assists: 2, matches: 6 },
  { rank: 4, name: "Vinicius Jr",     country: "🇧🇷 Brazil",    goals: 5, assists: 4, matches: 7 },
  { rank: 5, name: "Harry Kane",      country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",   goals: 4, assists: 1, matches: 7 },
  { rank: 6, name: "Thomas Müller",   country: "🇩🇪 Germany",   goals: 4, assists: 3, matches: 7 },
  { rank: 7, name: "Álvaro Morata",   country: "🇪🇸 Spain",     goals: 3, assists: 2, matches: 6 },
  { rank: 8, name: "Richarlison",     country: "🇧🇷 Brazil",    goals: 3, assists: 1, matches: 7 },
];

// ---------- GALLERY ----------
const galleryData = [
  {
    img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80",
    caption: "🏟️ World Cup Stadium Night"
  },
  {
    img: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80",
    caption: "🌿 Perfect Pitch Aerial View"
  },
  {
    img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80",
    caption: "⚡ Explosive Pace on the Wing"
  },
  {
    img: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80",
    caption: "🎯 Precision Strike on Goal"
  },
  {
    img: "https://images.unsplash.com/photo-1551854838-212c9a5cd888?w=600&q=80",
    caption: "🎉 Goal Celebration Moment"
  },
  {
    img: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80",
    caption: "🔥 Dribbling Through Defence"
  },
  {
    img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    caption: "💪 Midfield Battle"
  },
  {
    img: "https://images.unsplash.com/photo-1552667466-07770ae110d0?w=600&q=80",
    caption: "🧤 World Class Save"
  },
];


// ================================================================
// 2. LIVE CLOCK
// ----------------------------------------------------------------
// setInterval() calls a function every 1000ms (1 second).
// This makes the clock update in real time.
// ================================================================

function updateClock() {
  // Create a new Date object to get the current time
  const now = new Date();

  // Format options for a readable time string
  const options = {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
    hour:    "2-digit",
    minute:  "2-digit",
    second:  "2-digit"
  };

  // Format the time as a string like "Monday, June 14, 2026 at 08:30:45 PM"
  const timeString = now.toLocaleString("en-US", options);

  // Update both clock elements on the page
  const heroClock  = document.getElementById("heroClock");
  const matchClock = document.getElementById("matchClock");

  if (heroClock)  heroClock.innerText  = timeString;
  if (matchClock) matchClock.innerText = timeString;
}

// Run immediately, then every 1 second
updateClock();
setInterval(updateClock, 1000);


// ================================================================
// 3. NAVBAR — Scroll effect + hamburger mobile menu
// ================================================================

const navbar    = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks  = document.getElementById("navLinks");

// Add .scrolled class when page scrolls down more than 80px
window.addEventListener("scroll", function () {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Toggle mobile menu open/closed when hamburger is clicked
hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

// Close menu when a nav link is clicked (good UX on mobile)
document.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});


// ================================================================
// 4. HERO PARTICLES — Create floating dots in the background
// ================================================================

function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  // Create 25 particles
  for (let i = 0; i < 25; i++) {
    const dot = document.createElement("div");
    dot.classList.add("particle");

    // Random horizontal position (0% to 100% of screen width)
    dot.style.left = Math.random() * 100 + "%";

    // Random size between 4px and 12px
    const size = Math.random() * 8 + 4;
    dot.style.width  = size + "px";
    dot.style.height = size + "px";

    // Random animation duration (5s to 15s)
    dot.style.animationDuration = (Math.random() * 10 + 5) + "s";

    // Random delay so they don't all start at once
    dot.style.animationDelay = (Math.random() * 10) + "s";

    // Vary the opacity
    dot.style.opacity = Math.random() * 0.5 + 0.1;

    container.appendChild(dot);
  }
}

createParticles(); // Call the function to add particles


// ================================================================
// 5. LIVE MATCH CARDS — Render match cards dynamically
// ================================================================

function renderMatches() {
  const grid = document.getElementById("matchGrid");
  if (!grid) return;

  // Loop through each match and create an HTML card
  matchesData.forEach(function (match) {

    // Decide badge color based on match status
    const statusClass = match.status === "LIVE" ? "live"     :
                        match.status === "FINISHED" ? "finished" : "upcoming";

    // Build the dot HTML (only show for LIVE games)
    const dot = match.status === "LIVE"
      ? `<span class="status-dot"></span>` : "";

    // Build the HTML string for one match card
    const card = `
      <div class="match-card reveal" onclick="openModal(${match.id})">

        <div class="match-card-header">
          <span class="match-stage">${match.stage}</span>
          <span class="match-status">${dot} ${match.status}</span>
        </div>

        <div class="match-teams">
          <!-- Home team -->
          <div class="team-side">
            <span class="team-flag">${match.homeTeam.flag}</span>
            <span class="team-name">${match.homeTeam.name}</span>
          </div>

          <!-- Score in the middle -->
          <div class="score-board">
            <span class="score-number">${match.homeTeam.score} – ${match.awayTeam.score}</span>
            <span class="score-time">${match.time}</span>
          </div>

          <!-- Away team -->
          <div class="team-side">
            <span class="team-flag">${match.awayTeam.flag}</span>
            <span class="team-name">${match.awayTeam.name}</span>
          </div>
        </div>

        <div class="match-footer">
          <span><i class="fa fa-location-dot"></i>${match.stadium}</span>
          <span class="match-hint">Click for details →</span>
        </div>

      </div>
    `;

    // Insert card HTML into the grid
    grid.insertAdjacentHTML("beforeend", card);
  });
}

renderMatches();


// ================================================================
// 6. MODAL — Show match detail popup when a card is clicked
// ================================================================

const modalOverlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const modalClose   = document.getElementById("modalClose");

function openModal(matchId) {
  // Find the match object by its ID
  const match = matchesData.find(function (m) { return m.id === matchId; });
  if (!match) return;

  // Build the lineup HTML (two columns: home vs away)
  const homeLineup = match.lineup.home.map(function (p) {
    return `<li>${p}</li>`;
  }).join("");

  const awayLineup = match.lineup.away.map(function (p) {
    return `<li>${p}</li>`;
  }).join("");

  // Build key players list
  const keyPlayersList = match.keyPlayers.map(function (p) {
    return `<li>⭐ ${p}</li>`;
  }).join("");

  // Build history table rows
  const historyRows = match.history.map(function (h) {
    return `
      <tr>
        <td>${h.year}</td>
        <td>${h.tournament}</td>
        <td><strong>${h.result}</strong></td>
      </tr>
    `;
  }).join("");

  // Assemble the full modal HTML
  modalContent.innerHTML = `
    <div class="modal-match-header">
      <div style="text-align:center">
        <div class="modal-team-flag">${match.homeTeam.flag}</div>
        <div class="modal-team-name">${match.homeTeam.name}</div>
      </div>
      <div class="modal-score">
        ${match.homeTeam.score} – ${match.awayTeam.score}
        <small>${match.time} · ${match.stage}</small>
      </div>
      <div style="text-align:center">
        <div class="modal-team-flag">${match.awayTeam.flag}</div>
        <div class="modal-team-name">${match.awayTeam.name}</div>
      </div>
    </div>

    <p style="color:var(--text-muted); font-size:0.82rem; margin-bottom:1rem">
      <i class="fa fa-location-dot" style="color:var(--green-neon)"></i>
      ${match.stadium}
    </p>

    <h3 class="modal-section-title">📋 Expected Lineups (4-3-3)</h3>
    <div class="lineup-columns">
      <div class="lineup-col">
        <h5>${match.homeTeam.name}</h5>
        <ul>${homeLineup}</ul>
      </div>
      <div class="lineup-col">
        <h5>${match.awayTeam.name}</h5>
        <ul>${awayLineup}</ul>
      </div>
    </div>

    <h3 class="modal-section-title">⭐ Key Players</h3>
    <ul style="padding-left:1rem; line-height:2; font-size:0.9rem">${keyPlayersList}</ul>

    <h3 class="modal-section-title">📊 Head-to-Head History</h3>
    <table class="history-table">
      <thead>
        <tr><th>Year</th><th>Tournament</th><th>Result</th></tr>
      </thead>
      <tbody>${historyRows}</tbody>
    </table>
  `;

  // Show the modal by adding .active class
  modalOverlay.classList.add("active");

  // Prevent page scrolling while modal is open
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("active");
  document.body.style.overflow = ""; // Restore scrolling
}

// Close modal when X button is clicked
modalClose.addEventListener("click", closeModal);

// Close modal when clicking the dark background overlay
modalOverlay.addEventListener("click", function (event) {
  // Only close if the click is on the overlay itself, not the modal box
  if (event.target === modalOverlay) {
    closeModal();
  }
});

// Close modal when user presses the Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});


// ================================================================
// 7. UPCOMING MATCHES — Cards with live countdown timers
// ================================================================

function renderUpcoming() {
  const grid = document.getElementById("upcomingGrid");
  if (!grid) return;

  upcomingData.forEach(function (match, index) {
    // Format date as "Fri Jun 14, 2026 at 6:00 PM"
    const dateOptions = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const dateStr = match.date.toLocaleDateString("en-US", dateOptions);
    const timeStr = match.date.toLocaleTimeString("en-US", timeOptions);

    // Each countdown needs a unique ID so we can update it with setInterval
    const countdownId = `countdown-${index}`;

    const card = `
      <div class="upcoming-card reveal">

        <div class="upcoming-date">
          📅 ${dateStr} &nbsp; at &nbsp; ${timeStr}
        </div>

        <div class="upcoming-teams">
          <div class="upcoming-team">
            <span class="upcoming-flag">${match.homeTeam.flag}</span>
            <span class="upcoming-name">${match.homeTeam.name}</span>
          </div>
          <span class="vs-badge">VS</span>
          <div class="upcoming-team">
            <span class="upcoming-flag">${match.awayTeam.flag}</span>
            <span class="upcoming-name">${match.awayTeam.name}</span>
          </div>
        </div>

        <!-- Countdown timer container — values injected by updateCountdowns() -->
        <div class="countdown" id="${countdownId}">
          <div class="countdown-unit">
            <span class="countdown-num" id="${countdownId}-days">--</span>
            <span class="countdown-label">Days</span>
          </div>
          <div class="countdown-unit">
            <span class="countdown-num" id="${countdownId}-hours">--</span>
            <span class="countdown-label">Hours</span>
          </div>
          <div class="countdown-unit">
            <span class="countdown-num" id="${countdownId}-mins">--</span>
            <span class="countdown-label">Mins</span>
          </div>
          <div class="countdown-unit">
            <span class="countdown-num" id="${countdownId}-secs">--</span>
            <span class="countdown-label">Secs</span>
          </div>
        </div>

        <div class="upcoming-stadium">
          <i class="fa fa-location-dot"></i> ${match.stadium} &nbsp;·&nbsp; ${match.stage}
        </div>

      </div>
    `;

    grid.insertAdjacentHTML("beforeend", card);
  });
}

// ---- COUNTDOWN TIMER LOGIC ----
// This function runs every second and updates all countdown timers.
function updateCountdowns() {
  const now = new Date(); // Get current time

  upcomingData.forEach(function (match, index) {
    const id = `countdown-${index}`;

    // Calculate how many milliseconds remain until the match
    const diff = match.date - now;

    if (diff <= 0) {
      // Match has started! Show KICK OFF message
      const el = document.getElementById(id);
      if (el) el.innerHTML = `<span style="color:var(--red-live); font-weight:700; letter-spacing:2px">🔴 KICK OFF!</span>`;
      return; // Skip to next match
    }

    // Convert milliseconds into days, hours, minutes, seconds
    // Math.floor() rounds down to a whole number
    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    // Update each number element
    // padStart(2,'0') adds a leading zero if number is single digit (e.g. 5 → "05")
    const daysEl  = document.getElementById(`${id}-days`);
    const hoursEl = document.getElementById(`${id}-hours`);
    const minsEl  = document.getElementById(`${id}-mins`);
    const secsEl  = document.getElementById(`${id}-secs`);

    if (daysEl)  daysEl.innerText  = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, "0");
    if (minsEl)  minsEl.innerText  = String(mins).padStart(2, "0");
    if (secsEl)  secsEl.innerText  = String(secs).padStart(2, "0");
  });
}

renderUpcoming();
updateCountdowns();            // Run immediately
setInterval(updateCountdowns, 1000); // Update every second


// ================================================================
// 8. TEAMS — Render team cards
// ================================================================

function renderTeams() {
  const grid = document.getElementById("teamsGrid");
  if (!grid) return;

  teamsData.forEach(function (team) {
    const card = `
      <div class="team-card reveal">
        <span class="team-country-flag">${team.flag}</span>
        <div class="team-country-name">${team.name}</div>
        <div class="team-ranking">🏆 ${team.ranking}</div>
        <div class="team-info-row">
          <span>Coach</span>
          <span>${team.coach}</span>
        </div>
        <div class="team-stars">⭐ ${team.starPlayers}</div>
      </div>
    `;
    grid.insertAdjacentHTML("beforeend", card);
  });
}

renderTeams();


// ================================================================
// 9. PLAYERS — Render player cards + filter by position
// ================================================================

function renderPlayers(filter) {
  const grid = document.getElementById("playersGrid");
  if (!grid) return;

  // On first load (filter === "all"), build the cards
  // On filter change, show/hide existing cards using CSS class

  if (grid.children.length === 0) {
    // First render: create all cards
    playersData.forEach(function (player) {
      const card = `
        <div class="player-card reveal" data-position="${player.position}">

          <div class="player-img-wrap">
            <img src="${player.img}"
                 alt="${player.name}"
                 loading="lazy"
                 onerror="this.src='https://via.placeholder.com/400x220/162316/39ff14?text=Player'">
            <span class="player-number">${player.number}</span>
          </div>

          <div class="player-info">
            <div class="player-country">${player.country}</div>
            <div class="player-name">${player.name}</div>
            <span class="player-position">${player.position.toUpperCase()}</span>
            <div class="player-stats">
              <div class="stat-pill">
                <span class="s-num">${player.goals}</span>
                <span class="s-label">Goals</span>
              </div>
              <div class="stat-pill">
                <span class="s-num">${player.assists}</span>
                <span class="s-label">Assists</span>
              </div>
              <div class="stat-pill">
                <span class="s-num">${player.matches}</span>
                <span class="s-label">Games</span>
              </div>
            </div>
          </div>
        </div>
      `;
      grid.insertAdjacentHTML("beforeend", card);
    });
  }

  // Show / hide cards based on selected filter
  const allCards = grid.querySelectorAll(".player-card");
  allCards.forEach(function (card) {
    if (filter === "all" || card.dataset.position === filter) {
      card.classList.remove("hidden"); // Show the card
    } else {
      card.classList.add("hidden");    // Hide the card
    }
  });
}

// Set up filter button click events
document.querySelectorAll(".filter-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    // Remove "active" from all buttons, add to clicked one
    document.querySelectorAll(".filter-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    this.classList.add("active");

    // Filter the players based on the button's data-filter attribute
    renderPlayers(this.dataset.filter);
  });
});

renderPlayers("all"); // Show all players on load


// ================================================================
// 10. TOP SCORERS — Render the leaderboard table
// ================================================================

function renderScorers() {
  const tbody = document.getElementById("scorersBody");
  if (!tbody) return;

  scorersData.forEach(function (scorer) {
    // Apply gold/silver/bronze class to top 3
    const rankClass = `rank-${scorer.rank}`;

    const row = `
      <tr>
        <td><span class="rank-num ${rankClass}">${scorer.rank}</span></td>
        <td><strong>${scorer.name}</strong></td>
        <td>${scorer.country}</td>
        <td><span class="goals-num">${scorer.goals}</span></td>
        <td>${scorer.assists}</td>
        <td>${scorer.matches}</td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", row);
  });
}

renderScorers();


// ================================================================
// 11. GALLERY — Render photo grid
// ================================================================

function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  galleryData.forEach(function (item) {
    const el = `
      <div class="gallery-item reveal">
        <img src="${item.img}"
             alt="${item.caption}"
             loading="lazy"
             onerror="this.src='https://via.placeholder.com/600x400/162316/39ff14?text=Photo'">
        <div class="gallery-caption">
          <span>${item.caption}</span>
        </div>
      </div>
    `;
    grid.insertAdjacentHTML("beforeend", el);
  });
}

renderGallery();


// ================================================================
// 12. SCROLL REVEAL ANIMATION
// ----------------------------------------------------------------
// IntersectionObserver watches elements as they enter the viewport.
// When they become visible, we add the .visible class which
// triggers the CSS fade-in + slide-up animation.
// ================================================================

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Element is now visible in the viewport
        entry.target.classList.add("visible");
        // Stop observing this element (animation only plays once)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,  // Trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px" // Small offset from bottom
  }
);

// Observe ALL elements with the .reveal class
// We use a MutationObserver to catch dynamically added elements too
function observeRevealElements() {
  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });
}

observeRevealElements();

// Re-observe when new elements are added to the DOM (e.g. after filter)
const mutationObs = new MutationObserver(observeRevealElements);
mutationObs.observe(document.body, { childList: true, subtree: true });


// ================================================================
// 13. ACTIVE NAV LINK — Highlight current section in navbar
// ----------------------------------------------------------------
// As the user scrolls, we detect which section is most visible
// and highlight the corresponding nav link.
// ================================================================

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {
  let currentSection = "";

  sections.forEach(function (section) {
    // Get how far the top of the section is from the top of the page
    const sectionTop = section.offsetTop - 120; // 120px offset for navbar height

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  // Update which nav link looks "active"
  navItems.forEach(function (link) {
    link.classList.remove("active");
    // Check if this link points to the current section
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});

// ================================================================
// END OF SCRIPT
// All functions are called at the bottom of their definitions above.
// The page is fully dynamic — data changes in the arrays at the
// top of this file will automatically update the website.
// ================================================================
