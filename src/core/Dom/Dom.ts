class Dom {

  create(tag: string, classes: string[] = [], style?: string) {
    const el: any = document.createElement(tag);

    classes.forEach((className: string): void => {
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
