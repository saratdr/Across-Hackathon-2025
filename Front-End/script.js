document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const query = document.getElementById('queryInput').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Searching...';

    // Replace the URL below with your backend endpoint
    const response = await fetch('http://localhost:5000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    });

    if (response.ok) {
        const data = await response.json();
        if (data.papers && data.papers.length > 0) {
            resultsDiv.innerHTML = '<ul>' + data.papers.map(
                paper => `<li><strong>${paper.title}</strong><br>${paper.authors}<br>${paper.abstract}</li>`
            ).join('') + '</ul>';
        } else {
            resultsDiv.innerHTML = 'No papers found.';
        }
    } else {
        resultsDiv.innerHTML = 'Error fetching recommendations.';
    }
});
//Unicorn Button Functionality
document.getElementById('fantasticBtn').addEventListener('click', function() {
    const fantasticDiv = document.getElementById('fantasticImage');
    fantasticDiv.innerHTML = '<img src="https://imgs.search.brave.com/jTadVhMf2pNqHjNkqDHS4FXhznYUn9IO5hY2Pkkh0eA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMS8w/MS8yMi8wOS8wMS91/bmljb3JuLTU5Mzk1/MDBfNjQwLnBuZw" alt="Unicorn" style="max-width:300px; margin-top:1em;">';
});