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
            <div>
                {this.props.portfolio && portfolio}
            </div>
        )
    }
}

export default Portfolio;