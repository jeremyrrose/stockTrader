import React from 'react';
import { compareStock } from '../services';

class PortfolioItem extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            compare: null,
            price: null
        }     
    }

    componentDidMount() {
        this.props.symbol && this.compareStock(this.props.symbol);
    }

    componentDidUpdate(prevProps) {
        prevProps.numShares != this.props.numShares && this.populate();
    }

    populate() {
        this.props.populateValues(this.props.index, this.state.price ? this.props.numShares * this.state.price : 0 );
    }

    compareStock = async (symbol) => {
        console.log(`${this.props.symbol} comparing`);
        const resp = await compareStock(symbol);
        await this.setState({
            compare: resp.compare,
            price: resp.price
        });
        this.populate();
    }

    render() {
        return (
            <div className={`portfolioItem ${this.state.compare && this.state.compare}`} >
                <div className="symbol">{this.props.symbol.toUpperCase()}</div>
                <div className="numShares">{this.props.numShares} shares</div>
                <div className="currentValue">${(this.props.numShares * this.state.price).toFixed(2)}</div>
            </div>
        )
    }
}

export default PortfolioItem;