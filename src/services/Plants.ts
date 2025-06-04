async function getPlants() {
    try {
        const response = await fetch('./data/data.json');

        const data = await response.json();
        console.log("Datos cargados correctamente:", data);
        return data;

    } catch (error) {
        console.error("Ha ocurrido un error al cargar la API:", error);
        
    }
}

export default getPlants;
