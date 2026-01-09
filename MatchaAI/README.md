<div align="center">
  <h1>MatchaAI</h1>
  <p><strong>Your Comforting Mental Health Companion</strong></p>
  <p>
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#roadmap">Roadmap</a>
  </p>
</div>

About
MatchaAI is a mental health chatbot that offers a warm, safe space for emotional support and encouragement. Born from personal struggles with mental health, this project aims to provide anyone going through a rough patch with a cute, welcoming companion that's there whenever you need a pick-me-up.
The chatbot combines cloud-based AI (OpenAI) with local LLM capabilities (Ollama) for flexible, private deployment, featuring crisis detection and conversational memory to create personalized, meaningful interactions.

Features

Dual AI Backend - Switch between cloud (OpenAI API) and local (Ollama) models for privacy or performance
Crisis Detection - Identifies mental health keywords and responds with appropriate resources
Conversation Memory - Maintains context across chat sessions for more natural conversations
Semantic Search - Uses embeddings to understand context and provide relevant responses
Responsive Design - Fully responsive interface built with React and Tailwind CSS
Offline Capable - Can run entirely locally with Ollama for complete privacy

Demo
Live Demo: MatchaAI on Render (Add your actual deployment link)
Version History
<details>
<summary>Click to see previous versions</summary>
Version 1
![Version 1](matchaiver2.png)

Version 2 (Version 2) 
![Version 2](matchaicurrver.png) 

Version 3 (Current Version)
![Current version](matchacurr.png) 

</details>
Tech Stack
Frontend

React
Tailwind CSS
JavaScript

Backend

FastAPI (Python)
OpenAI API
LlamaIndex
Ollama (local LLM)

AI/ML

Semantic search with embeddings
Natural language processing
Context-aware conversation handling

Project Structure
matchaAI/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── requirements.txt     # Python dependencies
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── ...
│   └── package.json
├── data/
│   └── context_docs/        # Document engine training files
└── README.md
Installation
Prerequisites

Python 3.8+
Node.js 14+
npm or yarn
(Optional) Ollama installed locally for offline mode

Backend Setup
bash# Clone the repository
git clone https://github.com/juveriaamin22/myProjects.git
cd myProjects/matchaAI

# Navigate to backend
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn main:app --reload
The backend will be running at https://matchaibackend.onrender.com
Frontend Setup
bash# From the project root
cd frontend

# Install dependencies
npm install

# Start development server
npm start
The frontend will be running at https://matchai.onrender.com
Usage

Open the web interface at your deployed URL or localhost:3000
Type your message in the chat input
Press Enter or click the send button
MatchaAI will respond with supportive, context-aware messages

For Local/Private Mode:

Ensure Ollama is running with your preferred model
The app will automatically use local inference instead of cloud APIs

Roadmap
Future improvements planned for MatchaAI:

 Mobile App - Native iOS/Android apps for cross-platform accessibility
 Advanced Analytics - Sentiment tracking and mood patterns over time
 Database Integration - Persistent chat history with cloud deployment
 Mini Games - Cute matcha/chai-themed pick-me-up activities and relaxation games
 Voice Support - Voice input/output for hands-free interaction
 Multi-language - Support for non-English speakers
 Resource Library - Curated mental health resources and coping strategies

Contributing
Contributions are welcome! Feel free to:

Report bugs
Suggest new features
Submit pull requests

Please open an issue first to discuss major changes.
! Disclaimer !
MatchaAI is not a replacement for professional mental health care. If you're experiencing a crisis, please contact:

National Suicide Prevention Lifeline: 988
Crisis Text Line: Text HOME to 741741
International Association for Suicide Prevention: befrienders.org

Acknowledgments
This project was created with love for anyone struggling with their mental health. You're not alone, and it's okay to not be okay sometimes.
Built with:

FastAPI
LlamaIndex
Ollama
OpenAI


<div align="center">
  <p>Made with a glass of matcha and <3 by <a href="https://github.com/juveriaamin22">Juveria Amin</a></p>
  <p>If this project helped you, consider giving it a ⭐!</p>
</div>
