import React from 'react';
import Header from '../components/Header';
import Portfolio from '../components/Portfolio';
import Transactions from '../components/Transactions';
import Console from '../components/Console';
import { account } from './../services';

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            cashBalance: 0,
            portfolio: {},
            transactions: [],
            tab: 'portfolio'
        }
    }

    componentDidMount() {
        this.setAccount();
    }

    setAccount = async () => {
        const userData = await account();
        console.log(userData.data);
        const { name, email, cashBalance, portfolio, transactions } = userData.data;
        this.setState({
            userName: name,
            email: email,
            cashBalance: cashBalance,
            portfolio: portfolio,
            transactions: transactions
        })
    }

    setTab = (tab) => {
        this.setState({
            tab: tab
        })
    }

    render() {

        const view = this.state.tab == 'transactions' ? (<Transactions transactions={this.state.transactions} />) : (<Portfolio portfolio={this.state.portfolio} />);

        return(
            <>
                <Header setTab={this.setTab} />
                {view}
                <Console cashBalance={this.state.cashBalance} portfolio={this.state.portfolio} setAccount={this.setAccount} />
            </>
        )
    }
}

export default Account;