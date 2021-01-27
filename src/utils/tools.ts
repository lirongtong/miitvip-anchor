class MiTools {
    random(): string {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }

    uid(upper = false, prefix?: string): string {
        let str = (
            this.random() +
            this.random() +
            this.random() +
            this.random() +
            this.random() +
            this.random() +
            this.random() +
            this.random()
        ).toLocaleUpperCase()
        if (prefix) str = prefix + str
        return upper ? str.toUpperCase() : str.toLowerCase()
    }

    pxToRem(value: number) {
        return Math.round(value / 16 * 100) / 100
    }

    getElementTop (el: HTMLElement) {
        let actualTop = el.offsetTop
        let current = el.offsetParent as HTMLElement
        while (current !== null) {
            actualTop += current.offsetTop
            current = current.offsetParent as HTMLElement
        }
        return actualTop
    }

    scrollTop(
        el: any,
        from = 0,
        to: number,
        duration = 500,
        endCallback?: any
    ) {
        if (!window.requestAnimationFrame) {
            const w = window as any
            w.requestAnimationFrame = (
                w.webkitRequestAnimationFrame ||
                w.mozRequestAnimationFrame ||
                w.msRequestAnimationFrame ||
                function(callback: any) {
                    return w.setTimeout(callback, 1000 / 60);
                }
            )
        }
        const difference = Math.abs(from - to)
        const step = Math.ceil(difference / duration * 50)
        function scroll(
            start: number,
            end: number,
            step: number
        ) {
            if (start === end) {
                endCallback && endCallback()
                return
            }
            let d = (start + step > end) ? end : start + step
            if (start > end) d = (start - step < end) ? end : start - step
            if (el === window) window.scrollTo(d, d)
            else el.scrollTop = d
            window.requestAnimationFrame(() => scroll(d, end, step))
        }
        scroll(from, to, step)
    }

    isMobile(): boolean {
        const agent = navigator.userAgent,
            agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
        let mobile = false
        for (let i = 0, len = agents.length; i < len; i++) {
            if (agent.indexOf(agents[i]) > 0) {
                mobile = true
                break
            }
        }
        return mobile
    }
}

export default new MiTools