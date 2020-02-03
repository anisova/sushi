(function(){
  const ham=document.querySelector('.hamburger');
  const ham_menu=document.querySelector('.ham-menu');
  const body=document.querySelector('body');
  function toggleMenu(){
      ham.classList.toggle('active');
      ham_menu.classList.toggle('is-active');    
      body.classList.toggle('locked'); 
  }
  ham.addEventListener('click',function(e){
  e.preventDefault();  
  toggleMenu();
  })  
  ham_menu.addEventListener('click',function(e){  
    let target=e.target;
    if (target.className==='menu__link') {    
      toggleMenu();
    }       
  })    
  })();
  

