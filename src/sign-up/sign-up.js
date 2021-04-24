import React, { Component } from 'react';
import AuthAPIService from '../services/auth-api-service';
import './sign-up.css';

class SignUp extends Component {
    state = {
        error: null,
    };

    handleSubmit = e => {
        e.preventDefault();
        const { email, nickname, password, repeatPassword } = e.target;
        this.setState({ error: null })
        if(password.value !== repeatPassword.value) {
            this.setState({ error: "passwords do not match" })
        } else {
            AuthAPIService.postUser({
                email: email.value,
                nickname: nickname.value,
                password: password.value
            }).then(user => {
                this.props.history.push('/sign-in')
            }).catch((res) => {
                if(res.message.includes('duplicate key')){
                    this.setState({error: 'That email already exists'});
                } else {
                    this.setState({ error: res.message })
                }
            })
        }
    }

    render() {
        return (
            <>
                <header className="landing-nav">
                    <h1>CookIt</h1>
                    <button onClick={() => this.props.history.push('/')}>Cancel</button>
                    <button onClick={() => this.props.history.push('/sign-in')}>Sign In</button>
                </header>
                <div>
                    <div className="sign-up">
                        <h2>Sign Up</h2>
                        <form onSubmit={this.handleSubmit}>
                            {this.state.error && <p className="error">{this.state.error}</p>}
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" />
                            <br />
                            <label for="nickname">Nickname:</label>
                            <input type="text" id="nickname" name="nickname" />
                            <br />
                            <label for="password">Password:</label>
                            <input type="password" id="password" name="password" />
                            <br />
                            <label for="repeat-password">Repeat Password:</label>
                            <input type="password" id="repeat-password" name="repeatPassword" />
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    </div>   
                </div>
            </>
        );
    }
}

export default SignUp;