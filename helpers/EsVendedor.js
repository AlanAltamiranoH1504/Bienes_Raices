const esVendedor = (usuario, propiedad) =>{
    if (usuario.id === propiedad.usuario_id){
        return false;
    }else{
        return true;
    }
}

export default esVendedor;