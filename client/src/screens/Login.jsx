import React from 'react';
import { login } from './../services';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        }
    }

    componentDidMount() {
        
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async event => {
        event.preventDefault();
        const resp = await login(this.state);
        console.log(resp.data);
        if (!resp) {
            this.setState({
                error: 'Invalid login.'
            })
        }
      }

    render() {
        return(
            <form className='login' onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor='email'>Email address: </label>
                    <input type='text' name='email' value={this.state.email} onChange={(e) => this.handleChange(e)}/>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' name='password' value={this.state.password} onChange={(e) => this.handleChange(e)}/>
                </div>
                <div>
                    {this.state.error}
                    <button type="submit">Log In</button>
                </div>
            </form>
        )
    }
}

export default Login;