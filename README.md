# 📝 SEO Blog Post Creation Tool

An AI-based tool to automate the creation of SEO-friendly blog posts by scraping trending products from e-commerce sites, researching relevant keywords, generating short blog content using Google Gemini 2.0 Flash API, and publishing the content online.

---

## 🚀 Objective

The goal of this project is to create an AI-based tool that can automatically scrape trending products from e-commerce websites, find relevant SEO keywords, generate short blog posts using those keywords, and publish the posts on platforms like Medium, WordPress, or a personal website.

---

## 🛠️ Tools & Their Functionality

| Tool/Component                   | Functionality                                                                 |
|----------------------------------|------------------------------------------------------------------------------|
| `scraper.py`                     | Scrapes product data (title, price, rating, etc.) from e-commerce sites.     |
| Keyword Research                 | Identifies 3–4 SEO-friendly keywords (manual input or from tools like Google Keyword Planner). |
| AI Blog Generator                | Uses Google Gemini 2.0 Flash API to generate 150–200 word blog content.      |
| `app.py`                         | Flask backend that connects all components and serves the frontend.          |
| `templates/index.html`          | Frontend UI built with HTML5 + Tailwind CSS (via CDN).                       |
| `static/script.js`              | Handles user interactivity: form validation, loading spinner, error handling, and copy-to-clipboard. |
| `/blogs/` folder                 | Stores generated blog content locally.                                       |

---

## 💻 Technologies Used

| Component        | Technology / Library                                                |
|------------------|---------------------------------------------------------------------|
| UI Layout        | HTML5                                                               |
| Styling          | Tailwind CSS (via CDN), Google Fonts (Inter)                       |
| Scripting        | Vanilla JavaScript                                                 |
| AI Backend       | Google Gemini 2.0 Flash API (`generativelanguage.googleapis.com`)   |
| Web Framework    | Flask (Python)                                                     |
| Web Scraping     | BeautifulSoup, requests, fake_useragent                            |
| UX Features      | Loading spinner, input validation, error/info message boxes        |
| Clipboard Logic  | `document.execCommand()` for copy-to-clipboard support             |
| Deployment       | GitHub, Render/Heroku (optional)                                    |

---

## 📁 Project Structure
SEO-Blog-Tool/
├── app.py # Flask backend
├── scraper.py # Product scraper
├── generate_blog.py # AI content generation script
├── templates/
│ └── index.html # UI layout
├── static/
│ ├── script.js # JavaScript for frontend
│ └── style.css # Optional custom styles
├── blogs/ # Stores generated blog posts
├── .env # API keys (ignored in Git)
├── requirements.txt # Python dependencies
└── README.md # Project documentation

