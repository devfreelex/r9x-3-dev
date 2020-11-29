import { componentCreator } from './component.js'
import { render } from './render.js'

const componentManagerFactory = () => {
    const _components = []
    const _creator = componentCreator()

    const _hasChildren = (component) => {
        if(!component.children) return false
        const children = _getChildren(component)
        const keys = Object.keys(children)
        return keys.length
    }

    const _getChildren = ({children}) => children()

    const _renderChildren = (component) => {
        const children = _getChildren(component)
        for (let key in children) {
            const childFactory = children[key] 
            const childComponent = create(childFactory)
            const parentComponentElement = component.element
            console.log('--->',parentComponentElement)
            render(childComponent, parentComponentElement)
        }
    }

    const inject = () => {
        const componentKeys = Object.keys(_components)
        componentKeys.forEach( key => {
            const component = _components[key]
            render(component, component.parentComponentElement)

            if(_hasChildren(component)) _renderChildren(component)

        })
    }

    const create = (componentFactory, parentComponentElement) => {
        const component = _creator.create(componentFactory, parentComponentElement)
        _components.push(component)
        return component
    }

    return { create, inject }
}

export { componentManagerFactory }