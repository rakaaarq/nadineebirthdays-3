/* =========================================================
   CONFIG — bagian yang paling mudah diedit.
   Ganti nama, tanggal, foto, lagu, caption, surat, dan makanan favorit di sini.
   ========================================================= */
const CONFIG = {
  recipientName: "Nadine Aminara Haries",
  senderName: "A",
  birthdayDate: "June 20, 2026",
  music: "assets/music/lagu.mp3",
  animations: {
    lantern: "assets/animations/lantern.png",
    sun: "assets/animations/sun.png",
    flower: "assets/animations/flower.png"
  },
  gallery: [
    {
      src: "assets/images/foto1.jpg",
      caption: "My favorite face, my favorite story."
    },
    {
      src: "assets/images/foto2.jpg",
      caption: "A little princess since the beginning."
    },
    {
      src: "assets/images/foto3.jpg",
      caption: "You look like a soft little dream I never want to wake up from."
    },
    {
      src: "assets/images/foto4.jpg",
      caption: "In every glance of yours, I find a thousand quiet kinds of beautiful."
    },
    {
      src: "assets/images/foto5.jpg",
      caption: "Soft as morning light, beautiful in every little detail."
    },
    {
      src: "assets/images/foto6.jpg",
      caption: "Even in the simplest moment, you still look like my favorite wonder."
    }
  ],
  wishMessages: [
    "I love you more than words can say.",
    "You are my favorite kind of magic.",
    "Your smile is my favorite light.",
    "Stay happy, my princess.",
    "You shine brighter than a thousand lanterns.",
    "This little world was made only for you.",
    "You are my sweetest story.",
    "You deserve every beautiful thing in this world.",
    "My heart always finds its way back to you.",
    "You are the magic in this little story."
  ],
  letter: [
    "Dear Nadine Aminara Haries,",
    "Happy birthday, my princess.",
    "Today is not just about celebrating your birthday. It is about celebrating you — someone whose presence can make an ordinary day feel warmer, softer, and more beautiful. You may not always realize it, but the little things about you have a special place in my heart: your smile, your eyes, your sweetness, and the way you simply become yourself.",
    "I may not always have the perfect words to describe how much you mean to me, but I hope this little surprise can show even a small part of what I feel. To me, you are like a lantern in the night sky — gentle, beautiful, and full of light. You make the world feel less heavy and my days feel more meaningful.",
    "On your birthday, I hope life gives you the happiness you deserve. I hope your dreams slowly come true, your heart stays protected from sadness, and your days are filled with reasons to smile. I hope you always remember how special you are, not only today, but every single day.",
    "Thank you for being the sweet, lovely, strong, and beautiful person that you are. Never think that you are ordinary, because in my eyes, you are one of the most beautiful stories I have ever known.",
    "Happy birthday, Nadine. May your life shine brighter than a thousand lanterns.",
    "With love, A"
  ],
  favorites: [
    {
      title: "Cookies & Cream",
      image: "assets/favorites/cookies-cream.jpg",
      text: "Her favorite little comfort drink, sweet, soft, and always makes the day feel better."
    },
    {
      title: "Brownies",
      image: "assets/favorites/brownies.jpg",
      text: "A sweet treat for someone whose smile is even sweeter."
    },
    {
      title: "Durian",
      image: "assets/favorites/durian.jpg",
      text: "Unique, bold, and unforgettable — just like the little things that make Nadine special."
    },
    {
      title: "Kue Putu",
      image: "assets/favorites/kue-putu.jpg",
      text: "A warm traditional sweetness that feels cozy, simple, and full of memories."
    },
    {
      title: "Mango",
      image: "assets/favorites/mango.jpg",
      text: "Bright, fresh, and sweet, just like the happiness she brings."
    },
    {
      title: "Martabak Manis",
      image: "assets/favorites/martabak-manis.jpg",
      text: "A classic favorite filled with sweetness, just like this little birthday surprise."
    }
  ]
};

/* =========================================================
   UTILITIES
   ========================================================= */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

function formatTime(seconds = 0) {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

/* =========================================================
   STAR FIELD + SMALL MOVING DOTS
   ========================================================= */
function createStarField() {
  const field = $("#starField");
  if (!field) return;

  const total = window.innerWidth < 650 ? 85 : 150;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < total; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty("--s", `${randomBetween(1.5, 4.2)}px`);
    star.style.setProperty("--d", `${randomBetween(2.3, 6.5)}s`);
    star.style.animationDelay = `${randomBetween(-6, 0)}s`;
    fragment.appendChild(star);
  }

  field.appendChild(fragment);
}

