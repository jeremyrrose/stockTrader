import React from 'react';
import PortfolioItem from './PortfolioItem';
import { portfolio } from '../services';

class Portfolio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            portfolio: {},
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

    render() {

        const portfolio = Object.keys(this.props.portfolio).map((key, index) => <PortfolioItem key={index} symbol={key} numShares={this.props.portfolio[key]} />)
   
        return(
            <div className="portfolio">
                <h3>Portfolio</h3>
                {Object.keys(this.props.portfolio).length < 1 && (<span>You have no stocks in your portfolio.</span>)}
                {this.props.portfolio && portfolio}
            </div>
        )
    }
}

export default Portfolio;