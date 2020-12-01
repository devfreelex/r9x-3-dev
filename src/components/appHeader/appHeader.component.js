import template from './appHeader.template.js'
import styles from './appHeader.styles.js'

const appHeader = () => {

    const state = {
        title: 'APP HEADER'
    }

    return {
        state,
        template,
        styles
    }
}

export default appHeader