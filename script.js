/**
 * Minchala Vinay Kumar - Portfolio Master Script
 * AI & Machine Learning Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initNeuralCanvas();
  initTypewriter();
  initMetricsCounter();
  initSkillsFilter();
  initModals();
  initDemoTabs();
  initNlpClassifier();
  initAprioriSimulator();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('vinay_portfolio_theme') || 'dark';

  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('vinay_portfolio_theme', theme);
    if (themeToggle) {
      themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fa-solid fa-moon"></i>' 
        : '<i class="fa-solid fa-sun" style="color: #f59e0b;"></i>';
    }
  }
}

/* ==========================================================================
   2. NAVBAR & NAVIGATION SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenu = document.getElementById('close-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll blur background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveNav();
  });

  // Mobile menu toggle
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
    });
  }

  if (closeMenu && mobileMenu) {
    closeMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // Highlight active section on scroll
  function highlightActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          activeLink.classList.add('active');
        }
      }
    });
  }
}

/* ==========================================================================
   3. BACKGROUND NEURAL NETWORK PARTICLES CANVAS
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
  const maxDistance = 130;

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse gentle interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          this.x -= (dx / dist) * 0.5;
          this.y -= (dy / dist) * 0.5;
        }
      }
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.7)' : 'rgba(59, 130, 246, 0.7)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isDark 
            ? `rgba(6, 182, 212, ${alpha * 0.22})` 
            : `rgba(59, 130, 246, ${alpha * 0.18})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const phrases = [
    'AI & Deep Learning Systems',
    'Real-Time Computer Vision (CNNs)',
    'NLP Pipelines & Text Classifiers',
    'Scalable ML REST Endpoints',
    'Data Science & Pattern Mining Solutions'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      element.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 40;
    } else {
      element.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1600; // Pause at end of phrase
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400; // Pause before new phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   5. METRICS COUNTER ANIMATION
   ========================================================================== */
function initMetricsCounter() {
  const metricNumbers = document.querySelectorAll('.metric-number[data-count]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        metricNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-count'), 10);
          const duration = 1500;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target.toLocaleString();
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current).toLocaleString();
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsStrip = document.querySelector('.metrics-strip');
  if (metricsStrip) {
    observer.observe(metricsStrip);
  }
}

/* ==========================================================================
   6. SKILLS FILTER TABS
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 10);
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE AI DEMOS & PLAYGROUND
   ========================================================================== */
function initDemoTabs() {
  // Handled globally via switchDemoTab
}

window.switchDemoTab = function(tabId) {
  const tabs = document.querySelectorAll('.demo-tab');
  const panels = document.querySelectorAll('.demo-panel');

  tabs.forEach(tab => tab.classList.remove('active'));
  panels.forEach(panel => panel.classList.remove('active'));

  const activeBtn = document.getElementById(`btn-${tabId}`);
  const activePanel = document.getElementById(tabId);

  if (activeBtn) activeBtn.classList.add('active');
  if (activePanel) activePanel.classList.add('active');

  // Trigger recalculations if needed
  if (tabId === 'basket-tab') {
    updateAprioriRules();
  }
};

/* --- TAB 1: NLP SPAM CLASSIFIER LOGIC --- */
function initNlpClassifier() {
  const classifyBtn = document.getElementById('classify-btn');
  const clearBtn = document.getElementById('clear-nlp-btn');
  const textarea = document.getElementById('spam-input-text');

  if (classifyBtn) {
    classifyBtn.addEventListener('click', runNlpInference);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (textarea) textarea.value = '';
      resetClassifierDisplay();
    });
  }

  // Pre-load default message
  if (textarea && !textarea.value) {
    textarea.value = "Congratulations! You have been selected as the grand winner of a $1,000,000 cash prize. Click the link immediately to claim your free reward!";
    runNlpInference();
  }
}

