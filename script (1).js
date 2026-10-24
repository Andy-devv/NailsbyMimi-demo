/* Navbar scroll shadow */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

/* Hamburger */
const ham = document.getElementById('hamburger');
const drawer = document.getElementById('nav-drawer');
ham.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  ham.classList.toggle('open', open);
  ham.setAttribute('aria-expanded', open);
});
function closeDrawer() {
  drawer.classList.remove('open');
  ham.classList.remove('open');
  ham.setAttribute('aria-expanded','false');
}
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeDrawer));

/* Scroll reveal */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:0.08});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => revealObs.observe(el));

/* Hero sparkles */
(function() {
  const wrap = document.getElementById('sparkles');
  if(!wrap) return;
  for(let i=0; i<18; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*4}s;animation-duration:${2+Math.random()*3}s`;
    wrap.appendChild(s);
  }
})();

/* Lightbox */
const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
const galleryLabels = Array.from(document.querySelectorAll('.gallery-overlay span')).map(s=>s.textContent);
let lbIdx = 0;
galleryImgs.forEach((img,i) => { img.parentElement.addEventListener('click', ()=>openLb(i)); });
function openLb(i) {
  lbIdx = i;
  document.getElementById('lb-img').src = galleryImgs[i].src;
  document.getElementById('lb-label').textContent = galleryLabels[i];
  document.getElementById('lb-counter').textContent = (i+1) + ' / ' + galleryImgs.length;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(e) { if(e.target===document.getElementById('lightbox')) closeLightboxBtn(); }
function closeLightboxBtn() { document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow=''; }
function lbNav(dir) {
  lbIdx = (lbIdx+dir+galleryImgs.length)%galleryImgs.length;
  document.getElementById('lb-img').src = galleryImgs[lbIdx].src;
  document.getElementById('lb-label').textContent = galleryLabels[lbIdx];
  document.getElementById('lb-counter').textContent = (lbIdx+1) + ' / ' + galleryImgs.length;
}
document.addEventListener('keydown', e => {
  if(!document.getElementById('lightbox').classList.contains('open')) return;
  if(e.key==='ArrowRight') lbNav(1);
  if(e.key==='ArrowLeft')  lbNav(-1);
  if(e.key==='Escape')     closeLightboxBtn();
});

/* ── SCROLL PROGRESS ── */
window.addEventListener('scroll', () => {
  const el = document.getElementById('scroll-progress');
  if(el) {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    el.style.width = Math.min(pct, 100) + '%';
  }
}, {passive:true});

/* ── BACK TO TOP ── */
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-to-top');
  if(btn) btn.classList.toggle('visible', window.scrollY > 500);
}, {passive:true});

/* ── NAVBAR SCROLL SHADOW ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
}, {passive:true});

/* ── ACTIVE NAV ON SCROLL ── */
const _navSections = ['about','services','gallery','policy','contact'];
const _navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  _navSections.forEach(id => {
    const sec = document.getElementById(id);
    if(sec && window.scrollY >= sec.offsetTop - 120) current = id;
  });
  _navLinks.forEach(a => {
    a.classList.toggle('nav-active', a.getAttribute('href') === '#' + current);
  });
}, {passive:true});

/* ── SMOOTH ANCHOR OFFSET ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if(target) {
      e.preventDefault();
      window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY - 80, behavior:'smooth'});
    }
  });
});

/* ── COUNT-UP ANIMATION ── */
function countUp(el, target, suffix, duration) {
  let startTime = null;
  const step = (ts) => {
    if(!startTime) startTime = ts;
    const prog = Math.min((ts - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if(prog < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(step);
}
const _statDefs = [{raw:500,suffix:'+'},{raw:5,suffix:' ★'},{raw:4,suffix:'+'}];
const _statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      document.querySelectorAll('.hero-stat .num').forEach((el,i) => {
        if(_statDefs[i] && !el.dataset.counted) {
          el.dataset.counted = '1';
          countUp(el, _statDefs[i].raw, _statDefs[i].suffix, 1800);
        }
      });
      _statObs.disconnect();
    }
  });
}, {threshold:0.5});
const _statsEl = document.querySelector('.hero-stats');
if(_statsEl) _statObs.observe(_statsEl);

/* ── HERO SPARKLES ── */
(function() {
  const wrap = document.getElementById('sparkles');
  if(!wrap) return;
  for(let i=0;i<18;i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.cssText = 'left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;animation-delay:'+Math.random()*4+'s;animation-duration:'+(2+Math.random()*3)+'s';
    wrap.appendChild(s);
  }
})();

/* ── SWIPE GESTURES ON LIGHTBOX ── */
let _tx=0, _ty=0;
const _lb = document.getElementById('lightbox');
if(_lb) {
  _lb.addEventListener('touchstart', e=>{ _tx=e.touches[0].clientX; _ty=e.touches[0].clientY; },{passive:true});
  _lb.addEventListener('touchend', e=>{
    const dx=e.changedTouches[0].clientX-_tx, dy=e.changedTouches[0].clientY-_ty;
    if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>50) lbNav(dx<0?1:-1);
    else if(Math.abs(dy)>80&&Math.abs(dy)>Math.abs(dx)) closeLightboxBtn();
  },{passive:true});
}
