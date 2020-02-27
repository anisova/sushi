//функция для работы меню гамбургер

function toggleHam() {
  const ham = document.querySelector(".hamburger");
  const ham_menu = document.querySelector(".ham-menu");
  const body = document.querySelector("body");
  function toggleMenu() {
    ham.classList.toggle("active");
    ham_menu.classList.toggle("is-active");
    body.classList.toggle("locked");
  }
  ham.addEventListener("click", function(e) {
    e.preventDefault();
    toggleMenu();
  });
  ham_menu.addEventListener("click", function(e) {
    let target = e.target;
    if (target.className === "ham-menu__link") {
      toggleMenu();
    }
  });
}

// Функция для появления модального окна
function toggleModal(modalWindow, openButton, closeButton) {
  const openBtn = document.querySelector(openButton);
  const modal = document.querySelector(modalWindow);
  const closeBtn = document.querySelector(closeButton);
  openBtn.addEventListener("click", e => {
    let target = e.target;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  });
  modal.addEventListener("click", e => {
    if (e.target === modal) {
      closeBtn.click();
    }
  });
}

// Функция для появления поиска

function search() {
  const search = document.querySelector(".search"),
    btnSearch = document.querySelector(".search-icon");
  btnSearch.addEventListener("click", () => {
    search.classList.toggle("search-active");
  });
}

// функция переключения класса active для кнопки В избранное
function toggleFavActive() {
  const btnFav = document.querySelectorAll(".product-card__heart");
  btnFav.forEach(element => {
    element.addEventListener("click", () => {
      element.classList.toggle("active");
    });
  });
}

//функция добавления в избранное
function addFavorite() {
  const cards = document.querySelectorAll(".product-card"), //выбираем все карточки продуктов
    wrapper = document.querySelector(".favorites__cards"); //выбираем обертку
  //в каждой карточке ловим клик на кнопке Избранное,
  // клонируем карточку, добавляем во всплывающее окно Избранное
  cards.forEach(card => {
    counter(card);
    const btnFav = card.querySelector(".product-card__favlink");

    btnFav.addEventListener("click", e => {
      e.preventDefault();

      if ((e.target.tagName = "use") || (e.target.tagName = "svg")) {
        const btnHeart = btnFav.querySelector(".product-card__heart");

        if (!btnHeart.classList.contains("active")) {
          //если кнопка не активна
          btnHeart.classList.add("active"); //делаем кнопку активной
          const cardNew = cardClone(card); //клонируем карточку

          wrapper.appendChild(cardNew); //добавляем карточку в обертку Избранного
        } else {
          const cardForRemove = wrapper.querySelector(
            //если кннопка активна
            `div[data-card='${card.dataset.card}']` // находим карточку-клона в избранном по атрибуту data
          );
          btnHeart.classList.remove("active");
          cardForRemove.remove(); //удаляем из Избранного
        }
      }
    });
  });
}

//функция клонирования карточки
function cardClone(card) {
  const cardNew = card.cloneNode(true); //клонируем карточку в избранное
  const btnDel = cardNew.querySelector(".product-card__favlink"); //находим кнопку heart в карточке в Избранном
  cardNew.classList.add("favorite__card"); //добавляем класс к карточке в Избранном
  cardNew.style.width = "24%"; //устанавливаем ширину карточки
  cardNew.style.margin = "0 1em 1em 0"; // устанавливаем отступы
  btnDel.addEventListener("click", e => {
    //ловим клик на кнопке heart удаления из избранного
    if ((e.target.tagName = "use") || (e.target.tagName = "svg")) {
      //если попали в svg или use
      const origBtnHeart = card.querySelector(".product-card__heart"); //находим кнопку в оригинале
      origBtnHeart.classList.remove("active"); //делаем кнопку не активной
      cardNew.remove(); // удаляем катрочку из избранного (удаляем клона)
    }
  });
  return cardNew;
}
//функция работы счетчика в карточке
function counter(card) {
  const plus = card.querySelector(".product-card__sign-plus"),
    minus = card.querySelector(".product-card__sign-minus");
  plus.addEventListener("click", e => {
    const numSelector = card.querySelector(".product-card__num");
    let num = +numSelector.textContent;
    num++;
    numSelector.textContent = num;
  });
  minus.addEventListener("click", e => {
    const numSelector = card.querySelector(".product-card__num");
    let num = +numSelector.textContent;
    if (num <= 1) {
      num = 1;
    } else num--;
    numSelector.textContent = num;
  });
}

search();
toggleModal(".o-fav", ".heart", ".o-fav__close");
toggleModal(".o-delivery", ".delivery-link", ".o-delivery__close");
addFavorite();
toggleHam();
counter(document.querySelector(".product-card"));
