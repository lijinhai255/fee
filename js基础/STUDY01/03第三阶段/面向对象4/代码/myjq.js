class Jq {
    constructor(arg, root) {
        //    this[0] = document.querySelector(arg);
        //    this.length = 1;
        // 记录上次操作的节点；
        if (typeof root == 'undefined') {
            this.prevObject = new Jq(document, null);
        }
        if (root) {
            this.prevObject = root;
        }


        if (typeof arg == "string") {
            // 字符串
            let eles = document.querySelectorAll(arg);
            this.addEvent(eles);
        } else if (typeof arg == "function") {
            window.addEventListener("DOMContentLoaded", arg);
        } else {
            // 原生节点；
            if (typeof arg.length == "undefined") {
                this[0] = arg;
                this.length = 1;
            } else {
                this.addEvent(arg);
            }
        }
    }
    addEvent(eles) {
        eles.forEach((el, index) => {
            this[index] = el;
        })
        this.length = eles.length;
    }
    eq(index) {
        // console.log(this[index]);
        return new Jq(this[index], this);
    }
    end() {
        return this.prevObject;
    }
    click(fn) {
        // console.log(this);
        // console.log("constructor  ...  click ...");
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener("click", fn);
        }
    }
    on(eventName, fn) {
        let reg = /\s+/g;
        eventName = eventName.replace(reg, " ");
        // console.log(eventName);
        let eventArr = eventName.split(" ");
        for (let i = 0; i < eventArr.length; i++) {
            for (let j = 0; j < this.length; j++) {
                this[j].addEventListener(eventArr[i], fn);
            }
        }
    }
    css(...arg) {
        if (arg.length > 1) {
            //  2个参数 
            // 设置样式
            for (let i = 0; i < this.length; i++) {
                this.setStyle(this[i], arg[0], arg[1]);
            }
        } else {
            // 1个参数：--》字符串  、 对象；[obj]
            if (typeof arg[0] == 'string') {
                // 字符串 ：获取样式
                return this.getStyle(this[0], arg[0]);
            } else {
                // 对象； 设置样式
                for (let i = 0; i < this.length; i++) {
                    for (let j in arg[0]) {
                        this.setStyle(this[i], j, arg[0][j]);
                    }
                }
            }
        }
    }
    setStyle(ele, styleName, styleValue) {
        if (typeof styleValue == "number" && !(styleName in $.cssNumber)) {
            styleValue = styleValue + "px";
        }
        ele.style[styleName] = styleValue;
    }
    getStyle(ele, styleName) {
        return window.getComputedStyle(ele, null)[styleName];
    }
}


function $(arg) {
    return new Jq(arg);
}

$.cssNumber = {
    animationIterationCount: true,
    columnCount: true,
    fillOpacity: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    pm: true,
    widows: true,
    zIndex: true,
    zoom: true
}