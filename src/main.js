import { r9x } from '../lib/r9x.js'
import appHeader from './components/appHeader/appHeader.component.js'

const app = r9x({
    main: () => ({ factory: appHeader, parentElement: document.body })
})

app.init()










