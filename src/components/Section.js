class Section {
  constructor({ items, renderer }, boxSelector) {
    this._itemsArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(boxSelector);
  };

  addItem(item) {
    this._container.prepend(item);
  };

  renderItems() {
    this._itemsArray.forEach((item) => {
      this._renderer(item);
    });
  };
}

export default Section;