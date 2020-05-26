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

        const transactions = this.props.transactions.map((trans, index) => {
            return (
                <div className="transaction" key={index}>
                    <div className="date">{trans.createdAt}</div>
                    <div className="symbol">{trans.symbol}</div>
                    <div className="numShares">{trans.shares}</div>
                    <div className="transType">{trans.type}</div>
                </div>
            )
        });

        return(
            <div>
                {this.props.transactions && transactions}
            </div>
        )
    }
}

export default Transactions;