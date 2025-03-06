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

    let filtrosAplicados = [];
    categorias.addEventListener("change", (e) =>{
        filtros.categoria = +e.target.value;
        filtrosAplicados = filtrarPropiedades(filtros);
        // console.log(filtrosAplicados)
        mostrarPropiedades(filtrosAplicados);
    });
    precios.addEventListener("change", (e) =>{
        filtros.precio = +e.target.value;
        filtrosAplicados = filtrarPropiedades(filtros);
        mostrarPropiedades(filtrosAplicados);
    });


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const obtenerPropiedades = async () => {
        try {
            await fetch("http://localhost:3000/api/propiedades").then((response) =>{
                return response.json();
            }).then((data) =>{
                const {propiedades} = data;
                mostrarPropiedades(propiedades);
                setArrayPropiedades(data);
            })
        }catch (e){
            console.log("Error: " + e)
        }
    }
    function mostrarPropiedades(propiedades){
        console.log(propiedades)
        //Limpiar los markers
        markers.clearLayers();
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
            `);
            markers.addLayer(maker);
        });
    }

    function filtrarPropiedades(filtros){
        if (filtros.precio && (filtros.categoria === '' || filtros.categoria === 0)){
            const filtrosPorPrecio = propiedadesArray.filter((propiedad) =>{
                return propiedad.precio.id === filtros.precio;
            });
            return filtrosPorPrecio;
            console.log(filtrosPorPrecio)
        }else if((filtros.precio === '' || filtros.precio === 0) && filtros.categoria){
            const filtrosPorCategoria = propiedadesArray.filter((propiedad) =>{
                return propiedad.categoria.id === filtros.categoria;
            });
            return filtrosPorCategoria;
            console.log(filtrosPorCategoria)
        }else if(filtros.precio && filtros.categoria){
            const fullFiltros = propiedadesArray.filter((propiedad) =>{
                return propiedad.categoria.id === filtros.categoria && propiedad.precio.id === filtros.precio;
            });
            return fullFiltros;
            // console.log(fullFiltros)
        }else {
            return propiedadesArray;
            alert("No hay filtros seleccionados");
            console.log("Sin ningun filtro")
        }
    }
    obtenerPropiedades();
})();