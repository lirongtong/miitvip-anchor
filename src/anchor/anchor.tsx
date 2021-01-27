import { defineComponent, Transition, withDirectives, vShow, VNode } from 'vue'
import { CloseCircleOutlined, PushpinOutlined, CaretLeftOutlined } from '@ant-design/icons-vue'
import AnchorLink from './link'
import PropTypes, { getSlot } from '../utils/props'
import tools from '../utils/tools'

const Anchor = defineComponent({
    name: 'MiAnchor',
    props: {
        selector: PropTypes.string.def('h1, h2, h3, h4, h5, h6'),
        requireAttr: PropTypes.string,
        affix: PropTypes.bool.def(true),
        offsetTop: PropTypes.number.def(200),
        onClick: PropTypes.func
    },
    data() {
        return {
            prefixCls: 'mi-anchor',
            visible: true,
            list: [],
            linkTemplate: null,
            actives: [],
            hover: this.$props.affix,
            stick: false,
            stickTop: this.$props.offsetTop
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
                    this.actives.push(false)
                }
                if (this.requireAttr) {
                    if (node[this.requireAttr]) {
                        setAttr(node)
                    }
                } else setAttr(node)
            }
            return data
        },
        renderList() {
            if (this.list.length > 0) {
                const links = []
                for (let i = 0, l = this.list.length; i < l; i++) {
                    const link = this.list[i] as any
                    links.push(
                        <AnchorLink id={link.id}
                            title={link.title}
                            active={this.actives[i]}
                            onClick={this.clickAnchorLink}>
                        </AnchorLink>
                    )
                }
                return links
            } else return []
        },
        closeAnchor() {
            this.visible = false
            this.stick = false
            setTimeout(() => {
                const anchor = this.$refs[this.prefixCls]
                if (anchor) anchor.remove()
                const stick = this.$refs[`${this.prefixCls}-stick`]
                if (stick) stick.remove()
            }, 300)
        },
        clickAnchorLink(e: any) {
            for (let i = 0, l = this.list.length; i < l; i++) {
                const item = this.list[i]
                this.actives[i] = false
                if (item.id === e.id) this.actives[i] = true
            }
            this.linkTemplate = []
            if (this.onClick) this.$emit('click', e)
        },
        clickAnchorAffix() {
            this.hover = !this.hover
            if (tools.isMobile() && !this.hover) this.mouseLeaveAnchor()
        },
        mouseLeaveAnchor() {
            if (!this.hover) {
                this.visible = false
                setTimeout(() => {
                    this.stick = true
                }, 300)
            }
        },
        mouseEnterStick() {
            this.stick = false
            this.visible = true
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.list = this.parseList(document.querySelectorAll(this.selector))
            this.linkTemplate = []
            this.$nextTick(() => {
                const anchor = this.$refs[this.prefixCls]
                if (anchor) {
                    const height = anchor.clientHeight
                    const offsetTop = tools.getElementTop(anchor)
                    this.stickTop = Math.round((offsetTop + (height / 2) - 66) * 100) / 100
                }
            })
        })
    },
    render() {
        this.linkTemplate = getSlot(this)
        const template = this.linkTemplate.length <= 0 ? this.renderList() : this.linkTemplate
        const anchorStyle = {top: `${tools.pxToRem(this.offsetTop)}rem`}
        const rotate = this.hover ? -45 : 0
        const title = this.hover ? '取消固定悬浮' : '开启固定悬浮'
        const stickStyle = {top: `${tools.pxToRem(this.stickTop)}rem`}
        return template ? (
            <>
                <Transition name={this.prefixCls} key="anchor" appear>
                    { withDirectives((
                        <div class={this.prefixCls}
                            style={anchorStyle}
                            ref={this.prefixCls}
                            onMouseleave={this.mouseLeaveAnchor}>
                            <div class={`${this.prefixCls}-title`}>
                                <div class={`${this.prefixCls}-icon`}>
                                    <PushpinOutlined title={title}
                                        rotate={rotate}
                                        onClick={this.clickAnchorAffix} />
                                </div>
                                <div class={`${this.prefixCls}-icon`}>
                                    <CloseCircleOutlined title="关闭锚点链接"
                                        onClick={this.closeAnchor} />
                                </div>
                            </div>
                            <div class={`${this.prefixCls}-box`}>
                                { template }
                            </div>
                        </div>
                    ) as VNode, [[vShow, this.visible]]) }
                </Transition>
                <Transition name={`${this.prefixCls}-stick`} key="stick" appear>
                    { withDirectives((
                        <div class={`${this.prefixCls}-stick`}
                            style={stickStyle}
                            ref={`${this.prefixCls}-stick`}
                            onMouseenter={this.mouseEnterStick}>
                            <CaretLeftOutlined />
                            <span class={`${this.prefixCls}-stick-text`}>锚点 Anchor</span>
                        </div>
                    ) as VNode, [[vShow, this.stick]]) }
                </Transition>
            </>
        ) : null
    }
})

Anchor.Link = AnchorLink
export default Anchor