/* =========================================================
   OPENING + MUSIC PLAYER
   ========================================================= */
function setupMusic() {
  const audio = $("#birthdayAudio");
  const openBtn = $("#openSurpriseBtn");
  const playPauseBtn = $("#playPauseBtn");
  const muteBtn = $("#muteBtn");
  const musicDock = $("#musicDock");
  const musicToggleBtn = $("#musicToggleBtn");
  const progressBar = $("#progressBar");
  const currentTime = $("#currentTime");
  const durationTime = $("#durationTime");
  const volumeControl = $("#volumeControl");

  if (!audio) return;

  audio.volume = Number(volumeControl?.value || 0.72);

  musicToggleBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = musicDock?.classList.toggle("music-open");
    musicToggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (event) => {
    if (!musicDock || musicDock.contains(event.target)) return;
    musicDock.classList.remove("music-open");
    musicToggleBtn?.setAttribute("aria-expanded", "false");
  });

  async function playMusic() {
    try {
      await audio.play();
      if (playPauseBtn) playPauseBtn.textContent = "Pause";
    } catch (error) {
      showToast("Tap play to start the music.");
      if (playPauseBtn) playPauseBtn.textContent = "Play";
    }
  }

  openBtn?.addEventListener("click", () => {
    document.body.classList.add("surprise-open");
    playMusic();
    createSparkBurst(window.innerWidth / 2, window.innerHeight / 2, 22);
    setTimeout(() => $("#hero")?.scrollIntoView({ behavior: "smooth", block: "start" }), 520);
  });

  playPauseBtn?.addEventListener("click", () => {
    if (audio.paused) playMusic();
    else {
      audio.pause();
      playPauseBtn.textContent = "Play";
    }
  });

  muteBtn?.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "Unmute" : "Mute";
  });

  volumeControl?.addEventListener("input", () => {
    audio.volume = Number(volumeControl.value);
    audio.muted = audio.volume === 0;
    if (muteBtn) muteBtn.textContent = audio.muted ? "Unmute" : "Mute";
  });

  audio.addEventListener("loadedmetadata", () => {
    if (durationTime) durationTime.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    if (!progressBar || !currentTime) return;
    const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    progressBar.value = percent;
    currentTime.textContent = formatTime(audio.currentTime);
  });

  progressBar?.addEventListener("input", () => {
    if (!audio.duration) return;
    audio.currentTime = (Number(progressBar.value) / 100) * audio.duration;
  });
}

/* =========================================================
   FLOATING LANTERNS
   ========================================================= */
function createLanterns() {
  const stage = $("#lanternStage");
  if (!stage) return;

  stage.innerHTML = "";
  const total = window.innerWidth < 650 ? 9 : 14;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < total; i++) {
    const button = document.createElement("button");
    button.className = "lantern-btn";
    button.type = "button";
    button.setAttribute("aria-label", "Open a sweet little message");

    const size = randomBetween(window.innerWidth < 650 ? 54 : 64, window.innerWidth < 650 ? 76 : 100);
    button.style.setProperty("--x", `${randomBetween(8, 92)}%`);
    button.style.setProperty("--size", `${size}px`);
    button.style.setProperty("--duration", `${randomBetween(11, 17)}s`);
    button.style.setProperty("--delay", `${randomBetween(0, 6)}s`);
    button.style.setProperty("--drift", `${randomBetween(-90, 90)}px`);

    const image = document.createElement("img");
    image.src = CONFIG.animations.lantern;
    image.alt = "";
    image.draggable = false;

    button.appendChild(image);
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const message = CONFIG.wishMessages[Math.floor(Math.random() * CONFIG.wishMessages.length)];
      showMessageBubble(event.clientX, event.clientY, message);
      createSparkBurst(event.clientX, event.clientY, 10);
    });

    fragment.appendChild(button);
  }

  stage.appendChild(fragment);
}

function showMessageBubble(x, y, text) {
  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = text;
  bubble.style.left = `${clamp(x, 120, window.innerWidth - 120)}px`;
  bubble.style.top = `${clamp(y, 90, window.innerHeight - 80)}px`;
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), 1900);
}

/* =========================================================
   GALLERY — no crop, no foto1/foto2 labels
   ========================================================= */
let currentPhotoIndex = 0;

