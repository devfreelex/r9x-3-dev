import template from './appMain.template.js'
import styles from './appMain.styles.js'

import appHeader from '../appHeader/appHeader.component.js'

const appMain = () => {

    const state = { title: 'main'}

    const children = () => ({
        appHeader
    })

    return {
        state,
        template,
        styles,
        children
    }
}

export default appMain