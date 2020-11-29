import { render as componentRender } from './render.js'

const appCreator = () => {

    const _query = (selector, contextElement) => {
        return contextElement.querySelector(selector)
    }

    const _queryAll = (selector, contextElement) => { 
        return Array.from(contextElement.querySelectorAll(selector))
    }

    const _on = (eventName, target, handler) => {

        const listenerName = `on${eventName}`

        if(!Array.isArray(target)) {
            return target[listenerName] = handler
        }

        target.forEach( element => {
            element[listenerName] = handler
        })
    }

    const _setState = (payload, component) => {
        const newState = JSON.parse(JSON.stringify(payload))
        Object.assign(component.state, newState)
        console.log(component.state)
        component.render(component.state)
    }

    const _getState = (component) => {
        const { state } = component
        return JSON.parse(JSON.stringify(state))
    }

    const _bindEventListener = (component, eventsFactory, methodsFactory) => {
        const element = component.element
        const methods = methodsFactory({ 
            setState: (payload) => {
                _setState(payload, component) 
            },
            getState: () => _getState(component)
        })

        const events = eventsFactory({ 
            on: _on, 
            query: (selector) => _query.call(null, selector, element), 
            queryAll: (selector) => _queryAll.call(null, selector, element), 
            methods 
        })
        
        for (let key in events) {
            events[key]()
        }
    }

    const create = (payload, factory) => {
        const schema  = factory()
        let children = {}
        const { state, template, events = {}, methods = {} } = schema
        const { name, selector, element, parentElement } = payload

        if(schema.children) children = schema.children()
        
        const render = (state) => componentRender.call(null, state, component)

        const component = {
            name,
            selector,
            element,
            parentElement,
            template,
            state,
            children,
            render
        }

        component.createChildren = () => {
            return createChildren(component)
        }

        component.bindEventListener = () => {
            _bindEventListener(component, events, methods)
        }

        return component
    }

    const createChildren = (component) => {

        let childrenComponents = []
        const { children, element: parentElement } = component

        for (let key in children ) {
            const childFactory = children[key]
            const name = childFactory.name
            const selector = `[data-component="${name}"]`
            let elements = parentElement.querySelectorAll(selector)


            elements.forEach( element => {

                const payload = {
                    name,
                    selector,
                    element,
                    parentElement
                }  

                const childComponent = create(payload, childFactory)
                childrenComponents.push(childComponent)
            })
        }
        component.children = childrenComponents
        return childrenComponents
    }

    return {
        create,
        createChildren
    }
}

export { appCreator }