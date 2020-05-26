import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm: '',
            match: false,
            error: null
        }
    }

    componentDidMount() {
        
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    passwordChange = async e => {
        await this.handleChange(e);
        if (this.state.password.length > 4 && this.state.password == this.state.confirm) {
            this.setState({
                match: true
            })
        } else if(this.state.match) {
            this.setState({
                match: false
            })
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);
      }

    render() {
        const button = this.state.match && this.state.name && this.state.email ?
            (<button type='submit'>Register</button>) :
            (<button type='button'>Incomplete</button>)
        return(
            <form className='login' onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor='name'>Your name: </label>
                    <input type='text' name='name' value={this.state.name} onChange={(e) => this.handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor='email'>Email address: </label>
                    <input type='text' name='email' value={this.state.email} onChange={(e) => this.handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor='password'>Password (min: 8 characters): </label>
                    <input type='password' name='password' value={this.state.password} onChange={(e) => this.passwordChange(e)}/>
                </div>
                <div>
                    <label htmlFor='confirm'>Confirm password: </label>
                    <input type='password' name='confirm' value={this.state.confirm} onChange={(e) => this.passwordChange(e)}/>
                </div>
                <div>
                    {button}
                </div>
            </form>
        )
    }
}

export default Register;