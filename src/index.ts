import Root from "./Root/Root";
import adminRoot from "./Root/adminRoot";
import adminCard from "./components/adminCard";
import Button from "./components/button";
import Card from "./components/card"
import MyPlants from "./components/myPlants";
import plantForm from "./components/plantForm";

customElements.define('root-element', Root);
customElements.define("card-component", Card);
customElements.define ("button-component", Button)
customElements.define ("my-garden", MyPlants)
customElements.define ("admin-root", adminRoot)
customElements.define ("admin-card", adminCard)
customElements.define("plant-form", plantForm);
