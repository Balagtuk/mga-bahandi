/* ==========================================================================
   Anniversary Gift — interactions
   --------------------------------------------------------------------------
   Sections:
     1. Helpers & shared state
     2. Personal text from config
     3. Image fallback
     4. Decorative effects (sparkles, flower burst, falling petals)
     5. Memory carousel (3D ring on desktop, swipe strip on mobile)
     6. Memory dialog
     7. Optional music
     8. Opening sequence (envelope → burst → reveal)
   All content lives in js/config.js — no need to edit this file to personalize.
   ========================================================================== */

(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Helpers & shared state
     ------------------------------------------------------------------------ */
  const CONFIG = window.ANNIVERSARY_CONFIG || {};
  const getMediaSrc = (m) => (m ? (m.media || m.image || m.video || '') : '');
  const isVideoMedia = (m) => {
    if (!m) return false;
    if (m.type === 'video') return true;
    const src = getMediaSrc(m).toLowerCase();
    return src.endsWith('.mov') || src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.m4v');
  };

  const MEMORIES = (Array.isArray(CONFIG.memories) ? CONFIG.memories : [])
    .filter((memory) => memory && typeof getMediaSrc(memory) === 'string' && getMediaSrc(memory).trim());

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = () => reducedMotionQuery.matches;

  const $ = (selector, root = document) => root.querySelector(selector);
  const random = (min, max) => min + Math.random() * (max - min);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const mod = (n, m) => ((n % m) + m) % m;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const getPath = (object, path) =>
    path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), object);

  const elements = {
    body: document.body,
    intro: $('#intro'),
    introSparkles: $('#intro-sparkles'),
    envelope: $('#envelope'),
    main: $('#main'),
    title: $('#main-title'),
    bouquet: $('#bouquet'),
    bouquetImg: $('#bouquet-img'),
    stage: $('#stage'),
    carousel: $('#carousel'),
    dots: $('#carousel-dots'),
    prev: $('#carousel-prev'),
    next: $('#carousel-next'),
    carouselPill: $('#carousel-pill'),
    carouselCurrent: $('#carousel-current'),
    carouselTotal: $('#carousel-total'),
    petalLayer: $('#petal-layer'),
    burstLayer: $('#burst-layer'),
    musicPlayer: $('#music-player'),
    musicToggle: $('#music-toggle'),
    musicSkip: $('#music-skip'),
    musicStatus: $('#music-status'),
    musicTitle: $('#music-title'),
    dialog: $('#memory-dialog'),
    dialogVideo: $('#dialog-video'),
  };

  /* ------------------------------------------------------------------------
     2. Personal text from config
     ------------------------------------------------------------------------ */
  function applyConfigText() {
    document.querySelectorAll('[data-config]').forEach((node) => {
      const value = getPath(CONFIG, node.dataset.config);
      if (typeof value === 'string' && value.trim()) node.textContent = value;
    });

    const bouquet = CONFIG.bouquet || {};
    if (bouquet.alt) elements.bouquetImg.alt = bouquet.alt;
    attachImageFallback(elements.bouquetImg, 'Add your bouquet image');
    if (bouquet.image && !elements.bouquetImg.src.endsWith(bouquet.image)) {
      elements.bouquetImg.src = bouquet.image;
    }
  }

  /* ------------------------------------------------------------------------
     2b. Real-time Love Counter
     ------------------------------------------------------------------------ */
  function setupLoveCounter() {
    const daysEl = $('#counter-days');
    const hoursEl = $('#counter-hours');
    const minutesEl = $('#counter-minutes');
    const secondsEl = $('#counter-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    // Default to October 22, 2017 12:00:00 AM local time
    const rawDate = (CONFIG.counter && CONFIG.counter.startDate) || '2017-10-22T00:00:00';
    let startMs = Date.parse(rawDate);
    if (Number.isNaN(startMs)) {
      startMs = new Date(2017, 9, 22, 0, 0, 0).getTime();
    }

    function tick() {
      const now = Date.now();
      const diffMs = Math.max(0, now - startMs);
      const totalSecs = Math.floor(diffMs / 1000);

      const days = Math.floor(totalSecs / 86400);
      const hours = Math.floor((totalSecs % 86400) / 3600);
      const minutes = Math.floor((totalSecs % 3600) / 60);
      const seconds = totalSecs % 60;

      daysEl.textContent = days.toLocaleString();
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    tick();
    setInterval(tick, 1000);

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) tick();
    });
  }

  /* ------------------------------------------------------------------------
     3. Image fallback — a soft placeholder instead of a broken image icon
     ------------------------------------------------------------------------ */
  function makePlaceholderSrc(label) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="760" viewBox="0 0 600 760">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f4d6d4"/><stop offset="1" stop-color="#fbf3ec"/></linearGradient></defs>
      <rect width="600" height="760" fill="url(#g)"/>
      <path transform="translate(300 330) scale(4)" d="M0 9s-7.5-4.6-9.6-9.2C-11.1-3.6-9.1-7.5-5.4-7.5c2.2 0 3.6 1.2 5.4 3.3 1.8-2.1 3.2-3.3 5.4-3.3 3.7 0 5.7 3.9 4.2 7.3C7.5 4.4 0 9 0 9z" fill="#c98b94" fill-opacity=".55"/>
      <text x="300" y="460" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="34" fill="#a9636f">${label}</text>
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  function attachImageFallback(img, label = 'Photo coming soon') {
    if (img.dataset.fallbackBound) return;
    img.dataset.fallbackBound = 'true';
    const swapToPlaceholder = () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      img.classList.add('is-fallback');
      img.src = makePlaceholderSrc(label);
    };
    img.addEventListener('error', swapToPlaceholder);
    // Image may have already failed before the listener was attached
    if (img.complete && img.getAttribute('src') && img.naturalWidth === 0) swapToPlaceholder();
  }

  /* ------------------------------------------------------------------------
     4. Decorative effects
     ------------------------------------------------------------------------ */
  const FX_VARIANTS = {
    lily: ['is-stargazer', 'is-stargazer', 'is-white'],
    rose: ['is-rose', 'is-rose', 'is-crimson', 'is-cream'],
    tulip: ['is-pink', 'is-pink', 'is-coral'],
    peony: ['', '', 'is-cream'],
    cherry: ['is-sakura', 'is-white'],
    daisy: [''],
    flower: ['is-cream', 'is-sage'],
    petal: ['is-blush', 'is-blush', 'is-rose', 'is-burgundy', 'is-cream', 'is-coral'],
    heart: ['', 'is-deep'],
    sparkle: [''],
  };

  /** Create one decorative element (flower, petal, heart or sparkle). */
  function createFx(type, size) {
    const node = document.createElement('span');
    const variantList = FX_VARIANTS[type] || [''];
    const variant = pick(variantList);
    node.className = `fx fx--${type}${variant ? ` ${variant}` : ''}`;
    node.style.setProperty('--size', `${size.toFixed(1)}px`);
    return node;
  }

  /** Weighted random type: overwhelmingly BIG lilies, roses, and tulips! */
  function pickBurstType() {
    const roll = Math.random();
    if (roll < 0.32) return 'lily';
    if (roll < 0.62) return 'rose';
    if (roll < 0.88) return 'tulip';
    if (roll < 0.94) return 'peony';
    if (roll < 0.98) return 'cherry';
    return 'petal';
  }

  /* BIG FLOWERS sizing — huge blossoms (110px to 220px) */
  const FX_SIZE = {
    lily: [130, 220],
    rose: [120, 210],
    tulip: [110, 195],
    peony: [125, 215],
    cherry: [80, 140],
    daisy: [85, 145],
    flower: [80, 130],
    petal: [50, 90],
    heart: [35, 60],
    sparkle: [24, 45],
  };

  /* --- 4a. Gentle floating sparkles on the intro screen --- */
  function createIntroSparkles() {
    const count = window.innerWidth < 640 ? 12 : 20;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const type = pick(['sparkle', 'sparkle', 'petal', 'cherry', 'tulip', 'rose']);
      const [min, max] = FX_SIZE[type] || [14, 24];
      const node = createFx(type, random(min, max) * 0.35);
      node.style.setProperty('--x', `${random(4, 96)}%`);
      node.style.setProperty('--y', `${random(6, 94)}%`);
      node.style.setProperty('--dur', `${random(7, 13).toFixed(1)}s`);
      node.style.setProperty('--delay', `${(-random(0, 12)).toFixed(1)}s`);
      node.style.setProperty('--dx', `${random(-24, 24).toFixed(0)}px`);
      node.style.setProperty('--rot', `${random(-60, 60).toFixed(0)}deg`);
      node.style.setProperty('--alpha', random(0.35, 0.75).toFixed(2));
      fragment.appendChild(node);
    }
    elements.introSparkles.appendChild(fragment);
  }

  /** Animate a node with WAAPI and remove it from the DOM when done. */
  function animateAndRemove(node, keyframes, options, onDone) {
    const animation = node.animate(keyframes, { fill: 'both', ...options });
    const cleanup = () => {
      node.remove();
      if (onDone) onDone();
    };
    animation.addEventListener('finish', cleanup, { once: true });
    animation.addEventListener('cancel', cleanup, { once: true });
    return animation;
  }

  /* --- 4b. The grand flower burst ---
     Hundreds of BIG FLOWERS (Lilies, Roses, Tulips) erupt volcanically
     and 100% fill every inch of the screen, floating at their zenith, then
     gently showering downward below the screen to reveal the main page. */
  function flowerBurst(originElement) {
    const rect = originElement.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height * 0.35;
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const fragment = document.createDocumentFragment();
    const pending = [];

    // Dense full-screen grid to guarantee 100% edge-to-edge coverage
    const cols = viewportW < 640 ? 5 : 8;
    const rows = viewportW < 640 ? 8 : 6;
    const cellW = viewportW / cols;
    const cellH = viewportH / rows;

    const targets = [];
    // Primary blanket: one flower in every grid cell
    for (let c = 0; c < cols; c += 1) {
      for (let r = 0; r < rows; r += 1) {
        targets.push({
          x: (c + 0.5 + random(-0.32, 0.32)) * cellW,
          y: (r + 0.5 + random(-0.32, 0.32)) * cellH,
        });
      }
    }
    // Secondary overlapping wave: diagonal staggered cells to ensure thick blanket
    for (let c = 0; c < cols - 1; c += 1) {
      for (let r = 0; r < rows - 1; r += 1) {
        targets.push({
          x: (c + 1 + random(-0.25, 0.25)) * cellW,
          y: (r + 1 + random(-0.25, 0.25)) * cellH,
        });
      }
    }
    // Tertiary scatter: random screen-wide hero blooms
    const extraCount = viewportW < 640 ? 40 : 70;
    for (let i = 0; i < extraCount; i += 1) {
      targets.push({
        x: random(0.04, 0.96) * viewportW,
        y: random(0.04, 0.94) * viewportH,
      });
    }

    targets.forEach((target, index) => {
      const type = pickBurstType();
      const [minSize, maxSize] = FX_SIZE[type] || [100, 180];
      const size = random(minSize, maxSize);
      const node = createFx(type, size);
      node.style.marginLeft = `${(-size / 2).toFixed(1)}px`;
      node.style.marginTop = `${(-size / 2).toFixed(1)}px`;

      const burstX = clamp(target.x, 10, viewportW - 10);
      const burstY = clamp(target.y, 10, viewportH - 10);

      const scale = random(0.95, 1.4);
      const spinA = random(-280, 280);
      const spinB = spinA + random(-220, 220);
      const spinC = spinB + random(-180, 180);
      const sway = random(50, 160) * (Math.random() < 0.5 ? -1 : 1);
      const endY = viewportH + size + 80;

      // Volcanic burst out to screen cell, then slow romantic cascade
      const burstDuration = random(700, 1150);
      const fallDuration = random(3400, 5600);
      const total = burstDuration + fallDuration;
      const burstEnd = burstDuration / total;
      const fallMid = burstEnd + (1 - burstEnd) * 0.46;

      const frame = (x, y, rotate, s) =>
        `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rotate.toFixed(0)}deg) scale(${s.toFixed(2)})`;

      const keyframes = [
        { offset: 0, transform: frame(originX, originY, 0, 0.15), opacity: 0, easing: 'cubic-bezier(0.14, 0.88, 0.28, 1)' },
        { offset: 0.025, opacity: 1 },
        { offset: burstEnd, transform: frame(burstX, burstY, spinA, scale), easing: 'cubic-bezier(0.35, 0, 0.65, 1)' },
        {
          offset: fallMid,
          transform: frame(
            burstX + sway,
            burstY + (endY - burstY) * 0.44,
            spinB,
            scale * 0.98
          ),
          easing: 'cubic-bezier(0.38, 0, 0.72, 1)',
        },
        { offset: 0.90, opacity: 0.96 },
        { offset: 1, transform: frame(burstX + sway * 1.4, endY, spinC, scale * 0.92), opacity: 0 },
      ];

      fragment.appendChild(node);
      // Stagger burst slightly for an organic fountain surge
      pending.push([node, keyframes, { duration: total, delay: random(0, 260) }]);
    });

    elements.burstLayer.appendChild(fragment);
    pending.forEach(([node, keyframes, options]) => animateAndRemove(node, keyframes, options));
  }

  /* --- 4c. Ambient falling petals (limited, behind content) --- */
  const ambientPetals = {
    timerId: 0,
    active: 0,
    running: false,

    get maxActive() {
      return window.innerWidth < 720 ? 7 : 13;
    },

    start() {
      if (this.running || prefersReducedMotion()) return;
      this.running = true;
      this.scheduleNext(200);
    },

    stop({ clear = false } = {}) {
      this.running = false;
      clearTimeout(this.timerId);
      if (clear) {
        elements.petalLayer.querySelectorAll('.fx').forEach((node) => node.getAnimations().forEach((a) => a.cancel()));
      }
    },

    scheduleNext(delay = random(900, 1900)) {
      clearTimeout(this.timerId);
      this.timerId = setTimeout(() => {
        if (!this.running) return;
        if (!document.hidden && this.active < this.maxActive) this.spawn();
        this.scheduleNext();
      }, delay);
    },

    spawn() {
      const type = Math.random() < 0.85 ? 'petal' : pick(['flower', 'heart']);
      const [minSize, maxSize] = FX_SIZE[type];
      const size = random(minSize, maxSize) * random(0.75, 1);
      const node = createFx(type, size);
      const viewportW = window.innerWidth;
      const viewportH = window.innerHeight;
      const startX = random(-0.05, 1.0) * viewportW;
      const drift = random(-0.12, 0.18) * viewportW;
      const sway = random(25, 70);
      const spin = random(180, 540) * (Math.random() < 0.5 ? -1 : 1);
      const alpha = random(0.45, 0.85);
      const steps = 5;
      const keyframes = [];

      for (let step = 0; step <= steps; step += 1) {
        const progress = step / steps;
        const x = startX + drift * progress + Math.sin(progress * Math.PI * 2.4) * sway;
        const y = -40 + (viewportH + 80) * progress;
        keyframes.push({
          offset: progress,
          transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${(spin * progress).toFixed(0)}deg) rotateX(${(progress * 300).toFixed(0)}deg)`,
          opacity: step === 0 || step === steps ? 0 : alpha,
        });
      }

      this.active += 1;
      elements.petalLayer.appendChild(node);
      animateAndRemove(node, keyframes, { duration: random(10000, 17000), easing: 'linear' }, () => {
        this.active -= 1;
      });
    },

    /* Pause everything while the tab is hidden; resume when visible. */
    handleVisibility() {
      const animations = elements.petalLayer.getAnimations({ subtree: true });
      if (document.hidden) animations.forEach((a) => a.pause());
      else animations.forEach((a) => a.play());
    },
  };

  /* ------------------------------------------------------------------------
     5. Memory carousel: 3D orbit around the centerpiece bouquet
     - ALL memory pictures and videos orbit simultaneously around the bouquet
     - Back cards (depth < 0) pass strictly behind the bouquet (z-index < 50)
     - Front cards (depth >= 0) pass strictly in front of the bouquet (z-index > 50)
     - All cards remain visible on the continuous 360° celestial orbit
     ------------------------------------------------------------------------ */
  class MemoryCarousel {
    constructor({ list, dots, prevButton, nextButton, memories, onOpen }) {
      this.list = list;
      this.dotsContainer = dots;
      this.prevButton = prevButton;
      this.nextButton = nextButton;
      this.memories = memories;
      this.onOpen = onOpen;

      this.count = memories.length; // ALL memories (all 68 cards on the ring)
      this.step = this.count ? (Math.PI * 2) / this.count : 0;
      this.rotation = 0; // radians
      this.targetRotation = null;
      this.speed = (Math.PI * 2) / 90; // slow, gentle, romantic auto-rotation
      this.pauseReasons = new Set();
      this.activeIndex = -1;
      this.hoveredItem = null;
      this.hoverResumeTimer = 0;
      this.mode = 'ring';
      this.rafId = 0;
      this.lastTime = 0;
      this.isRunning = false;
      this.geometry = { rx: 480, ry: 155, cy: 0, cardW: 90, cardH: 117 };
      this.drag = null;
      this.suppressClick = false;

      this.items = [];
      this.dotButtons = [];
      this.tick = this.tick.bind(this);
    }

    init() {
      if (!this.count) {
        this.list.closest('.stage')?.classList.add('has-no-memories');
        if (this.prevButton?.parentElement) this.prevButton.parentElement.hidden = true;
        return;
      }
      this.render();
      this.bindEvents();
      this.measure();
      this.layoutRing(performance.now());
      this.setActive(0);
    }

    /* Build every single memory card on the ring */
    render() {
      // Clean up previous items while preserving the centered bouquet figure
      this.list.querySelectorAll('.carousel__item').forEach((el) => el.remove());
      this.items = [];
      this.dotButtons = [];

      const listFragment = document.createDocumentFragment();
      const dotFragment = document.createDocumentFragment();

      if (elements.carouselTotal) {
        elements.carouselTotal.textContent = String(this.count);
      }

      const showDots = this.count <= 12;
      if (elements.carouselPill) {
        elements.carouselPill.hidden = false;
      }
      if (this.dotsContainer) {
        this.dotsContainer.hidden = !showDots;
        this.dotsContainer.innerHTML = '';
      }

      this.memories.forEach((memory, index) => {
        const item = document.createElement('div');
        item.className = 'carousel__item';
        item.dataset.index = String(index);
        item.style.setProperty('--i', String(index));

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'memory-card';

        const frame = document.createElement('span');
        frame.className = 'memory-card__frame';

        const isVid = isVideoMedia(memory);
        const mediaSrc = getMediaSrc(memory);
        button.setAttribute(
          'aria-label',
          `Open memory ${index + 1} of ${this.count}: ${memory.title || (isVid ? 'Video memory' : 'Untitled')}`
        );

        if (isVid) {
          item.classList.add('is-video-item');
          const video = document.createElement('video');
          video.src = encodeURI(mediaSrc) + '#t=0.001';
          video.preload = 'metadata';
          video.muted = true;
          video.playsInline = true;
          video.loop = true;
          video.draggable = false;
          frame.appendChild(video);

          const badge = document.createElement('span');
          badge.className = 'memory-card__badge';
          badge.setAttribute('aria-hidden', 'true');
          badge.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>';
          frame.appendChild(badge);

          item.addEventListener('mouseenter', () => {
            video.play().catch(() => {});
          });
          item.addEventListener('mouseleave', () => {
            video.pause();
          });
        } else {
          const img = document.createElement('img');
          img.alt = '';
          img.decoding = 'async';
          img.loading = index < 18 ? 'eager' : 'lazy';
          img.draggable = false;
          attachImageFallback(img, 'Photo coming soon');
          img.src = mediaSrc;
          frame.appendChild(img);
        }

        button.appendChild(frame);
        item.appendChild(button);
        listFragment.appendChild(item);

        if (showDots) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'carousel-dot';
          dot.setAttribute('aria-label', `Show memory ${index + 1}: ${memory.title || 'Untitled'}`);
          dot.addEventListener('click', () => this.goTo(index));
          dotFragment.appendChild(dot);
          this.dotButtons.push(dot);
        }

        this.items.push({
          item,
          button,
          index,
          tilt: random(-2.5, 2.5),
          phase: random(0, Math.PI * 2),
        });
      });

      if (showDots) {
        this.dotsContainer.appendChild(dotFragment);
      }

      this.list.appendChild(listFragment);
    }

    bindEvents() {
      this.prevButton.addEventListener('click', () => this.prev());
      this.nextButton.addEventListener('click', () => this.next());

      // Click → open dialog
      this.list.addEventListener('click', (event) => {
        const button = event.target.closest('.memory-card');
        if (!button) return;
        if (this.suppressClick) {
          event.preventDefault();
          this.suppressClick = false;
          return;
        }
        const item = button.closest('.carousel__item');
        const index = Number(item?.dataset.index ?? 0);
        this.goTo(index);
        this.onOpen(index);
      });

      // Hover
      this.list.addEventListener('pointerover', (event) => {
        if (event.pointerType === 'touch' || this.drag?.moved) return;
        const item = event.target.closest('.carousel__item');
        if (!item || item === this.hoveredItem) return;
        this.setHovered(item);
      });
      this.list.addEventListener('pointerout', (event) => {
        if (!this.hoveredItem) return;
        const nextItem = event.relatedTarget && event.relatedTarget.closest
          ? event.relatedTarget.closest('.carousel__item')
          : null;
        if (nextItem === this.hoveredItem) return;
        if (nextItem) this.setHovered(nextItem);
        else this.clearHover({ delay: 280 });
      });

      // Keyboard focus brings the card to front and pauses orbit
      this.list.addEventListener('focusin', (event) => {
        const item = event.target.closest('.carousel__item');
        if (!item) return;
        if (event.target.matches(':focus-visible')) {
          this.pause('focus');
          const index = Number(item.dataset.index ?? 0);
          this.goTo(index);
        }
      });
      this.list.addEventListener('focusout', (event) => {
        if (!this.list.contains(event.relatedTarget)) this.resume('focus');
      });

      this.list.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        const nextIndex = mod(this.activeIndex + (event.key === 'ArrowRight' ? 1 : -1), this.count);
        this.goTo(nextIndex);
        this.focusCard(nextIndex);
      });

      // Drag / swipe to spin the ring around the bouquet
      this.list.addEventListener('pointerdown', (event) => this.onPointerDown(event));
      this.list.addEventListener('pointermove', (event) => this.onPointerMove(event));
      this.list.addEventListener('pointerup', (event) => this.onPointerUp(event));
      this.list.addEventListener('pointercancel', (event) => this.onPointerUp(event));

      // Layout changes
      const resizeObserver = new ResizeObserver(() => {
        this.measure();
        this.layoutRing(performance.now());
      });
      resizeObserver.observe(this.list);
    }

    setHovered(item) {
      clearTimeout(this.hoverResumeTimer);
      if (this.hoveredItem && this.hoveredItem !== item) this.hoveredItem.classList.remove('is-hovered');
      this.hoveredItem = item;
      item.classList.add('is-hovered');
      item.style.zIndex = '500';
      this.pause('hover');
    }

    clearHover({ delay = 0 } = {}) {
      clearTimeout(this.hoverResumeTimer);
      const release = () => {
        if (this.hoveredItem) this.hoveredItem.classList.remove('is-hovered');
        this.hoveredItem = null;
        this.resume('hover');
        if (!this.isRunning) this.layoutRing(performance.now());
      };
      if (delay) this.hoverResumeTimer = setTimeout(release, delay);
      else release();
    }

    onPointerDown(event) {
      if (event.button !== 0) return;
      this.drag = {
        id: event.pointerId,
        startX: event.clientX,
        startRotation: this.rotation,
        moved: false,
        lastX: event.clientX,
        lastT: performance.now(),
        velocity: 0,
      };
    }

    onPointerMove(event) {
      const drag = this.drag;
      if (!drag || drag.id !== event.pointerId) return;
      const dx = event.clientX - drag.startX;
      if (!drag.moved && Math.abs(dx) > 8) {
        drag.moved = true;
        this.list.setPointerCapture(event.pointerId);
        this.list.classList.add('is-dragging');
        this.pause('drag');
        this.targetRotation = null;
        if (this.hoveredItem) this.clearHover();
      }
      if (drag.moved) {
        const now = performance.now();
        const sensitivity = 1 / Math.max(this.geometry.rx * 1.3, 200);
        drag.velocity = (event.clientX - drag.lastX) / Math.max(now - drag.lastT, 1);
        drag.lastX = event.clientX;
        drag.lastT = now;
        this.rotation = drag.startRotation + dx * sensitivity;
        if (!this.isRunning) this.layoutRing(now);
      }
    }

    onPointerUp(event) {
      const drag = this.drag;
      if (!drag || drag.id !== event.pointerId) return;
      this.drag = null;
      if (!drag.moved) return;
      this.suppressClick = true;
      setTimeout(() => { this.suppressClick = false; }, 0);
      this.list.classList.remove('is-dragging');
      if (this.list.hasPointerCapture(event.pointerId)) this.list.releasePointerCapture(event.pointerId);

      // Snap to nearest memory, nudged by flick velocity
      const fling = clamp(drag.velocity * 0.5, -2, 2);
      const index = Math.round(-(this.rotation + fling * this.step) / this.step);
      this.goTo(mod(index, this.count));
      setTimeout(() => this.resume('drag'), 1200);
    }

    measure() {
      const width = this.list.clientWidth || window.innerWidth;
      const height = this.list.clientHeight || 500;
      if (!width || !height) return;

      let cardW;
      let rx;
      let ry;
      let cy;

      const bouquetEl = elements.bouquet || this.list.querySelector('.bouquet');
      const bouquetW = bouquetEl ? bouquetEl.clientWidth : (height * 0.75 * (678 / 754));
      const bouquetHalfW = bouquetW / 2;

      if (width < 640) {
        // Mobile phones: compact cards, tightly bounded orbit inside screen width
        cardW = clamp(width * 0.14, 48, 64);
        const cardHalfW = cardW / 2;
        // Strictly prevent cards from clipping off the left or right screen borders
        const maxRx = (width / 2) - cardHalfW - 8;
        const minRx = Math.min(bouquetHalfW + 10, maxRx * 0.88);
        rx = clamp(width * 0.42, minRx, maxRx);
        ry = clamp(height * 0.20, 58, 95);
        cy = height * 0.015;
      } else if (width < 1024) {
        // Tablets (portrait & landscape)
        cardW = clamp(width * 0.09, 66, 84);
        const cardHalfW = cardW / 2;
        const maxRx = (width / 2) - cardHalfW - 16;
        const minRx = bouquetHalfW + cardW * 0.45;
        rx = clamp(width * 0.44, minRx, maxRx);
        ry = clamp(height * 0.24, 85, 140);
        cy = height * 0.025;
      } else {
        // Desktop
        cardW = clamp(Math.min(height * 0.17, width * 0.075), 78, 105);
        const cardHalfW = cardW / 2;
        const maxRx = (width / 2) - cardHalfW - 24;
        const minRx = bouquetHalfW + cardW * 0.65;
        rx = clamp(width * 0.46, minRx, maxRx);
        ry = clamp(height * 0.28, 105, 175);
        cy = height * 0.03;
      }

      const cardH = cardW * 1.30;
      this.list.style.setProperty('--card-w', `${cardW.toFixed(0)}px`);
      this.geometry = { rx, ry, cy, cardW, cardH };
    }

    reveal() {
      this.isRevealed = true;
      this.list.classList.add('is-revealed');
      this.start();
    }

    start() {
      if (this.isRunning || !this.count) return;
      this.isRunning = true;
      this.lastTime = performance.now();
      this.rafId = requestAnimationFrame(this.tick);
    }

    stop() {
      this.isRunning = false;
      cancelAnimationFrame(this.rafId);
    }

    get isPaused() {
      return this.pauseReasons.size > 0;
    }

    pause(reason) {
      this.pauseReasons.add(reason);
    }

    resume(reason) {
      this.pauseReasons.delete(reason);
    }

    tick(now) {
      if (!this.isRunning) return;
      const dt = Math.min((now - this.lastTime) / 1000, 0.05);
      this.lastTime = now;

      if (this.targetRotation !== null) {
        const diff = this.targetRotation - this.rotation;
        this.rotation += diff * Math.min(1, dt * (prefersReducedMotion() ? 20 : 5));
        if (Math.abs(diff) < 0.0005) {
          this.rotation = this.targetRotation;
          this.targetRotation = null;
        }
      } else if (!this.isPaused && !prefersReducedMotion() && !this.drag?.moved) {
        this.rotation -= this.speed * dt;
      }

      this.layoutRing(now);
      this.rafId = requestAnimationFrame(this.tick);
    }

    /* Position every card on the 360° orbit around the bouquet */
    layoutRing(now) {
      const { rx, ry, cy } = this.geometry;
      const bobAllowed = !prefersReducedMotion();
      let frontIndex = 0;
      let frontDepth = -Infinity;

      this.items.forEach(({ item, index, tilt, phase }) => {
        const angle = this.rotation + index * this.step + Math.PI / 2;
        const cos = Math.cos(angle);
        const depth = Math.sin(angle); // -1 (back) … 1 (front)
        const nearness = (depth + 1) / 2; // 0 (back) … 1 (front)

        // All 68 pictures remain visible all around the bouquet!
        item.style.visibility = 'visible';
        item.style.pointerEvents = '';

        const bob = bobAllowed ? Math.sin(now / 1500 + phase) * 4 : 0;
        const x = cos * rx;
        const y = depth * ry + cy + bob;
        const scale = 0.60 + nearness * 0.44;
        const rotateY = -cos * 22;

        item.style.transform =
          `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) perspective(1000px) rotateY(${rotateY.toFixed(2)}deg) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        item.style.opacity = (0.55 + nearness * 0.45).toFixed(3);

        // Depth-sorted z-index relative to bouquet (bouquet has z-index: 50):
        // Cards in back half (depth < 0) pass strictly BEHIND bouquet (z-index: 10 .. 45)
        // Cards in front half (depth >= 0) pass strictly IN FRONT of bouquet (z-index: 55 .. 150)
        if (item === this.hoveredItem) {
          item.style.zIndex = '500';
        } else if (depth < 0) {
          item.style.zIndex = String(Math.round(10 + nearness * 70));
        } else {
          item.style.zIndex = String(Math.round(55 + (nearness - 0.5) * 95));
        }

        if (depth > frontDepth) {
          frontDepth = depth;
          frontIndex = index;
        }
      });

      this.setActive(frontIndex);
    }

    next() {
      this.goTo(mod(this.activeIndex + 1, this.count));
    }

    prev() {
      this.goTo(mod(this.activeIndex - 1, this.count));
    }

    goTo(index, { instant = false } = {}) {
      if (!this.count) return;
      const safeIndex = mod(index, this.count);
      let target = -safeIndex * this.step;
      const fullTurn = Math.PI * 2;
      target += Math.round((this.rotation - target) / fullTurn) * fullTurn;

      if (instant) {
        this.rotation = target;
        this.targetRotation = null;
        this.layoutRing(performance.now());
      } else {
        this.targetRotation = target;
        if (!this.isRunning) this.start();
      }
    }

    setActive(index) {
      if (index === this.activeIndex) return;
      if (this.activeIndex >= 0) {
        this.items[this.activeIndex]?.item.classList.remove('is-front');
        this.dotButtons[this.activeIndex]?.removeAttribute('aria-current');
      }
      this.activeIndex = index;
      this.items[index]?.item.classList.add('is-front');
      this.dotButtons[index]?.setAttribute('aria-current', 'true');
      if (elements.carouselCurrent) {
        elements.carouselCurrent.textContent = String(index + 1);
      }
    }

    focusCard(index) {
      this.items[index]?.button.focus({ preventScroll: true });
    }
  }

  /* ------------------------------------------------------------------------
     6. Memory dialog (native <dialog> → focus trap, inert background, Esc)
     ------------------------------------------------------------------------ */
  class MemoryDialog {
    constructor({ dialog, memories, carousel }) {
      this.dialog = dialog;
      this.memories = memories;
      this.carousel = carousel;
      this.index = 0;
      this.isClosing = false;
      this.swapTimer = 0;
      this.openedWithKeyboard = false;

      this.image = $('#dialog-image', dialog);
      this.video = $('#dialog-video', dialog);
      this.title = $('#dialog-title', dialog);
      this.date = $('#dialog-date', dialog);
      this.message = $('#dialog-message', dialog);
      this.counter = $('#dialog-counter', dialog);
      this.closeButton = $('#dialog-close', dialog);
      this.prevButton = $('#dialog-prev', dialog);
      this.nextButton = $('#dialog-next', dialog);
      this.card = $('.memory-dialog__card', dialog);

      attachImageFallback(this.image, 'Photo coming soon');
    }

    init() {
      this.closeButton.addEventListener('click', () => this.close());
      this.prevButton.addEventListener('click', () => this.show(this.index - 1));
      this.nextButton.addEventListener('click', () => this.show(this.index + 1));

      // Coordinate video audio with background music ducking
      if (this.video) {
        this.video.addEventListener('play', () => {
          if (this.dialog.open && window.musicController) {
            window.musicController.duck(true);
          }
        });
        this.video.addEventListener('pause', () => {
          if (this.dialog.open && window.musicController) {
            window.musicController.duck(false);
          }
        });
      }

      // Esc / close requests → animated close instead of an instant one
      this.dialog.addEventListener('cancel', (event) => {
        event.preventDefault();
        this.close();
      });

      // Light-dismiss fallback for browsers without <dialog closedby>
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        this.dialog.addEventListener('click', (event) => {
          if (event.target !== this.dialog) return;
          const rect = this.card.getBoundingClientRect();
          const inside = rect.top <= event.clientY && event.clientY <= rect.bottom &&
            rect.left <= event.clientX && event.clientX <= rect.right;
          if (!inside) this.close();
        });
      }

      this.dialog.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); this.show(this.index - 1); }
        if (event.key === 'ArrowRight') { event.preventDefault(); this.show(this.index + 1); }
      });

      // Simple swipe between memories on touch screens
      let swipeStart = null;
      this.card.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'touch') swipeStart = { x: event.clientX, y: event.clientY };
      });
      this.card.addEventListener('pointerup', (event) => {
        if (!swipeStart) return;
        const dx = event.clientX - swipeStart.x;
        const dy = event.clientY - swipeStart.y;
        swipeStart = null;
        if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.3) this.show(this.index + (dx < 0 ? 1 : -1));
      });
      this.card.addEventListener('pointercancel', () => { swipeStart = null; });

      // Runs for every way of closing (button, Esc, backdrop, programmatic)
      this.dialog.addEventListener('close', () => this.onClosed());
    }

    open(index, { viaKeyboard = false } = {}) {
      if (!this.memories.length) return;
      this.openedWithKeyboard = viaKeyboard;
      this.carousel.pause('dialog');
      this.carousel.clearHover();
      this.render(index);
      if (!this.dialog.open) {
        this.dialog.removeAttribute('data-closing');
        this.isClosing = false;
        this.dialog.showModal();
        this.closeButton.focus({ preventScroll: true });
      }
    }

    /** Navigate within the dialog with a soft cross-fade. */
    show(index) {
      const nextIndex = mod(index, this.memories.length);
      if (nextIndex === this.index) return;
      clearTimeout(this.swapTimer);
      if (prefersReducedMotion()) {
        this.render(nextIndex);
        return;
      }
      this.dialog.classList.add('is-swapping');
      this.swapTimer = setTimeout(() => {
        this.render(nextIndex);
        requestAnimationFrame(() => this.dialog.classList.remove('is-swapping'));
      }, 220);
    }

    render(index) {
      this.index = mod(index, this.memories.length);
      const memory = this.memories[this.index];
      const isVid = isVideoMedia(memory);
      const mediaSrc = getMediaSrc(memory);

      if (isVid) {
        this.image.hidden = true;
        this.image.src = '';
        if (this.video) {
          this.video.hidden = false;
          this.video.src = encodeURI(mediaSrc);
          const subtleVol = clamp(Number(CONFIG.videoVolume) || 0.28, 0, 1);
          this.video.volume = subtleVol;
          this.video.currentTime = 0;
          if (window.musicController) {
            window.musicController.duck(true);
          }
          this.video.play().catch(() => {});
        }
      } else {
        if (this.video) {
          this.video.pause();
          this.video.hidden = true;
          this.video.src = '';
        }
        if (window.musicController) {
          window.musicController.duck(false);
        }
        this.image.hidden = false;
        this.image.classList.remove('is-fallback');
        delete this.image.dataset.fallbackApplied;
        this.image.src = mediaSrc;
        this.image.alt = memory.alt || memory.title || 'A memory together';
      }

      this.title.textContent = memory.title || '';
      this.date.textContent = memory.date || '';
      this.date.hidden = !memory.date;
      this.message.textContent = memory.message || '';
      this.counter.textContent = `${this.index + 1} / ${this.memories.length}`;
      $('.memory-dialog__text', this.dialog).scrollTop = 0;

      const single = this.memories.length < 2;
      this.prevButton.hidden = single;
      this.nextButton.hidden = single;

      // Preload neighbours if images
      [this.index - 1, this.index + 1].forEach((i) => {
        const neighbour = this.memories[mod(i, this.memories.length)];
        if (neighbour && !isVideoMedia(neighbour)) {
          new Image().src = getMediaSrc(neighbour);
        }
      });
    }

    /* Animated close (works in every browser): play the exit transition, then close(). */
    async close() {
      if (!this.dialog.open || this.isClosing) return;
      if (this.video) {
        this.video.pause();
      }
      if (window.musicController) {
        window.musicController.duck(false);
      }
      this.isClosing = true;
      this.dialog.setAttribute('data-closing', '');
      const animations = this.dialog.getAnimations({ subtree: false });
      if (animations.length && !prefersReducedMotion()) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          wait(600),
        ]);
      } else {
        await wait(prefersReducedMotion() ? 120 : 380);
      }
      if (!this.dialog.hasAttribute('data-closing')) return;
      this.dialog.close();
    }

    onClosed() {
      if (this.video) {
        this.video.pause();
        this.video.src = '';
      }
      if (window.musicController) {
        window.musicController.duck(false);
      }
      this.dialog.removeAttribute('data-closing');
      this.dialog.classList.remove('is-swapping');
      this.isClosing = false;
      // Bring the memory she was viewing to the front, then restore the orbit
      this.carousel.goTo(this.index);
      if (this.openedWithKeyboard) this.carousel.focusCard(this.index);
      this.carousel.resume('dialog');
    }
  }

  /* ------------------------------------------------------------------------
     7. Romantic music player — playlist, continuous loop, auto-start on open
     ------------------------------------------------------------------------ */
  let musicController = null;

  function setupMusic() {
    const musicConfig = CONFIG.music || {};
    const playerWidget = elements.musicPlayer;
    const toggle = elements.musicToggle;
    const skipBtn = elements.musicSkip;
    const titleEl = elements.musicTitle;
    const statusEl = elements.musicStatus;

    if (!playerWidget || !toggle) return;

    // Build the playlist from config
    let playlist = [];
    if (Array.isArray(musicConfig.playlist) && musicConfig.playlist.length > 0) {
      playlist = musicConfig.playlist.filter((t) => t && typeof t.src === 'string' && t.src.trim());
    } else if (typeof musicConfig.src === 'string' && musicConfig.src.trim()) {
      playlist = [{ title: 'Music', src: musicConfig.src }];
    }

    if (playlist.length === 0) {
      playerWidget.hidden = true;
      return;
    }

    let currentIndex = 0;
    const targetVolume = clamp(Number(musicConfig.volume) || 0.55, 0, 1);
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = targetVolume;

    // Single track loops directly; multi-track playlist advances on 'ended'
    if (playlist.length === 1 && musicConfig.loop !== false) {
      audio.loop = true;
    } else {
      audio.loop = false;
    }

    // Hide skip button if only 1 song is present
    if (skipBtn) {
      skipBtn.style.display = playlist.length > 1 ? '' : 'none';
    }

    function setUI(playing) {
      toggle.setAttribute('aria-pressed', String(playing));
      toggle.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
      if (statusEl) statusEl.textContent = playing ? 'Playing' : 'Paused';
    }

    function loadTrack(index) {
      currentIndex = mod(index, playlist.length);
      const track = playlist[currentIndex];
      audio.src = encodeURI(track.src);
      if (titleEl) {
        titleEl.textContent = track.title || 'Romantic Melody';
        titleEl.title = `${track.title || 'Song'}${track.artist ? ' - ' + track.artist : ''}`;
      }
    }

    // Playlist progression: when track ends, proceed to next track in loop
    audio.addEventListener('ended', () => {
      if (musicConfig.loop !== false || currentIndex < playlist.length - 1) {
        loadTrack(currentIndex + 1);
        audio.play().catch((err) => {
          console.warn('Next track playback blocked:', err);
          setUI(false);
        });
      } else {
        setUI(false);
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      playerWidget.hidden = false;
    });

    audio.addEventListener('error', (e) => {
      console.warn('Could not load audio:', playlist[currentIndex]?.src, e);
      if (playlist.length > 1 && currentIndex < playlist.length - 1) {
        loadTrack(currentIndex + 1);
      }
    });

    audio.addEventListener('play', () => setUI(true));
    audio.addEventListener('pause', () => setUI(false));

    // Toggle Play / Pause
    toggle.addEventListener('click', () => {
      if (audio.paused) {
        audio.play().catch(() => setUI(false));
      } else {
        audio.pause();
      }
    });

    // Skip to next track
    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasPlaying = !audio.paused;
        loadTrack(currentIndex + 1);
        if (wasPlaying || true) {
          audio.play().catch(() => setUI(false));
        }
      });
    }

    // Smooth fade-in helper
    function fadeIn(durationMs = 1800) {
      audio.volume = 0;
      const playPromise = audio.play();
      if (!playPromise) return;
      playPromise.then(() => {
        setUI(true);
        const startTime = performance.now();
        function ramp(now) {
          const progress = Math.min(1, (now - startTime) / durationMs);
          audio.volume = progress * targetVolume;
          if (progress < 1) requestAnimationFrame(ramp);
        }
        requestAnimationFrame(ramp);
      }).catch((err) => {
        console.warn('Audio auto-start deferred:', err);
        setUI(false);
      });
    }

    // Audio ducking for videos with subtle audio
    let isDucked = false;
    let duckRaf = 0;
    function duck(shouldDuck) {
      if (isDucked === shouldDuck) return;
      isDucked = shouldDuck;
      cancelAnimationFrame(duckRaf);
      const startVol = audio.volume;
      const endVol = shouldDuck ? Math.min(targetVolume * 0.22, 0.12) : targetVolume;
      const duration = shouldDuck ? 450 : 750;
      const startTime = performance.now();
      function step(now) {
        const progress = Math.min(1, (now - startTime) / duration);
        audio.volume = startVol + (endVol - startVol) * progress;
        if (progress < 1) duckRaf = requestAnimationFrame(step);
      }
      duckRaf = requestAnimationFrame(step);
    }

    // Initialize first track
    loadTrack(0);

    musicController = {
      audio,
      play: () => audio.play(),
      pause: () => audio.pause(),
      fadeIn,
      duck,
      startOnOpen: () => {
        if (musicConfig.autoplayOnOpen !== false && audio.paused) {
          fadeIn(2200);
        }
      },
    };
    window.musicController = musicController;
  }

  /* ------------------------------------------------------------------------
     8. Opening sequence
        click → seal cracks → flap opens → letter rises → flower burst
        → intro fades → bouquet + carousel reveal → gentle falling petals
     ------------------------------------------------------------------------ */
  let hasOpened = false;
  let carousel;

  function revealMain() {
    elements.main.inert = false;
    elements.body.classList.remove('is-intro');
    elements.body.classList.add('is-revealed');
    carousel.reveal();
    elements.title.focus({ preventScroll: true });
  }

  async function openEnvelope() {
    if (hasOpened) return; // guard: the sequence can only ever run once
    hasOpened = true;

    // Start background music immediately within user gesture context
    if (musicController) {
      musicController.startOnOpen();
    }

    const { envelope, intro } = elements;
    envelope.setAttribute('aria-disabled', 'true');
    envelope.classList.add('is-opened');
    intro.classList.add('is-opening');

    if (prefersReducedMotion()) {
      // Calm version: no burst, a simple cross-fade into the main page
      envelope.classList.add('is-flap-open', 'is-letter-out');
      await wait(500);
      intro.classList.add('is-leaving');
      revealMain();
      await wait(950);
      intro.hidden = true;
      elements.introSparkles.replaceChildren();
      return;
    }

    await wait(420);                         // seal breaks (0 – 0.4 s)
    envelope.classList.add('is-flap-open');  // flap swings open
    await wait(620);
    envelope.classList.add('is-letter-out'); // little letter rises
    await wait(700);
    flowerBurst(envelope);                   // ✿ grand flower explosion fills the screen
    envelope.classList.add('is-bursting');
    await wait(850);                         // allow big flowers to erupt and 100% blanket the screen
    intro.classList.add('is-leaving');       // envelope dissolves behind the floral canopy
    revealMain();                            // bouquet centerpiece + 360° memories reveal underneath
    await wait(1000);
    intro.hidden = true;
    elements.introSparkles.replaceChildren();
    await wait(1600);
    ambientPetals.start();                   // gentle ambient petals resume in background
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */
  function init() {
    applyConfigText();
    setupLoveCounter();

    carousel = new MemoryCarousel({
      list: elements.carousel,
      dots: elements.dots,
      prevButton: elements.prev,
      nextButton: elements.next,
      memories: MEMORIES,
      onOpen: (index) => memoryDialog.open(index, { viaKeyboard: lastInteractionWasKeyboard }),
    });

    const memoryDialog = new MemoryDialog({
      dialog: elements.dialog,
      memories: MEMORIES,
      carousel,
    });

    carousel.init();
    memoryDialog.init();
    setupMusic();

    if (!prefersReducedMotion()) createIntroSparkles();

    elements.envelope.addEventListener('click', openEnvelope, { once: true });

    // Track input modality so focus is only restored for keyboard users
    let lastInteractionWasKeyboard = false;
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab' || event.key === 'Enter' || event.key === ' ') lastInteractionWasKeyboard = true;
    }, true);
    document.addEventListener('pointerdown', () => { lastInteractionWasKeyboard = false; }, true);

    // Arrow keys browse memories from anywhere on the main page
    document.addEventListener('keydown', (event) => {
      if (!hasOpened || elements.dialog.open) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (elements.carousel.contains(event.target)) return; // handled by the carousel
      if (event.target.closest && event.target.closest('input, textarea, select')) return;
      event.preventDefault();
      if (event.key === 'ArrowRight') carousel.next();
      else carousel.prev();
    });

    // Save work while the tab is hidden
    document.addEventListener('visibilitychange', () => {
      ambientPetals.handleVisibility();
      if (document.hidden) carousel.stop();
      else if (hasOpened && carousel.mode === 'ring') carousel.start();
    });

    reducedMotionQuery.addEventListener('change', () => {
      if (prefersReducedMotion()) ambientPetals.stop({ clear: true });
      else if (hasOpened) ambientPetals.start();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
