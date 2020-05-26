import React from 'react';
import { newTransaction } from '../services';

class Console extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            symbol: '',
            shares: '',
            price: null,
            buy: false,
            cashBalance: 0,
            error: null
        }
    }

    componentDidMount() {
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    symbolChange = async e => {
        await this.handleChange(e);
        if (this.state.buy) {
            try {
                const price = await this.props.checkStock(this.state.symbol);
                this.setState({
                    price: Number(price).toFixed(2),
                    error: null
                })
            } catch (error) {
                this.setState({
                    error: 'This stock symbol could not be found.'
                })
            }           
        } else {
            if (!Object.keys(this.props.portfolio).includes(this.state.symbol.toUpperCase())) {
                this.setState({
                    error: 'This symbol is not in your portfolio.'
                })
            } else {
                if (this.state.error) {
                    this.setState({
                        error: null
                    })
                }
                try {
                    const price = await this.props.checkStock(this.state.symbol);
                    this.setState({
                        price: Number(price).toFixed(2),
                        error: null
                    })
                } catch (error) {
                    this.setState({
                        error: 'This stock symbol could not be found.'
                    })
                }           
            }
        }
    }

    sharesChange = async (e) => {
        this.handleChange(e);
        console.log(Number(this.state.shares));
        if (this.state.shares && isNaN(this.state.shares)) {
            console.log(typeof(Number(this.state.shares)));
            this.setState({
                error: 'Please enter a whole number of shares.'
            })
        } else if (this.state.error == 'Please enter a whole number of shares.') {
            this.setState({
                error: null
            })
        }
    }

    setBuy = (buy=true) => {
        this.setState({
            buy: buy
        })
    }

    makeTransaction = async (data) => {
        if (await newTransaction(data)){
            this.props.setAccount();
        }            
    }

    render() {
        const fakeTransaction = {
            symbol: this.state.symbol.toUpperCase(),
            price: this.state.price,
            shares: Number(this.state.shares),
            type: this.state.buy ? 'buy' : 'sell'
        }

        const error = this.state.error ? (
            <div className="symbolError">
                {this.state.error}
            </div>
        ) : null;

        const info = this.state.error ? null :
            (
                <div className="info">
                    {this.state.symbol && (
                        <>    
                            <div className="currentSymbol">
                                Symbol: {this.state.symbol.toUpperCase()}
                            </div>
                            <div className="currentPrice">
                                Current price: {this.state.price}
                            </div>
                        </>
                    )}
                    {this.state.shares && (
                        <div className="cost">
                            Price for {this.state.shares} shares: {this.state.price * this.state.shares}
                        </div>
                    )}
                </div>
            )

        const submitButton = this.state.error ?
            (<button type="button" className="stop" >Please correct errors</button>) :
            (<button type="button" className="go" onClick={() => this.makeTransaction(fakeTransaction)} >Make Transaction</button>)

        return(
            <div className="console">
                <div className="cashBalance">
                    Cash: ${this.props.cashBalance}
                </div>
                <div>
                    <label htmlFor='symbol'>Stock Symbol</label>
                    <input type='text' name='symbol' value={this.state.symbol} onChange={(e) => this.symbolChange(e)}/>
                </div>
                {error}
                <div>
                    <label htmlFor='shares'>Number of Shares</label>
                    <input type='text' name='shares' value={this.state.shares} onChange={(e) => this.sharesChange(e)}/>
                </div>
                {info}
                <div className="buyControl">
                    <button type="button" className={`buy ${this.state.buy ? 'on' : ''}`} onClick={() => this.setBuy()}>Buy</button>
                    <button type="button" className={`sell ${this.state.buy ? '' : 'on'}`}onClick={() => this.setBuy(false)}>Sell</button>
                </div>
                <div className="makeTransaction">
                   {submitButton}
                </div>
            </div>
        )
    }
}

export default Console;