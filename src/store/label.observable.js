import { observerFactory } from '../../lib/observer.js'

const labelWatcher = observerFactory({
    title: 'Label title store',
    counter: 0
})

export { labelWatcher }

