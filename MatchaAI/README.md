"https://www.youtube.com/watch?v=jeOfS90Flf8" - read me file tips a nd tricks 
"https://code.visualstudio.com/docs/languages/markdown" -  vsc markdown documentation 

# Project Title
Example: Matchai – Mental Health AI Chatbot

# Overview
Brief description of what the project is and why you built it.
Example:

Matchai is a web-based mental health AI chatbot designed to provide emotional support, encouragement, and crisis detection. The chatbot uses both OpenAI and local LLM embeddings via Ollama for flexible deployment and a fully responsive user experience.

# Tech Stack
Frontend: React, Tailwindcss

Backend: FastAPI, Python

AI/NLP: OpenAI API, LlamaIndex, Ollama (local LLM use)

Other: Semantic Search, Session Memory

#  Key Features
Responsive chat interface with real-time message handling

Local LLM integration using Ollama for offline capability

Crisis detection for mental health-related keywords

Session memory for personalized multi-turn conversations

Flexible API architecture supporting both cloud and local models

# 📸 Screenshots 

Version 1
![Version 1](matchaiver2.png)

Version 2 (Version 2) 
![Version 2](matchaicurrver.png) 

Version 3 (Current Version)
![Current version](matchacurr.png) 

# 🗺️ Project Structure

├── backend/          # FastAPI server
├── frontend/         # HTML, CSS, JavaScript files
├── data/           # doc engine txt files
├── README.md
└── requirements.txt  # Python dependencies


# Installation
npm install

## Clone the repository
git clone https://github.com/juveriaamin22/myProjects.git

## Navigate to the backend directory
cd backend

## Install backend dependencies
pip install -r requirements.txt

## Run FastAPI server
uvicorn main:app --reload

# Usage
Open website deployed on render.

Type a message to start chatting.

Click enter or select the send button. 

# Future Improvements 
Mobile responsiveness/make it cross platform.

Advanced sentiment analysis based on past behaviors. 

Cloud deployment with database support. 

Integration of cute matcha/chai/other teas pick me up mini games. 

# Acknowledgments 
Inspired by mental health advocacy initiatives. I personally struggle with my mental health when I go through a rough patch and I know many of us do as well! I wanted to make a cute welcoming bot that you could go to to make yourself feel a little bit better. 

Built using FastAPI, LlamaIndex, and Ollama.