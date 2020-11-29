const _bindEventListeners = (component) => {
    const { state, element, events } = component
    const methods = component.methods(component)
    const eventListeners = events({element, methods})
    const _hasEvents = Object.keys(eventListeners).length
    if(!_hasEvents) return
    
    for (let key in eventListeners) {
        eventListeners[key]()
    }
}

const render = (component, parentElement) => {

    
    const cloneComponent = JSON.parse(JSON.stringify(component))
    const selector = component.selector
    let elements = Array.from(document.querySelectorAll(`[data-component="${selector}"]`)) 

        
        elements.forEach( element => {
            component.setElement(element)
            component.parentComponentElement = parentElement
        Object.assign(cloneComponent, component)
        const template = cloneComponent.template()
        cloneComponent.element.innerHTML = template()
        _bindEventListeners(cloneComponent)
    })

}

export { render }

