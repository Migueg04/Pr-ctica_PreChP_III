import { authActions, Screen, screenActions } from "../flux/Actions";
import { State, store } from "../flux/Store";

class Register extends HTMLElement{
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
            <h1>HOLA MUNDO, SOY UN REGISTER!</h1>
            <div class="botones">
                <button id="login">Login</button>
                <button id="dashboard">Dashboard</button>
            </div>
            <form id="register-form">
                <input type="text" id="username" placeholder="Username" required />
                <select type="select" id="user-type" placeholder="User Type" required />
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select>
                <button type="submit">Register</button>
            </form>
        `

        const loginButton = this.shadowRoot.querySelector('#login')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.LOGIN);
        });
        const dashboardButton = this.shadowRoot.querySelector('#dashboard')?.addEventListener('click', () => {
            screenActions.changeScreen(Screen.DASHBOARD);
        });

        const registerForm = this.shadowRoot.querySelector('#register-form') as HTMLFormElement;
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const usernameInput = this.shadowRoot?.querySelector('#username') as HTMLInputElement;
            const userTypeSelect = this.shadowRoot?.querySelector('#user-type') as HTMLSelectElement;

            if (usernameInput && userTypeSelect) {
                const username = usernameInput.value;
                const userType = userTypeSelect.value;

                authActions.register(username, userType);
                
                screenActions.changeScreen(Screen.LOGIN);
            }
        });
    }
};

export default Register;