<div align="center">
  <h1>MatchaAI</h1>
  <p><strong>A calm place to slow down, talk, and take care of yourself</strong></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#project-structure">Structure</a> •
    <a href="#installation">Installation</a> •
    <a href="#deployment">Deployment</a> •
    <a href="#roadmap">Roadmap</a>
  </p>
</div>

## About

MatchaAI is a wellness companion built around the matcha ritual — the idea that a few deliberate minutes can change the shape of a day. It pairs a supportive chatbot with a small lifestyle site: the science behind the leaf, six no-pressure games, and a vetted list of places to turn when things get heavy.

The chat side combines a cloud model (OpenAI) with local inference (Ollama) for private deployment, plus crisis detection and session memory so conversations carry context instead of starting cold every time.

## Features

**Front end**
- **Four linked pages** — Lifestyle (home), Companion (full-page chat), The Calm Corner (games), Resources
- **Floating chat widget** — available on every page, talks to the same `/chat` endpoint
- **Half-pill navbar** — anchored to the top edge, fades up and away as you scroll down, returns at the top
- **Light and dark modes** — remembered across visits
- **Ritual cards** — Pour, Whisk, Pause; hover reveals the ceremony detail (water temperature, the bamboo chasen, *ichigo ichie*)
- **Hero video with live tweaks** — clip start, clip end, and playback speed
- **Static by design** — plain HTML, no build step, no framework install

**Back end**
- **Dual AI backend** — cloud (OpenAI API) or local (Ollama) for privacy or performance
- **Crisis detection** — flags high-risk language and responds with hotline resources before anything else runs
- **Document engine** — routes "how do I…" questions to curated wellness docs instead of the LLM
- **Conversation memory** — per-session context via `session_id`
- **Leaderboard API** — top-five score store, ready for scored mini-games

## Demo

**Live:** [matchai.onrender.com](https://matchai.onrender.com) — API at [matchaibackend.onrender.com](https://matchaibackend.onrender.com)

<details>
<summary>Version history</summary>

Version 1
![Version 1](matchaiver2.png)

Version 2
![Version 2](matchaicurrver.png)

Version 3
![Version 3](matchacurr.png)

</details>

## Tech Stack

**Front end** — static HTML, inline CSS, vanilla JS (previously React + Tailwind; see git history)

**Back end** — FastAPI (Python), OpenAI API, LlamaIndex, Ollama

**AI/ML** — semantic search with embeddings, keyword intent routing, context-aware conversation handling

## Project Structure

```
matchaAI/
├── backend/
│   ├── main.py              # FastAPI server: /chat, /doc-chat, /leaderboard
│   ├── chat_engine.py       # conversational LLM + session memory
│   ├── doc_engine.py        # document search over data/
│   ├── crisis.py            # crisis keyword detection
│   ├── logger.py            # chat logging
│   └── requirements.txt
├── frontend/
│   └── public/              # the deployed site (publish directory)
│       ├── index.html       # Lifestyle — home
│       ├── matchai.html     # Companion — full-page chat
│       ├── play.html        # The Calm Corner — games
│       ├── resources.html   # Resources
│       ├── ChatWidget.dc.html
│       ├── support.js       # runtime
│       ├── config.js        # backend URL
│       └── uploads/         # photography
├── data/                    # document engine source files
│   ├── mindfulness/  nutrition/  sleep/  stress/
└── render.yaml
```

## Installation

**Prerequisites** — Python 3.8+, and (optionally) Ollama for offline mode. The front end needs no toolchain.

### Backend

```bash
git clone https://github.com/Juveria22/MatchaAI.git
cd MatchaAI/backend

python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt
uvicorn main:app --reload       # http://127.0.0.1:8000
```

### Frontend

No install, no build. Serve the folder:

```bash
cd frontend/public
python -m http.server 3000      # http://localhost:3000
```

Then point the site at your backend in `frontend/public/config.js`:

```js
window.MATCHAI_API_BASE = "http://127.0.0.1:8000";   // or your Render URL
```

Open the files directly (`file://`) and the pages still render — only the chat needs the API.

## API

```
POST /chat          { "query": "...", "session_id": "<uuid>" }  ->  { "response": "..." }
POST /doc-chat      { "query": "...", "session_id": "<uuid>" }  ->  { "response": "..." }
GET  /leaderboard                                               ->  [ { "name", "score" } ]
POST /leaderboard   { "name": "...", "score": 0 }               ->  top five
```

The widget stores a `session_id` in `localStorage` so memory survives reloads.

## Deployment

Static front end on Render:

- **Build Command:** *(empty)*
- **Publish Directory:** `frontend/public`

`render.yaml` encodes both for blueprint deploys. In production, narrow CORS in `backend/main.py` from `["*"]` to your site origin.

## Roadmap

- [ ] **Mobile app** — native iOS/Android
- [ ] **Advanced analytics** — sentiment tracking and mood patterns over time
- [ ] **Database integration** — persistent chat history
- [x] **Mini games** — six calm activities in The Calm Corner
- [ ] **Scored games** — wire the clicker into the existing `/leaderboard` API
- [ ] **Voice support** — voice input and output
- [ ] **Multi-language** — support for non-English speakers
- [x] **Resource library** — curated support lines and reading

## Contributing

Contributions are welcome — report bugs, suggest features, open pull requests. Please open an issue first to discuss major changes.

## Disclaimer

MatchaAI is not a replacement for professional mental health care. If you're in crisis, please reach out:

- **988 Suicide & Crisis Lifeline** — call or text 988
- **Crisis Text Line** — text HOME to 741741
- **International Association for Suicide Prevention** — [befrienders.org](https://www.befrienders.org)

## Acknowledgments

Built for anyone having a hard time. You're not alone, and it's okay to not be okay sometimes.

Built with [FastAPI](https://fastapi.tiangolo.com), [LlamaIndex](https://www.llamaindex.ai), [Ollama](https://ollama.ai), and [OpenAI](https://openai.com).

<div align="center">
  <p>Made with a glass of matcha and &lt;3 by <a href="https://github.com/juveriaamin22">Juveria Amin</a></p>
  <p>If this project helped you, consider giving it a ⭐!</p>
</div>
