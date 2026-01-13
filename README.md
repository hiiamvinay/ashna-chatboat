# 💬 Ashna ChatBot

**An Emotion-Aware AI Companion Powered by Groq & LLaMA**

Ashna ChatBot is a web-based AI companion designed to simulate emotionally rich, intelligent, and engaging conversations. It combines large-language-model reasoning with a customizable personality system, allowing it to be used for romantic, friendly, philosophical, or supportive AI personas.

Powered by **Groq’s LLaMA-3.3-70B model**, Ashna delivers fast, high-quality responses through a modern chat interface.

---

## 🧠 Purpose

This project explores how large language models can be used to build **human-like digital companions** that are:

* Emotionally expressive
* Context-aware
* Philosophical and reflective
* Warm and engaging

Ashna is built for conversation, companionship, and emotional intelligence rather than task automation.

---

## ⚡ Technology Stack

* **Backend:** Python (Flask)
* **LLM Provider:** Groq API
* **Model:** LLaMA-3.3-70B
* **Frontend:** HTML, CSS, JavaScript
* **Rendering:** Markdown (Marked.js), Syntax highlighting (Highlight.js)
* **Storage:** Text-based message history

---

## ✨ Key Features

* Real-time AI chat with conversation memory
* Customizable system personality (system prompt)
* Emotionally expressive responses
* Markdown and code rendering
* Message saving
* Dark / Light mode
* Mobile-friendly UI
* Ultra-low-latency inference using Groq

---

## 📁 Project Structure

```
Ashna-ChatBot/
│
├── app.py
├── chat.py
├── venv/           
├── .env
├── history.txt
├── requirements.txt
├── LICENSE
├── templates/
│   └── index.html
│
├── static/
│   ├── main.js
│   ├── AshnaChatBot.html
│   ├── style.css
│   ├── avatar.png
│   └── chatbot.png

```

---

## 🚀 Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/hiiamvinay/ashna-chatbot.git
cd ashna-chatbot
```

---

### 2️⃣ Create a virtual environment

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS / Linux**

```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt

```

### 4️⃣ Add your Groq API key

Create a `.env` file in the project root:

```
GROQ_API_KEY=your_api_key_here
```

---

### 5️⃣ Run the application

```bash
python app.py
```

Open your browser:

```
http://127.0.0.1:5000
```

---

## 🧩 System Prompt & Personality Change Options

The AI’s personality is controlled through a **system prompt** defined in:

```
static/main.js
```

You can modify this prompt to create:

* A romantic companion
* A friendly assistant
* A philosophical thinker
* A supportive listener
* Or any custom persona

No backend code changes are required.

---

## 📝 Message Storage

Each message can be saved using the 📋 icon.
Saved messages are written to:

```
history.txt
```

Format:

```
YYYY-MM-DD HH:MM:SS [user|assistant]: message
```

---

## 🧪 Intended Use

Ashna ChatBot is suitable for:

* AI companion systems
* Conversational AI experiments
* Emotional intelligence research
* LLM personality modeling
* Web-based chat applications

It can be adapted into dating simulators, virtual friends, or narrative agents.

---

## 🧑‍💻 Author

Developed by **Vinay Daharwal**

---

