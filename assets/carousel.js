(function(){
  function initCarousel(root){
    const track = root.querySelector('.carousel-track');
    const slides = Array.from(root.querySelectorAll('.carousel-slide'));
    const prev = root.querySelector('[data-prev]');
    const next = root.querySelector('[data-next]');
    const dotsWrap = root.parentElement.querySelector('.dots');
    if(!track || slides.length === 0) return;

    let index = 0;

    const dots = slides.map((_,i)=>{
      const b=document.createElement('button');
      b.type='button';
      b.className='dot'+(i===0?' active':'');
      b.addEventListener('click', ()=>go(i));
      dotsWrap && dotsWrap.appendChild(b);
      return b;
    });

    function render(){
      track.style.transform = `translateX(-${index*100}%)`;
      dots.forEach((d,i)=>d.classList.toggle('active', i===index));
    }
    function go(i){
      index = (i + slides.length) % slides.length;
      render();
    }

    prev && prev.addEventListener('click', ()=>go(index-1));
    next && next.addEventListener('click', ()=>go(index+1));

    const intervalMs = 4500; // EDITAR: 0 para desactivar auto
    if(intervalMs>0){
      let t=setInterval(()=>go(index+1), intervalMs);
      root.addEventListener('mouseenter', ()=>clearInterval(t));
      root.addEventListener('mouseleave', ()=>{ t=setInterval(()=>go(index+1), intervalMs); });
    }
    render();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  });
})();
