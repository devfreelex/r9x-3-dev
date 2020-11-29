import template from './appMenu.template.js'
import styles from './appMenu.styles.js'

const appMenu = () => {

    const state = () => ({
        home: {link:'#/', label:'Home'},
        services: {link:'#/services', label:'Serviços'},
        login: {link:'#/login', label:'Entrar'},
    })

    const events = ({on, queryAll, methods }) => {
        
        const onClickMenu = () => {
            const listItems = queryAll('li')
            on('click', listItems, methods.updateTitle)
        }

        return { onClickMenu }
    }

    const methods = ({ setState }) => {

        let count = 0
        
        const logger = ({target}) => {
            console.log(target)
        }
        
        const updateTitle = () => {
            const payload = { home: { label: `Vezes clicadas: ${count++}`}}
            setState(payload)
        }

        return {
            logger,
            updateTitle
        }
    }

    return {
        state,
        template,
        styles,
        events,
        methods
    }
}

export default appMenu