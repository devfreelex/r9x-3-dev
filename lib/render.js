const html = (tags, ...values) => {
    return tags.map( (tag, index) => {
        return `${tag}${values[index] || ''}`
    }).join('')
}    


const render = (dataProps, data, component) => {
    
    const { template, element } = component

    let state = {}
    let props = {}

    data ?
        state = data :
        state = component.state

    dataProps ?
        props = dataProps :
        props = component.props


    component.element.innerHTML = template({ props, state, html })
    component.bindEventListener()
}

export { render }