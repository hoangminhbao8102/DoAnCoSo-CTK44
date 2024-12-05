$(document).ready(function() {
    const apiKey = '7bfc9a734d1e4505ac89aef63e1abd48';  // Thay bằng API key của bạn
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    function loadNews() {
        $.getJSON(apiUrl, function(data) {
            let articles = data.articles;
            let content = '';

            articles.forEach(function(article) {
                content += `
                    <article>
                        <h2>${article.title}</h2>
                        <img src="${article.urlToImage}" alt="Article Image" style="width: 100%;">
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Read more</a>
                    </article>
                    <hr>
                `;
            });

            $('#content').html(content);
        }).fail(function() {
            $('#content').html('<p>Failed to load news articles. Please try again later.</p>');
        });
    }

    // Load news on page load
    loadNews();

    // Navigation click handlers
    $('#home').click(function(e) {
        e.preventDefault();
        $('#content').html('<p>Welcome to the News Website!</p>');
    });

    $('#latest-news').click(function(e) {
        e.preventDefault();
        loadNews();
    });

    $('#about').click(function(e) {
        e.preventDefault();
        $('#content').html('<p>This is a simple news website using jQuery.</p>');
    });
});
