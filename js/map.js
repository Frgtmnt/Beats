initMap();

        async function initMap() {
            await ymaps3.ready;

            const {YMap, YMapDefaultSchemeLayer, YMapMarker, YMapDefaultFeaturesLayer, YMapCollection} = ymaps3;

            const map = new YMap(
                document.getElementById('map'),
                {
                    location: {
                        center: [30.312388, 59.935274],
                        zoom: 12
                    },
                    behaviors: ['drag', 'pinchZoom', 'mouseTilt']
                }
            );

            map.addChild(new YMapDefaultSchemeLayer());
            map.addChild(new YMapDefaultFeaturesLayer());


            const coords = [
              [30.38935262114668, 59.94554327989287],
              [30.50024587065841, 59.91142323563909],
              [30.319658102103713, 59.88693161784606],
              [30.315194906302924, 59.97033574821672],
            ];

        const marker = document.createElement('img');
        marker.className = 'my-marker';
        marker.src = 'image/icons/marker.svg';

        const collection = new YMapCollection();
        map.addChild(collection);
        
        coords.forEach(coord => {
          collection.addChild(new YMapMarker({coordinates: coord}, marker));
        })


        }