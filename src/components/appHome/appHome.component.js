import template from './appHome.template.js'
import styles from './appHome.styles.js'

import appOther from '../appOther/appOther.component.js'

const appHome = () => {

    const state = { title: 'Home Page' }

    const children = () => ({ appOther })

    const events = ({query, on, methods}) => ({
        onClick () {
            const h1 = query('h1')
            on('click', h1, methods.logger)
        }
    })

    const methods = ({setState, setProps}) => ({
        logger ({target}) {
            setState({title: 'Página inicial'})
        }
    })    

    return {
        state,
        template,
        styles,
        children,
        events,
        methods
    }
}

export default appHome