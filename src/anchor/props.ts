import PropTypes from '../utils/props-types'

export const anchorProps = () => ({
    prefixCls: PropTypes.string,
    collectContainer: PropTypes.string,
    selector: PropTypes.string.def('h1, h2, h3, h4, h5, h6'),
    requireAttr: PropTypes.string,
    affix: PropTypes.bool,
    offsetTop: PropTypes.number.def(200),
    scrollOffset: PropTypes.number.def(80),
    reserveOffset: PropTypes.number
})

export const anchorLinkProps = () => ({
    prefixCls: PropTypes.string,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool.def(false),
    offset: PropTypes.number.def(80),
    reserveOffset: PropTypes.number
})