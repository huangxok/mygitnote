///<reference path='Domer.ts'/>
///<reference path='Component.ts'/>

interface Element {
  Class?: new() => mbe_ui.Component;
  Component?: mbe_ui.Component;
}

module mbe_ui {
  export interface VElement {
    /**
     * 本元素对应的组件的类。对自定义组件，用户应指定这个属性。
     */
    Class?: new() => mbe_ui.Component;
    /**
     * 本元素对应的组件的实例。用户无需指定此属性，它由 UIDomer 生成。
     */
    Component?: mbe_ui.Component;
  }

  /**
   * 能处理自定义组件的虚拟 DOM 生成器。
   * 用户代码需要实现继承 Component 的自定义组件类，并在虚拟元素中指定 Class 属性。
   */
  export class UIDomer extends Domer {
    onBeforeRender(velem: VElement, elem?: Element): VElement | boolean {
      var Class = velem && velem.Class;
      if (Class) {
        var comp: Component;
        if (elem) {
          if (elem.Class === Class)
            comp = elem.Component;
          else if (elem.Component) {
            try {
              elem.Component.onBeforeRemove();
            } catch (e) {
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
        } catch (e) {
          this._onError(e);
          return null;
        }
        velem.Class = Class;
        velem.Component = comp;
      } else if (elem && elem.Component) {
        try {
          elem.Component.onBeforeRemove();
        } catch (e) {
          this._onError(e);
        }
        elem.Class = undefined;
        elem.Component = undefined;
      }
      return velem;
    }
    onAttached(virtualElem: VElement, realElem: Element) {
      if (realElem.Component) {
        realElem.Component.element = realElem;
        realElem.Component.onAttached();
      }
    }
    onRendered(virtualElem: VElement, realElem: Element) {
      if (realElem.Component) {
        realElem.Component.onRendered();
      }
    }
    onBeforeRemove(realElem: Element) {
      for (var kid = realElem.firstElementChild; kid; kid = kid.nextElementSibling)
        this.onBeforeRemove(kid);
      if (realElem.Component) {
        try {
          realElem.Component.onBeforeRemove();
        } catch (e) {
          this._onError(e);
        }
        delete realElem.Component;
        delete realElem.Class;
      }
    }
    onError(e) {
      console.error(e); // TODO 更好地报告错误？
    }
    private _onError(e) {
      try {
        this.onError && this.onError(e);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
