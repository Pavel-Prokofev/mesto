class Section {
  constructor(renderer, boxSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(boxSelector);
  };

  addItem(item) {
    this._container.prepend(item);
  };

  addDefaultItems(item) {
    this._container.append(item);
  };

  renderItems(res) {
    res.forEach((item) => {
      this._renderer(item);
    });
  };
}

export default Section;