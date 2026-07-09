const brands = [
  { name: 'Akai', keywords: 'akai' },
  { name: 'Graetz', keywords: 'graetz' },
  { name: 'INNO HIT', keywords: 'inno hit' },
  { name: 'NordMende', keywords: 'nordmende' },
  { name: 'Schaub Lorenz', keywords: 'schaub lorenz' },
  { name: 'Seleco', keywords: 'seleco' },
  { name: 'Sinudyne', keywords: 'sinudyne' },
  { name: 'TCL', keywords: 'tcl' },
  { name: 'trevi', keywords: 'trevi' },
  { name: 'usto', keywords: 'usto' }
];

function buildBrandSlider() {
  const track = document.querySelector('.brand-track');
  if (!track) return;

  track.innerHTML = '';
  const repeated = [...brands, ...brands];

  repeated.forEach((brand) => {
    const item = document.createElement('div');
    item.className = 'brand-card';

    if (brand.file) {
      const logo = document.createElement('img');
      logo.src = brand.file;
      logo.alt = brand.name;
      logo.loading = 'lazy';
      item.appendChild(logo);
    } else {
      const label = document.createElement('span');
      label.className = 'brand-label';
      label.textContent = brand.name;
      item.appendChild(label);
    }

    track.appendChild(item);
  });
}

function buildBrandGallery() {
  const gallery = document.getElementById('brandGallery');
  const emptyState = document.getElementById('noResults');
  if (!gallery || !emptyState) return;

  gallery.innerHTML = '';
  brands.forEach((brand) => {
    const item = document.createElement('div');
    item.className = 'brand-item';
    item.dataset.keywords = brand.keywords;

    if (brand.file) {
      const logo = document.createElement('img');
      logo.src = brand.file;
      logo.alt = brand.name;
      logo.loading = 'lazy';
      item.appendChild(logo);
    } else {
      const title = document.createElement('p');
      title.className = 'brand-name';
      title.textContent = brand.name;
      item.appendChild(title);
    }

    gallery.appendChild(item);
  });

  emptyState.style.display = brands.length ? 'none' : 'block';
}

function filterBrands(query) {
  const gallery = document.getElementById('brandGallery');
  const emptyState = document.getElementById('noResults');
  if (!gallery || !emptyState) return;

  const text = query.trim().toLowerCase();
  const items = Array.from(gallery.querySelectorAll('.brand-item'));
  let visibleCount = 0;

  items.forEach((item) => {
    const keywords = item.dataset.keywords || '';
    const isVisible = !text || keywords.includes(text);
    item.style.display = isVisible ? 'grid' : 'none';
    if (isVisible) visibleCount += 1;
  });

  emptyState.style.display = visibleCount ? 'none' : 'block';
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries, observerRef) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerRef.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const updateClass = () => {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  updateClass();
  window.addEventListener('scroll', updateClass, { passive: true });
}

window.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSmoothScroll();
  initScrollReveal();
  buildBrandSlider();
  buildBrandGallery();

  const searchInput = document.getElementById('brandSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (event) => {
      filterBrands(event.target.value);
    });
  }
});
