import { App } from 'vue'
import { version } from '../package.json'
import { default as Anchor } from './anchor'

const install = (app: App) => {
    app.use(Anchor)
    return app
}

export { Anchor }

export default {
    version,
    install
}
