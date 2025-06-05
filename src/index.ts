import Root from "./Root/Root";

customElements.define('root-element', Root);
export default Root;

import Register from "./screens/register";
import Login from "./screens/login";
import Dashboard from "./screens/dashboard";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

customElements.define('register-component', Register);
customElements.define('login-component', Login);
customElements.define('dashboard-component', Dashboard);
customElements.define('login-form', LoginForm);
customElements.define('register-form', RegisterForm);
