import { defineComponent, Transition, withDirectives, vShow, VNode } from 'vue'
import { Tooltip } from 'makeit-tooltip'
import { CloseCircleOutlined, PushpinOutlined } from '@ant-design/icons-vue'
import AnchorLink from './link'
import PropTypes from '../utils/props'
import tools from '../utils/tools'

const Anchor = defineComponent({
    name: 'MiAnchor',
    props: {
        selector: PropTypes.string.def('h1, h2, h3, h4, h5, h6'),
        requireAttr: PropTypes.string,
        affix: PropTypes.bool.def(true),
        offsetTop: PropTypes.number,
        onClick: PropTypes.func
    },
    data() {
        return {
            prefixCls: 'mi-anchor',
            visible: true
        }
    },
    methods: {
        parseList(nodes: any) {
            const data = []
            for (let i = 0, l = nodes.length; i <l; i++) {
                const node = nodes[i]
                const setAttr = (item: any) => {
                    let id = tools.uid()
                    if (!item.id) item.setAttribute('id', id)
                    else id = item.id
                    data.push({
                        id,
                        title: item.innerText
                    })
                }
                if (this.requireAttr) {
                    if (node[this.requireAttr]) {
                        setAttr(node)
                    }
                } else setAttr(node)
            }
            return data
        },
        renderList(list: object[]) {
            const links = []
            for (let i = 0, l = list.length; i < l; i++) {
                const link = list[i] as any
                links.push(
                    <AnchorLink id={link.id}
                        title={link.title}
                        onClick={this.clickAnchorLink}>
                    </AnchorLink>
                )
            }
            return links
        },
        closeAnchor() {
            this.visible = false
            setTimeout(() => {
                const anchor = this.$refs[this.prefixCls]
                if (anchor) anchor.remove()
            }, 300)
        },
        clickAnchorLink(e: any) {
            if (this.onClick) this.$emit('click', e)
        }
    },
    render() {
        const list = this.parseList(document.querySelectorAll(this.selector))
        const template = this.renderList(list)
        const style = {top: this.offsetTop ? `${tools.pxToRem(this.offsetTop)}rem` : null}
        return template ? (
            <Transition name={this.prefixCls}>
                { withDirectives((
                    <div class={this.prefixCls} style={style} ref={this.prefixCls}>
                        <div class={`${this.prefixCls}-title`}>
                            <div class={`${this.prefixCls}-icon`}>
                                <Tooltip title="固定悬浮">
                                    <PushpinOutlined rotate={-45} />
                                </Tooltip>
                            </div>
                            <div class={`${this.prefixCls}-icon`}>
                                <Tooltip title="关闭锚链">
                                    <CloseCircleOutlined onClick={this.closeAnchor} />
                                </Tooltip>
                            </div>
                        </div>
                        <div class={`${this.prefixCls}-box`}>
                            { template }
                        </div>
                    </div>
                ) as VNode, [[vShow, this.visible]]) }
            </Transition>
        ) : null
    }
})

Anchor.Link = AnchorLink
export default Anchor