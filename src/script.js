const symbols = [
  "big",
  "big-big",
  "double",
  "big-double",
  "double-double",
  "double-big-double",
  "big-small-big",
  "big-double-big",
  "cross",
];

class Symbol extends React.Component {
  render() {
    const { symbol } = this.props;
    const cn = classNames({
      "Symbol": true,
      "SymbolSelected": this.props.selected
    });
    const icn = classNames({
      "SymbolInner": true,
      "sprite" : true,
      [`${symbol}`] : true
    });
    return (
      <div className={cn} onClick={this.props.onClick}>
        <i className={icn}></i>
        <p>{this.props.symbol}</p>
      </div>
    );
  }
}

class SymbolHeader extends React.Component {
  render() {
    const cls = classNames({
      'SymbolHeaderZap': this.props.count == this.props.max,
    });
    return (
      <h2 className={cls}>
        {
          this.props.count > this.props.max ?
          `You need more than ${this.props.max}? ` :
          this.props.count == this.props.max ? 
         'Time to zap!' :
          this.props.count == 0 ? 
          '(Click what you see)' : 
          `${this.props.count} of ${this.props.max} spotted`
        }
      </h2>
    )
  }
}

class SymbolResetButton extends React.Component {
  render() {
    const cn = classNames({
      SymbolResetButton: true,
      SymbolResetButtonActive: this.props.count
    });
    return (
      <div className={cn}>
        <button onClick={this.props.onClick}>Reset</button>
      </div>
    )
  }
}

class RouteInfo extends React.Component {
  render() {
    return (
      <div className="RouteInfo">
        <h2>Route</h2>
        <ul>
          <li>Waterfront > Footlight (2 symbols, inner side)</li>
          <li>Footlight > Canal  (1 symbol, inner side)</li>
        </ul>
      </div>
    )
  }
}

class Symbols extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: JSON.parse(localStorage.getItem('symbols') || '[]')
    }
  }
  isSelected(symbol) {
    return this.state.selected.some( (element) => {
      return element == symbol;
    })
  }
  symbolClicked(symbol) {
    let selected;
    if (this.isSelected(symbol)) {
      selected = this.state.selected.filter( (element) => {
        return element != symbol;
      } )           
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
    const symbols = this.props.symbols.map( (symbol) => {
      return <Symbol 
               key={symbol} 
               selected={this.isSelected(symbol)}
               symbol={symbol}
               onClick={() => this.symbolClicked(symbol)}
             />
    } )
    return (
      <div>
        <div className="SymbolHeader">
          <h1>Symbol Tracker</h1>
          <SymbolHeader max="3" count={this.state.selected.length} />
        </div>
        <div className="Symbols">
          {symbols}
        </div>
        <SymbolResetButton count={this.state.selected.length} onClick={() => this.reset()} />
        <RouteInfo />
      </div>
    )
  }
}

React.render(
  <Symbols symbols={symbols} />,
  document.querySelector('#symbols')
);