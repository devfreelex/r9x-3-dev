import template from './appHeader.template.js'
import styles from './appHeader.styles.js'
import appMenu from '../appMenu/appMenu.component.js'


const appHeader = () => {

    const state = {
        title: 'header',
        counter: 0
    }

    const children = () => ({ appMenu })

    const hooks = () => ({})

    const methods = ({ setState, getState }) => ({
        increment () {
            const state = getState()
            setState({ counter: state.counter + 1})
        }
    })

    const events = ({ query, on, methods}) => ({
        onClickToIncrement () {
            const title = query('h1')
            on('click', title, methods.increment)
        }
    })

    return {
        state,
        template,
        styles,
        children,
        hooks,
        methods,
        events
    }
}

export default appHeader