// Recruiter Sample Presets
window.loadSpamPreset = function(type) {
  const textarea = document.getElementById('spam-input-text');
  if (!textarea) return;

  const presets = {
    'spam1': "CONGRATULATIONS! You have been chosen for an exclusive $5,000 lottery cash prize! Call our hotline now to claim your free bonus before it expires.",
    'spam2': "URGENT NOTICE: Your online account access is suspended due to security violations. Click this verify link now to input your password and avoid termination.",
    'ham1': "Hi Vinay, just following up on our morning standup. Can you push the updated CNN model training notebook to GitHub for the sprint code review?",
    'ham2': "Dear Vinay, We were impressed by your AI/ML projects and would like to invite you for a technical interview round for our Machine Learning Engineer position."
  };

  if (presets[type]) {
    textarea.value = presets[type];
    runNlpInference();
  }
};

function runNlpInference() {
  const textarea = document.getElementById('spam-input-text');
  const text = textarea ? textarea.value.trim() : '';

  if (!text) {
    alert('Please enter or select some email text to evaluate.');
    return;
  }

  const startTime = performance.now();

  // Keyword lexicons representing TF-IDF high-weight vocabulary
  const spamKeywords = [
    'congratulations', 'winner', 'won', 'lottery', 'prize', 'cash', 'claim', 
    'free', 'urgent', 'suspended', 'password', 'verify', 'click', 'exclusive', 
    'reward', 'bonus', 'guaranteed', 'dollars', '$', 'crypto', 'act now', 
    'expires', 'hotline', 'violation', 'unsecured', 'bank'
  ];

  const hamKeywords = [
    'interview', 'meeting', 'standup', 'sprint', 'code', 'review', 'github', 
    'python', 'model', 'dataset', 'training', 'engineer', 'technologies', 
    'position', 'schedule', 'regards', 'following', 'attached', 'project', 'team'
  ];

  const lower = text.toLowerCase();
  const words = lower.replace(/[^\w\s$]/g, ' ').split(/\s+/).filter(w => w.length > 1);

  let spamScore = 0;
  let hamScore = 0;
  const detectedTokens = [];

  words.forEach(word => {
    if (spamKeywords.some(k => word.includes(k))) {
      spamScore += 2.2;
      detectedTokens.push({ word, type: 'spam' });
    } else if (hamKeywords.some(k => word.includes(k))) {
      hamScore += 2.0;
      detectedTokens.push({ word, type: 'ham' });
    }
  });

  const endTime = performance.now();
  const latency = (endTime - startTime).toFixed(2);

  // Calculate probability
  let total = spamScore + hamScore;
  let spamProb = 0.15; // baseline prior
  if (total > 0) {
    spamProb = spamScore / total;
  } else {
    // Length & exclamation heuristics
    if (text.includes('!') || text.includes('$')) {
      spamProb = 0.65;
    } else {
      spamProb = 0.25;
    }
  }

  // Update UI Elements
  const inferenceTime = document.getElementById('inference-time');
  const predictionBadge = document.getElementById('prediction-badge');
  const confVal = document.getElementById('conf-val');
  const meterFill = document.getElementById('meter-fill');
  const tokensContainer = document.getElementById('tokens-container');

  if (inferenceTime) inferenceTime.textContent = Math.max(1.2, parseFloat(latency));

  const spamPercent = Math.round(spamProb * 100);
  if (confVal) confVal.textContent = `${spamPercent}% Spam Probability`;
  if (meterFill) {
    meterFill.style.width = `${spamPercent}%`;
    meterFill.style.background = spamPercent > 50 
      ? 'linear-gradient(90deg, #f59e0b, #ef4444)' 
      : 'linear-gradient(90deg, #10b981, #06b6d4)';
  }

  if (predictionBadge) {
    if (spamPercent >= 55) {
      predictionBadge.className = 'prediction-display is-spam';
      predictionBadge.innerHTML = `
        <span class="pred-icon"><i class="fa-solid fa-triangle-exclamation"></i></span>
        <div>
          <div class="pred-text">FLAGGED AS SPAM</div>
          <small style="color: var(--text-dim);">High spam probability detected via TF-IDF tokens</small>
        </div>
      `;
    } else {
      predictionBadge.className = 'prediction-display is-ham';
      predictionBadge.innerHTML = `
        <span class="pred-icon"><i class="fa-solid fa-circle-check"></i></span>
        <div>
          <div class="pred-text">CLASSIFIED AS HAM (LEGITIMATE)</div>
          <small style="color: var(--text-dim);">Safe communication pattern identified</small>
        </div>
      `;
    }
  }

  // Render tokens
  if (tokensContainer) {
    tokensContainer.innerHTML = '';
    if (detectedTokens.length === 0) {
      tokensContainer.innerHTML = '<span class="token-pill neutral">No high-risk trigger keywords detected</span>';
    } else {
      // Remove duplicates
      const uniqueTokens = Array.from(new Set(detectedTokens.map(t => JSON.stringify(t))))
        .map(s => JSON.parse(s));
      uniqueTokens.forEach(t => {
        const span = document.createElement('span');
        span.className = `token-pill ${t.type}-trigger`;
        span.textContent = `${t.word} (${t.type === 'spam' ? '+Spam' : '+Ham'})`;
        tokensContainer.appendChild(span);
      });
    }
  }
}

