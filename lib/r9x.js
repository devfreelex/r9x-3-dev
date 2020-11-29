import { appCreator } from './component.js'
import { render } from './render.js'

const r9x = ({ main, router}) => {
    const _components = []
    const app = appCreator()

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
            component.render()
            component.createChildren()
            if(Array.isArray(component.children) && component.children.length) {
                _renderComponents(component.children)
            }
        })
    }

    const init = () => {
        create(main())
        _renderComponents()
    }
 
    return {
        init
    }
}

export { r9x }