import React from 'react';
import Header from '../components/Header';
import Portfolio from '../components/Portfolio';
import Transactions from '../components/Transactions';

class Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 'portfolio'
        }
    }

    componentDidMount() {
    }

    setTab = (tab) => {
        this.setState({
            tab: tab
        })
    }

    render() {

        const view = this.state.tab == 'transactions' ? (<Transactions />) : (<Portfolio />);

        return(
            <>
                <Header setTab={this.setTab} />
                {view}
            </>
        )
    }
}

export default Account;