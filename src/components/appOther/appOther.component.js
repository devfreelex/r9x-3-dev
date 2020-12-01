import template from './appOther.template.js'
import styles from './appOther.styles.js'

const appOther = () => {

    const state = { title: 'Other Page' }

    return {
        state,
        template,
        styles
    }
}

export default appOther