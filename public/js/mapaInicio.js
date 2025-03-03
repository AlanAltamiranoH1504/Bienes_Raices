/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function (){\r\n    const lat = 19.2885544;\r\n    const lng = -99.0303262;\r\n    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);\r\n    let markers = new L.FeatureGroup().addTo(mapa);\r\n\r\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n    }).addTo(mapa);\r\n\r\n    const obtenerPropiedades = async () => {\r\n        try {\r\n            await fetch(\"http://localhost:3000/api/propiedades\").then((response) =>{\r\n                return response.json();\r\n            }).then((data) =>{\r\n                mostrarPropiedades(data)\r\n            })\r\n        }catch (e){\r\n            console.log(\"Error: \" + e)\r\n        }\r\n    }\r\n    function mostrarPropiedades(data){\r\n        const {propiedades} = data;\r\n        propiedades.forEach((propiedad, index) =>{\r\n            //Agrgeamos los pines al mapa\r\n            const maker =  new L.Marker([propiedad.lat, propiedad.lng], {\r\n                draggable: true,\r\n                autoPan: true\r\n            }).addTo(mapa).bindPopup(`\r\n                <p class=\"font-bold text-indigo-600 text-sm uppercase font-bold\">${propiedad.categoria.nombre}</span> </p>\r\n                <h1 class=\"text-xl font-extrabold uppercase text-center my-5\">${propiedad.titulo}</h1>\r\n                <img src=\"/uploads/${propiedad.imagen}\">\r\n                <p class=\"font-bold text-xl\">Precio: <span class=\"font-normal\">${propiedad.precio.nombre}</span></p>\r\n                <p class=\"font-bold text-xl\">Direccion: <span class=\"font-normal\">${propiedad.calle}</span></p>\r\n                <a href=\"/propiedad/${propiedad.id}\" class=\"font-bold text-xl text-center bg-green-600 rounded px-3 py-2 block uppercase\">Detalles</a>\r\n            `)\r\n            //Esta parte del codigo debe revisarla para que funcione el filtro de busqueda Video 149\r\n            // makers.addLayer(maker);\r\n\r\n        });\r\n    }\r\n\r\n    obtenerPropiedades();\r\n})();\n\n//# sourceURL=webpack://bienes_raices_mvc/./src/js/mapaInicio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;