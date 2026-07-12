// static/main.js
let conversationHistory = [];
let systemPromptLoaded = false;

marked.setOptions({
    highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
        }
        return code;
    },
    breaks: true,
    gfm: true
});

function addMessage(content, isUser) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'message user' : 'message bot';

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';

    // Parse markdown for bot messages only
    if (!isUser) {
        messageContent.innerHTML = marked.parse(content);
        messageContent.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    } else {
        messageContent.textContent = content;
    }

    const timestamp = document.createElement('div');
    timestamp.className = 'timestamp';
    timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // --- Save Button ---
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.textContent = '📋';
    saveBtn.title = 'Save this message';
    saveBtn.style.marginLeft = '0px';
    saveBtn.onclick = async () => {
        saveBtn.disabled = true;
        await saveMessageToServer(content, isUser ? 'user' : 'assistant');
        saveBtn.textContent = '✅';
        setTimeout(() => {
            saveBtn.textContent = '✅';
            saveBtn.disabled = false;
        }, 1200);
    };

    timestamp.appendChild(saveBtn);

    messageDiv.appendChild(messageContent);
    messageDiv.appendChild(timestamp);

    document.getElementById('chat-history').appendChild(messageDiv);
    messageDiv.scrollIntoView({ behavior: 'smooth' });
}

async function saveMessageToServer(message, sender) {
    try {
        await fetch('/save_message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, sender })
        });
    } catch (e) {
        alert('Failed to save message.');
    }
}



function showTypingIndicator() {
    document.querySelector('.typing-indicator').classList.remove('hidden');
}

function hideTypingIndicator() {
    document.querySelector('.typing-indicator').classList.add('hidden');
}

async function sendMessage() {
    if (!systemPromptLoaded) {
        console.error('System prompt is still loading.');
        return;
    }

    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, true);
    input.value = '';
    
    showTypingIndicator();
    
    try {
        conversationHistory.push({
            "role": "user",
            "content": message
        });

        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: conversationHistory })
        });
        const data = await response.json();
        
        // Add bot response only once
        addMessage(data.response, false);
        conversationHistory.push({
            "role": "assistant",
            "content": data.response
        });
        hideTypingIndicator();
    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator();
    }
}

async function loadSystemPrompt() {
    try {
        const response = await fetch('/system_prompt');
        const data = await response.json();

        if (!response.ok || !data.content) {
            throw new Error(data.error || 'Failed to load system prompt.');
        }

        conversationHistory = [{
            role: 'system',
            content: data.content
        }];
        systemPromptLoaded = true;
    } catch (error) {
        console.error('Error loading system prompt:', error);
    }
}

document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Failed to copy text: ', err);
        });
}

// --- DARK MODE LOGIC ---
const darkModeToggle = document.getElementById('dark-mode-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

function setDarkMode(enabled) {
    document.body.classList.toggle('dark-mode', enabled);
    localStorage.setItem('theme', enabled ? 'dark' : 'light');
    darkModeToggle.innerHTML = enabled
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
}

// Initial theme
setDarkMode(savedTheme === 'dark' || (!savedTheme && prefersDark));

darkModeToggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark-mode'));
});

loadSystemPrompt();
