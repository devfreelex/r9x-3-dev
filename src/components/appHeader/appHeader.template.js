export default ({ state, html }) => html`
    <div class="header-wrapper">
        <h1>${state.title}</h1>
        <div data-component="appMenu"></div>
    </div>
`