import React from 'react';
import { transactions } from '../services';

class Transactions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
            cashBalance: 0
        }
    }

    componentDidMount() {
        this.setState({
            transactions: this.props.transactions
        });
    }

    getTransactions = async () => {
        const resp = await transactions();
        console.log(resp);
        this.setState({
            transactions: resp.data
        })
    }

    render() {

        const transactions = this.props.transactions.reverse().map((trans, index) => {
            return (
                <div className="transaction" key={index}>
                    <div className="date">{trans.createdAt.substr(5,2) + '/' + trans.createdAt.substr(8,2)}</div>
                    <div className="transType">{trans.type.toUpperCase()}</div>
                    <div className="symbol">({trans.symbol.toUpperCase()})</div>
                    <div className="numShares">{trans.shares} shares at ${trans.price}</div>
                    <div className="transTotal">${(trans.shares * trans.price).toFixed(2)}</div>
                </div>
            )
        });

        return(
            <div className="transactions">
                <h3>Transaction History</h3>
                {this.props.transactions.length < 1 && (<span>You have no transaction history.</span>)}
                {this.props.transactions && transactions}
            </div>
        )
    }
}

export default Transactions;