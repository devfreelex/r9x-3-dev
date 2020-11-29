import { componentManagerFactory } from '../lib/componentManager.js'

import appHeader from './components/appHeader/appHeader.component.js'

const componentManager = componentManagerFactory()

componentManager.create(appHeader, document.querySelector('body'))
componentManager.inject()










