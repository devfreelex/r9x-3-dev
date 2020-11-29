import { render as componentRender } from './render.js'



const appCreator = () => {

    const create = (payload, factory) => {
        const schema  = factory()
        let children = {}
        const { state, template } = schema
        const { name, selector, element, parentElement } = payload
        const childrenParentElement = element
        if(schema.children) children = schema.children()
        const render = () => componentRender.call(null, component)

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