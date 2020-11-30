import template from './appLabel.template.js'
import styles from './appLabel.styles.js'

import { labelWatcher } from '../../store/label.observable.js'

const appLabel = () => {

    let labelHandler = null

    const state = { 
        value: 'Label Value',
        counter: 0
    }

    const hooks = ({methods}) => ({
        beforeOnInit () {
            
        },
        afterOnInit () {
            labelHandler = labelWatcher.on(methods.updateState)
        }
    })

    const events = ({ on, query, methods}) => ({
        onClick () {
            const label = query('h3')
            on('click', label, methods.increment)

        }
    })

    const methods = ({ getProps, setProps, getState, setState }) => ({
        increment () {
            const { counter: propCounter } = getProps()
            const { counter: stateCounter } = getState()
            labelWatcher.set({ propCounter: +propCounter + 1,  stateCounter: +stateCounter + 1 })
        },
        updateState ({propCounter, stateCounter}) {
            setProps({ counter: propCounter })
            setState({ counter: stateCounter })
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