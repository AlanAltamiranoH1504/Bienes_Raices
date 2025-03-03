(function (){
    const lat = 19.2885544;
    const lng = -99.0303262;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);
    let markers = new L.FeatureGroup().addTo(mapa);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const obtenerPropiedades = async () => {
        try {
            await fetch("http://localhost:3000/api/propiedades").then((response) =>{
                return response.json();
            }).then((data) =>{
                mostrarPropiedades(data)
            })
        }catch (e){
            console.log("Error: " + e)
        }
    }
    function mostrarPropiedades(data){
        const {propiedades} = data;
        propiedades.forEach((propiedad, index) =>{
            //Agrgeamos los pines al mapa
            const maker =  new L.marker([propiedad.lat, propiedad.lng], {
                draggable: true,
                autoPan: true
            }).addTo(mapa).bindPopup(propiedad.calle)
            // makers.addLayer(maker);

        });
    }

    obtenerPropiedades();
})();