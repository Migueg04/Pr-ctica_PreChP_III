import { AppDispatcher } from '../flux/Dispatcher';
import { State, store } from '../flux/Store';

class Card extends HTMLElement{
    constructor(){
        super()
        this.attachShadow({mode: "open"})
    }

    connectedCallback(){
        store.unsubscribe(this._handleActions.bind(store));
        this.render()
    }

    _handleActions(store: State){
        this.render();
    }

    render(){

        const commonName = this.getAttribute("commonName")
        const scientificName = this.getAttribute("scientificName")
        const image = this. getAttribute("image")

        if(this.shadowRoot)
            this.shadowRoot.innerHTML = `
                <img src="${image}" alt="${commonName}">
                <h1>${commonName}</h1>
                <h2>${scientificName}</h2>

        `;
    }
}
export default Card 