let currentTab = 0;
let selectedProduct = null;
let generatedKeywords = [];
let generatedBlog = null;
let selectedPlatform = null;

// Sample data for demonstration
const sampleProducts = [
    {
        id: 1,
        title: "Wireless Bluetooth Headphones with Noise Cancellation",
        price: "$79.99",
        rating: 4.5,
        reviews: 2847,
        category: "Electronics"
    },
    {
        id: 2,
        title: "Ergonomic Office Chair with Lumbar Support",
        price: "$199.99",
        rating: 4.3,
        reviews: 1523,
        category: "Furniture"
    },
    {
        id: 3,
        title: "Smart Fitness Tracker with Heart Rate Monitor",
        price: "$129.99",
        rating: 4.7,
        reviews: 3291,
        category: "Health & Fitness"
    },
    {
        id: 4,
        title: "Organic Skincare Set - Anti-Aging Cream & Serum",
        price: "$89.99",
        rating: 4.6,
        reviews: 1876,
        category: "Beauty"
    }
];

function switchTab(tabIndex) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach((tab, index) => {
        tab.classList.toggle('active', index === tabIndex);
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach((content, index) => {
        content.classList.toggle('active', index === tabIndex);
    });

    currentTab = tabIndex;
}

function scrapeProducts() {
    const platform = document.getElementById('platform').value;
    const category = document.getElementById('category').value;
    const filter = document.getElementById('filter').value;

    if (!category.trim()) {
        alert('Please enter a product category');
        return;
    }

    const container = document.getElementById('products-container');
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Scraping ${platform} for ${category} products...</p>
        </div>
    `;

    // Simulate API call
    setTimeout(() => {
        const products = sampleProducts.map(product => ({
            ...product,
            title: product.title.replace(product.title.split(' ')[0], category.split(' ')[0])
        }));

        container.innerHTML = `
            <div class="success-message">
                Found ${products.length} trending products in ${category}
            </div>
            <div class="products-grid">
                ${products.map(product => `
                    <div class="product-card" onclick="selectProduct(${product.id})">
                        <div class="product-image">📦 Product Image</div>
                        <div class="product-title">${product.title}</div>
                        <div class="product-price">${product.price}</div>
                        <div style="margin-top: 8px; font-size: 0.8rem; color: #6c757d;">
                            ⭐ ${product.rating} (${product.reviews} reviews)
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }, 2000);
}

function selectProduct(productId) {
    selectedProduct = sampleProducts.find(p => p.id === productId);

    // Update UI
    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    // Update selected product info in keywords tab
    document.getElementById('selected-product-info').innerHTML = `
        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
            <strong>${selectedProduct.title}</strong><br>
            <span style="color: #28a745;">${selectedProduct.price}</span> | ⭐ ${selectedProduct.rating}
        </div>
    `;

    // Enable next tab
    document.querySelectorAll('.tab')[1].style.opacity = '1';
}

function generateKeywords() {
    if (!selectedProduct) {
        alert('Please select a product first');
        return;
    }

    const tool = document.getElementById('keyword-tool').value;
    const audience = document.getElementById('target-audience').value;

    const container = document.getElementById('keywords-container');
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Researching SEO keywords using ${tool}...</p>
        </div>
    `;

    // Simulate keyword research
    setTimeout(() => {
        const keywords = generateSampleKeywords(selectedProduct.title, audience);
        generatedKeywords = keywords;

        container.innerHTML = `
            <div class="success-message">
                Generated ${keywords.length} SEO-optimized keywords
            </div>
            <h3>Primary Keywords (High Volume, Low Competition)</h3>
            <div class="keywords-list">
                ${keywords.slice(0, 4).map(kw => `
                    <span class="keyword-tag">${kw.keyword} (${kw.volume})</span>
                `).join('')}
            </div>
            <h3 style="margin-top: 20px;">Long-tail Keywords</h3>
            <div class="keywords-list">
                ${keywords.slice(4).map(kw => `
                    <span class="keyword-tag">${kw.keyword} (${kw.volume})</span>
                `).join('')}
            </div>
        `;
    }, 1500);
}

function generateSampleKeywords(productTitle, audience) {
    const baseWords = productTitle.toLowerCase().split(' ').slice(0, 3);
    return [
        { keyword: baseWords.join(' '), volume: '2.2K/mo' },
        { keyword: `best ${baseWords[0]} ${baseWords[1]}`, volume: '1.8K/mo' },
        { keyword: `${baseWords[0]} review`, volume: '1.5K/mo' },
        { keyword: `top ${baseWords[1]} 2024`, volume: '980/mo' },
        { keyword: `${baseWords[0]} ${baseWords[1]} for ${audience || 'beginners'}`, volume: '720/mo' },
        { keyword: `affordable ${baseWords.join(' ')}`, volume: '650/mo' },
        { keyword: `${baseWords[0]} buying guide`, volume: '540/mo' },
        { keyword: `${baseWords[1]} comparison`, volume: '420/mo' }
    ];
}

function generateBlog() {
    if (!selectedProduct || generatedKeywords.length === 0) {
        alert('Please complete the previous steps first');
        return;
    }

    const tone = document.getElementById('blog-tone').value;
    const wordCount = document.getElementById('word-count').value;
    const ctaType = document.getElementById('cta-type').value;

    const container = document.getElementById('blog-container');
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>AI is crafting your SEO-optimized blog post...</p>
        </div>
    `;

    // Simulate blog generation
    setTimeout(() => {
        const blog = generateSampleBlog(selectedProduct, generatedKeywords, tone, ctaType);
        generatedBlog = blog;

        container.innerHTML = `
            <div class="success-message">
                Blog post generated successfully! Word count: ~${blog.wordCount} words
            </div>
            <div class="blog-preview">
                <div class="blog-title">${blog.title}</div>
                <div class="blog-content">${blog.content}</div>
            </div>
            <div style="margin-top: 20px;">
                <h3>SEO Analysis</h3>
                <p>✅ Primary keywords included: ${blog.keywords.join(', ')}</p>
                <p>✅ Readability score: Excellent</p>
                <p>✅ Meta description optimized</p>
            </div>
        `;
    }, 2500);
}

function generateSampleBlog(product, keywords, tone, cta) {
    const primaryKeywords = keywords.slice(0, 3);
    const title = `${product.title}: The Ultimate Guide for 2024`;

    let content = `
        <p>Looking for the perfect ${primaryKeywords[0].keyword}? You've come to the right place! In today's competitive market, finding quality products that deliver exceptional value can be challenging.</p>

        <p>The ${product.title} stands out as a remarkable choice for anyone seeking ${primaryKeywords[1].keyword.split(' ').slice(-2).join(' ')}. With its impressive ${product.rating}-star rating from over ${product.reviews} satisfied customers, this product has proven its worth in the marketplace.</p>

        <p>What makes this ${primaryKeywords[0].keyword} special? First, its innovative design addresses common pain points that users face with similar products. The build quality exceeds expectations, while the competitive price point of ${product.price} makes it accessible to a wide range of consumers.</p>

        <p>Customer feedback consistently highlights the product's reliability and performance. Many users report significant improvements in their daily routines after incorporating this ${primaryKeywords[2].keyword.split(' ')[0]} into their lives.</p>
    `;

    if (cta === 'purchase') {
        content += `<p><strong>Ready to experience the difference? Don't wait – this popular item is flying off the shelves!</strong></p>`;
    } else if (cta === 'learn-more') {
        content += `<p><strong>Want to learn more about this game-changing product? Check out detailed specifications and user testimonials.</strong></p>`;
    }

    return {
        title,
        content,
        wordCount: 185,
        keywords: primaryKeywords.map(k => k.keyword)
    };
}

function selectPublishPlatform(platform) {
    selectedPlatform = platform;

    // Update UI
    document.querySelectorAll('.publish-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');

    // Show platform-specific form
    const container = document.getElementById('publish-form-container');
    container.innerHTML = generatePublishForm(platform);
}

function generatePublishForm(platform) {
    const forms = {
        wordpress: `
            <div style="margin-top: 30px;">
                <h3>WordPress Publishing Settings</h3>
                <div class="form-group">
                    <label for="wp-url">WordPress Site URL</label>
                    <input type="url" id="wp-url" placeholder="https://yourblog.com">
                </div>
                <div class="form-group">
                    <label for="wp-username">Username</label>
                    <input type="text" id="wp-username" placeholder="admin">
                </div>
                <div class="form-group">
                    <label for="wp-password">Application Password</label>
                    <input type="password" id="wp-password" placeholder="Generated app password">
                </div>
                <button class="btn" onclick="publishBlog('wordpress')">📝 Publish to WordPress</button>
            </div>
        `,
        medium: `
            <div style="margin-top: 30px;">
                <h3>Medium Publishing Settings</h3>
                <div class="form-group">
                    <label for="medium-token">Integration Token</label>
                    <input type="text" id="medium-token" placeholder="Your Medium integration token">
                </div>
                <div class="form-group">
                    <label for="medium-tags">Tags (comma-separated)</label>
                    <input type="text" id="medium-tags" placeholder="technology, review, product">
                </div>
                <button class="btn" onclick="publishBlog('medium')">📖 Publish to Medium</button>
            </div>
        `,
        blogger: `
            <div style="margin-top: 30px;">
                <h3>Blogger Publishing Settings</h3>
                <div class="form-group">
                    <label for="blogger-id">Blog ID</label>
                    <input type="text" id="blogger-id" placeholder="Your Blogger blog ID">
                </div>
                <div class="form-group">
                    <label for="blogger-key">API Key</label>
                    <input type="text" id="blogger-key" placeholder="Google API key">
                </div>
                <button class="btn" onclick="publishBlog('blogger')">🌐 Publish to Blogger</button>
            </div>
        `,
        ghost: `
            <div style="margin-top: 30px;">
                <h3>Ghost Publishing Settings</h3>
                <div class="form-group">
                    <label for="ghost-url">Ghost Site URL</label>
                    <input type="url" id="ghost-url" placeholder="https://yoursite.ghost.io">
                </div>
                <div class="form-group">
                    <label for="ghost-key">Admin API Key</label>
                    <input type="text" id="ghost-key" placeholder="Your Ghost admin API key">
                </div>
                <button class="btn" onclick="publishBlog('ghost')">👻 Publish to Ghost</button>
            </div>
        `
    };

    return forms[platform] || '';
}

function publishBlog(platform) {
    if (!generatedBlog) {
        alert('Please generate a blog post first');
        return;
    }

    // Simulate publishing
    const publishBtn = event.target;
    publishBtn.disabled = true;
    publishBtn.innerHTML = 'Publishing...';

    setTimeout(() => {
        const container = document.getElementById('publish-form-container');
        container.innerHTML += `
            <div class="success-message" style="margin-top: 20px;">
                🎉 Successfully published to ${platform.charAt(0).toUpperCase() + platform.slice(1)}!<br>
                <strong>Blog URL:</strong> https://${platform}.com/your-blog-post-url<br>
                <strong>Status:</strong> Published and indexed
            </div>
        `;

        publishBtn.disabled = false;
        publishBtn.innerHTML = `✅ Published to ${platform.charAt(0).toUpperCase() + platform.slice(1)}`;
    }, 2000);
}

// Initialize the tool
document.addEventListener('DOMContentLoaded', function() {
    console.log('SEO Blog Creation Tool initialized');
});