import template from './appHome.template.js'
import styles from './appHome.styles.js'

const appHome = () => {

    const state = { title: 'Home Page' }

    return {
        state,
        template,
        styles
    }
}

export default appHome