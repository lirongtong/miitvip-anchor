import { defineComponent } from 'vue'
import PropTypes from '../utils/props'
import tools from '../utils/tools'

export default defineComponent({
    name: 'MiAnchorLink',
    props: {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        active: PropTypes.bool.def(false),
        onClick: PropTypes.func
    },
    data() {
        return {
            prefixCls: 'mi-anchor-link'
        }
    },
    methods: {
        handleClick(e: any) {
            const elem = document.getElementById(this.id)
            if (elem) {
                const top = tools.getElementTop(elem)
                const pos = document.documentElement.scrollTop || document.body.scrollTop
                tools.scrollTop(document.body, pos, top)
            }
            if (this.onClick) this.$emit('click')
        }
    },
    render() {
        return (
            <div class={this.prefixCls}>
                <a class={`${this.prefixCls}-title${this.active ? ` ${this.prefixCls}-active` : ''}`}
                    title={this.title} onClick={this.handleClick}>
                    { this.title }
                </a>
            </div>
        )
    }
})