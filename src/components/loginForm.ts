import { screenActions } from "../flux/Actions";
import { State, store } from "../flux/Store";
import { Screen } from "../flux/Actions";

class LoginForm extends HTMLElement{
    connectedCallback() {
        store.subscribe((state: State) => {this.handleChange(state)});
        this.attachShadow({ mode: 'open' });
    }

    handleChange(state: State) {
        this.render(state);
    }

    render(state: State = store.getState()) {
        if (this.shadowRoot)
        this.shadowRoot.innerHTML = `
            <style>
                form {
                    display: flex;
                    flex-direction: column;
                    width: 300px;
                    margin: auto;
                }
                input {
                    margin-bottom: 10px;
                    padding: 8px;
                    font-size: 16px;
                }
                button {
                    padding: 10px;
                    font-size: 16px;
                }
            </style>
            <form id="loginForm">
                <input type="text" placeholder="Username" name="username" required />
                <input type="password" placeholder="Password" name="password" required />
                <button type="submit">Login</button>
                <button type="button" id="registerButton">Register</button>
            </form>
        `;
        
        const registerButton = this.shadowRoot?.querySelector('#registerButton');
        registerButton?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.REGISTER);
        });
    }
}
export default LoginForm;