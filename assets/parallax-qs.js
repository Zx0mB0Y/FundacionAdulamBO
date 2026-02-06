(function(){
  const imgs = document.querySelectorAll('.qs-360-img');
  if(!imgs.length) return;

  function onScroll(){
    const vh = window.innerHeight || 800;
    imgs.forEach(img=>{
      const r = img.getBoundingClientRect();
      const p = (r.top - vh) / (r.height + vh);
      const y = Math.max(-14, Math.min(14, p * -18));
      // suma con el “desfase” original
      const base = img.classList.contains('qs-top') ? -10 : (img.classList.contains('qs-bottom') ? 10 : 0);
      img.style.transform = `translateY(${base + y}px)`;
    });
  }

  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
})();
