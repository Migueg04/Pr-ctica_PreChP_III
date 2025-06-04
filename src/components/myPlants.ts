import { store, State } from "../flux/Store";

class MyPlants extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        store.subscribe((state: State) => this.render(state));
        this.render();
    }

    render(state: State = store.getState()) {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 1rem;
                    font-family: Arial, sans-serif;
                    background:#f9f9f9;
                    min-height: 30vh;
                }

                h1 {
                    text-align: center;
                    color: #2d2d2d;
                    margin-bottom: 2rem;
                }

                #card-container {
                    background-color:rgb(189, 189, 189);
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    justify-content: center;
                    padding: 1rem;
                    min-height: 10vh;
                }

                .empty-message {
                    font-size: 1.2rem;
                    color: #555;
                    text-align: center;
                    width: 100%;
                    padding: 2rem;
                }
            </style>
            <h1>Mi Jardín</h1>
            <div id="card-container"></div>
        `;

        const container = this.shadowRoot.querySelector("#card-container");
        if (!container) return;

        const gardenPlants = state.plant
            .filter(p => p.inGarden)
            .sort((a, b) => a.common_name.localeCompare(b.common_name));

        container.innerHTML = ""; // Limpiar antes de insertar

        if (gardenPlants.length === 0) {
            container.innerHTML = `<div class="empty-message">Jardín vacío :(</div>`;
        } else {
            gardenPlants.forEach(p => {
                const card = document.createElement("card-component");
                card.setAttribute("plantId", p.id.toString());
                container.appendChild(card);
            });
        }
    }
}

export default MyPlants;
