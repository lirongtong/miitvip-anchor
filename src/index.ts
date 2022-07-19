import { App } from 'vue'
import { default as Anchor } from './anchor'

const install = (app: App) => {
    app.use(Anchor)
    return app
}

export { Anchor }

export default {
    install
}
