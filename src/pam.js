import { appCreator } from './component.js'
import { render } from './render.js'
import { routerFactory } from './router.js'

const pam = ({ main, routes}) => {
    const _components = []
    const app = appCreator()
    const _router = routerFactory()

    const create = ({factory, parentElement}) => {
       const name = factory.name
       const selector = `[data-component="${name}"]`
       let elements = parentElement.querySelectorAll(selector)

        Array.from(elements).forEach( element => {
            const payload = {
                name,
                selector,
                element,
                parentElement
            }            
            const component = app.create(payload, factory)

            _components.push( component )
        })
    }

    const _renderComponents = (childrenComponents) => {

        let components = []

        childrenComponents ?
            components = childrenComponents :
            components = _components

        components.forEach( component => {
            component.hooks.beforeOnInit()
            component.render()
            component.hooks.afterOnInit()
            component.createChildren()

            if(Array.isArray(component.children) && component.children.length) {
                _renderComponents(component.children)
            }
        })
    }

    const init = () => {
        create(main())
        _renderComponents()
        _router.setRoutes(routes)
        _router.init()

    }
 
    return {
        init
    }
}

export { pam }