from flask import Flask, request, jsonify, render_template
from chat import chat_response
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    messages = request.json['messages']
    response = chat_response(messages)
    return jsonify({'response': response})

@app.route('/save_message', methods=['POST'])
def save_message():
    data = request.json
    message = data.get('message')
    sender = data.get('sender', 'user')
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open('history.txt', 'a', encoding='utf-8') as f:
        f.write(f"{timestamp} [{sender}]: {message}\n")
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    app.run()