export default ({ props, state, html}) => html`
    <div class="main-wrapper">
        <h1>${state.title}</h1>
        <div data-component="appHeader"></div>
        <div data-component="routerView"></div>
    </div>
`