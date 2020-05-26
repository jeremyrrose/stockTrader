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

    compareStock = async (symbol) => {
        const resp = await compareStock(symbol);
        this.setState({
            compare: resp.compare,
            price: resp.price
        })
    }

    render() {
        return (

            <div className={`portfolioItem ${this.state.compare && this.state.compare}`} >
                <div className="symbol">{this.props.symbol}</div>
                <div className="numShares">{this.props.numShares}</div>
                <div className="currentPrice">{this.state.price}</div>
            </div>
        )
    }
}

export default PortfolioItem;