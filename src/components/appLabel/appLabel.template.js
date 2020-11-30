export default ({props, state, html}) => {
    return html`
    <div class="label-wrapper">
        <h3>${state.value} - ${state.counter} - ${props.label} </h3>
    </div>
`
}