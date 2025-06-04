from flask import Blueprint, render_template, request, jsonify
import requests  # If backend is a separate service

# initilize application 

# Define routes
bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('index.html')

@bp.route('/analyze', methods=['POST'])
def analyze():
    user_input = request.json
    # Example: Forward request to backend API
    backend_url = 'http://localhost:5001/analyze'  # Change as needed
    response = requests.post(backend_url, json=user_input)
    return jsonify(response.json())

# run here 