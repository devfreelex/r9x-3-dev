export default ({props, state, html}) => html`
    <div class="other-wrapper">
        <h1>${state.title} - ${props.id}</h1>
        <div data-component="appHome"></div>
    </div>
`