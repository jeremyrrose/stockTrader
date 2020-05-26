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

        const info = this.state.error ? null :
            (
                <div className="info">
                    <div className="currentSymbol">
                        Symbol: {this.state.symbol.toUpperCase()}
                    </div>
                    <div className="currentPrice">
                        Current price: {this.state.price}
                    </div>
                    {this.state.shares && (
                        <div className="cost">
                            Price for {this.state.shares} shares: {this.state.price * this.state.shares}
                        </div>
                    )}
                </div>
            )

        return(
            <div>
                <div className="cashBalance">
                    Cash: ${this.props.cashBalance}
                </div>
                <div>
                    <label htmlFor='symbol'>Symbol: </label>
                    <input type='text' name='symbol' value={this.state.symbol} onChange={(e) => this.symbolChange(e)}/>
                </div>
                <div className="symbolError">
                    {this.state.error}
                </div>
                <div>
                    <label htmlFor='shares'>Shares: </label>
                    <input type='text' name='shares' value={this.state.shares} onChange={(e) => this.handleChange(e)}/>
                </div>
                {info}
                <button type="button" onClick={() => this.setBuy()}>Buy</button>
                <button type="button" onClick={() => this.setBuy(false)}>Sell</button>
                <button type="button" onClick={() => this.makeTransaction(fakeTransaction)} >MAKE IT</button>
            </div>
        )
    }
}

export default Console;