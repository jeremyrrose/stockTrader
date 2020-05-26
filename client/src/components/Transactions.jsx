import React from 'react';
import { transactions } from './../services';

class Transactions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            cashBalance: 0
        }
    }

    componentDidMount() {
        this.getTransactions();
    }

    getTransactions = async () => {
        const resp = await transactions();
        console.log(resp);
        this.setState({
            transactions: resp.data
        })
    }

    render() {
        return(
            <div>
                {this.state.transactions && this.state.transactions[0] && this.state.transactions[0].symbol || null}
            </div>
        )
    }
}

export default Transactions;