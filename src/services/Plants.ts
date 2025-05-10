// TODO: arregla typos de "error", maneja caso de error y exito
async function getPlants(){
    try{
        const response = await fetch ("http://192.168.131.101:8080/dca/api/plants")
        const data = response.json();
        console.log(data)
        return data
    }catch(error){
        console.error("Ha ocurrido un error cargando la API", error)
    }
}
export default getPlants;
