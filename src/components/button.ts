class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    static get observedAttributes() {
        return ["ingarden"];
    }

    attributeChangedCallback() {
        this.render();
    }

    connectedCallback() {
        this.render();
        this.shadowRoot?.querySelector("button")?.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("add-to-garden", {
                bubbles: true,
                composed: true
            }));
        });
    }

    render() {
        const inGarden = this.getAttribute("ingarden") === "true";
        const buttonText = inGarden ? "Quitar del jardín" : "Agregar al jardín";

        if (this.shadowRoot)
            this.shadowRoot.innerHTML = `
            <style>
                button {
                    padding: 0.5rem 1rem;
                    background-color: ${inGarden ? "#e53935" : "#4CAF50"};
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: ${inGarden ? "#b71c1c" : "rgb(50, 120, 53)"};
                }
            </style>
            <button>${buttonText}</button>
        `;
    }
}
export default Button;
