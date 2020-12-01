import { appCreator } from './component.js'

const routerFactory = () => {

    let _config = {}
    let _routerElement = null
    const _app = appCreator()

    const _setRouterElement = () => {
        _routerElement = document.querySelector('[data-component="routerView"]')
    }

    const _redirectTo = (hash) => window.location.hash = hash

    const _createTagName = (text) => {
        return text.replace(/([A-Z]+|[A-Z]?[a-z]+)(?=[A-Z]|\b)/g, '-$&').slice(1).toLowerCase()
    }    

    const _createElement = (name) => { 
        const element = document.createElement('div')
        element.dataset.component = name
        return element
    }

    const _injectElementNode = (nodeElement) => {
        _routerElement.innerHTML = nodeElement.outerHTML
    }

    const _initFirstRoute = () => {
        const hash = _config['firstRoute'].hash
        _redirectTo(hash)
        _initRouteByHash(hash)
    }

    const _getRouteByHash = (hash) => {
        const {defaultRoute, otherRoutes: routes} = _config
        const selectedRoute = routes.find( route => {
            if(route.hashExp.test(hash)) return route
        })
        return selectedRoute ? selectedRoute : defaultRoute
    }

    const _renderComponents = (componentFactory) => {
        const name = componentFactory.name
        const selector = `[data-component="${name}"]`
        const element = _routerElement.firstChild
        const parentElement = element.parentNode
        const payload = { name, selector, element, parentElement }
        const component = _app.create(payload, componentFactory)
        component.render()
        component.createChildren()
        _app.renderChildren(component)
    }

    const _initRouteByHash = (hash) => {
        const route = _getRouteByHash(hash)
        const name = route.component.name
        const componentElement = _createElement(name)
        _injectElementNode(componentElement)
        _renderComponents(route.component)

    }

    const _listenOnHashChange = () => {
        window.onhashchange = () => {
            const hash = window.location.hash
            _initRouteByHash(hash)
        }
    }

    const _hasRoutes = () => { 
        if(!_config) return false
        return Object.keys(_config).length ? true : false
    }

    const _getHash = () => window.location.hash

    const setRoutes = (routeSettings) => _config = routeSettings

    const init = () => {
        if(!_hasRoutes()) return
        const hashChanged = _getHash()
        _setRouterElement()
        hashChanged ? _initRouteByHash(hashChanged) : _initFirstRoute()
        _listenOnHashChange()
    }

    return {
        init,
        setRoutes
    }
}

export { routerFactory }