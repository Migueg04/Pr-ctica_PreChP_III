import { State, store } from '../flux/Store';
import { plantsActions } from '../flux/Actions';

class adminCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        store.subscribe((state: State) => this.handleChange(state));
        this.shadowRoot?.addEventListener("add-to-garden", this.addToGarden.bind(this));
        this.render();
    }

    setEditingMode(isEditing: boolean) {
        if (isEditing) {
            this.setAttribute("editing", "true");
        } else {
            this.removeAttribute("editing");
        }
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

        const {
            common_name,
            scientific_name,
            image,
            type,
            origin,
            flowering_season,
            sun_exposure,
            watering,
            inGarden
        } = plant;

        const isEditing = this.getAttribute("editing") === "true";

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



            button {
                padding: 0.5rem 1rem;
                background-color: ${inGarden ? "#e53935" : "#4CAF50"};
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 1rem;
                cursor: pointer;
                transition: background-color 0.3s;
                margin: 5px
            }

            button:hover {
                background-color: ${inGarden ? "#b71c1c" : "rgb(50, 120, 53)"};
            }
        </style>

        ${isEditing ? `
            <plant-form></plant-form>
        ` : `
            <img src="${image}" alt="${common_name}">
            <h1>${common_name}</h1>
            <h2>${scientific_name}</h2>
            <p><strong>Tipo:</strong> ${type}</p>
            <p><strong>Origen:</strong> ${origin}</p>
            <p><strong>Floración:</strong> ${flowering_season}</p>
            <p><strong>Exposición solar:</strong> ${sun_exposure}</p>
            <p><strong>Riego:</strong> ${watering}</p>
            <div class="admin-buttons">
                <button id="edit">Editar</button>
                <button id="toggle">${inGarden ? "Quitar del jardín" : "Agregar al jardín"}</button>
            </div>
        `}
        `;

        if (isEditing) {
            const form = this.shadowRoot.querySelector("plant-form") as any;
            if (form) {
                form.data = plant;
            }

            form.addEventListener("save-plant", (e: any) => {
                plantsActions.updatePlant(e.detail);
                this.setEditingMode(false);
            });

            form.addEventListener("cancel-edit", () => {
                this.setEditingMode(false);
            });
        } else {
            this.shadowRoot.querySelector("#edit")?.addEventListener("click", () => {
                this.setEditingMode(true);
            });

            this.shadowRoot.querySelector("#toggle")?.addEventListener("click", () => {
                this.addToGarden();
            });
        }
    }
}

export default adminCard;
