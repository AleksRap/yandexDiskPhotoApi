class Dom {

  create(tag, classes = [], style = '') {
    const el = document.createElement(tag);

    classes.forEach(className => {
      el.classList.add(className);
    });

    if (style) {
      el.style.cssText = style;
    }

    return el;
  }
}

export default function dom() {
  return new Dom();
}