function setupGallery() {
  const mainImage = $("#mainGalleryImage");
  const blur = $("#galleryBlur");
  const caption = $("#galleryCaption");
  const thumbs = $("#galleryThumbs");
  const dots = $("#galleryDots");
  const main = $("#galleryMain");
  const prev = $("#prevPhoto");
  const next = $("#nextPhoto");
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxCaption = $("#lightboxCaption");
  const closeLightbox = $("#closeLightbox");

  if (!mainImage || !caption || !thumbs || !dots || !blur) return;

  thumbs.innerHTML = "";
  dots.innerHTML = "";

  CONFIG.gallery.forEach((photo, index) => {
    const btn = document.createElement("button");
    btn.className = "thumb-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", `Open memory ${index + 1}`);
    btn.style.setProperty("--thumb-bg", `url('${photo.src}')`);
    btn.style.setProperty("backgroundImage", `url('${photo.src}')`);
    btn.addEventListener("click", () => updateGallery(index));

    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = `Memory ${index + 1}`;
    btn.appendChild(img);
    thumbs.appendChild(btn);

    const dot = document.createElement("span");
    dot.className = "gallery-dot";
    dots.appendChild(dot);
  });

  // Set pseudo background on thumbnail using inline variable support fallback
  $$(".thumb-btn").forEach((button, index) => {
    const src = CONFIG.gallery[index]?.src;
    button.style.setProperty("--bg", `url('${src}')`);
  });

  prev?.addEventListener("click", () => updateGallery((currentPhotoIndex - 1 + CONFIG.gallery.length) % CONFIG.gallery.length));
  next?.addEventListener("click", () => updateGallery((currentPhotoIndex + 1) % CONFIG.gallery.length));

  function openLightbox() {
    const photo = CONFIG.gallery[currentPhotoIndex];
    if (!photo || !lightbox || !lightboxImage || !lightboxCaption) return;
    lightboxImage.src = photo.src;
    lightboxCaption.textContent = photo.caption;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  main?.addEventListener("click", openLightbox);
  main?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") openLightbox();
  });

  closeLightbox?.addEventListener("click", closeLightboxFn);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightboxFn();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightboxFn();
    if (event.key === "ArrowLeft") prev?.click();
    if (event.key === "ArrowRight") next?.click();
  });

  function closeLightboxFn() {
    lightbox?.classList.remove("open");
    lightbox?.setAttribute("aria-hidden", "true");
  }

  updateGallery(0);
}

function updateGallery(index) {
  const mainImage = $("#mainGalleryImage");
  const blur = $("#galleryBlur");
  const caption = $("#galleryCaption");
  const main = $("#galleryMain");
  const photo = CONFIG.gallery[index];
  if (!mainImage || !blur || !caption || !photo) return;

  currentPhotoIndex = index;
  main?.classList.add("changing");

  setTimeout(() => {
    mainImage.src = photo.src;
    mainImage.alt = photo.caption;
    blur.style.backgroundImage = `url('${photo.src}')`;
    caption.textContent = photo.caption;
    $$(".thumb-btn").forEach((btn, i) => btn.classList.toggle("active", i === index));
    $$(".gallery-dot").forEach((dot, i) => dot.classList.toggle("active", i === index));
    main?.classList.remove("changing");
  }, 140);
}

/* =========================================================
   LETTER
   ========================================================= */
function setupLetter() {
  const button = $("#openLetterBtn");
  const envelope = $("#royalEnvelope");
  const text = $("#letterText");
  if (!button || !envelope || !text) return;

  text.innerHTML = CONFIG.letter
    .map((paragraph, index) => `<p style="--i:${index}">${paragraph}</p>`)
    .join("");

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    envelope.classList.toggle("open");
    createSparkBurst(event.clientX, event.clientY, 14);
  });
}

/* =========================================================
   FAVORITE THINGS
   ========================================================= */
function setupFavorites() {
  const timeline = $("#favoritesTimeline");
  if (!timeline) return;

  timeline.innerHTML = CONFIG.favorites.map((item, index) => `
    <article class="favorite-row">
      <div class="favorite-node" aria-hidden="true"></div>
      <div class="favorite-card reveal-mini">
        ${vineSvg()}
        <img src="${item.image}" alt="${item.title}" />
        <div>
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      </div>
    </article>
  `).join("");
}

