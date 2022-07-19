import { defineComponent, reactive, Transition, ref, onMounted, onBeforeMount, nextTick } from 'vue'
import { getPrefixCls, getPropSlot } from '../utils/props-tools'
import { anchorProps } from './props'
import { $tools } from '../utils/tools'
import { PushpinOutlined, CloseCircleOutlined, CaretLeftOutlined } from '@ant-design/icons-vue'
import AnchorLink from './link'

export type AnchorLinkItem = {
    id: string
    title: string
    elem: Event
}

const Anchor = defineComponent({
    name: 'MiAnchor',
    inheritAttrs: false,
    props: anchorProps(),
    emits: ['click'],
    setup(props, { slots, emit }) {
        const prefixCls = getPrefixCls('anchor', props.prefixCls)
        const prefixAnchorKey = getPrefixCls(`anchor-${$tools.uid()}`, props.prefixCls)
        const prefixStickKey = getPrefixCls(`anchor-stick-${$tools.uid()}`, props.prefixCls)
        const anchorRef = ref(null)
        const stickRef = ref(null)
        const animation = getPrefixCls('anim-anchor')
        const params = reactive({
            visible: true,
            list: [],
            linkTemplate: null,
            actives: [],
            hover: props.affix ?? false,
            stick: false,
            stickTop: props.offsetTop,
            manualActive: false,
            manualTimer: null
        }) as { [index: string]: any }

        onBeforeMount(() => {
            $tools.off(document.body, 'scroll', scrollBody)
        })

        onMounted(() => {
            nextTick(() => {
                let container: any = document
                if (props.collectContainer)
                    container = document.querySelector(props.collectContainer) as HTMLElement
                params.list = parseAnchorData(container.querySelectorAll(props.selector))
                params.linkTemplate = []
                nextTick(() => {
                    if (anchorRef.value) {
                        const height = (anchorRef.value as HTMLElement).clientHeight
                        const offset = $tools.getElementActualTopOrLeft(anchorRef.value)
                        params.stickTop = Math.round((offset + height / 2 - 66) * 100) / 100
                    }
                    if (!params.hover) {
                        params.visible = false
                        params.stick = true
                    }
                })
                $tools.on(document.body, 'scroll', scrollBody)
            })
        })

        const parseAnchorData = (nodes: HTMLElement[]) => {
            const data: any[] = []
            nodes.forEach((node) => {
                const setAttr = (item: HTMLElement) => {
                    let id = $tools.uid()
                    if (!item.id) item.setAttribute('id', id)
                    else id = item.id
                    const offset = $tools.getElementActualTopOrLeft(node) ?? 0
                    data.push({
                        id,
                        offset,
                        title: item.innerText
                    })
                    params.actives.push(false)
                }
                if (props.requireAttr) {
                    if (node[props.requireAttr]) setAttr(node)
                } else setAttr(node)
            })
            return data
        }

        const scrollBody = () => {
            if (!params.manualActive) {
                const scrollTop =
                    (document.documentElement.scrollTop || document.body.scrollTop) +
                    props.scrollOffset
                params.list.forEach((item: { [index: string]: any }, idx: number) => {
                    const next = params.list[idx + 1]
                    params.actives[idx] = false
                    if (next) {
                        if (item.offset <= scrollTop && next.offset >= scrollTop)
                            params.actives[idx] = true
                    } else if (item.offset <= scrollTop) params.actives[idx] = true
                })
            }
        }

        const mouseEnterStick = () => {
            params.stick = false
            params.visible = true
        }

        const mouseLeaveAnchor = () => {
            if (!params.hover) {
                params.visible = false
                params.stick = true
            }
        }

        const clickAnchorLink = (evt: AnchorLinkItem) => {
            params?.list?.forEach((item: { [index: string]: any }, idx: number) => {
                params.actives[idx] = false
                if (item.id === evt.id) {
                    params.actives[idx] = true
                    return
                }
            })
            params.linkTemplate = []
            params.manualActive = true
            if (params.manualTimer) clearTimeout(params.manualTimer)
            setTimeout(() => (params.manualActive = false), 400)
            emit('click', evt)
        }

        const clickAnchorAffix = () => {
            params.hover = !params.hover
            if ($tools.isMobile() && !params.hover) mouseLeaveAnchor()
        }

        const clickAnchorClose = () => {
            params.visible = false
            params.stick = false
            setTimeout(() => {
                if (anchorRef.value) (anchorRef.value as HTMLElement).remove()
                if (stickRef.value) (stickRef.value as HTMLElement).remove()
            }, 400)
        }

        const renderList = () => {
            const links: any[] = []
            params?.list.forEach((link: HTMLElement, idx: number) => {
                links.push(
                    <AnchorLink
                        id={link.id}
                        title={link.title}
                        active={params.actives[idx]}
                        reserveOffset={props.reserveOffset}
                        onClick={clickAnchorLink}
                    />
                )
            })
            return links
        }

        return () => {
            params.linkTemplate = getPropSlot(slots, props)
            const style = {
                anchor: { top: $tools.convert2Rem(props.offsetTop) },
                stick: { top: $tools.convert2Rem(params.stickTop) }
            } as { [index: string]: any }
            const rotate = params.hover ? -45 : 0
            const title = params.hover ? '取消固定悬浮' : '开启固定悬浮'
            return params.linkTemplate || params?.list?.length > 0 ? (
                <>
                    <Transition name={animation} appear={true}>
                        <div
                            class={prefixCls}
                            style={style.anchor}
                            ref={anchorRef}
                            key={prefixAnchorKey}
                            v-show={params.visible}
                            onMouseleave={mouseLeaveAnchor}>
                            <div class={`${prefixCls}-title`}>
                                <div class={`${prefixCls}-icon`}>
                                    <PushpinOutlined
                                        title={title}
                                        rotate={rotate}
                                        onClick={clickAnchorAffix}
                                    />
                                </div>
                                <div class={`${prefixCls}-icon`}>
                                    <CloseCircleOutlined
                                        title="关闭锚点链接"
                                        onClick={clickAnchorClose}
                                    />
                                </div>
                            </div>
                            <div class={`${prefixCls}-box`}>
                                {params.linkTemplate ?? renderList()}
                            </div>
                        </div>
                    </Transition>
                    <Transition name={animation} appear={true}>
                        <div
                            class={`${prefixCls}-stick`}
                            style={style.stick}
                            ref={stickRef}
                            key={prefixStickKey}
                            v-show={params.stick}
                            onMouseenter={mouseEnterStick}>
                            <CaretLeftOutlined />
                            <span class={`${prefixCls}-stick-text`}>锚点 Anchor</span>
                        </div>
                    </Transition>
                </>
            ) : null
        }
    }
})
Anchor.Link = AnchorLink
export default Anchor
