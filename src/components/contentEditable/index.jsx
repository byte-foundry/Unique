import React from 'react';

let stripNbsp = str => str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  render() {
    var { tagName, html, ...props } = this.props;

    return React.createElement(
      tagName || 'span',
      {
        ...props,
        ref: (e) => this.htmlEl = e,
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: {__html: html},
        onFocus: this.onFocus
      },
      this.props.children);
  }

  onFocus(e) {
    // move caret at the end
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(this.htmlEl);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    this.props.disableShortcuts();
  }

  shouldComponentUpdate(nextProps) {
    let { props, htmlEl } = this;

    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)
    if (!htmlEl) {
      return true;
    }

    // ...or if html really changed... (programmatically, not by user edit)
    if (
      stripNbsp(nextProps.html) !== stripNbsp(htmlEl.innerHTML) &&
      nextProps.html !== props.html
    ) {
      return true;
    }

    let optional = ['style', 'className', 'disabled', 'tagName'];

    // Handle additional properties
    return optional.some(name => props[name] !== nextProps[name]);
  }

  componentDidUpdate() {
    if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      this.htmlEl.innerHTML = this.props.html;
    }
    if(!this.props.disabled) {
      this.htmlEl.focus();
    }
  }

  emitChange(evt) {
    if (!this.htmlEl) return;
    var html = this.htmlEl.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      // Clone event with Object.assign to avoid 
      // "Cannot assign to read only property 'target' of object"
      var evt = Object.assign({}, evt, { 
        target: { 
          value: html 
        } 
      });
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  }
}