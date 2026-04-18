## Website Online on:
## https://gitverify-production.up.railway.app/login

# 🔍 GitVerify

A Flask web app to **verify GitHub repositories** and **build downloadable portfolios** with GitHub trust scores.

---

## Features

- **GitHub Verification** — Enter any public GitHub repo URL. Get a score (0–100), status (Verified / Low Activity / Suspicious), and activity flags.
- **Portfolio Builder** — Fill in your details, link your GitHub repo (auto-verified), and generate a portfolio page.
- **PDF Download** — Download your portfolio as a clean PDF powered by ReportLab.
- **Auth** — Simple signup/login with hashed passwords (Werkzeug).
- **SQLite** — No external database needed.

---

## Folder Structure

```
gitverify/
├── app.py
├── requirements.txt
├── .env.example
├── render.yaml
├── gitverify.db          ← auto-created on first run
├── static/
│   ├── css/style.css
│   └── js/app.js
└── templates/
    ├── base.html
    ├── index.html
    ├── login.html
    ├── signup.html
    ├── github_verification.html
    ├── portfolio_builder.html
    └── portfolio_preview.html
```

---

## Setup & Run Locally

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Create your .env file

```bash
cp .env.example .env
```

Edit `.env`:

```
GITHUB_TOKEN=ghp_your_personal_access_token
SECRET_KEY=any-random-string-here
```

To create a GitHub token: go to **GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)** → Generate with `public_repo` scope.

### 3. Run locally

```bash
python app.py
```

Visit: `http://127.0.0.1:5000`

### 4. Test GitHub Verification

- Sign up → Login → Click **GitHub Verification**
- Enter a repo URL like: `https://github.com/pallets/flask`
- Click **Verify Repository** → See score, status, and metrics

### 5. Create a Portfolio

- Click **Portfolio Builder** from the home screen
- Fill in your details
- Enter a GitHub link and click **Verify GitHub** to auto-fetch the score
- Click **Create Portfolio** → Preview page opens

### 6. Download PDF

- On the portfolio preview page, click **⬇ Download PDF**
- A PDF with your details and GitHub score downloads instantly

---

## Deploy on Render

1. Push this project to a GitHub repo
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repo
4. Set environment variables:
   - `GITHUB_TOKEN` = your token
   - `SECRET_KEY` = a random string
5. Build command: `pip install -r requirements.txt`
6. Start command: `python -c "from app import init_db; init_db()" && gunicorn app:app`
7. Deploy!

> Note: SQLite on Render resets on redeploy. For production persistence, switch to PostgreSQL (free on Render) and update `get_db()` accordingly.

---

## Scoring Logic

| Metric | Max Points |
|--------|-----------|
| Stars | 25 |
| Commits | 35 |
| Contributors | 20 |
| Forks | 10 |
| Open Issues | 10 |
| **Total** | **100** |

| Score | Status |
|-------|--------|
| ≥ 65 | ✅ Verified |
| 35–64 | ⚠ Low Activity |
| < 35 | ❌ Suspicious |
