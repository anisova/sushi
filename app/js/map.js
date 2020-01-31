ymaps.ready(init);
function init(){
    // Создание карты.
    var map = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.731126028645,37.633523160049414],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        controls: ['zoomControl'],
        behaviors:[],
        zoom: 16
    });
    var placemark = new ymaps.Placemark([55.73127586662741,37.633818203041045],
        { hintContent:'<div class="map__hint"> sushi<br> ул. Валовая, 6</div>',
        balloonContent:'<div class="map__hint"> sushi<br> ул. Валовая, 6</div>'
    
    },
    {
        iconLayout:'default#image',
        iconImageHref:'img/logo.png',
        iconImageSize:[50,50]
    });
    map.geoObjects.add(placemark);
}