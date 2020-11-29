import template from './appHeader.template.js'
import styles from './appHeader.styles.js'
import appMenu from '../appMenu/appMenu.component.js'


const appHeader = () => {

    const state = {
        title: 'header'
    }

    const children = () => ({ appMenu })

    const hooks = () => ({})

    const methods = () => ({})

    const events = () => ({})

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