export default ({ state, html }) => html`
    <div class="header-wrapper">
        <h1>${state.title} - ${state.counter || ''}</h1>
        <div data-component="appMenu"></div>
    </div>
`