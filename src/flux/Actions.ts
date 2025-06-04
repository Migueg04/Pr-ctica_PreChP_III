import { AppDispatcher } from './Dispatcher';
import getPlants from '../services/Plants';
import { Plants } from './Store';

export const plantsActionTypes = {
    GET_PLANTS: "GET_PLANTS",
    ADD_TO_GARDEN: "ADD_TO_GARDEN",
    REMOVE_FROM_GARDEN: "REMOVE_FROM_GARDEN",
    UPDATE_PLANT: "UPDATE_PLANT" // ✅ Nuevo tipo
};

export const plantsActions = {
    getPlants: async () => {
        const data = await getPlants();
        const plants = data?.map((plant: any, index: number) => ({
            ...plant,
            id: index,
            image: plant.img,
            inGarden: false
        }));

        AppDispatcher.dispatch({
            type: plantsActionTypes.GET_PLANTS,
            payload: plants
        });
    },

    addToGarden: (id: number) => {
        AppDispatcher.dispatch({
            type: plantsActionTypes.ADD_TO_GARDEN,
            payload: id
        });
    },

    removeFromGarden: (id: number) => {
        AppDispatcher.dispatch({
            type: plantsActionTypes.REMOVE_FROM_GARDEN,
            payload: id
        });
    },

    updatePlant: (updated: Plants) => {
        AppDispatcher.dispatch({
            type: plantsActionTypes.UPDATE_PLANT,
            payload: updated
        });
    }
};