function resetClassifierDisplay() {
  const predictionBadge = document.getElementById('prediction-badge');
  const confVal = document.getElementById('conf-val');
  const meterFill = document.getElementById('meter-fill');
  const tokensContainer = document.getElementById('tokens-container');

  if (predictionBadge) {
    predictionBadge.className = 'prediction-display';
    predictionBadge.innerHTML = `
      <span class="pred-icon"><i class="fa-solid fa-circle-question"></i></span>
      <span class="pred-text">Ready to Classify</span>
    `;
  }
  if (confVal) confVal.textContent = '0%';
  if (meterFill) meterFill.style.width = '50%';
  if (tokensContainer) {
    tokensContainer.innerHTML = '<span class="token-pill neutral">Awaiting input...</span>';
  }
}

/* --- TAB 2: CNN LAYER INSPECTOR --- */
const cnnLayersData = {
  'input': {
    title: 'Input Tensor [64 × 64 × 3 RGB]',
    badge: 'Raw Preprocessed Image',
    desc: 'The input layer accepts hand gesture video frames resized to 64x64 pixels with 3 RGB color channels. Preprocessing scales pixel intensities to [0, 1] and applies ImageDataGenerator synthetic augmentations (rotation up to 20°, zoom range 0.15, horizontal flip) for invariant feature extraction across diverse lighting conditions.',
    shape: '(Batch_Size, 64, 64, 3)',
    params: '0 (Input Only)',
    defense: 'Real-time ImageDataGenerator Data Augmentation'
  },
  'conv1': {
    title: 'Conv2D Layer (32 Filters, 3×3 Kernel, ReLU)',
    badge: 'Feature Extraction Block',
    desc: 'Extracts spatial patterns such as finger edges, palm contours, and joint intersections. 32 distinct learnable 3×3 convolutional filters sweep over the input matrix. Non-linear ReLU activation replaces negative values with zero, enabling the network to learn complex spatial boundaries.',
    shape: '(Batch_Size, 62, 62, 32)',
    params: '(3 × 3 × 3 + 1) × 32 = 896 parameters',
    defense: 'Compact receptive field prevents parameter explosion'
  },
  'pool1': {
    title: 'MaxPooling2D Layer (2×2 Pool Size)',
    badge: 'Spatial Downsampling',
    desc: 'Reduces the spatial dimensions of feature maps by half while retaining maximum activation values. This preserves critical edge and corner features, cuts computational complexity by 75%, and grants translation invariance (the hand gesture is recognized anywhere in the frame).',
    shape: '(Batch_Size, 31, 31, 32)',
    params: '0 (Deterministic Maximum Operation)',
    defense: 'Reduces degrees of freedom to restrict memorization'
  },
  'bn': {
    title: 'BatchNormalization Layer',
    badge: 'Gradient Stabilization',
    desc: 'Normalizes activations of the preceding layer to have mean 0 and standard deviation 1 across each mini-batch. Resolves internal covariate shift, significantly accelerates training convergence, and acts as an additional regularizer reducing reliance on initial weight distributions.',
    shape: '(Batch_Size, 31, 31, 32)',
    params: '32 × 4 = 128 parameters (gamma, beta, mean, variance)',
    defense: 'Smoothing of optimization landscape reduces overfit'
  },
  'drop': {
    title: 'Dropout Layer (Rate: 0.25)',
    badge: 'Ensemble Regularization',
    desc: 'During forward training passes, randomly deactivates 25% of hidden unit activations. Forces adjacent neurons to learn redundant, independent representations of hand gestures rather than co-adapting, ensuring the model generalizes seamlessly to unseen test signers.',
    shape: '(Batch_Size, 31, 31, 32)',
    params: '0 (Probabilistic Mask)',
    defense: 'Primary defense against over-parameterization'
  },
  'dense': {
    title: 'Dense Output Layer (10 Classes, Softmax)',
    badge: 'Classification Head',
    desc: 'Flattens the high-dimensional feature maps and maps them into 10 distinct sign language gesture categories. The Softmax activation converts raw logits into a calibrated probability distribution summing to 1.0, enabling clear multi-class decision boundaries.',
    shape: '(Batch_Size, 10)',
    params: 'Dense Fully Connected Weights + Biases',
    defense: 'Cross-Entropy loss with Adam optimizer (lr=0.001)'
  }
};

