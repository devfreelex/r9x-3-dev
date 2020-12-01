export default ({props, state, html}) => html`
    <div class="home-wrapper">
        <h1>${state.title}</h1>
        <div data-component="appOther" data-id="child other"></div>
    </div>
`