(function(){
  var root=document.documentElement,red=document.getElementById('red'),blu=document.getElementById('blu');
  if('IntersectionObserver' in window){
    root.classList.add('js');
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.15});
    document.querySelectorAll('.hero>div,section h2,.sub,.about>div,.timeline li,.poster,.contact').forEach(function(el){
      var i=Array.prototype.indexOf.call(el.parentNode.children,el);
      el.style.setProperty('--d',(i%4)*0.12+'s');
      el.classList.add('rv');io.observe(el);
    });
  }
  function team(t){
    if(t==='blu')root.setAttribute('data-team','blu');else root.removeAttribute('data-team');
    red.setAttribute('aria-pressed',t!=='blu');blu.setAttribute('aria-pressed',t==='blu');
  }
  red.addEventListener('click',function(){team('red')});
  blu.addEventListener('click',function(){team('blu')});

  var frame=document.getElementById('frame'),pic=document.getElementById('pic'),file=document.getElementById('file');
  function show(src){pic.src=src;frame.classList.add('has');}
  var def=new Image();def.onload=function(){if(!frame.classList.contains('has'))show('assets/img/foto-profil.jpg');};def.src='assets/img/foto-profil.jpg';
  try{var saved=localStorage.getItem('pf-photo');if(saved)show(saved);}catch(e){}
  file.addEventListener('change',function(){
    var f=file.files&&file.files[0];if(!f)return;
    var r=new FileReader();
    r.onload=function(){
      var im=new Image();
      im.onload=function(){
        var s=Math.min(1,600/Math.max(im.width,im.height)),c=document.createElement('canvas');
        c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);
        var d=c.toDataURL('image/jpeg',.85);show(d);
        try{localStorage.setItem('pf-photo',d);}catch(e){}
      };
      im.src=r.result;
    };
    r.readAsDataURL(f);
  });
})();
