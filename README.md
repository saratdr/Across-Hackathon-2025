# ALIS – Algorithm-based Literature research In STEM

Welcome to the repository for **ALIS**, a smart literature search and recommendation tool developed for the Across Hackathon 2025 by the team "Hackstreet's Back Alright!". ALIS leverages AI to help researchers, students, and educators in STEM and social sciences efficiently discover relevant scientific papers, explore research trends, and identify collaborative author networks.

## Features

- **Keyword Search:** Find scientific papers by entering keywords, with options to include or exclude specific terms.
- **Field Filtering:** Filter results by field of research (e.g., Physics, Biology).
- **Smart Recommendations:** Get suggestions for related keywords and search terms based on your query and other users' searches.
- **Associated Authors:** Discover groups of authors who frequently collaborate, inspired by tools like Research Rabbit.
- **Interactive Results Table:** View results in a modern, responsive Bootstrap-styled table with quick access to abstracts and PDF links.
- **"I Feel Fantastic" Button:** Enjoy a fun unicorn surprise!
- **GitHub Integration:** Quick access to this repository via a floating GitHub button.

## How It Works

- **Frontend:** Built with HTML, Bootstrap, and vanilla JavaScript for a clean, responsive user experience.
- **Backend:** Powered by Flask (Python), serving search and recommendation requests and processing a scientific papers dataset.
- **Data:** Uses a CSV dataset of tokenized and balanced arXiv papers for demonstration and testing.

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js (optional, for advanced frontend tooling)
- [pip](https://pip.pypa.io/en/stable/installation/)

### Setup

1. **Clone the repository:**
    ```sh
    git clone https://github.com/saratdr/Across-Hackathon-2025.git
    cd Across-Hackathon-2025
    ```

2. **Backend Setup:**
    ```sh
    cd F-B-Communication
    python -m venv venv
    venv\Scripts\activate  # On Windows
    pip install flask flask-cors pandas
    python app.py
    ```

3. **Frontend Setup:**
    - Open `Front-End/index.html` in your browser.

### Usage

- Enter keywords and (optionally) exclude terms or specify a field of research.
- Click **Search** to view results.
- Click **Show abstract** to reveal the full abstract for any paper.
- Click **View PDF** to open the paper.
- Use the **Similar** button to find related papers by title.
- Explore recommended keywords and associated authors below the results.
- Click the **GitHub** button (bottom left) to visit this repository.



