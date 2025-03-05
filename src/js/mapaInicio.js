(function (){
    const lat = 19.2885544;
    const lng = -99.0303262;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);
    let markers = new L.FeatureGroup().addTo(mapa);

    let propiedadesArray = [];
    function setArrayPropiedades(data){
        const {propiedades} = data;
        propiedadesArray.push(...propiedades);
    }

    //Filtros de seleccion
    const filtros = {
        categoria: '',
        precio: ''
    }
    const categorias = document.querySelector("#categorias");
    const precios = document.querySelector("#precios");

    categorias.addEventListener("change", (e) =>{
        filtros.categoria = +e.target.value;
        filtrarPropiedades(filtros);
    });
    precios.addEventListener("change", (e) =>{
        filtros.precio = +e.target.value;
        filtrarPropiedades(filtros);
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const obtenerPropiedades = async () => {
        try {
            await fetch("http://localhost:3000/api/propiedades").then((response) =>{
                return response.json();
            }).then((data) =>{
                mostrarPropiedades(data);
                setArrayPropiedades(data);
            })
        }catch (e){
            console.log("Error: " + e)
        }
    }
    function mostrarPropiedades(data){
        const {propiedades} = data;
        propiedades.forEach((propiedad, index) =>{
            //Agrgeamos los pines al mapa
            const maker =  new L.Marker([propiedad.lat, propiedad.lng], {
                draggable: true,
                autoPan: true
            }).addTo(mapa).bindPopup(`
                <p class="font-bold text-indigo-600 text-sm uppercase font-bold">${propiedad.categoria.nombre}</span> </p>
                <h1 class="text-xl font-extrabold uppercase text-center my-5">${propiedad.titulo}</h1>
                <img src="/uploads/${propiedad.imagen}">
                <p class="font-bold text-xl">Precio: <span class="font-normal">${propiedad.precio.nombre}</span></p>
                <p class="font-bold text-xl">Direccion: <span class="font-normal">${propiedad.calle}</span></p>
                <a href="/propiedad/${propiedad.id}" class="font-bold text-xl text-center bg-green-600 rounded px-3 py-2 block uppercase">Detalles</a>
            `)
            //Esta parte del codigo debe revisarla para que funcione el filtro de busqueda Video 149
            // makers.addLayer(maker);
        });
    }

    function filtrarPropiedades(filtros){
        if (filtros.precio && (filtros.categoria === '' || filtros.categoria === 0)){
            const filtrosPorPrecio = propiedadesArray.filter((propiedad) =>{
                return propiedad.precio.id === filtros.precio;
            })
            console.log(filtrosPorPrecio)
        }else if((filtros.precio === '' || filtros.precio === 0) && filtros.categoria){
            const filtrosPorCategoria = propiedadesArray.filter((propiedad) =>{
                return propiedad.categoria.id === filtros.categoria;
            });
            console.log(filtrosPorCategoria)
        }else if(filtros.precio && filtros.categoria){
            const fullFiltros = propiedadesArray.filter((propiedad) =>{
                return propiedad.categoria.id === filtros.categoria && propiedad.precio.id === filtros.precio;
            })
            console.log(fullFiltros)
        }else {
            console.log("Sin ningun filtro")
        }
    }

    const filtrarCategoria = (propiedad) =>{
        console.log(propiedad)
    }

    obtenerPropiedades();
})();