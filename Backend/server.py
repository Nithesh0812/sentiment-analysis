# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import os

app = Flask(__name__)
CORS(app)


load_dotenv()

hf_api_token = os.getenv("HF_API_TOKEN")
if not hf_api_token:
    raise ValueError("Hugging Face API token is missing. Please set HF_API_TOKEN in your .env file.")

# Initializing client 
hf_client = InferenceClient(token=hf_api_token)

@app.route('/', methods=['POST'])
def analyze_sentiment():
    try:
        data = request.get_json()
        text = data.get('text')

        if not text:
            return jsonify({"error": "Text is required"}), 400
        
        result = hf_client.text_classification(
            text,
            model="distilbert/distilbert-base-uncased-finetuned-sst-2-english"
        )
        
        sentiment = result[0]['label'].lower()
        confidence = result[0]['score']

        return jsonify({
            "sentiment": sentiment,
            "confidence": confidence
        })
    except Exception as e:
        print(f"Analysis failed: {e}")

        return jsonify({"error": "Analysis failed"}), 500

if __name__ == '__main__':
    port = int(os.getenv("PORT", 8000))
    app.run(port=port, debug=True)
