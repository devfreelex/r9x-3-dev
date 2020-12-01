const observerFactory = (data) => {

    let _listeners = []
    const _dataJSON = JSON.stringify(data)
    const _state = JSON.parse(_dataJSON)
    

    const on = (handler) => {
        _listeners.push(handler)
        return handler
    }

    const off = (handler) => {
        _listeners = _listeners.filter( listener => {
            return listener !== handler
        })
    }

    const set = (payload) => {
        const  payloadCopy = JSON.parse(JSON.stringify(payload))
        const newState = Object.assign(_state, payloadCopy)
        const newStateCopy = JSON.parse(JSON.stringify(newState))
        notify(newStateCopy)

    }

    const notify = (state) => { 
        _listeners.forEach( handler => {
            handler({...state})
        })
    }


    return { on, off, set }


}

export { observerFactory }