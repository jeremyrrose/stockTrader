import React from 'react';
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

        const portfolio = Object.keys(this.props.portfolio).map((key, index) => {
            return (<div className="portfolioItem" key={index}>
                <div className="symbol">{key}</div>
                <div className="numShares">{this.props.portfolio[key]}</div>
            </div>)
        })

        return(
            <div>
                {this.props.portfolio && portfolio}
            </div>
        )
    }
}

export default Portfolio;