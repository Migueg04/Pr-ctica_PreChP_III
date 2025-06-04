import { AppDispatcher, Action } from './Dispatcher';

export type Plants = {
    id: number;
    common_name: string;
    scientific_name: string;
    image: string;
    type: string;
    origin: string;
    flowering_season: string;
    sun_exposure: string;
    watering: string;
    inGarden: boolean;
};

export type State = {
    plant: Plants[]
};

type Listener = (state: State) => void;

const STORAGE_KEY = "plants-app";

class Store {
    private _myState: State = {
        plant: []
    }

    private _listeners: Listener[] = [];

    constructor() {
        this.loadFromStorage();
        AppDispatcher.register(this._handleActions.bind(this));
    }

    getState() {
        return this._myState;
    }

    setState(newState: State) {
        this._myState = newState;
        this.persist(); // 👈 Guardar en localStorage
        this._emitChange();
    }

    private persist() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._myState));
    }

    private loadFromStorage() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            try {
                this._myState = JSON.parse(data);
            } catch (e) {
                console.error("Error al cargar localStorage:", e);
            }
        }
    }

    private _handleActions(action: Action): void {
        switch (action.type) {
            case "GET_PLANTS":
                
                if (this._myState.plant.length === 0) {
                    this._myState = {
                        ...this._myState,
                        plant: action.payload as Plants[]
                    };
                    this.persist();
                    this._emitChange();
                }
                break;

            case "ADD_TO_GARDEN":
                this.setState({
                    ...this._myState,
                    plant: this._myState.plant.map(p =>
                        p.id === Number(action.payload) ? { ...p, inGarden: true } : p
                    )
                });
                break;

            case "REMOVE_FROM_GARDEN":
                this.setState({
                    ...this._myState,
                    plant: this._myState.plant.map(p =>
                        p.id === Number(action.payload) ? { ...p, inGarden: false } : p
                    )
                });
                break;

            case "UPDATE_PLANT":
                this.setState({
                    ...this._myState,
                    plant: this._myState.plant.map(p =>
                        p.id === action.payload.id ? { ...p, ...action.payload } : p
                    )
                });
                break;
        }
    }

    private _emitChange(): void {
        const state = this.getState();
        for (const listener of this._listeners) {
            listener(state);
        }
    }

    subscribe(listener: Listener): void {
        this._listeners.push(listener);
        listener(this.getState());
    }

    unsubscribe(listener: Listener): void {
        this._listeners = this._listeners.filter(l => l !== listener);
    }
}

export const store = new Store();
