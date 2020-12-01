import template from './appOther.template.js'
import styles from './appOther.styles.js'

import appHome from '../appHome/appHome.component.js'

const appOther = () => {

    const state = { title: 'Other Page' }

    const children = () => ({ appHome })

    const events = ({query, on, methods}) => ({
        onClick () {
            const h1 = query('h1')
            on('click', h1, methods.logger)
        }
    })

    const methods = ({setState, setProps}) => ({
        logger ({target}) {
            setState({title: 'Outra página qualquer....'})
        }
    })      

    return {
        state,
        template,
        styles,
        events,
        methods,
        children
    }
}

export default appOther