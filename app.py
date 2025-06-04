from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import src.utils as utils
from src.recommender import Recommender

data, embeddings = utils.load_embedding("scibert")
# Initialize the recommender system
recommender = Recommender(data, embeddings, "scibert")

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    query = data.get('query', '').lower()
    if not query:
        return jsonify({"papers": []})

    # Return 2 dummy papers for testing
    papers = [
        {
            "title": "Dummy Paper 1",
            "authors": "Author A, Author B",
            "abstract": "This is a dummy abstract for paper 1."
        },
        {
            "title": "Dummy Paper 2",
            "authors": "Author C",
            "abstract": "This is a dummy abstract for paper 2."
        }
    ]

    papers = recommender.query(query)
    for paper in papers:
        paper["pdf_url"] = utils.get_pdf_url(paper["id"])
    return jsonify({"papers": papers})

if __name__ == '__main__':
    app.run(debug=True)