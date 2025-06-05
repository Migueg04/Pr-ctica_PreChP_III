import { authActions, Screen, screenActions } from "../flux/Actions";
import { State, store } from "../flux/Store";

class Login extends HTMLElement{
    connectedCallback() {
        store.subscribe((state: State) => {this.handleChange(state)});
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    handleChange(state: State) {
        this.render(state);
    }

    render(state = store.getState()) {
        if(!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `
            <h1>HOLA MUNDO, SOY UN LOGIN!</h1>
            <div class="botones">
                <button id="dashboard">Dashboard</button>
                <button id="register">Register</button>
            </div>
            <form id="login-form">
                <input type="text" id="username" placeholder="Username" required />
                <button type="submit">Login</button>
            </form>
        `
        
        const dashboardButton = this.shadowRoot.querySelector('#dashboard')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.DASHBOARD);
        });
        const registerButton = this.shadowRoot.querySelector('#register')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.REGISTER);
        });

        const loginForm = this.shadowRoot.querySelector('#login-form') as HTMLFormElement;
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const usernameInput = this.shadowRoot?.querySelector('#username') as HTMLInputElement;

            authActions.login(usernameInput.value);
        });
    }
};

export default Login;