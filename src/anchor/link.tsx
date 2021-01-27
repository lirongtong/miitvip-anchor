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
        offset: PropTypes.number.def(80),
        onClick: PropTypes.func
    },
    data() {
        return {
            prefixCls: 'mi-anchor-link',
            _active: this.$props.active
        }
    },
    watch: {
        active: function(state: boolean) {
            this._active = state
        }
    },
    methods: {
        handleClick(e: any) {
            const elem = document.getElementById(this.id)
            if (elem) {
                const top = tools.getElementTop(elem) - this.offset
                const pos = document.documentElement.scrollTop || document.body.scrollTop
                tools.scrollTop(document.body, pos, top)
            }
            if (this.onClick) this.$emit('click', {
                id: this.id,
                title: this.title,
                elem: e
            })
        }
    },
    render() {
        const icon = this._active ? <StarOutlined /> : <TagOutlined />
        return (
            <div class={`${this.prefixCls}${this._active ? ` ${this.prefixCls}-active` : ''}`}
                onClick={this.handleClick}>
                { icon }
                <a class={`${this.prefixCls}-title`}
                    title={this.title}>
                    { this.title }
                </a>
            </div>
        )
    }
})