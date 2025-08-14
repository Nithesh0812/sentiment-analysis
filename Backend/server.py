# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from huggingface_hub import InferenceClient
import os
import re

app = Flask(__name__)
CORS(app)

load_dotenv()

hf_api_token = os.getenv("HF_API_TOKEN")
if not hf_api_token:
    raise ValueError("Hugging Face API token is missing. Please set HF_API_TOKEN in your .env file.")

# Initializing Hugging Face Inference API client
hf_client = InferenceClient(token=hf_api_token)

# Mapping
label_mapping = {
    "LABEL_0": "negative",
    "LABEL_1": "neutral",
    "LABEL_2": "positive"
}

#Root path
@app.route('/', methods=['POST'])
def analyze_sentiment():
    try:
        data = request.get_json()
        text = data.get('text')

        if not text or text.isdigit() or not re.search(r"[a-zA-Z0-9]",text):
            return jsonify({"error": "Text is required"}), 400
        
        result = hf_client.text_classification(
            text,
            model="cardiffnlp/twitter-roberta-base-sentiment"
        )
        
        raw_label = result[0]['label']
        sentiment = label_mapping.get(raw_label, raw_label)
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
