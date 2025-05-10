import { AppDispatcher, Action } from './Dispatcher';
import getPlants from '../services/Plants';

export type Plants = {
    id: number,
    commonName: string,
    scientificName: string,
    img: string,
}

export type State = {
    plant: Plants[]
};

type Listener = (state: State) => void;

class Store {
    private _myState: State = {
        plant: []
    }

    private _listeners: Listener[] = [];

    constructor() {
        AppDispatcher.register(this._handleActions.bind(this));
    }

    getState() {
        return {};
    }

    _handleActions(action: Action): void {
        switch (action.type) {
            case "GET_PLANTS":
                this._myState = {
                    ...this._myState,
                    plant: action.payload as Plants[]
                }
                this._emitChange();
                break;
        }
    }

    private _emitChange(): void {
        for (const listener of this._listeners) { }
    }

    unsubscribe(listener: Listener): void { }
}

export const store = new Store();