function vineSvg() {
  return `
    <svg class="vine-frame" viewBox="0 0 500 170" preserveAspectRatio="none" aria-hidden="true">
      <path class="gold-vine" d="M22 18 C80 4, 130 34, 190 16 S315 8, 478 20" />
      <path class="gold-vine" d="M22 152 C90 170, 138 135, 210 153 S342 170, 478 150" />
      <path class="lavender-vine" d="M17 26 C2 64, 28 95, 15 144" />
      <path class="lavender-vine" d="M483 26 C498 64, 472 95, 485 144" />
      <path class="gold-vine" d="M28 30 C48 20, 72 18, 92 36" />
      <path class="gold-vine" d="M472 30 C452 20, 428 18, 408 36" />
      <path class="gold-vine" d="M28 140 C48 150, 72 152, 92 134" />
      <path class="gold-vine" d="M472 140 C452 150, 428 152, 408 134" />
      <circle class="bud" cx="74" cy="26" r="5" />
      <circle class="bud" cx="426" cy="26" r="5" />
      <circle class="bud" cx="74" cy="144" r="5" />
      <circle class="bud" cx="426" cy="144" r="5" />
      <ellipse class="leaf" cx="95" cy="39" rx="8" ry="4" />
      <ellipse class="leaf" cx="405" cy="39" rx="8" ry="4" />
      <ellipse class="leaf" cx="95" cy="131" rx="8" ry="4" />
      <ellipse class="leaf" cx="405" cy="131" rx="8" ry="4" />
    </svg>
  `;
}

/* =========================================================
   SCROLL REVEAL + PARALLAX
   ========================================================= */
function setupReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  $$(".reveal-section").forEach((section) => observer.observe(section));

  const miniObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${Math.random() * 0.25}s`;
        entry.target.classList.add("visible");
        miniObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  setTimeout(() => $$(".reveal-mini").forEach((el) => miniObserver.observe(el)), 100);
}

function setupParallax() {
  const cards = $$(".parallax-card");
  const decos = $$(".floating-deco");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  window.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    cards.forEach((card) => {
      card.style.transform = `translate3d(${x * 6}px, ${y * 5}px, 0)`;
    });
    decos.forEach((deco, index) => {
      const power = index % 2 === 0 ? 10 : 7;
      deco.style.translate = `${x * power}px ${y * power}px`;
    });
  }, { passive: true });
}

/* =========================================================
   FLYING BACKGROUND SPARKLES
   ========================================================= */
function createFlyingSparkles() {
  const existing = document.querySelectorAll(".flying-sparkle");
  existing.forEach((node) => node.remove());
  const total = window.innerWidth < 650 ? 18 : 34;
  const symbols = ["✦", "✧", "✶", "·", "✺"];
  const colors = ["rgba(255,220,130,.78)", "rgba(230,205,255,.66)", "rgba(255,255,255,.62)"];

  for (let i = 0; i < total; i++) {
    const sparkle = document.createElement("span");
    sparkle.className = "flying-sparkle";
    sparkle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    sparkle.style.setProperty("--x", `${randomBetween(0, 100)}vw`);
    sparkle.style.setProperty("--drift", `${randomBetween(-95, 95)}px`);
    sparkle.style.setProperty("--dur", `${randomBetween(10, 18)}s`);
    sparkle.style.setProperty("--delay", `${randomBetween(-16, 0)}s`);
    sparkle.style.setProperty("--fs", `${randomBetween(8, 18)}px`);
    sparkle.style.setProperty("--c", colors[Math.floor(Math.random() * colors.length)]);
    document.body.appendChild(sparkle);
  }
}

/* =========================================================
   CLICK MAGIC + TOAST
   ========================================================= */
let lastMagicClick = 0;
function setupClickMagic() {
  document.addEventListener("click", (event) => {
    if (event.target.closest("button, input, .gallery-main, .lightbox")) return;
    const now = Date.now();
    if (now - lastMagicClick < 180) return;
    lastMagicClick = now;
    createSparkBurst(event.clientX, event.clientY, 8);
  });

  $("#sendMagicBtn")?.addEventListener("click", (event) => {
    event.stopPropagation();
    createSparkBurst(event.clientX, event.clientY, 22);
    showToast("You are the magic in this little story.");
  });
}

function createSparkBurst(x, y, total = 8) {
  const symbols = ["✦", "✧", "♡", "❀", "✶"];
  const count = clamp(total, 6, 24);

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = "click-magic";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = randomBetween(34, 88);

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty("--move-x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--move-y", `${Math.sin(angle) * distance}px`);
    particle.style.fontSize = `${randomBetween(14, 22)}px`;

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 920);
  }
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* =========================================================
   INIT
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  createStarField();
  createFlyingSparkles();
  setupMusic();
  createLanterns();
  setupGallery();
  setupLetter();
  setupFavorites();
  setupReveal();
  setupParallax();
  setupClickMagic();
});

window.addEventListener("resize", () => {
  // Rebuild lanterns and sparkles lightly on resize to keep positions responsive.
  clearTimeout(window.__lanternResizeTimer);
  window.__lanternResizeTimer = setTimeout(createLanterns, 300);
  clearTimeout(window.__sparkleResizeTimer);
  window.__sparkleResizeTimer = setTimeout(createFlyingSparkles, 360);
});
