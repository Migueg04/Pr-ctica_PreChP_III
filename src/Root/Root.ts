import { store, State } from '../flux/Store';
import { AppDispatcher } from '../flux/Dispatcher';

class Root extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        //AppDispatcher.register(this._handleActions.bind(state));
        this.render();
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <h1>MIS PLANTITAS LINDAS</h1>
            <div id="card-container"></div>
            <card-component></card-component>        
        `;

        //nst plantsList = this.innerHTML?.queryselector("#card-container")
    }
}

export default Root;