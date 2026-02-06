(function () {
  // Evita iniciar dos veces si el script se carga más de una vez
  if (window.__ADULAM_HERO_SLIDER_INIT__) return;
  window.__ADULAM_HERO_SLIDER_INIT__ = true;

  function initHeroSlider() {
    const slides = Array.from(document.querySelectorAll(".hero-slide"));
    const dotsWrap = document.getElementById("heroDots");

    if (!slides.length) return;

    // Si ya existe un timer anterior, lo limpiamos
    if (window.__ADULAM_HERO_TIMER__) {
      clearInterval(window.__ADULAM_HERO_TIMER__);
      window.__ADULAM_HERO_TIMER__ = null;
    }

    let index = 0;
    const INTERVAL = 3000; // 3s
    let dots = [];

    // Crear dots (si existe el contenedor)
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "hero-dot" + (i === 0 ? " is-active" : "");
        dot.setAttribute("aria-label", "Ir a imagen " + (i + 1));
        dot.addEventListener("click", () => goTo(i, true));
        dotsWrap.appendChild(dot);
      });
      dots = Array.from(dotsWrap.querySelectorAll(".hero-dot"));
    }

    function setActive(i) {
      slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
      if (dots.length) dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));
    }

    function next() {
      index = (index + 1) % slides.length;
      setActive(index);
    }

    function goTo(i, restart) {
      index = i;
      setActive(index);
      if (restart) start();
    }

    function start() {
      stop();
      window.__ADULAM_HERO_TIMER__ = setInterval(next, INTERVAL);
    }

    function stop() {
      if (window.__ADULAM_HERO_TIMER__) {
        clearInterval(window.__ADULAM_HERO_TIMER__);
        window.__ADULAM_HERO_TIMER__ = null;
      }
    }

    // Iniciar
    start();

    // ✅ Si el usuario cambia de pestaña y vuelve, reanudar
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") start();
      else stop();
    });

    // ✅ Si volvés a esta página desde otra, reanudar (algunos navegadores)
    window.addEventListener("focus", start);

    // ✅ Si el mouse entra al hero, pausamos (opcional). Si no lo querés, borrá esto.
    const hero = document.querySelector(".hero-slider");
    if (hero) {
      hero.addEventListener("mouseenter", stop);
      hero.addEventListener("mouseleave", start);
      hero.addEventListener("touchstart", stop, { passive: true });
      hero.addEventListener("touchend", start, { passive: true });
    }
  }

  // Inicializa cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroSlider);
  } else {
    initHeroSlider();
  }
})();
;
