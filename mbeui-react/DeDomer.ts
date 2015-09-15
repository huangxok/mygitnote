/// <reference path="Domer.ts" />

module mbe_ui {
  export class DeDomer {
    toVElement(el: Element): VElement {
      if (!this.onStartElement(el))
        return null;
      var ve = <VElement>{ Name: el.localName };
      var atts = el.attributes;
      for (var i = 0, n = atts.length; i < n; i++) {
        var name = '@' + atts[i].nodeName, value = atts[i].value;
        value = this.onProperty(el, ve, name, value);
        if (value != null)
          ve[name] = value;
      }
      var kids = el.childNodes;
      if (kids.length && this.onStartKids(el)) {
        var vKids = [];
        for (var i = 0, n = kids.length; i < n; i++) {
          var node = kids[i];
          if (node.nodeType === Node.TEXT_NODE) {
            vKids.push(node.nodeValue);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            var ke = this.toVElement(<Element>node);
            this.onFinishElement(<Element>node, ke);
            ke && vKids.push(ke);
          }
        }
        ve.Kids = vKids;
      }
      return ve;
    }

    onStartElement(el: Element) {
      return true;
    }

    onProperty(el: Element, ve: VElement, pName: string, pValue: string) {
      return pValue;
    }

    onStartKids(el: Element) {
      return true;
    }

    onFinishElement(el: Element, ve: VElement) { }
  }
}