window.inspectCnnLayer = function(layerKey) {
  const data = cnnLayersData[layerKey];
  if (!data) return;

  // Highlight active node
  const nodes = document.querySelectorAll('.cnn-node');
  nodes.forEach(n => n.classList.remove('active'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  // Update detail card
  const titleEl = document.getElementById('layer-title');
  const badgeEl = document.getElementById('layer-badge');
  const descEl = document.getElementById('layer-desc');
  const statsEl = document.getElementById('layer-stats');

  if (titleEl) titleEl.innerHTML = `<i class="fa-solid fa-microchip text-accent"></i> ${data.title}`;
  if (badgeEl) badgeEl.textContent = data.badge;
  if (descEl) descEl.textContent = data.desc;
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="layer-stat"><strong>Output Shape:</strong> ${data.shape}</div>
      <div class="layer-stat"><strong>Parameters:</strong> ${data.params}</div>
      <div class="layer-stat"><strong>Regularization:</strong> ${data.defense}</div>
    `;
  }
};

/* --- TAB 3: APRIORI ASSOCIATION RULE MINING SIMULATOR --- */
const aprioriRulesDataset = [
  { ant: '{Fresh Bread, Whole Milk}', con: '{Butter}', sup: 0.24, conf: 0.82, lift: 2.35, rec: 'Place artisan butter in dairy displays adjacent to morning bakery shelves.' },
  { ant: '{Smart Phone}', con: '{Tempered Glass, Case}', sup: 0.28, conf: 0.89, lift: 3.15, rec: 'Trigger automated 1-click bundle discount at digital checkout.' },
  { ant: '{Espresso Coffee}', con: '{Sugar, Tea Biscuits}', sup: 0.21, conf: 0.74, lift: 1.95, rec: 'Merchandise morning snack packages directly beside roasted bean aisle.' },
  { ant: '{Eggs (Dozen)}', con: '{Smoked Bacon}', sup: 0.16, conf: 0.78, lift: 2.80, rec: 'Cross-promote weekend breakfast kit combo with 15% discount.' },
  { ant: '{Italian Pasta}', con: '{Pasta Sauce, Parmesan}', sup: 0.19, conf: 0.76, lift: 2.40, rec: 'Display shelf-talkers pairing imported sauces directly with whole-wheat pastas.' },
  { ant: '{Laptop Computer}', con: '{Wireless Mouse, Laptop Bag}', sup: 0.22, conf: 0.69, lift: 2.05, rec: 'Recommend complementary peripherals during post-purchase confirmation.' },
  { ant: '{Organic Tea}', con: '{Wildflower Honey}', sup: 0.14, conf: 0.64, lift: 1.82, rec: 'Position organic sweeteners right beside specialty herbal teas.' },
  { ant: '{Beer (6-Pack)}', con: '{Potato Chips, Pretzels}', sup: 0.26, conf: 0.71, lift: 2.10, rec: 'Feature weekend snack combos near beverage cold-storage section.' }
];

function initAprioriSimulator() {
  updateAprioriRules();
}

window.updateAprioriRules = function() {
  const confSlider = document.getElementById('conf-slider');
  const liftSlider = document.getElementById('lift-slider');
  const confVal = document.getElementById('conf-slider-val');
  const liftVal = document.getElementById('lift-slider-val');
  const tbody = document.getElementById('rules-tbody');

  if (!confSlider || !liftSlider || !tbody) return;

  const minConf = parseFloat(confSlider.value);
  const minLift = parseFloat(liftSlider.value);

  if (confVal) confVal.textContent = minConf.toFixed(2);
  if (liftVal) liftVal.textContent = minLift.toFixed(2);

  const filtered = aprioriRulesDataset.filter(r => r.conf >= minConf && r.lift >= minLift);

  tbody.innerHTML = '';
  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 28px; color: var(--text-dim);">
          <i class="fa-solid fa-filter-circle-xmark" style="font-size: 1.8rem; margin-bottom: 8px; display: block;"></i>
          No association rules match these high threshold filters. Lower Minimum Confidence or Minimum Lift to discover more itemset patterns.
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach(rule => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><code style="color: var(--accent-cyan); font-weight: 600;">${rule.ant}</code></td>
      <td><code style="color: var(--accent-purple); font-weight: 600;">${rule.con}</code></td>
      <td><strong>${(rule.sup * 100).toFixed(0)}%</strong></td>
      <td><span style="color: var(--accent-green); font-weight: 700;">${(rule.conf * 100).toFixed(0)}%</span></td>
      <td><span class="badge-accent">${rule.lift.toFixed(2)}x</span></td>
      <td style="font-size: 0.82rem; color: var(--text-secondary);">${rule.rec}</td>
    `;
    tbody.appendChild(tr);
  });
};

