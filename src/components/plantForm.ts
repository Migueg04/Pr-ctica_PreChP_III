import { Plants } from "../flux/Store";

class plantForm extends HTMLElement {
    plant!: Plants;

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ["plant"];
    }

    set data(value: Plants) {
        this.plant = value;
        this.render();
    }

    getFormData(): Plants {
        const inputs = this.shadowRoot!.querySelectorAll("input");
        return {
            ...this.plant,
            common_name: (inputs[0] as HTMLInputElement).value,
            scientific_name: (inputs[1] as HTMLInputElement).value,
            type: (inputs[2] as HTMLInputElement).value,
            origin: (inputs[3] as HTMLInputElement).value,
            flowering_season: (inputs[4] as HTMLInputElement).value,
            sun_exposure: (inputs[5] as HTMLInputElement).value,
            watering: (inputs[6] as HTMLInputElement).value,
            image: (inputs[7] as HTMLInputElement).value,
        };
    }

    render() {
        if (!this.plant) return;

        this.attachShadow({ mode: "open" });
        const {
            common_name,
            scientific_name,
            type,
            origin,
            flowering_season,
            sun_exposure,
            watering,
            image
        } = this.plant;

        this.shadowRoot!.innerHTML = `
        <style>
            input {
                width: 100%;
                padding: 0.5rem;
                margin: 0.3rem 0;
                box-sizing: border-box;
            }

            .form-buttons {
                display: flex;
                justify-content: space-between;
                margin-top: 1rem;
            }

            button {
                padding: 0.5rem 1rem;
                border: none;
                border-radius: 5px;
                font-size: 1rem;
                cursor: pointer;
            }

            button#save {
                background-color: #4CAF50;
                color: white;
            }

            button#cancel {
                background-color: #e53935;
                color: white;
            }
        </style>

        <input name="common_name" value="${common_name}" />
        <input name="scientific_name" value="${scientific_name}" />
        <input name="type" value="${type}" />
        <input name="origin" value="${origin}" />
        <input name="flowering_season" value="${flowering_season}" />
        <input name="sun_exposure" value="${sun_exposure}" />
        <input name="watering" value="${watering}" />
        <input name="image" value="${image}" />

        <div class="form-buttons">
            <button id="save">Guardar</button>
            <button id="cancel">Cancelar</button>
        </div>
        `;

        this.shadowRoot!.querySelector("#save")?.addEventListener("click", () => {
            const updated = this.getFormData();
            this.dispatchEvent(new CustomEvent("save-plant", { detail: updated, bubbles: true, composed: true }));
        });

        this.shadowRoot!.querySelector("#cancel")?.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("cancel-edit", { bubbles: true, composed: true }));
        });
    }
}

export default plantForm;
