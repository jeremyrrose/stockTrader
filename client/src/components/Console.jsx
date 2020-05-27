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
            buy: true,
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
        if (this.state.shares > 0 && 
            ((this.state.shares < this.props.portfolio[`${this.state.symbol.toUpperCase()}`] && !this.state.buy) ||
            (this.props.cashBalance > this.state.shares * this.state.price && this.state.buy))
         ) {
            if (await newTransaction(data)){
                this.props.setAccount();
            }          
        } else {
            let error = 'Please enter a whole number of shares.';
            if (this.state.shares > this.props.portfolio[`${this.state.symbol.toUpperCase()}`] && !this.state.buy) {
                error = 'You may not sell more shares than you own.';
            } else if (this.props.cashBalance < this.state.shares * this.state.price && this.state.buy) {
                error = 'You do not have enough cash to buy that many shares.'
            }
            this.setState({
                error: error
            })
        }  
    }

    render() {
        const transaction = {
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
                                <div className="infoLabel">Symbol</div>
                                <div className="infoItem">{this.state.symbol.toUpperCase()}</div>
                            </div>
                            <div className="currentPrice">
                                <div className="infoLabel">Current price</div>
                                <div className="infoItem">{this.state.price}</div>
                            </div>
                        </>
                    )}
                    {this.state.shares && (
                        <div className="cost">
                            <div className="infoLabel">Price for {this.state.shares} share{this.state.shares > 1 ? 's' : ''}</div>
                            <div className="infoItem">{(this.state.price * this.state.shares).toFixed(2)}</div>
                        </div>
                    )}
                </div>
            )

        const submitButton = this.state.error ?
            (<button type="button" className="stop" >Please correct errors</button>) :
            (<button type="button" className="go" onClick={() => this.makeTransaction(transaction)} >Make Transaction</button>)

        return(
            <div className="console">
                <div className="cashBalance">
                    Cash: ${this.props.cashBalance.toFixed(2)}
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