import template from './appLabel.template.js'
import styles from './appLabel.styles.js'

const appLabel = () => {

    const state = { 
        value: 'Label Value',
        counter: 0
    }

    const hooks = ({methods}) => ({
        beforeOnInit () {
            methods.logger('before hook')
        },
        afterOnInit () {
            methods.logger('after hook')
        }
    })

    const events = ({ on, query, methods}) => ({
        onClick () {
            const label = query('h3')
            on('click', label, methods.increment)

        }
    })

    const methods = ({ getState, setState }) => ({
        increment () {
            const state = getState()
            setState({ counter: state.counter + 1 })
        },
        logger (data) { console.log(data)}
    })

    return {
        state,
        template,
        styles,
        events,
        methods,
        hooks,
    }
}

export default appLabel