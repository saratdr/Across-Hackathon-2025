document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const query = document.getElementById('queryInput').value;
    const exclude = document.getElementById('excludeInput').value;
    const field = document.getElementById('fieldInput').value;
    const resultsDiv = document.getElementById('results');
    const recommendationsDiv = document.getElementById('recommendations');
    resultsDiv.innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height: 100px;">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Searching...</span>
            </div>
            <span class="ms-3">Searching...</span>
        </div>
    `;
    recommendationsDiv.innerHTML = '';

    const response = await fetch('http://localhost:5000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, exclude, field })
    });

    if (response.ok) {
        const data = await response.json();
        if (data.papers && data.papers.length > 0) {
            resultsDiv.innerHTML = `
                <div class="table-responsive shadow rounded">
                    <table class="table table-hover table-bordered align-middle mb-0">
                        <thead class="table-primary">
                            <tr>
                                <th style="width:22%">Title</th>
                                <th style="width:15%">Authors</th>
                                <th style="width:48%">Abstract</th>
                                <th style="width:10%">PDF</th>
                                <th style="width:5%">Similar</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.papers.map((paper, idx) => `
                                <tr>
                                    <td><strong>${paper.title}</strong></td>
                                    <td>${paper.authors}</td>
                                    <td style="font-size:0.95em;">
                                        <button class="btn btn-outline-info btn-sm show-abstract-btn" data-idx="${idx}">Show abstract</button>
                                        <div class="abstract-content mt-2 d-none" id="abstract-${idx}">
                                            <div class="card card-body p-2 bg-light border">${paper.abstract}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <button class="btn btn-outline-primary btn-sm" onclick="window.open('${paper.pdf_url}', '_blank')">View PDF</button>
                                    </td>
                                    <td>
                                        <button class="btn btn-outline-success btn-sm" data-title="${paper.title}" title="Show similar papers">
                                            <i class="bi bi-search"></i> Similar
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        } else {
            resultsDiv.innerHTML = '<div class="alert alert-warning mt-3">No papers found.</div>';
        }
        // Show recommendations if present
        let recHTML = '';
        if (data.recommendations && data.recommendations.length > 0) {
            recHTML += 
                `<div class="alert alert-info mt-3">
                    <strong>Other users also searched for:</strong>
                    <ul class="mb-0">
                        ${data.recommendations.map(
                            kw => `<li>${kw}</li>`
                        ).join('')}
                    </ul>
                </div>`;
        }
        // Show associated authors if present
        if (data.associated_authors && data.associated_authors.length > 0) {
            recHTML += 
                `<div class="alert alert-secondary mt-2">
                    <strong>Associated authors (frequent collaborators):</strong>
                    <ul class="mb-0">
                        ${data.associated_authors.map(
                            author => `<li>${author}</li>`
                        ).join('')}
                    </ul>
                </div>`;
        }
        recommendationsDiv.innerHTML = recHTML;
    } else {
        resultsDiv.innerHTML = '<div class="alert alert-danger mt-3">Error fetching recommendations.</div>';
        recommendationsDiv.innerHTML = '';
    }
});

// Toggle abstract display
document.getElementById('results').addEventListener('click', function(e) {
    if (e.target.classList.contains('show-abstract-btn')) {
        const idx = e.target.getAttribute('data-idx');
        const abstractDiv = document.getElementById(`abstract-${idx}`);
        if (abstractDiv.classList.contains('d-none')) {
            abstractDiv.classList.remove('d-none');
            e.target.textContent = 'Hide abstract';
        } else {
            abstractDiv.classList.add('d-none');
            e.target.textContent = 'Show abstract';
        }
    }
    // Similar papers button
    if (e.target.closest('button[data-title]') && !e.target.classList.contains('show-abstract-btn')) {
        const paperTitle = e.target.closest('button[data-title]').getAttribute('data-title');
        document.getElementById('queryInput').value = paperTitle;
        document.getElementById('searchForm').dispatchEvent(new Event('submit'));
    }
});

// Unicorn Button Functionality
document.getElementById('fantasticBtn').addEventListener('click', function() {
    const fantasticDiv = document.getElementById('fantasticImage');
    fantasticDiv.innerHTML = '<img src="https://imgs.search.brave.com/jTadVhMf2pNqHjNkqDHS4FXhznYUn9IO5hY2Pkkh0eA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMS8w/MS8yMi8wOS8wMS91/bmljb3JuLTU5Mzk1/MDBfNjQwLnBuZw" alt="Unicorn" style="max-width:300px; margin-top:1em; border-radius: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.15);">';
});