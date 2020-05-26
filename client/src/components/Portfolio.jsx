import React from 'react';
import { portfolio } from './../services';

class Portfolio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            portfolio: [],
            cashBalance: 0
        }
    }

    componentDidMount() {
        this.getPortfolio();
    }

    getPortfolio = async () => {
        const resp = await portfolio();
        this.setState({
            portfolio: resp.data.portfolio,
            cashBalance: resp.data.cashBalance
        })
    }

    render() {
        return(
            <div>
                {this.state.portfolio && this.state.portfolio.IBM || null}
            </div>
        )
    }
}

export default Portfolio;