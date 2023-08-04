document.addEventListener('DOMContentLoaded', function () {
    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map('map', {
            center: [53.299869585408445, 60.10021912738417],
            zoom: 16
        }),
            objectManager = new ymaps.ObjectManager({
                clusterize: true,
                gridSize: 32
            });
        myMap.geoObjects.add(objectManager);
        objectManager.objects.options.set('preset', 'islands#redDotIcon');
        myMap.geoObjects.add(objectManager);
        objectManager.add({
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "id": 1,
                    "geometry": {
                        "type": "Point",
                        "coordinates": [53.299869585408445, 60.10021912738417]
                    },
                    "properties": {
                        "balloonContent": 'Париж, Россия',
                        "iconCaption": 'Париж, Россия'
                    }
                }, {
                    "type": "Feature",
                    "id": 2,
                    "geometry": {
                        "type": "Point",
                        "coordinates": [59.12198517825234,37.915145558593764]
                    },
                    "properties": {
                        "balloonContent": "Череп по короткому",
                        "iconCaption": "Череповец"
                    }
                }, {
                    "type": "Feature",
                    "id": 3,
                    "geometry": {
                        "type": "Point",
                        "coordinates": [53.55481771492051,9.99551918541983]
                    },
                    "properties": {
                        "balloonContent": "Гамбург",
                        "iconCaption": "Гамбург"
                    }
                }
            ]
        });
        /* 2. Обработка списка и меток */
        //Клик по метке в карте
        objectManager.objects.events.add('click', function (e) {
            var objectId = e.get('objectId');
            viewObject(objectId);
        });
        //Клик в списке
        [].forEach.call(document.querySelectorAll('[data-objectId]'), function (el) {
            el.addEventListener('click', function () {
                var objectId = el.getAttribute("data-objectId");
                viewObject(objectId);
            });
        });
        // Что происходит при выборе метки или варианта из списка
        function viewObject(objectId) {
            // Удаляем со всего списка класс active затем добавляем к выбранному
            for (var object of document.querySelectorAll('[data-objectId]')) {
                object.classList.remove('active');
            }
            document.querySelector('[data-objectId="' + objectId + '"]').classList.add('active');
            // Выделяем все метки в синий, затем выбранную в красную
            objectManager.objects.each(function (item) {
                objectManager.objects.setObjectOptions(item.id, {
                    preset: 'islands#blueIcon'
                });
            });
            objectManager.objects.setObjectOptions(objectId, {
                preset: 'islands#redDotIcon'
            });
            // Центрирование по метке
            myMap.setCenter(objectManager.objects.getById(objectId).geometry.coordinates, 15, {
                checkZoomRange: true
            });
        }
    }
});
