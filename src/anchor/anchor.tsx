import { defineComponent } from 'vue'
import AnchorLink from './link'
import PropTypes from '../utils/props'
import tools from '../utils/tools'

const Anchor = defineComponent({
    name: 'MiAnchor',
    props: {
        selector: PropTypes.string.def('h1, h2, h3, h4, h5, h6'),
        requireAttr: PropTypes.string,
        affix: PropTypes.bool.def(true),
        offsetTop: PropTypes.number
    },
    data() {
        return {
            prefixCls: 'mi-anchor'
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
                if (i === 0) links.push(
                    <div class={`${this.prefixCls}-ink`}>
                        <span class={`${this.prefixCls}-ink-ball`}></span>
                    </div>
                )
                links.push(<AnchorLink id={link.id} title={link.title}></AnchorLink>)
            }
            return links
        }
    },
    render() {
        const list = this.parseList(document.querySelectorAll(this.selector))
        const template = this.renderList(list)
        const style = {top: this.offsetTop ? `${tools.pxToRem(this.offsetTop)}rem` : null}
        return template ? (
            <div class={this.prefixCls} style={style}>
                <div class={`${this.prefixCls}-title`}>
                    
                </div>
                <div class={`${this.prefixCls}-box`}>
                    { template }
                </div>
            </div>
        ) : null
    }
})

Anchor.Link = AnchorLink
export default Anchor