/* ==========================================================================
   8. PROJECT CASE STUDY MODALS
   ========================================================================== */
function initModals() {
  const openButtons = document.querySelectorAll('.open-modal-btn');
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // ESC key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

window.closeAllModals = function() {
  const modals = document.querySelectorAll('.modal');
  modals.forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
};

/* ==========================================================================
   9. RECRUITER FAQ ACCORDION
   ========================================================================== */
window.toggleFaq = function(button) {
  const card = button.parentElement;
  const answer = card.querySelector('.faq-answer');
  const isOpen = button.classList.contains('active');

  // Close all answers
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.classList.remove('active');
    btn.parentElement.querySelector('.faq-answer').style.maxHeight = null;
  });

  if (!isOpen) {
    button.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
  }
};

/* ==========================================================================
   10. CLIPBOARD COPY & TOAST NOTIFICATION
   ========================================================================== */
window.copyToClipboard = function(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied "${text}" to clipboard!`);
    if (btnElement) {
      const origIcon = btnElement.innerHTML;
      btnElement.innerHTML = '<i class="fa-solid fa-check" style="color: var(--accent-green);"></i>';
      setTimeout(() => {
        btnElement.innerHTML = origIcon;
      }, 2000);
    }
  }).catch(err => {
    showToast(`Error copying: ${err}`);
  });
};

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   11. CONTACT FORM HANDLER
   ========================================================================== */
window.handleContactSubmit = function(event) {
  event.preventDefault();

  const name = document.getElementById('sender-name').value.trim();
  const email = document.getElementById('sender-email').value.trim();
  const subject = document.getElementById('sender-subject').value.trim();
  const message = document.getElementById('sender-message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill out all required fields.');
    return;
  }

  // Compose mailto
  const mailtoUrl = `mailto:minchalavinay579@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    `From: ${name} (${email})\n\nMessage:\n${message}\n\nSent via Minchala Vinay Kumar Portfolio`
  )}`;

  // Open default mail client
  window.location.href = mailtoUrl;

  showToast('Opening your email client to send to Vinay!');
  
  // Also provide direct confirmation
  const form = document.getElementById('contact-form');
  if (form) {
    form.reset();
  }
};
