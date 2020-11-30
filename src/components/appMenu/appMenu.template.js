export default ({ state, html }) => html`
    <div class="menu-wrapper">
        <ul>
            <li>${state.home.label}</li>
            <li>${state.services.label}</li>
            <li>${state.login.label}</li>
        </ul>
        <div data-component="appLabel" data-label="Prop Label"></div>
    </div>
`