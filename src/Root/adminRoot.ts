import { store, Plants } from '../flux/Store';
import { plantsActions } from '../flux/Actions';

class adminRoot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        await plantsActions.getPlants();
        this.render();
    }

render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 1rem;
                font-family: Arial, sans-serif;
                background: #f9f9f9;
                min-height: 100vh;
            }

            .header-container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                margin-bottom: 2rem;
            }

            h1 {
                color: #2d2d2d;
                margin: 0;
            }

            #admin-button {
                background-color: #1976d2;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 6px;
                font-size: 1rem;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            #admin-button:hover {
                background-color: #115293;
            }

            #card-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1.5rem;
                justify-items: center;
            }
        </style>

        <div class="header-container">
            <h1>Administrar Plantas</h1>
            <a id="admin-button" href="/index.html">Volver a tienda</a>
        </div>

        <div id="card-container"></div>     
    `;

    const sortedPlants = [...store.getState().plant].sort((a, b) =>
        a.common_name.localeCompare(b.common_name)
    );

    const plantsList = this.shadowRoot?.querySelector("#card-container")
    sortedPlants.forEach((plant: Plants) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <admin-card 
            plantId="${plant.id}">
        </admin-card>
        `;
        plantsList?.appendChild(div);
    });
}

}

export default adminRoot;