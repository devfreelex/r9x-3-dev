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

    const html = (tags, ...values) => {
    return tags.map( (tag, index) => {
        return `${tag}${values[index] || ''}`
    }).join('')
}    


    const _renderChildren = ({children}) => {

        if(!Array.isArray(children) || !children.length) return
        
        children.forEach( child => {
            const selector = child.selector
            const parentElement = child.parentElement
            const elements = parentElement.querySelectorAll(selector)
            
            Array.from(elements).forEach( element => { 
                child.element = element
                child.element.innerHTML = child.template({ props: child.props, state: child.state, html })
                child.bindEventListener()
            })

            if(Array.isArray(child.children) && child.children.length) {
                child.children.forEach( otherComponent => otherComponent.parentElement = child.element )
                _renderChildren(child)
            }
            
        })
    }

    const _setState = (payload, component) => {
        const newState = JSON.parse(JSON.stringify(payload))
        Object.assign(component.state, newState)
        component.render(component.state)
        _renderChildren(component)

    }

    const _setProps = (payload, component) => {
        const newState = JSON.parse(JSON.stringify(payload))
        Object.assign(component.props, newState)
        component.render(component.props)
        _renderChildren(component)

    }

    const _getState = (component) => {
        const { state } = component
        return JSON.parse(JSON.stringify(state))
    }

    const _getProps = (component) => {
        const { props } = component
        return JSON.parse(JSON.stringify(props))
    }

    

    const _bindEventListener = (component, eventsFactory, methodsFactory) => {
        const element = component.element
        let methods, events = {}

        if(methodsFactory && typeof methodsFactory === 'function') {
            methods = methodsFactory({ 
                setState: (payload) => {
                    _setState(payload, component) 
                },
                getState: () => _getState(component),
                setProps: (payload) => {
                    _setProps(payload, component)
                },
                getProps: () => _getProps(component)
            }) 
        }


        if(eventsFactory && typeof eventsFactory === 'function') {
            events = eventsFactory({ 
                on: _on, 
                query: (selector) => _query.call(null, selector, element), 
                queryAll: (selector) => _queryAll.call(null, selector, element), 
                methods 
            })
        }        


        
        for (let key in events) {
            events[key]()
        }
    }

    const create = (payload, factory) => {
        const schema  = factory()
        let children = {}
        const { state, template, events = {}, methods = {} } = schema
        const { name, selector, element, parentElement } = payload
        const props = JSON.parse(JSON.stringify(element.dataset))

        if(schema.children) children = schema.children()
        
        const render = (state) => componentRender.call(null, props, state, component)

        const component = {
            name,
            selector,
            element,
            parentElement,
            template,
            state,
            props,
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