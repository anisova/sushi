// Функция для появления модального окна Избранное
function toggleFav() {
  const btnFav = document.querySelector(".heart");
  const fav = document.querySelector(".overlay");
  const btnClose = document.querySelector(".favorites__close");
  btnFav.addEventListener("click", e => {
    let target = e.target;
    fav.style.display = "block";
    document.body.style.overflow = "hidden";
  });
  btnClose.addEventListener("click", () => {
    fav.style.display = "none";
    document.body.style.overflow = "";
  });
  fav.addEventListener("click", e => {
    if (e.target === fav) {
      btnClose.click();
    }
  });
}

//функция добавления в избранное
function addFavorite() {
  const cards = document.querySelectorAll(".product-card"), //выбираем все карточки продуктов
    wrapper = document.querySelector(".favorites__cards"); //выбираем обертку
  //в каждой карточке ловим клик на кнопке Избранное,
  // клонируем карточку, добавляем во всплывающее окно Избранное
  cards.forEach(card => {
    const btnFav = card.querySelector(".product-card__favlink");

    btnFav.addEventListener("click", e => {
      e.preventDefault();

      if ((e.target.tagName = "use") || (e.target.tagName = "svg")) {
        const btnHeart = btnFav.querySelector(".product-card__heart");

        if (!btnHeart.classList.contains("active")) {
          btnHeart.classList.add("active");
          const cardNew = cardClone(card);

          wrapper.appendChild(cardNew);
        } else {
          const cardForRemove = wrapper.querySelector(
            `div[data-card='${card.dataset.card}']`
          );
          btnHeart.classList.remove("active");
          cardForRemove.remove();
        }
      }
    });
  });
}

function cardClone(card) {
  const cardNew = card.cloneNode(true);
  const btnDel = cardNew.querySelector(".product-card__favlink");
  cardNew.classList.add(".favorite__card");
  cardNew.style.width = "24%";
  cardNew.style.margin = "0 1em 1em 0";
  btnDel.addEventListener("click", e => {
    if ((e.target.tagName = "use") || (e.target.tagName = "svg")) {
      const origBtnHeart = card.querySelector(".product-card__heart");
      origBtnHeart.classList.remove("active");
      cardNew.remove();
    }
  });
  return cardNew;
}

toggleFav();
addFavorite();
