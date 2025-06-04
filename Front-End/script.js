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
                            ${data.papers.map((paper, idx) => {
                                const words = paper.abstract.split(/\s+/);
                                const shortAbstract = words.length > 200 ? words.slice(0, 200).join(' ') + '...' : paper.abstract;
                                const needsDropdown = words.length > 200;
                                return `
                                <tr>
                                    <td><strong>${paper.title}</strong></td>
                                    <td>${paper.authors}</td>
                                    <td style="font-size:0.95em;">
                                        ${shortAbstract}
                                        ${needsDropdown ? `
                                            <a class="btn btn-link btn-sm p-0 ms-2" data-bs-toggle="collapse" href="#collapseAbstract${idx}" role="button" aria-expanded="false" aria-controls="collapseAbstract${idx}">
                                                Read more
                                            </a>
                                            <div class="collapse mt-2" id="collapseAbstract${idx}">
                                                <div class="card card-body p-2 bg-light border">
                                                    ${paper.abstract}
                                                </div>
                                            </div>
                                        ` : ''}
                                    </td>
                                    <td>
                                        ${paper.pdf_url ? `<a href="${paper.pdf_url}" target="_blank" class="btn btn-outline-primary btn-sm">View PDF</a>` : '<span class="text-muted">N/A</span>'}
                                    </td>
                                    <td>
                                        <button class="btn btn-outline-success btn-sm" data-title="${paper.title}" title="Show similar papers">
                                            <i class="bi bi-search"></i> Similar
                                        </button>
                                    </td>
                                </tr>
                                `;
                            }).join('')}
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

// Add button for every paper that gets displayed. Button should have access to the paper's title. If you press the button the search query gets reloaded and displays the similar papers of this paper.
document.getElementById('results').addEventListener('click', function(e) {
    if (e.target.closest('button[data-title]')) {
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