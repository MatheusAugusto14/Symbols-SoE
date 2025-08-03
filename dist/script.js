const symbols = [
"big",
"big-big",
"double",
"big-double",
"double-double",
"double-big-double",
"big-small-big",
"big-double-big",
"cross"];


class Symbol extends React.Component {
  render() {
    const { symbol } = this.props;
    const cn = classNames({
      "Symbol": true,
      "SymbolSelected": this.props.selected });

    const icn = classNames({
      "SymbolInner": true,
      "sprite": true,
      [`${symbol}`]: true });

    return /*#__PURE__*/(
      React.createElement("div", { className: cn, onClick: this.props.onClick }, /*#__PURE__*/
      React.createElement("i", { className: icn }), /*#__PURE__*/
      React.createElement("p", null, this.props.symbol)));


  }}


class SymbolHeader extends React.Component {
  render() {
    const cls = classNames({
      'SymbolHeaderZap': this.props.count == this.props.max });

    return /*#__PURE__*/(
      React.createElement("h2", { className: cls },

      this.props.count > this.props.max ?
      `You need more than ${this.props.max}? ` :
      this.props.count == this.props.max ?
      'Time to zap!' :
      this.props.count == 0 ?
      '(Click what you see)' :
      `${this.props.count} of ${this.props.max} spotted`));



  }}


class SymbolResetButton extends React.Component {
  render() {
    const cn = classNames({
      SymbolResetButton: true,
      SymbolResetButtonActive: this.props.count });

    return /*#__PURE__*/(
      React.createElement("div", { className: cn }, /*#__PURE__*/
      React.createElement("button", { onClick: this.props.onClick }, "Reset")));


  }}


class RouteInfo extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "RouteInfo" }, /*#__PURE__*/
      React.createElement("h2", null, "Route"), /*#__PURE__*/
      React.createElement("ul", null, /*#__PURE__*/
      React.createElement("li", null, "Waterfront > Footlight (2 symbols, inner side)"), /*#__PURE__*/
      React.createElement("li", null, "Footlight > Canal  (1 symbol, inner side)"))));



  }}


class Symbols extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: JSON.parse(localStorage.getItem('symbols') || '[]') };

  }
  isSelected(symbol) {
    return this.state.selected.some(element => {
      return element == symbol;
    });
  }
  symbolClicked(symbol) {
    let selected;
    if (this.isSelected(symbol)) {
      selected = this.state.selected.filter(element => {
        return element != symbol;
      });
    } else {
      selected = this.state.selected.concat([symbol]);
    }
    this.setState({ selected: selected });
    localStorage.setItem('symbols', JSON.stringify(selected));
  }
  reset() {
    this.setState({ selected: [] });
    localStorage.setItem('symbols', JSON.stringify([]));
  }
  render() {
    const symbols = this.props.symbols.map(symbol => {
      return /*#__PURE__*/React.createElement(Symbol, {
        key: symbol,
        selected: this.isSelected(symbol),
        symbol: symbol,
        onClick: () => this.symbolClicked(symbol) });

    });
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "SymbolHeader" }, /*#__PURE__*/
      React.createElement("h1", null, "Symbol Tracker"), /*#__PURE__*/
      React.createElement(SymbolHeader, { max: "3", count: this.state.selected.length })), /*#__PURE__*/

      React.createElement("div", { className: "Symbols" },
      symbols), /*#__PURE__*/

      React.createElement(SymbolResetButton, { count: this.state.selected.length, onClick: () => this.reset() }), /*#__PURE__*/
      React.createElement(RouteInfo, null)));


  }}


React.render( /*#__PURE__*/
React.createElement(Symbols, { symbols: symbols }),
document.querySelector('#symbols'));