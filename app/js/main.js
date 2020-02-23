//функция для работы меню гамбургер

(function () {
  const ham = document.querySelector('.hamburger');
  const ham_menu = document.querySelector('.ham-menu');
  const body = document.querySelector('body');
  function toggleMenu() {
    ham.classList.toggle('active');
    ham_menu.classList.toggle('is-active');
    body.classList.toggle('locked');
  }
  ham.addEventListener('click', function (e) {
    e.preventDefault();
    toggleMenu();
  })
  ham_menu.addEventListener('click', function (e) {
    let target = e.target;
    if (target.className === 'menu__link') {
      toggleMenu();
    }
  })
})();

// Функция для появления модального окна Избранное
function toggleFav() {
  const btnFav = document.querySelector('.heart');
  const fav = document.querySelector('.overlay');
  const btnClose = document.querySelector('.favorites__close');
  btnFav.addEventListener('click', e => {
    let target = e.target;
    fav.style.display = 'block';
    document.body.style.overflow='hidden';
  })
  btnClose.addEventListener('click', () => {
    fav.style.display = 'none';
    document.body.style.overflow='';
  })
  fav.addEventListener("click", e => {
    if (e.target === fav) {
      btnClose.click();
    }
  });
};
// функция переключения класса active для кнопки В избранное
function toggleFavActive () {
  const btnFav = document.querySelectorAll('.product-card__heart'); 
  btnFav.forEach ( (element)=> {
    element.addEventListener('click', ()=>{
    element.classList.toggle('active');
  })
  })  
};


//функция добавления в избранное
function addFavorite() {
  const cards = document.querySelectorAll('.product-card'), //выбираем все карточки продуктов
      wrapper = document.querySelector('.favorites__cards'); //выбираем обертку
  //в каждой карточке ловим клик на кнопке Избранное,
    // клонируем карточку, добавляем во всплывающее окно Избранное
      cards.forEach((card) => {        
          const btnFav = card.querySelector('.product-card__favlink');
          let flag=false;     
          btnFav.addEventListener('click', (e) => { 
            e.preventDefault();
            if((e.target.tagName='use')||(e.target.tagName='svg')) {
            const btnHeart = btnFav.querySelector('.product-card__heart');           
            btnHeart.classList.toggle('active');         
            if (btnHeart.classList.contains('active') && (!flag)) 
            {      
              //  if ()         
                const cardClone = card.cloneNode(true);  
                const btnDel = cardClone.querySelector('.product-card__favlink');
                cardClone.classList.add('.favorite__card');
                cardClone.style.width='24%';    
                cardClone.style.margin='0 1em 1em 0';                  
                btnDel.addEventListener('click',(e)=>{
                  if((e.target.tagName='use')||(e.target.tagName='svg'))
                  cardClone.remove();   
                  btnHeart.classList.toggle('active');   
                  flag=false;                   
                })
                wrapper.appendChild(cardClone);  
                flag=true;   
              }
            }
          });
          }); 
        
        };                  
                 
          
          
          


//функция удаления из избранного

// function removeFav(card) {
//   const cards = document.querySelectorAll(card);  
//   cards.forEach((element) => {
//     const btnClose = element.querySelector(btn);    
//     btnClose.addEventListener('click', () => {
//       element.remove();      
//     });
//   });  
// };




toggleFav();
addFavorite();
 








