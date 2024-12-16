// Tải trang động
function loadPage(page) {
    const content = document.getElementById('main-content');

    switch (page) {
        case 'home':
            loadHomePage();
            break;
        case 'about':
            content.innerHTML = `
                <h2>GIỚI THIỆU</h2>
                <p>Đây là blog cá nhân của BAOMINH, nơi chia sẻ thông tin, sự kiện và những bài viết thú vị.</p>
            `;
            break;
        case 'news':
        case 'entertainment':
        case 'sports':
            loadCategorySelection(page);
            break;
        default:
            content.innerHTML = `<h2>Không tìm thấy trang!</h2>`;
    }
}

// Hiển thị chi tiết bài viết
function loadArticleDetails(articleId) {
    fetch('/news-website/articles.json')
        .then(response => response.json())
        .then(articles => {
            const article = articles.find(a => a.id === articleId);
            const content = document.getElementById('main-content');

            if (article) {
                content.innerHTML = `
                    <div class="article-details">
                        <h2>${article.title}</h2>
                        <p>${article.details || article.content}</p>
                        <button onclick="loadPage('home')">
                            <i class="fa fa-arrow-left"></i> Quay lại
                        </button>
                    </div>
                `;
            } else {
                content.innerHTML = `<p>Bài viết không tồn tại.</p>`;
            }
        });
}

function loadHomePage() {
    const content = document.getElementById('main-content');
    content.innerHTML = `
        <div class="category-group">
            <h2 class="category-title">TIN TỨC</h2>
            <div class="grid-container" id="news-container"></div>
        </div>
        <div class="category-group">
            <h2 class="category-title">GIẢI TRÍ</h2>
            <div class="grid-container" id="entertainment-container"></div>
        </div>
        <div class="category-group">
            <h2 class="category-title">THỂ THAO</h2>
            <div class="grid-container" id="sports-container"></div>
        </div>
    `;
    loadArticlesByCategory();
}

// Tải bài viết theo danh mục và phân loại
function loadCategory(category, type) {
    fetch('/news-website/articles.json')
        .then(response => response.json())
        .then(articles => {
            const filteredArticles = articles.filter(
                article => article.category === category && article.type === type
            );

            const content = document.getElementById('main-content');
            content.innerHTML = `
                <h2>${type === 'domestic' ? 'TRONG NƯỚC' : 'QUỐC TẾ'}</h2>
                <div class="grid-container">
                    ${filteredArticles
                        .map(article => `
                            <div class="article">
                                <h3>${article.title}</h3>
                                <p>${article.content.slice(0, 100)}...</p>
                                <button onclick="loadArticleDetails(${article.id})">XEM</button>
                            </div>
                        `)
                        .join('')}
                </div>
            `;
        });
}

function loadArticlesByCategory() {
    fetch('/news-website/articles.json')
        .then(response => response.json())
        .then(articles => {
            addArticlesToContainer('news-container', articles.filter(article => article.category === 'news'));
            addArticlesToContainer('entertainment-container', articles.filter(article => article.category === 'entertainment'));
            addArticlesToContainer('sports-container', articles.filter(article => article.category === 'sports'));
        });
}

function addArticlesToContainer(containerId, articles) {
    const container = document.getElementById(containerId);
    container.innerHTML = articles
        .map(article => `
            <div class="article">
                <h3>${article.title}</h3>
                <p>${article.content.slice(0, 100)}...</p>
                <button onclick="loadArticleDetails(${article.id})">XEM</button>
            </div>
        `)
        .join('');
}

// Khởi chạy
loadPage('home');
