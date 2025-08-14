Sentiment Analysis Web Application

A web app for sentiment analysis, allowing users to input text and view sentiment results (Positive, Negative, Neutral) with color-coded outputs: Green for Positive, Red for Negative, Grey for Neutral.

Frontend

Framework: React

File: src/Homepage.js with text input, “Analyze” button, and color-coded results

Dependencies (package.json):

axios@^1.7.7

react@^18.2.0

react-dom@^18.2.0

react-scripts@5.0.1

Backend

Framework: Flask (Python)

File: server.py with a POST endpoint at "/"

Sentiment Analysis: Hugging Face Inference API (cardiffnlp/twitter-roberta-base-sentiment)

Dependencies (requirements.txt):

flask==3.0.3

flask-cors==5.0.0

python-dotenv==1.0.1

huggingface_hub==0.25.1

gunicorn==23.0.0


Deployment: Render Web Service

Build: pip install -r requirements.txt

Start: gunicorn -w 4 -b 0.0.0.0:$PORT server:app

URL: https://sentiment-analysis-8b18.onrender.com/

Env: HF_API_TOKEN


Deployment: Render Static Site

Build: npm install && npm run build

Publish: frontend/build

API: https://sentiment-analysis-8b18.onrender.com/



Resources Used

Hugging Face: Inference Client API

Render: Hosting

Flask: Backend framework

React: Frontend

GitHub: Version control (https://github.com/Nithesh0812/sentiment-analysis)

Postman: API testing

Running Locally

Backend:cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

echo "HF_API_TOKEN=your_token" > .env

python server.py

Test: curl -X POST http://localhost:8000/ -H "Content-Type: application/json" -d '{"text":"I love this product!"}'

Frontend:cd frontend

npm install

npm start


Test Cases

Positive: “I love this product!” → “Sentiment: positive ", Green

Negative: “This is terrible.” → “Sentiment: negative ”, Red

Neutral: “It’s okay.” → “Sentiment: neutral ”, Grey

Empty: “” → Error “Text is required”
