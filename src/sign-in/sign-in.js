import React, { Component } from 'react';
//import AuthAPIService from '../services/auth-api-service';
//import TokenService from '../services/token-service';
import './sign-in.css'

class SignIn extends Component {
    state = {
        error: null,
    }

    handleSignIn = (e) => {
        e.preventDefault();
        /* const { email, password } = e.target;
        this.setState({ error: null })
        const user = {
            email: email.value,
            password: password.value,
        } */
        //AuthAPIService
        this.props.history.push('/explore');
    }

    render() {
        return (
            <>
                <header className="landing-nav">
                    <h1>CookIt</h1>
                    <button onClick={() => this.props.history.push('/')}>Cancel</button>
                    <button onClick={() => this.props.history.push('/sign-up')}>Sign Up</button>
                </header>
                <div>
                    <div className="sign-in">
                        <h2>Sign In</h2>
                        <form onSubmit={this.handleSignIn}>
                            {this.state.error && <p className="error">{this.state.error}</p>}
                            <label htmlFor="email">
                            Email:
                            </label>
                            <input type="email" id="email" name="email" />
                            <br />
                            <label htmlFor="password">
                            Password:
                            </label>
                            <input type="password" id="password" name="password" />
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    </div>   
                </div>
            </>
          );
    }
}

export default SignIn;