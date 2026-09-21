const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');
const year = document.getElementById('year');
const reveals = document.querySelectorAll('.reveal');
const portfolioVideos = document.querySelectorAll('.video-preview');
const videoOverlay = document.getElementById('videoOverlay');
const overlayVideo = document.querySelector('.video-overlay-video');
const closeVideoOverlayButton = document.querySelector('.video-overlay-close');
const imageOverlay = document.getElementById('imageOverlay');
const overlayImage = document.querySelector('.image-overlay-image');
const closeImageOverlayButton = document.querySelector('.image-overlay-close');
const designCards = document.querySelectorAll('.design-card');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinksItems.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const closeVideoOverlay = () => {
  if (!videoOverlay || !overlayVideo) return;
  overlayVideo.pause();
  overlayVideo.currentTime = 0;
  videoOverlay.classList.remove('open');
  videoOverlay.setAttribute('aria-hidden', 'true');
};

const closeImageOverlay = () => {
  if (!imageOverlay || !overlayImage) return;
  imageOverlay.classList.remove('open');
  imageOverlay.setAttribute('aria-hidden', 'true');
  overlayImage.src = '';
};

if (closeVideoOverlayButton) {
  closeVideoOverlayButton.addEventListener('click', closeVideoOverlay);
}

if (closeImageOverlayButton) {
  closeImageOverlayButton.addEventListener('click', closeImageOverlay);
}

if (videoOverlay) {
  videoOverlay.addEventListener('click', (event) => {
    if (event.target === videoOverlay) {
      closeVideoOverlay();
    }
  });
}

if (imageOverlay) {
  imageOverlay.addEventListener('click', (event) => {
    if (event.target === imageOverlay) {
      closeImageOverlay();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeVideoOverlay();
    closeImageOverlay();
  }
});

portfolioVideos.forEach((video) => {
  const playButton = video.parentElement.querySelector('.video-play-toggle');

  if (!playButton) return;

  playButton.addEventListener('click', () => {
    if (!videoOverlay || !overlayVideo) return;

    overlayVideo.src = video.src;
    overlayVideo.muted = false;
    overlayVideo.volume = 0.85;
    overlayVideo.currentTime = 0;
    videoOverlay.classList.add('open');
    videoOverlay.setAttribute('aria-hidden', 'false');
    overlayVideo.play().catch(() => {});
  });
});

designCards.forEach((card) => {
  card.addEventListener('click', () => {
    if (!imageOverlay || !overlayImage) return;

    const imageSrc = card.dataset.image;
    if (!imageSrc) return;

    overlayImage.src = imageSrc;
    overlayImage.alt = card.querySelector('img')?.alt || 'Expanded design preview';
    imageOverlay.classList.add('open');
    imageOverlay.setAttribute('aria-hidden', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((element) => observer.observe(element));


