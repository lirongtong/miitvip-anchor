import { isVNode, Fragment } from 'vue'
import { createTypes, VueTypesInterface } from 'vue-types'

const isValid = (value: any): boolean => {
    return value !== undefined && value !== null && value !== ''
}

const isEmptyElement = (elem: any) => {
    return (
        elem.type === Comment ||
        (elem.type === Fragment && elem.children.length === 0) ||
        (elem.type === Text && elem.children.trim() == '')
    )
}

const flattenChildren = (children = []) => {
    children = Array.isArray(children) ? children : [children]
    const res = []
    children.forEach((child) => {
        if (Array.isArray(child)) {
            res.push(...flattenChildren(child))
        } else if (child && child.type === Fragment) {
            res.push(...flattenChildren(child.children))
        } else if (child && isVNode(child) && !isEmptyElement(child)) {
            res.push(child)
        } else if (isValid(child)) {
            res.push(child)
        }
    })
    return res
}

const getSlot = (instance: any, name = 'default', options = {}) => {
    if (isVNode(instance)) {
        if (instance.type === Fragment) {
            return name === 'default' ? flattenChildren(instance.children as any[]) : []
        } else if (instance.children && instance.children[name]) {
            return flattenChildren(instance.children[name](options))
        } else {
            return []
        }
    } else {
        const res = instance.$slots[name] && instance.$slots[name](options)
        return flattenChildren(res)
    }
}

export { getSlot }

const PropTypes = createTypes({
    func: undefined,
    bool: undefined,
    string: undefined,
    number: undefined,
    array: undefined,
    object: undefined
})

export default PropTypes as VueTypesInterface
