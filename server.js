const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "movie-booking-system" });
});

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CinePulse | Movie Booking</title>
  <style>
    :root {
      --bg: #0b1020;
      --panel: rgba(18, 24, 45, 0.88);
      --card: rgba(255, 255, 255, 0.06);
      --border: rgba(255, 255, 255, 0.12);
      --text: #e9ecff;
      --muted: #aab3d6;
      --accent: #7c5cff;
      --accent2: #21d4fd;
      --good: #39d98a;
      --danger: #ff6b81;
      --shadow: 0 20px 60px rgba(0,0,0,.35);
      --radius: 24px;
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background:
        radial-gradient(circle at top left, rgba(124,92,255,.28), transparent 30%),
        radial-gradient(circle at top right, rgba(33,212,253,.18), transparent 25%),
        linear-gradient(180deg, #070b17 0%, #0b1020 100%);
      color: var(--text);
      min-height: 100vh;
    }

    .wrap {
      max-width: 1280px;
      margin: 0 auto;
      padding: 28px;
    }

    .hero {
      background: linear-gradient(135deg, rgba(124,92,255,.22), rgba(33,212,253,.12));
      border: 1px solid var(--border);
      border-radius: 32px;
      box-shadow: var(--shadow);
      overflow: hidden;
      position: relative;
    }

    .hero::after {
      content: "";
      position: absolute;
      inset: auto -80px -120px auto;
      width: 260px;
      height: 260px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(33,212,253,.25), transparent 70%);
      pointer-events: none;
    }

    .nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 24px 0;
      gap: 16px;
      flex-wrap: wrap;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 800;
      letter-spacing: .3px;
      font-size: 1.2rem;
    }

    .logo {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      display: grid;
      place-items: center;
      box-shadow: 0 10px 30px rgba(124,92,255,.35);
    }

    .pill {
      padding: 10px 16px;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: rgba(255,255,255,.05);
      color: var(--muted);
      font-size: .92rem;
      backdrop-filter: blur(10px);
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1.2fr .8fr;
      gap: 22px;
      padding: 26px 24px 24px;
      align-items: center;
    }

    .headline h1 {
      margin: 0;
      font-size: clamp(2rem, 5vw, 4.4rem);
      line-height: 1.02;
      letter-spacing: -1.5px;
    }

    .headline p {
      margin: 16px 0 0;
      max-width: 62ch;
      color: var(--muted);
      font-size: 1rem;
      line-height: 1.7;
    }

    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-top: 22px;
    }

    .stat {
      border: 1px solid var(--border);
      background: rgba(255,255,255,.05);
      border-radius: 20px;
      padding: 16px;
      backdrop-filter: blur(10px);
    }

    .stat strong {
      display: block;
      font-size: 1.4rem;
      margin-bottom: 5px;
    }

    .stat span { color: var(--muted); font-size: .9rem; }

    .hero-card {
      border: 1px solid var(--border);
      background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
      border-radius: 28px;
      padding: 20px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
    }

    .hero-card h3 { margin: 0 0 12px; }
    .hero-card .mini {
      display: grid;
      gap: 10px;
      color: var(--muted);
      font-size: .95rem;
    }

    .main {
      margin-top: 24px;
      display: grid;
      grid-template-columns: 1.1fr .9fr;
      gap: 22px;
    }

    .panel {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      padding: 20px;
    }

    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .section-title h2 {
      margin: 0;
      font-size: 1.3rem;
    }

    .section-title small { color: var(--muted); }

    .filters {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    .chip, select, button {
      border: 1px solid var(--border);
      border-radius: 14px;
      background: rgba(255,255,255,.05);
      color: var(--text);
      padding: 11px 14px;
      font: inherit;
    }

    .chip {
      cursor: pointer;
      transition: .2s ease;
    }

    .chip:hover, .chip.active {
      transform: translateY(-1px);
      background: linear-gradient(135deg, rgba(124,92,255,.28), rgba(33,212,253,.16));
      border-color: rgba(255,255,255,.18);
    }

    .movies {
      display: grid;
      gap: 14px;
    }

    .movie {
      display: grid;
      grid-template-columns: 110px 1fr auto;
      gap: 14px;
      align-items: center;
      padding: 14px;
      border-radius: 20px;
      background: rgba(255,255,255,.04);
      border: 1px solid var(--border);
      transition: .2s ease;
      cursor: pointer;
    }

    .movie:hover {
      transform: translateY(-2px);
      background: rgba(255,255,255,.06);
    }

    .movie.selected {
      border-color: rgba(33,212,253,.45);
      box-shadow: 0 0 0 1px rgba(33,212,253,.2) inset;
    }

    .poster {
      width: 110px;
      height: 146px;
      border-radius: 18px;
      background-size: cover;
      background-position: center;
      position: relative;
      overflow: hidden;
    }

    .poster::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent, rgba(0,0,0,.35));
    }

    .movie h3 {
      margin: 0 0 6px;
      font-size: 1.08rem;
    }

    .meta {
      color: var(--muted);
      font-size: .92rem;
      line-height: 1.55;
    }

    .tag-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 10px;
    }

    .tag {
      padding: 6px 10px;
      border-radius: 999px;
      background: rgba(255,255,255,.07);
      color: #dbe4ff;
      font-size: .8rem;
      border: 1px solid rgba(255,255,255,.09);
    }

    .price {
      text-align: right;
      min-width: 88px;
    }

    .price strong {
      display: block;
      font-size: 1.25rem;
    }

    .price span {
      color: var(--muted);
      font-size: .85rem;
    }

    .booking-grid {
      display: grid;
      gap: 16px;
    }

    .field label {
      display: block;
      margin-bottom: 8px;
      color: var(--muted);
      font-size: .9rem;
    }

    .field select, .field input {
      width: 100%;
      outline: none;
    }

    .seats {
      display: grid;
      gap: 10px;
    }

    .screen {
      height: 10px;
      border-radius: 999px;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
      margin: 8px 0 14px;
    }

    .seat-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 8px;
    }

    .seat {
      aspect-ratio: 1 / 1;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,.06);
      color: var(--text);
      cursor: pointer;
      font-size: .8rem;
      transition: .15s ease;
    }

    .seat:hover { transform: translateY(-1px); }
    .seat.taken {
      background: rgba(255,107,129,.16);
      color: #ffb4bf;
      cursor: not-allowed;
      text-decoration: line-through;
    }
    .seat.selected {
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      color: white;
      border-color: transparent;
    }

    .legend {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      color: var(--muted);
      font-size: .88rem;
    }

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
      vertical-align: -1px;
    }

    .summary {
      display: grid;
      gap: 14px;
    }

    .summary-box {
      border: 1px solid var(--border);
      background: rgba(255,255,255,.04);
      border-radius: 18px;
      padding: 16px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin: 8px 0;
      color: var(--muted);
    }

    .summary-row strong { color: var(--text); }
    .total {
      font-size: 1.2rem;
      color: var(--text);
      margin-top: 12px;
    }

    .actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .btn {
      cursor: pointer;
      font-weight: 700;
      transition: .2s ease;
    }

    .btn.primary {
      background: linear-gradient(135deg, var(--accent), var(--accent2));
      border-color: transparent;
      color: white;
      box-shadow: 0 12px 30px rgba(124,92,255,.25);
    }

    .btn:hover { transform: translateY(-1px); }

    .history {
      max-height: 220px;
      overflow: auto;
      display: grid;
      gap: 10px;
    }

    .history-item {
      background: rgba(255,255,255,.04);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 12px;
      color: var(--muted);
      font-size: .92rem;
    }

    .toast {
      position: fixed;
      right: 18px;
      bottom: 18px;
      padding: 14px 16px;
      border-radius: 16px;
      background: rgba(17, 24, 39, .95);
      border: 1px solid rgba(255,255,255,.12);
      box-shadow: var(--shadow);
      opacity: 0;
      transform: translateY(14px);
      pointer-events: none;
      transition: .3s ease;
      max-width: 320px;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 1024px) {
      .hero-content, .main { grid-template-columns: 1fr; }
      .movie { grid-template-columns: 90px 1fr; }
      .price { grid-column: 1 / -1; text-align: left; }
    }

    @media (max-width: 640px) {
      .wrap { padding: 14px; }
      .nav, .hero-content, .panel { padding-left: 16px; padding-right: 16px; }
      .stats { grid-template-columns: 1fr; }
      .seat-grid { grid-template-columns: repeat(4, 1fr); }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div class="nav">
        <div class="brand">
          <div class="logo">🎬</div>
          <div>
            CinePulse
            <div style="font-size:.8rem;color:var(--muted);font-weight:500;">Book movies in seconds</div>
          </div>
        </div>
        <div class="pill">Now showing · Premium seats · Fast checkout</div>
      </div>

      <div class="hero-content">
        <div class="headline">
          <h1>Book your perfect movie night.</h1>
          <p>
            A clean, modern movie booking experience with quick seat selection, showtime choices, and instant booking summary.
            Built for easy production deployment.
          </p>

          <div class="stats">
            <div class="stat"><strong>12+</strong><span>Top movies</span></div>
            <div class="stat"><strong>8</strong><span>Seats per row</span></div>
            <div class="stat"><strong>1 min</strong><span>Fast booking</span></div>
          </div>
        </div>

        <div class="hero-card">
          <h3>Tonight’s highlights</h3>
          <div class="mini">
            <div>✨ Comfortable seat map with live selection</div>
            <div>🍿 Genre filters for quick browsing</div>
            <div>⚡ Instant confirmation summary</div>
            <div>📱 Mobile-friendly responsive layout</div>
          </div>
        </div>
      </div>
    </section>

    <section class="main">
      <div class="panel">
        <div class="section-title">
          <div>
            <h2>Choose a movie</h2>
            <small>Select a title to continue booking</small>
          </div>
          <small id="movieCount"></small>
        </div>

        <div class="filters">
          <button class="chip active" data-filter="All">All</button>
          <button class="chip" data-filter="Action">Action</button>
          <button class="chip" data-filter="Drama">Drama</button>
          <button class="chip" data-filter="Sci-Fi">Sci-Fi</button>
          <button class="chip" data-filter="Comedy">Comedy</button>
        </div>

        <div class="movies" id="movieList"></div>
      </div>

      <div class="panel">
        <div class="section-title">
          <div>
            <h2>Booking panel</h2>
            <small>Pick time, seats, and confirm</small>
          </div>
        </div>

        <div class="booking-grid">
          <div class="field">
            <label for="showTime">Show time</label>
            <select id="showTime"></select>
          </div>

          <div class="seats">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;">
              <div>
                <strong>Select seats</strong><br>
                <small style="color:var(--muted)">Available seats are dark. Taken seats are blocked.</small>
              </div>
              <div class="pill" id="seatInfo">0 selected</div>
            </div>

            <div class="screen"></div>
            <div class="seat-grid" id="seatGrid"></div>

            <div class="legend">
              <span><span class="dot" style="background:rgba(255,255,255,.06)"></span>Available</span>
              <span><span class="dot" style="background:linear-gradient(135deg,var(--accent),var(--accent2))"></span>Selected</span>
              <span><span class="dot" style="background:rgba(255,107,129,.16)"></span>Taken</span>
            </div>
          </div>

          <div class="summary">
            <div class="summary-box">
              <strong>Summary</strong>
              <div class="summary-row"><span>Movie</span><strong id="sumMovie">-</strong></div>
              <div class="summary-row"><span>Genre</span><strong id="sumGenre">-</strong></div>
              <div class="summary-row"><span>Time</span><strong id="sumTime">-</strong></div>
              <div class="summary-row"><span>Seats</span><strong id="sumSeats">-</strong></div>
              <div class="summary-row"><span>Ticket price</span><strong id="sumPrice">-</strong></div>
              <div class="total">Total: <strong id="sumTotal">₹0</strong></div>
            </div>

            <div class="actions">
              <button class="btn primary" id="bookBtn">Book Now</button>
              <button class="btn" id="resetBtn">Reset</button>
            </div>

            <div class="summary-box">
              <strong>Recent bookings</strong>
              <div class="history" id="history"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div class="toast" id="toast"></div>

  <script>
    const movies = [
      {
        id: 1,
        title: "Galaxy Drift",
        genre: "Sci-Fi",
        duration: "2h 18m",
        rating: "8.7/10",
        price: 220,
        poster: "linear-gradient(180deg, rgba(124,92,255,.95), rgba(10,14,30,.2)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80')"
      },
      {
        id: 2,
        title: "City of Echoes",
        genre: "Drama",
        duration: "2h 02m",
        rating: "8.1/10",
        price: 180,
        poster: "linear-gradient(180deg, rgba(33,212,253,.55), rgba(10,14,30,.2)), url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80')"
      },
      {
        id: 3,
        title: "Velocity X",
        genre: "Action",
        duration: "2h 11m",
        rating: "8.4/10",
        price: 250,
        poster: "linear-gradient(180deg, rgba(255,107,129,.55), rgba(10,14,30,.2)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80')"
      },
      {
        id: 4,
        title: "Laugh Riot",
        genre: "Comedy",
        duration: "1h 49m",
        rating: "8.0/10",
        price: 160,
        poster: "linear-gradient(180deg, rgba(57,217,138,.55), rgba(10,14,30,.2)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80')"
      }
    ];

    const showTimes = ["10:30 AM", "01:15 PM", "04:00 PM", "07:30 PM", "10:10 PM"];
    const seatRows = ["A","B","C","D","E","F"];
    const seatCols = [1,2,3,4,5,6,7,8];
    const takenSeats = ["A2","A7","B4","C1","C6","D8","E3","F5"];

    let currentFilter = "All";
    let selectedMovie = movies[0];
    let selectedTime = showTimes[3];
    let selectedSeats = new Set();

    const movieList = document.getElementById("movieList");
    const movieCount = document.getElementById("movieCount");
    const seatGrid = document.getElementById("seatGrid");
    const showTime = document.getElementById("showTime");
    const toast = document.getElementById("toast");
    const historyEl = document.getElementById("history");

    const sumMovie = document.getElementById("sumMovie");
    const sumGenre = document.getElementById("sumGenre");
    const sumTime = document.getElementById("sumTime");
    const sumSeats = document.getElementById("sumSeats");
    const sumPrice = document.getElementById("sumPrice");
    const sumTotal = document.getElementById("sumTotal");
    const seatInfo = document.getElementById("seatInfo");

    function money(n) {
      return "₹" + n.toLocaleString("en-IN");
    }

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 2200);
    }

    function renderMovies() {
      const filtered = currentFilter === "All"
        ? movies
        : movies.filter(m => m.genre === currentFilter);

      movieCount.textContent = filtered.length + " movie(s)";

      movieList.innerHTML = filtered.map(m => \`
        <div class="movie \${selectedMovie.id === m.id ? "selected" : ""}" data-id="\${m.id}">
          <div class="poster" style="background-image:\${m.poster}"></div>
          <div>
            <h3>\${m.title}</h3>
            <div class="meta">\${m.genre} · \${m.duration}<br>IMDb \${m.rating}</div>
            <div class="tag-row">
              <span class="tag">\${m.genre}</span>
              <span class="tag">Dolby</span>
              <span class="tag">4K</span>
            </div>
          </div>
          <div class="price">
            <strong>\${money(m.price)}</strong>
            <span>per ticket</span>
          </div>
        </div>
      \`).join("");

      document.querySelectorAll(".movie").forEach(card => {
        card.addEventListener("click", () => {
          const id = Number(card.dataset.id);
          selectedMovie = movies.find(m => m.id === id);
          selectedSeats.clear();
          renderMovies();
          renderSeats();
          updateSummary();
          showToast(selectedMovie.title + " selected");
        });
      });
    }

    function renderShowTimes() {
      showTime.innerHTML = showTimes.map(t => \`<option value="\${t}">\${t}</option>\`).join("");
      showTime.value = selectedTime;
      showTime.addEventListener("change", e => {
        selectedTime = e.target.value;
        updateSummary();
      });
    }

    function renderSeats() {
      seatGrid.innerHTML = "";
      seatRows.forEach(r => {
        seatCols.forEach(c => {
          const seatId = r + c;
          const btn = document.createElement("button");
          btn.className = "seat";
          btn.textContent = seatId;
          btn.type = "button";
          btn.dataset.seat = seatId;

          if (takenSeats.includes(seatId)) {
            btn.classList.add("taken");
            btn.disabled = true;
          }

          if (selectedSeats.has(seatId)) {
            btn.classList.add("selected");
          }

          btn.addEventListener("click", () => {
            if (takenSeats.includes(seatId)) return;
            if (selectedSeats.has(seatId)) {
              selectedSeats.delete(seatId);
            } else {
              selectedSeats.add(seatId);
            }
            renderSeats();
            updateSummary();
          });

          seatGrid.appendChild(btn);
        });
      });
    }

    function updateSummary() {
      const seats = [...selectedSeats].sort();
      const count = seats.length;
      const total = count * selectedMovie.price;

      sumMovie.textContent = selectedMovie.title;
      sumGenre.textContent = selectedMovie.genre;
      sumTime.textContent = selectedTime;
      sumSeats.textContent = count ? seats.join(", ") : "-";
      sumPrice.textContent = money(selectedMovie.price);
      sumTotal.textContent = money(total);
      seatInfo.textContent = count + " selected";
    }

    function loadHistory() {
      const history = JSON.parse(localStorage.getItem("cinepulseBookings") || "[]");
      historyEl.innerHTML = history.length
        ? history.slice(0, 5).map(item => \`
            <div class="history-item">
              <strong>\${item.movie}</strong><br>
              \${item.time} · Seats: \${item.seats} · Total: \${item.total}
            </div>
          \`).join("")
        : '<div class="history-item">No bookings yet. Your first ticket will appear here.</div>';
    }

    function saveBooking(record) {
      const history = JSON.parse(localStorage.getItem("cinepulseBookings") || "[]");
      history.unshift(record);
      localStorage.setItem("cinepulseBookings", JSON.stringify(history.slice(0, 10)));
      loadHistory();
    }

    document.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        currentFilter = chip.dataset.filter;
        renderMovies();
      });
    });

    document.getElementById("bookBtn").addEventListener("click", () => {
      if (!selectedSeats.size) {
        showToast("Please select at least one seat.");
        return;
      }

      const seats = [...selectedSeats].sort();
      const total = seats.length * selectedMovie.price;

      const record = {
        movie: selectedMovie.title,
        time: selectedTime,
        seats: seats.join(", "),
        total: money(total),
        createdAt: new Date().toLocaleString()
      };

      saveBooking(record);
      showToast("Booking confirmed for " + selectedMovie.title + "!");
      selectedSeats.clear();
      renderSeats();
      updateSummary();
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
      selectedMovie = movies[0];
      selectedTime = showTimes[3];
      selectedSeats.clear();
      document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
      document.querySelector('.chip[data-filter="All"]').classList.add("active");
      currentFilter = "All";
      renderMovies();
      renderShowTimes();
      renderSeats();
      updateSummary();
      showToast("Selection reset");
    });

    renderMovies();
    renderShowTimes();
    renderSeats();
    updateSummary();
    loadHistory();
  </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`Movie booking app running on http://localhost:${PORT}`);
});
