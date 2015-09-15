///<reference path='UIDomer.ts'/>
var mbe_ui;
(function (mbe_ui) {
    /**
     * 自定义界面组件的基类。
     * 使用时，给虚拟元素的 Class 属性赋予 Component 的子类即可，例如
     *   renderer.render({Name:'div', Class: MyButton, Kids: []})
     * 每个 Component 实例对应一个 html 元素，Element::Component 属性指向 Component 实例，
     * Component::element 指向 html 元素。
     */
    var Component = (function () {
        function Component() {
            /**
             * 是否计划将要执行更新（通过调用 updateLater）。将这个值置为 false 可能会取消更新，这只应该在上级发起了更新之后做。
             * 客户代码一般不应修改此属性。
             */
            this.hasPendingUpdate = false;
        }
        /**
         * 返回表现当前组件的视图。在每次要将本组件渲染到真实 DOM 前调用。
         */
        Component.prototype.getView = function () { return this.settings; };
        /**
         * 重新渲染本 Component。通常在更新了本组件的状态后调用此方法重新渲染界面。
         * 这个方法是同步的，会立即修改 DOM。为了减少开销，一般应尽可能用 updateLater() 代替此方法。
         */
        Component.prototype.update = function () {
            if (this.element) {
                this.renderer.render(this.settings, this.element);
            }
        };
        /**
         * 请求稍后异步地（通过 requestAnimationFrame）重新渲染本 Component。
         * 通常在更新了本组件的状态后调用此方法重新渲染界面。
         * 如果在一组操作中可能重复调用 update()，则用这个方法代替可以减少不必要的重复渲染，提高性能。
         */
        Component.prototype.updateLater = function () {
            var _this = this;
            if (this.hasPendingUpdate)
                return;
            this.hasPendingUpdate = true;
            requestAnimationFrame(function () { return _this.hasPendingUpdate && _this.update(); });
        };
        /**
        * 是否应该阻止本次界面更新。UIDomer::render() 在每次调用 Component::getView() 之前会调用此方法，
        * 如果返回 true，则 getView() 不会被调用，此次更新取消；否则正常更新界面。本方法默认返回 false。
        * 如果本组件的 getView() 或者真实 DOM 的生成很耗时间，则可覆盖此方法，在不必更新时返回 true。
        */
        Component.prototype.shouldPreventUpdate = function () { return false; };
        /**
         * 回调，当本组件创建并关联到真实元素后调用，此时 element 属性可用。
         */
        Component.prototype.onAttached = function () { };
        /**
         * 回调，当本组件渲染到真实元素（不论是否新建）后调用。如果是新建的真实元素，则在 onAttached() 之后调用。
         */
        Component.prototype.onRendered = function () { };
        /**
         * 回调，当本组件即将与关联的真实元素分离，或本组件关联的真实元素即将被删除时调用。
         */
        Component.prototype.onBeforeRemove = function () { };
        return Component;
    })();
    mbe_ui.Component = Component;
})(mbe_ui || (mbe_ui = {}));
