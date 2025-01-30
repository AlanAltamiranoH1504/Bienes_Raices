//Importamos los modelos
import Propiedad from "./Propiedad.js";
import Categoria from "./Categoria.js";
import Precio from "./Precio.js";
import Usuario from "./Usuario.js";


//Relaciones entre usuario y Propiedad
Usuario.hasMany(Propiedad); //Un suario tiene muchas propiedades
Propiedad.belongsTo(Usuario,{
    foreignKey: "usuario_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
}); //Una propidad pertence a un usuario

//Relaciones entre Propiedad y Categoria
Categoria.hasMany(Propiedad); //Una categoria tiene muchas propiedades
Propiedad.belongsTo(Categoria, {
    foreignKey: "categoria_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
}); //Una propiedad pertence a una sola categoria

//Relacion entre Propiedad y precio
Precio.hasMany(Propiedad);//Un precio puede tener muchas propiedades
Propiedad.belongsTo(Precio, {
    foreignKey: "precio_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
}); //Una propiedad pertence a un solo precio


export {
    Propiedad,
    Precio,
    Categoria,
    Usuario
}