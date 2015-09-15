///<reference path='Domer.ts'/>
///<reference path='Component.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mbe_ui;
(function (mbe_ui) {
    /**
     * 能处理自定义组件的虚拟 DOM 生成器。
     * 用户代码需要实现继承 Component 的自定义组件类，并在虚拟元素中指定 Class 属性。
     */
    var UIDomer = (function (_super) {
        __extends(UIDomer, _super);
        function UIDomer() {
            _super.apply(this, arguments);
        }
        UIDomer.prototype.onBeforeRender = function (velem, elem) {
            var Class = velem && velem.Class;
            if (Class) {
                var comp;
                if (elem) {
                    if (elem.Class === Class)
                        comp = elem.Component;
                    else if (elem.Component) {
                        try {
                            elem.Component.onBeforeRemove();
                        }
                        catch (e) {
                            this._onError(e);
                        }
                    }
                }
                if (!comp) {
                    comp = new Class();
                    comp.renderer = this;
                }
                comp.settings = velem;
                // 开始更新，将 hasPendingUpdate 复位
                comp.hasPendingUpdate = false;
                try {
                    if (comp.shouldPreventUpdate())
                        return false;
                    velem = comp.getView();
                }
                catch (e) {
                    this._onError(e);
                    return null;
                }
                velem.Class = Class;
                velem.Component = comp;
            }
            else if (elem && elem.Component) {
                try {
                    elem.Component.onBeforeRemove();
                }
                catch (e) {
                    this._onError(e);
                }
                elem.Class = undefined;
                elem.Component = undefined;
            }
            return velem;
        };
        UIDomer.prototype.onAttached = function (virtualElem, realElem) {
            if (realElem.Component) {
                realElem.Component.element = realElem;
                realElem.Component.onAttached();
            }
        };
        UIDomer.prototype.onRendered = function (virtualElem, realElem) {
            if (realElem.Component) {
                realElem.Component.onRendered();
            }
        };
        UIDomer.prototype.onBeforeRemove = function (realElem) {
            for (var kid = realElem.firstElementChild; kid; kid = kid.nextElementSibling)
                this.onBeforeRemove(kid);
            if (realElem.Component) {
                try {
                    realElem.Component.onBeforeRemove();
                }
                catch (e) {
                    this._onError(e);
                }
                delete realElem.Component;
                delete realElem.Class;
            }
        };
        UIDomer.prototype.onError = function (e) {
            console.error(e); // TODO 更好地报告错误？
        };
        UIDomer.prototype._onError = function (e) {
            try {
                this.onError && this.onError(e);
            }
            catch (e) {
                console.error(e);
            }
        };
        return UIDomer;
    })(mbe_ui.Domer);
    mbe_ui.UIDomer = UIDomer;
})(mbe_ui || (mbe_ui = {}));
