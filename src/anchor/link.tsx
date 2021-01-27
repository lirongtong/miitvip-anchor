import { defineComponent } from 'vue'
import { TagOutlined, StarOutlined } from '@ant-design/icons-vue'
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
            if (this.onClick) this.$emit('click', e)
        }
    },
    render() {
        const icon = this.active ? <StarOutlined /> : <TagOutlined />
        return (
            <div class={`${this.prefixCls}${this.active ? ` ${this.prefixCls}-active` : ''}`}>
                { icon }
                <a class={`${this.prefixCls}-title`}
                    title={this.title} onClick={this.handleClick}>
                    { this.title }
                </a>
            </div>
        )
    }
})