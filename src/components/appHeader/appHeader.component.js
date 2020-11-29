import template from './appHeader.template.js'
import styles from './appHeader.styles.js'
import appMenu from '../appMenu/appMenu.component.js'


const appHeader = () => {

    const state = () => ({
        title: 'Header'
    })

    const children = () => ({ appMenu })

    return {
        state,
        template,
        styles,
        children
    }
}

export default appHeader