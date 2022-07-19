import { defineComponent } from 'vue'
import { TagOutlined, StarOutlined } from '@ant-design/icons-vue'
import { AnchorLinkItem } from './anchor'
import { getPrefixCls } from '../utils/props-tools'
import { $tools } from '../utils/tools'
import { anchorLinkProps } from './props'

export default defineComponent({
    name: 'MiAnchorLink',
    inheritAttrs: false,
    props: anchorLinkProps(),
    emits: ['click'],
    setup(props, { emit }) {
        const prefixCls = getPrefixCls('anchor-link', props.prefixCls)

        const handleClick = (evt: Event) => {
            const elem = document.getElementById(props.id)
            if (elem) {
                const top = $tools.getElementActualTopOrLeft(elem) - props.offset
                const pos = document.documentElement.scrollTop || document.body.scrollTop
                $tools.scrollTop(document.body, pos, top - (props.reserveOffset ?? 0))
            }
            emit('click', {
                id: props.id,
                title: props.title,
                elem: evt
            } as AnchorLinkItem)
        }

        return () => (
            <div
                class={`${prefixCls}${props.active ? ` ${prefixCls}-active` : ''}`}
                onClick={handleClick}>
                {props.active ? <StarOutlined /> : <TagOutlined />}
                <a class={`${prefixCls}-title`} title={props.title}>
                    {props.title}
                </a>
            </div>
        )
    }
})
