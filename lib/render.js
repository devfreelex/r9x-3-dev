const html = (tags, ...values) => {
    return tags.map( (tag, index) => {
        return `${tag}${values[index] || ''}`
    }).join('')
}    


const render = (component) => {
    const { state, template, children } = component
    component.element.innerHTML = template({ state, html })
}

export { render }