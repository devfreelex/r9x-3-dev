import { render } from './render.js'
const html = (tags, ...values) => {
    return tags.map( (tag, index) => {
        return `${tag}${values[index] || ''}`
    }).join('')
}    

const componentCreator = () => {

    const _queryAllElements = (selector, contextElement) => {
        const elements = contextElement.querySelectorAll(selector)
        return Array.from(elements)
    }

    const _queryOnceElement = (selector, contextElement) => {
        return contextElement.querySelector(selector)
    }

    const _bindEventListener = (eventName, eventTarget, handler) => {
        if(!Array.isArray(eventTarget)) {
            const eventId = `on${eventName}`
            eventTarget[eventId] = handler
            return
        }

        eventTarget.forEach( target => target[`on${eventName}`] = handler)
    }    

    const _setState = (payload, component) => {
        const { state } = component
        const payloadClone = JSON.parse(JSON.stringify(payload))
        Object.assign(state, payloadClone)
        _rerender(component)
    }

    const _rerender = (component) => {
        console.log(component)
    }

    const _createMethods = (component, _schema) => {
        const { state } = component
        if(!_schema.methods) return {}
        return _schema.methods({
            getState: () => JSON.parse(JSON.stringify(state)),
            setState: (payload) => _setState(payload, component)
        })        
    }
    const _createEvents = (element, methods, _schema) => {
        if(!_schema.events) return {}

        return _schema.events({
            on: (eventName, target, handler) => _bindEventListener(eventName, target, handler),
            query: (selector) => _queryOnceElement(selector, element),
            queryAll:(selector) => _queryAllElements(selector, element),
            methods
        })      
    }

    const _createSelector = ({name}) => {
        return name
    }

    const _createChildren = (_schema) => {
        if(!_schema.children) return {}
        const {children} = _schema
        return children
    }

    const _setElement = ([component, element]) => {
       component.element = element
    }

    const create = (factory, parentComponentElement) => {
        const _schema = factory()

        const selector = _createSelector(factory)

        const element = null

        const state = _schema.state()

        const template = () => _schema.template.bind(null, {            
            state,
            html
        })

        const styles = _schema.styles.bind({ 
            css: html, 
            ctx: factory.name 
        })

        const methods = (component) => _createMethods(component, _schema)

        const events = ({element, methods}) =>  _createEvents(element, methods, _schema)

        const children = _createChildren(_schema)

        const setElement = (element) => _setElement.call(null, [component, element])

        const component =  {
            state,
            selector,
            element,
            template,
            styles,
            methods,
            events,
            children,
            parentComponentElement,
            setElement
        }

        return component
    }

    return { create }
}

export { componentCreator }