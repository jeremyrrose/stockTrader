import React from 'react';

const Header = (props) => {

    return(
        <div className="header">
            <button type="button" className={props.tab == 'portfolio' ? 'on' : ''} onClick={(e) => props.setTab('portfolio')} >Portfolio</button>
            <span>&nbsp; | &nbsp;</span>
            <button type="button" className={props.tab == 'transactions' ? 'on' : ''} onClick={(e) => props.setTab('transactions')} >Transactions</button>
        </div>
    )
}

export default Header;