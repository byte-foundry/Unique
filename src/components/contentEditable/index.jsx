import React from 'react';

class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  render() {
    const { tagName, html, onChange, ...props } = this.props;

    return React.createElement(
      tagName || 'span',
      {
        ...props,
        ref: e => (this.htmlEl = e),
        spellCheck: false,
        onInput: this.emitChange,
        onKeyDown: this.onKeyDown,
        onBlur: this.props.onBlur || this.emitChange,
        onFocus: this.props.onFocus || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: { __html: html },
      },
      this.props.children,
    );
  }

  shouldComponentUpdate(nextProps) {
    // We need not rerender if the change of props simply reflects the user's
    // edits. Rerendering in this case would make the cursor/caret jump.
    return (
      // Rerender if there is no element yet... (somehow?)
      !this.htmlEl ||
      // ...or if html really changed... (programmatically, not by user edit)
      (nextProps.html !== this.htmlEl.innerHTML && nextProps.html !== this.props.html) ||
      // ...or if editing is enabled or disabled.
      this.props.disabled !== nextProps.disabled
    );
  }

  componentDidUpdate() {
    if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      this.htmlEl.innerHTML = this.props.html;
    }
  }

  onKeyDown(evt) {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      return false;
    }
    return true;
  }

  emitChange(evt) {
    if (!this.htmlEl) return;
    const html = this.htmlEl.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      evt.target = { value: html };
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  }
}

export default ContentEditable;
