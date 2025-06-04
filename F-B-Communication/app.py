from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend

# Load the dataset once at startup
DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'arxiv_tokenized_balanced.csv')
df = pd.read_csv(DATA_PATH)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    query = data.get('query', '').lower()
    if not query:
        return jsonify({"papers": []})

    # Simple search: filter rows where query is in title or abstract
    results = df[
        df['title'].str.lower().str.contains(query, na=False) |
        df['abstract'].str.lower().str.contains(query, na=False)
    ].head(10)  # Limit to 10 results

    papers = [
        {
            "title": row['title'],
            "authors": row.get('authors', 'Unknown'),
            "abstract": row['abstract']
        }
        for _, row in results.iterrows()
    ]
    return jsonify({"papers": papers})

if __name__ == '__main__':
    app.run(debug=True)