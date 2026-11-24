# Minchala Vinay Kumar — AI & ML Engineer Portfolio

A modern, high-performance, interactive portfolio website for **Minchala Vinay Kumar**, B.Tech in Artificial Intelligence & Data Science (2024 Graduate from Anna University).

## 🚀 Live Features Included

1. **Interactive Neural Network Canvas**:
   - Floating particle network dynamically connecting and reacting to cursor movement.
2. **Dynamic Typing Hero**:
   - Rotates through key specializations: *AI & Deep Learning Systems*, *Computer Vision (CNNs)*, *NLP Pipelines*, *REST Endpoints*, and *Pattern Mining*.
3. **Simulated Model Training Terminal**:
   - High-tech terminal card displaying live Python/TensorFlow model training logs and accuracy benchmarks.
4. **Interactive AI Demos / Recruiter Playground**:
   - **Live NLP Spam Classifier**: Type any email or select presets (Lottery scam, Account suspension, Standup meeting, Interview invite) to run real-time browser-based tokenization, TF-IDF keyword extraction, and Naive Bayes probability scoring with latency indicators!
   - **CNN Layer Inspector**: Visual pipeline of the Sign Language CNN (`Conv2D` &rarr; `MaxPool` &rarr; `BatchNorm` &rarr; `Dropout` &rarr; `Dense Softmax`) with interactive inspection of layer shapes, mathematical parameters, and anti-overfitting roles.
   - **Apriori Association Rule Simulator**: Interactive slider controls for Minimum Confidence and Minimum Lift that dynamically filter and present real-world retail purchasing association rules with business insights.
5. **Interactive Skill Matrix**:
   - Tab-filtered skill cards (All, Machine Learning & DL, NLP & Vision, Programming & DBs, Tools & MLOps).
6. **Detailed Case Study Modals**:
   - Deep-dive technical breakdowns of all 3 flagship projects with problem statement, architecture, datasets, and business impact.
7. **Recruiter FAQ Accordion**:
   - Instant answers regarding notice period (immediate joiner), relocation readiness (all major Indian tech hubs), and core technical strengths.
8. **Contact System**:
   - 1-click clipboard copy buttons for email (`minchalavinay579@gmail.com`) and phone (`+91 8374577884`) with animated toast notifications.
   - Interactive message form generating direct `mailto:` links with fallback feedback.
9. **Dedicated Printable Resume (`resume.html`)**:
   - ATS-friendly, clean single-page format formatted with `@media print` rules for 1-click PDF download via `Ctrl + P`.
10. **Dark / Light Theme Switcher**:
    - Theme toggle persistent in `localStorage`.

---

## 📂 File Architecture

```
webmaker/
├── index.html        # Main semantic portfolio website
├── styles.css        # Custom responsive styles, glassmorphism, animations, theme tokens
├── script.js         # Interactive AI demos, neural canvas, typewriter, filter tabs, modal logic
├── resume.html       # Print-ready resume formatted for A4 PDF export
└── README.md         # Documentation & deployment guide
```

---

## 🌐 How to Run Locally

You can open the website directly in any web browser without any installation:

1. Double-click `index.html` to open it in Google Chrome, Microsoft Edge, or Firefox.
2. Or use Python's built-in local server:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## 🚀 How to Host Free Online (in 2 Minutes)

### Option A: GitHub Pages (Recommended)
1. Initialize git in this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Vinay Kumar AI Portfolio"
   ```
2. Create a new repository on your GitHub account (`github.com/minchalavinay/portfolio` or `minchalavinay.github.io`).
3. Link and push your code:
   ```bash
   git remote add origin https://github.com/minchalavinay/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to **Settings &rarr; Pages &rarr; Branch: main &rarr; Save**.
5. Your portfolio will be live at `https://minchalavinay.github.io/portfolio`!

### Option B: Vercel / Netlify
1. Go to [vercel.com](https://vercel.com) or [netlify.com](https://netlify.com).
2. Drag and drop the `webmaker` folder or connect your GitHub repository.
3. It deploys automatically with a custom domain URL in 30 seconds!

---

## 📝 Personalization Checklist for Vinay
- [ ] Upload your actual PDF resume to the folder as `resume.pdf` if you want a direct PDF download link.
- [ ] Replace any placeholder project GitHub URLs with your specific repository links when published.
- [ ] Add your custom profile picture in the hero or about section if desired.
