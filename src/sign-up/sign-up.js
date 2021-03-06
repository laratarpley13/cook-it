import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import AuthAPIService from '../services/auth-api-service';
import './sign-up.css';

class SignUp extends Component {
    state = {
        error: null,
        isLoading: false
    };

    handleSubmit = e => {
        e.preventDefault();
        const { email, nickname, password, repeatPassword } = e.target;
        this.setState({ error: null })
        if(email.value && nickname.value && password.value && repeatPassword.value) {
            this.setState({isLoading: true})
        }
        if(password.value !== repeatPassword.value) {
            this.setState({ error: "passwords do not match", isLoading: false })
        } else {
            AuthAPIService.postUser({
                email: email.value,
                nickname: nickname.value,
                password: password.value
            }).then(user => {
                this.setState({isLoading: false})
                this.props.history.push('/sign-in')
            }).catch((res) => {
                if(res.message.includes('duplicate key')){
                    this.setState({ error: 'That email already exists', isLoading: false });
                } else {
                    this.setState({ error: res.message, isLoading: false })
                }
            })
        }
    }

    render() {
        if(this.state.isLoading) {
            return (
                <div className="loader">
                    <ReactLoading type={"spin"} color={"#6aa355"} />
                </div>
            )
        }
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
                        <div className="signup-container">
                            <form onSubmit={this.handleSubmit}>
                                {this.state.error && <p className="error">{this.state.error}</p>}
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" />
                                <br />
                                <label htmlFor="nickname">Nickname:</label>
                                <input type="text" id="nickname" name="nickname" />
                                <br />
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" />
                                <br />
                                <label htmlFor="repeat-password">Repeat Password:</label>
                                <input type="password" id="repeat-password" name="repeatPassword" />
                                <br />
                                <button className="signup-submit" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>   
                </div>
            </>
        );
    }
}

export default SignUp;