const html = (tags, ...values) => {
    return tags.map( (tag, index) => {
        return `${tag}${values[index] || ''}`
    }).join('')
}    


const render = (data, component) => {

    let state = {}

    data ?
        state = data :
        state = component.state


    const { template } = component
    component.element.innerHTML = template({ state, html })
    component.bindEventListener()
}

export { render }