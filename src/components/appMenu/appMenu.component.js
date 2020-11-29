import template from './appMenu.template.js'
import styles from './appMenu.styles.js'

const appMenu = () => {

    const state = {
        home: {link:'#/', label:'Home'},
        services: {link:'#/services', label:'Serviços'},
        login: {link:'#/login', label:'Entrar'},
        count: 0
    }

    const events = ({on, queryAll, methods }) => {
        
        const onClickMenu = () => {
            const listItems = queryAll('li')
            on('click', listItems, methods.updateTitle)
        }

        return { onClickMenu }
    }

    const methods = ({ setState, getState }) => {
       
        const logger = ({target}) => {
            console.log(target)
        }
        
        const updateTitle = () => {
            const state = getState()
            const count = state.count + 1
            const payload = { 
                count,
                home: { label: `Vezes clicadas: ${count}`}
            }
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