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
  const openBtn = document.querySelectorAll(openButton);

  const modal = document.querySelector(modalWindow);
  const closeBtn = document.querySelector(closeButton);
  const ham = document.querySelector(".hamburger");
  openBtn.forEach(elem => {
    elem.addEventListener("click", e => {
      e.preventDefault();
      let target = e.target;

      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
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
            //если кнопка активна
            `div[data-card='${card.dataset.card}']` // находим карточку-клона в избранном по атрибуту data
          );
          btnHeart.classList.remove("active");
          cardForRemove.remove(); //удаляем из Избранного
          productCounter("", ".fav-counter");
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
  productCounter("add", ".fav-counter"); //меняем счетчик в товаров в избранном
  btnDel.addEventListener("click", e => {
    //ловим клик на кнопке heart удаления из избранного
    if ((e.target.tagName = "use") || (e.target.tagName = "svg")) {
      //если попали в svg или use
      const origBtnHeart = card.querySelector(".product-card__heart"); //находим кнопку в оригинале
      origBtnHeart.classList.remove("active"); //делаем кнопку не активной
      cardNew.remove(); // удаляем катрочку из избранного (удаляем клона)
      productCounter("", ".fav-counter"); //меняем счетчик в товаров в избранном
    }
  });
  return cardNew;
}
//end функции клонирования карточки

//функция отображения количества товаров
function productCounter(action, btn) {
  const count = document.querySelector(btn);
  let num = +count.textContent;
  action == "add" ? num++ : num--;
  count.textContent = num;
}
//end функции отображения количества товаров в избранном

//функция работы с корзиной
function cart() {
  const cards = document.querySelectorAll(".product-card"); //выбираем все карточки продуктов
  cards.forEach(card => {
    const bag = card.querySelector(".product-card__link");
    bag.addEventListener("click", e => {
      e.preventDefault();
      let checking = check(card);
      if (checking) {
        addCart(card);
        cartTotal("add", card);
        productCounter("add", ".cart-count");
      }
    });
  });
}

//функция проверка на повтор
function check(el) {
  const orderCards = document.querySelectorAll(".order__card");
  let result = true;
  orderCards.forEach(orderCard => {
    if (orderCard.dataset.card === el.dataset.card) result = false;
  });

  return result;
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
//end функции работы счетчика в карточке

//функция подсчета суммы заказа
function cartTotal(action, card) {
  const price = card.querySelector(".product-card__price"),
    orderPrice = card.querySelector(".order__card-sum"),
    count = parseFloat(card.querySelector(".product-card__num").textContent),
    cartSum = document.querySelector(".order__sum"),
    cartSummary = document.querySelector(".order__summary-sum");
  let total;
  if (action == "add") {
    total =
      parseFloat(cartSum.textContent) + count * parseFloat(price.textContent);
  } else {
    total =
      parseFloat(cartSum.textContent) -
      count * parseFloat(orderPrice.textContent);
  }
  cartSum.textContent = total + " руб.";
  cartSummary.textContent = total + " руб.";
}

//функция добавления в корзину
function addCart(card) {
  let wrapper = document.querySelector(".order__cards"); //выбираем обертку карточек в корзине
  const title = card.querySelector(".product-card__title").textContent, //получаем название продукта
    src = card.querySelector(".product-card__pic").getAttribute("src"), //получаем путь к картинке
    data = card.dataset.card, //получаем идентификатор карточки
    price = card.querySelector(".product-card__price").textContent, //получаем цену
    number = card.querySelector(".product-card__number_hover").textContent, //получаем кол-во/вес
    count = card.querySelector(".product-card__num").textContent; //получаем количество из счетчика
  let fragment = document.createElement("div");
  const template = document.querySelector(".cartProduct").innerHTML;

  fragment.innerHTML = template;
  fragment.querySelector(".order__card-pic").setAttribute("src", src);
  fragment.firstElementChild.setAttribute("data-card", data);
  fragment.querySelector(".order__roll").textContent = title;
  fragment.querySelector(".order__card-sum").textContent = price;
  fragment.querySelector(".order__card-num").textContent = number;
  fragment.querySelector(".order__card-count").textContent = count;

  wrapper.appendChild(fragment);
  counter(fragment);
  removeCart(fragment);
}

//функция удаления карточки из корзины
function removeCart(card) {
  const btn = card.querySelector(".order__card-close");

  btn.addEventListener("click", () => {
    card.remove();
    productCounter("", ".cart-count");
    cartTotal("", card);
  });
}
//функция очистки корзины
function clearCart() {
  const btnClear = document.querySelector(".order__reset");
  wrapper = document.querySelector(".order__cards");
  btnClear.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(".order__summary-sum").textContent = "0 руб";
    document.querySelector(".order__sum").textContent = "0 руб";

    wrapper.innerHTML = "";
  });
}

function productCounter(action, btn) {
  const count = document.querySelector(btn);
  let num = +count.textContent;
  action == "add" ? num++ : num--;
  count.textContent = num;
}

search();
toggleModal(".o-fav", ".heart", ".o-fav__close");
toggleModal(".o-delivery", ".delivery-link", ".o-delivery__close");
toggleModal(".o-cart", ".bag", ".o-cart__close");
toggleModal(".o-menu", ".menu-btn", ".o-menu__close");
addFavorite();
toggleHam();
cart();
clearCart();
