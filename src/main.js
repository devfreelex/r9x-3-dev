import { r9x } from '../lib/r9x.js'
import appMain from './components/appMain/appMain.component.js'

import appHome from './components/appHome/appHome.component.js'
import appOther from './components/appOther/appOther.component.js'

const app = r9x({

    main: () => ({ 
        factory: appMain, 
        parentElement: document.body 
    }),

    routes: {
        firstRoute: { hash: '#/', component: appHome },
        defaultRoute: { hash: '#/404', component: appOther },
        otherRoutes: [
            { hashExp: /^\#\/$/, component: appOther },
        ]
    }

})

app.init()










