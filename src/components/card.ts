import { State, store } from '../flux/Store';
import { plantsActions } from '../flux/Actions';


class Card extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        store.subscribe((state: State) => this.handleChange(state));
        this.shadowRoot?.addEventListener("add-to-garden", this.addToGarden.bind(this));
        this.render();
    }

addToGarden() {
    const id = this.getAttribute("plantId");
    const plant = store.getState().plant.find(p => p.id === Number(id));
    if (id && plant) {
        if (plant.inGarden) {
            plantsActions.removeFromGarden(Number(id));
        } else {
            plantsActions.addToGarden(Number(id));
        }
    }
}


    handleChange(state: State) {
        this.render(state);
    }

 render(state = store.getState()) {
    const id = Number(this.getAttribute("plantId"));
    const plant = state.plant.find(p => p.id === id);

    if (!plant || !this.shadowRoot) return;

   const { common_name, scientific_name, image, inGarden } = plant;


    this.shadowRoot.innerHTML = `
    <style>
        :host {
            display: block;
            width: 250px;
            border: 1px solid #ddd;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            font-family: Arial, sans-serif;
            background: ${inGarden ? '#e0ffe0' : '#fff'};
            transition: transform 0.2s;
            text-align: center;
            padding: 1rem;
            box-sizing: border-box;
        }

        :host(:hover) {
            transform: scale(1.02);
        }

        img {
            width: 100%;
            height: auto;
            object-fit: cover;
            border-radius: 8px;
        }

        h1 {
            font-size: 1.2rem;
            margin: 0.5rem 0;
            color: #333;
        }

        h2 {
            font-size: 1rem;
            margin: 0 0 1rem;
            color: #666;
        }
    </style>
    <img src="${image}" alt="${common_name}">
    <h1>${common_name}</h1>
    <h2>${scientific_name}</h2>
    <button-component inGarden="${inGarden}"></button-component>
    `;
}

}
export default Card;
