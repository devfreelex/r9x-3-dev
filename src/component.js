import { render as componentRender } from './render.js'

const appCreator = () => {

    const _query = (selector, contextElement) => {
        return contextElement.querySelector(selector)
    }

    const _queryAll = (selector, contextElement) => { 
        return Array.from(contextElement.querySelectorAll(selector))
    }

    const _on = (eventName, target, handler, useDebounce = false, debounceTime = 0) => {

        const listenerName = `on${eventName}`

        if(!Array.isArray(target)) {

            return useDebounce === false ? 
                target.addEventListener(eventName, handler) : 
                target.addEventListener(eventName, _debounce(handler, debounceTime))
        }

        target.forEach( element => {
            useDebounce === false ? 
                element.addEventListener(eventName, handler) : 
                element.addEventListener(eventName, _debounce(handler, debounceTime))
        })
    }

    const html = (tags, ...values) => {
    return tags.map( (tag, index) => {
        return `${tag}${values[index] || ''}`
    }).join('')
}    


    const renderChildren = ({children}) => {

        if(!Array.isArray(children) || !children.length) return
        
        children.forEach( child => {
            const selector = child.selector
            const parentElement = child.parentElement
            const elements = Array.from(parentElement.querySelectorAll(selector))
            
            elements.forEach( element => { 
                child.props = element.dataset
                child.element = element
                // child.element.innerHTML = child.template({ props: child.props, state: child.state, html })
                child.hooks.beforeOnInit()
                child.render({ props: child.props, state: child.state, html })
                child.hooks.afterOnInit()
                child.bindEventListener()

            })

            if(Array.isArray(child.children) && child.children.length) {
                child.children.forEach( otherComponent => otherComponent.parentElement = child.element )
                renderChildren(child)
            }
            
        })
    }

    const _setState = (payload, component) => {
        const newState = JSON.parse(JSON.stringify(payload))
        Object.assign(component.state, newState)
        component.render(component.props, component.state)
        renderChildren(component)

    }

    const _setProps = (payload, component) => {
        const newProps = JSON.parse(JSON.stringify(payload))
        Object.assign(component.props, newProps)
        Object.assign(component.element.dataset, component.props)
        component.render(component.props, component.state)
        renderChildren(component)

    }

    const _getState = (component) => {
        const { state } = component
        return JSON.parse(JSON.stringify(state))
    }

    const _getProps = (component) => {
        const { props } = component
        return JSON.parse(JSON.stringify(props))
    }

    const clearHook = () => {}

    const _createMethods = (component, methodsFactory) => {
        if(methodsFactory && typeof methodsFactory === 'function') {
            component.methods = methodsFactory({ 
                setState: (payload) => {
                    _setState(payload, component) 
                },
                getState: () => _getState(component),
                setProps: (payload) => {
                    _setProps(payload, component)
                },
                getProps: () => _getProps(component),
                query: (selector) => _query.call(null, selector, component.element), 
                queryAll: (selector) => _queryAll.call(null, selector, component.element)                
            }) 
            return
        }   
        
        component.methods = {}
    }

    const _debounce = (handler, delay) => {
        let debounceTimer

        return (e) => {
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(() => handler(e), delay)
        }
    }    

    const _createEvents = (component, eventsFactory) => {
        const element = component.element

        if(eventsFactory && typeof eventsFactory === 'function') {
            component.events = eventsFactory({ 
                on: _on, 
                query: (selector) => _query.call(null, selector, element), 
                queryAll: (selector) => _queryAll.call(null, selector, element), 
                debounce: _debounce,
                methods: component.methods 
            })
            return
        }    

        component.events = {}      
    }

    const _createHooks = (component, hooksFactory) => {
        if(!hooksFactory || typeof hooksFactory !== 'function') {
           return component.hooks = { 
               beforeOnInit: clearHook, afterOnInit: clearHook ,
               afterOnRender: clearHook, beforeOnRender: clearHook ,
            }
        }
        
        const { methods } = component
        const hooks = hooksFactory({ methods })

        if(!hooks.hasOwnProperty('beforeOnInit') || typeof hooks.beforeOnInit !== 'function') {
            hooks.beforeOnInit = clearHook
        }

        if(!hooks.hasOwnProperty('afterOnInit') || typeof hooks.afterOnInit !== 'function') {
            hooks.afterOnInit = clearHook
        }

        if(!hooks.hasOwnProperty('beforeOnRender') || typeof hooks.beforeOnRender !== 'function') {
            hooks.beforeOnRender = clearHook
        }

        if(!hooks.hasOwnProperty('afterOnRender') || typeof hooks.afterOnRender !== 'function') {
            hooks.afterOnRender = clearHook
        }

        component.hooks = hooks
    }

    const _bindEventListener = (component, eventsFactory, methodsFactory) => {

        _createMethods(component, methodsFactory)
        _createEvents(component, eventsFactory)

        for (let key in component.events) {
            component.events[key]()
        }
    }

    const _styleExists = (styleId, context) => {
        return context.querySelector(`style#${styleId}`) ? true : false
    }

    const _bindComponentStyles = ({name, selector, styles}) => {

        if(_styleExists(name, document.head)) return

        const styleElement = document.createElement('style')
        const styleCode = styles({ ctx: selector, css: html})
        
        styleElement.setAttribute('id', name)
        styleElement.textContent = styleCode
        document.head.insertAdjacentElement('beforeend', styleElement)

    }

    const create = (payload, factory) => {
        const schema  = factory()
        let children = {}

        const { 
            state, 
            template, 
            events = {}, 
            methods = {}, 
            hooks = { 
                beforeOnInit: clearHook, afterOnInit: clearHook, 
                beforeOnRender: clearHook, afterOnRender: clearHook, 
            } 
        } = schema

        const { name, selector, element, parentElement } = payload
        const props = JSON.parse(JSON.stringify(element.dataset))

        if(schema.children) children = schema.children()

        const render = (props, state) => {
            componentRender.call(null, props, state, component)
            const { styles } = schema
            _bindComponentStyles({name, selector, styles})
        }

        const component = {
            name,
            selector,
            element,
            parentElement,
            template,
            state,
            props,
            children,
            render,
            methods,
            hooks
        }

        component.createChildren = () => {
            return createChildren(component)
        }

        component.bindEventListener = () => {
            _bindEventListener(component, events, methods)
        }

        _createMethods(component, methods)
        _createHooks(component, hooks)
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
        createChildren,
        renderChildren
    }
}

export { appCreator }