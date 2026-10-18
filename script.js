(function () {
  var intro    = document.getElementById('intro');
  var site     = document.getElementById('site');
  var envelope = document.getElementById('envelope');
  var opened   = false;

  function openEnvelope(e) {
    if (e) e.preventDefault();
    if (opened) return;
    opened = true;

    if (navigator.vibrate) { try { navigator.vibrate(20); } catch (err) {} }

    envelope.classList.add('open');

    setTimeout(function () { envelope.classList.add('launch'); }, 1300);

    setTimeout(function () {
      intro.classList.add('hide');
      site.classList.add('show');
      site.scrollTop = 0;
      initScrollAnimations();
    }, 2100);

    setTimeout(function () { intro.style.display = 'none'; }, 2900);
  }

  envelope.addEventListener('pointerup', openEnvelope, { passive: false });
  envelope.addEventListener('touchend',  openEnvelope, { passive: false });
  envelope.addEventListener('click',     openEnvelope, false);
  envelope.addEventListener('touchstart', function (e) { e.preventDefault(); }, { passive: false });

  function initScrollAnimations() {
    var faders = document.querySelectorAll('.fade-in');
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    faders.forEach(function(el) { observer.observe(el); });
    
    setTimeout(function() {
      var first = document.querySelector('.hero');
      if(first) first.classList.add('visible');
    }, 100);
  }

  var countDownDate = new Date("Dec 20, 2026 15:00:00").getTime();
  var timerEl = document.getElementById('countdown');
  
  if (timerEl) {
    var timerInterval = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      
      if (distance < 0) {
        clearInterval(timerInterval);
        timerEl.innerHTML = "СВАДЬБА СОСТОЯЛАСЬ!";
        return;
      }
      
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      timerEl.innerHTML = 
          String(days).padStart(2, '0') + " : " +
          String(hours).padStart(2, '0') + " : " +
          String(minutes).padStart(2, '0') + " : " +
          String(seconds).padStart(2, '0');
    }, 1000);
  }

  var form = document.getElementById('rsvpForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Спасибо! Ваша анкета отправлена.');
      form.reset();
    });
  }
})();