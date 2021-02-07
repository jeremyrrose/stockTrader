import React from 'react';
import PortfolioItem from './PortfolioItem';
import { portfolio } from '../services';

class Portfolio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            portfolio: {},
            portfolioVals: [],
            totalValue: 0,
            cashBalance: 0
        }
    }

    componentDidMount() {
    }

    getPortfolio = async () => {
        const resp = await portfolio();
        this.setState({
            portfolio: resp.data.portfolio,
            cashBalance: resp.data.cashBalance
        })
    }

    populateValues = (index, value) => {
        const currentVals = this.state.portfolioVals;
        currentVals[index] = value;
        this.setState({
            portfolioVals: currentVals
        })
        this.setTotal();
    }

    setTotal = () => {
        const valsArray = this.props.portfolio
        && this.state.portfolioVals
        && this.state.portfolioVals.slice(0,Object.keys(this.props.portfolio).length) // .reduce((a,c) => a+c);
        const totalValue = valsArray && valsArray.length > 0 && valsArray.reduce((a,c) => a + c).toFixed(2);
        this.setState({
            totalValue: totalValue
        }) 
    }

    render() {

        const portfolio = Object.keys(this.props.portfolio).map((key, index) => <PortfolioItem key={key} index={index} symbol={key} numShares={this.props.portfolio[key]} populateValues={this.populateValues} />)
   
        return(
            <div className="portfolio">
                <div className="portfolioHeader">
                    <h3>Portfolio</h3>
                    <h3>${this.state.totalValue}</h3>
                </div>
                {Object.keys(this.props.portfolio).length < 1 && (<span>You have no stocks in your portfolio.</span>)}
                {this.props.portfolio && portfolio}
            </div>
        )
    }
}

export default Portfolio;