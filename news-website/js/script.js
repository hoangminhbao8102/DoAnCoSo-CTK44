// Tải trang động
function loadPage(page) {
    const content = document.getElementById('main-content');

    switch (page) {
        case 'home':
            content.innerHTML = `
                <h2>Trang Chủ</h2>
                <div id="articles" class="grid"></div>
            `;
            loadArticles();
            break;
        case 'about':
            content.innerHTML = `
                <h2>Giới Thiệu</h2>
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

// Hiển thị lựa chọn Trong Nước / Quốc Tế
function loadCategorySelection(category) {
    const categoryName = {
        news: "Tin Tức",
        entertainment: "Giải Trí",
        sports: "Thể Thao"
    };

    const content = document.getElementById('main-content');
    content.innerHTML = `
        <h2>${categoryName[category]}</h2>
        <p>Bạn muốn xem bài viết Trong Nước hay Quốc Tế?</p>
        <button onclick="loadCategory('${category}', 'domestic')">Trong Nước</button>
        <button onclick="loadCategory('${category}', 'international')">Quốc Tế</button>
        <div id="category-content" class="grid"></div>
    `;
}

// Tải bài viết theo danh mục và phân loại
function loadCategory(category, type) {
    fetch('/news-website/articles.json') // Lấy bài viết từ file JSON
        .then(response => response.json())
        .then(articles => {
            const filteredArticles = articles.filter(article => article.category === category && article.type === type);
            const container = document.getElementById('category-content');

            container.innerHTML = filteredArticles
                .map(
                    article => `
                        <article>
                            <h3>${article.title}</h3>
                            <p>${article.content}</p>
                        </article>
                    `
                )
                .join('');
        });
}

// Tải tất cả bài viết (Trang Chủ)
function loadArticles() {
    fetch('/news-website/articles.json')
        .then(response => response.json())
        .then(articles => {
            const container = document.getElementById('articles');
            container.innerHTML = articles
                .map(article => `
                    <div class="article">
                        <h3>${article.title}</h3>
                        <p>${article.content.slice(0, 100)}...</p>
                        <small>Danh mục: ${article.category}</small>
                    </div>
                `)
                .join('');
        });
}

// Khởi tạo
loadPage('home');
