(function() {
    const lat = 19.2885544;
    const lng = -99.0303262;
    const mapa = L.map('mapa').setView([lat, lng ], 13);
    let marker;

    //Utilizacion de Proveider y GeoCoder
    const geoCodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //Colocamos el pin
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    }).addTo(mapa);

    //Detectamos el movimiento del pin y leemos la latitud y longitud
    marker.on('moveend', function(e) {
        marker = e.target;
        const posicion = marker.getLatLng();
        //Ajustamos la ubicacion del pin en el mapa
        mapa.panTo(posicion);

        //Obtenemos la informacion de las calles segun la latitud y longitud
        geoCodeService.reverse().latlng(posicion, 13).run(function (error, resultado){
            marker.bindPopup(resultado.address.LongLabel);

            //Llenamos los campos dentro del dom
            document.querySelector("#p_calle").textContent = resultado.address.LongLabel;
            document.querySelector("#calle").value = resultado.address.LongLabel;
            document.querySelector("#lat").value = posicion.lat;
            document.querySelector("#lng").value = posicion.lng;
        });
    })
})()