from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from your frontend

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    query = data.get('query', '')
    # Dummy response for testing
    papers = [
        {
            "title": "Sample Paper 1",
            "authors": "Author A, Author B",
            "abstract": "This is a sample abstract for paper 1."
        },
        {
            "title": "Sample Paper 2",
            "authors": "Author C",
            "abstract": "This is a sample abstract for paper 2."
        }
    ] if query else []
    return jsonify({"papers": papers})

if __name__ == '__main__':
    app.run(debug=True)