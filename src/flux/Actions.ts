import { AppDispatcher } from './Dispatcher';

import getPlants from '../services/Plants';

export const plantsActionTypes = {
    GET_PLANTS: "GET_PLANTS"
}

 export const plantsActions = {
    getPlants: async () => {
        const plants = await getPlants()
        AppDispatcher.dispatch({
                type: "GET_PLANTS",
                payload: plants
        });
    },
};