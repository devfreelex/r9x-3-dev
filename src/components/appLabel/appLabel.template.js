export default ({props, state, html}) => {
    return html`
    <div class="label-wrapper">
        <h3>${state.value} - ${state.counter} - ${props.counter} </h3>
    </div>
`
}