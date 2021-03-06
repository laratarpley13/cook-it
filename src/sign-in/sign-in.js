import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { API_BASE_URL } from '../config';
import AuthAPIService from '../services/auth-api-service';
import tokenService from '../services/token-service';
import TokenService from '../services/token-service';
import './sign-in.css'

class SignIn extends Component {
    state = {
        error: null,
        isLoading: false,
    }

    handleSignIn = (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        this.setState({ error: null })
        if(email.value && password.value) {
            this.setState({
                isLoading: true
            })
        }
        const user = {
            email: email.value,
            password: password.value,
        }
        AuthAPIService.signinUser(user).then(signinResponse => {
            TokenService.saveAuthToken(signinResponse.authToken)
            this.setState({isLoading: false})
            fetch(`${API_BASE_URL}/categories`, {
                method: 'GET',
                headers: {
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            }).then((catRes) => {
                if(!catRes.ok) {
                    return catRes.json().then(e => Promise.reject(e))
                }
                return catRes.json()
            }).then((catRes) => {
                this.props.handleSetCat(catRes)
                fetch(`${API_BASE_URL}/tags`, {
                    method: 'GET',
                    headers: {
                        'authorization': `bearer ${tokenService.getAuthToken()}`
                    }
                }).then((tagRes) => {
                    if(!tagRes.ok) {
                        return tagRes.json().then(e => Promise.reject(e))
                    }
                    return tagRes.json() 
                }).then((tagRes) => {
                    this.props.handleSetTags(tagRes)
                    fetch(`${API_BASE_URL}/users`, {
                        method: 'GET',
                        headers: {
                            'authorization': `bearer ${tokenService.getAuthToken()}`
                        }
                    }).then((userRes) => {
                        if(!userRes.ok) {
                            return userRes.json().then(e => Promise.reject(e))
                        }
                        return userRes.json()
                    }).then((userRes) => {
                        this.props.handleSetUser(userRes)
                    })
                })
            })
            this.props.history.push('/explore')
        }).catch((res) => {
            this.setState({isLoading: false})
            this.setState({error: res.message});
        })
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
                    <button onClick={() => this.props.history.push('/sign-up')}>Sign Up</button>
                </header>
                <div>
                    <div className="sign-in">
                        <h2>Sign In</h2>
                        <div className="signin-container">
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
                                <button className="signin-submit" type="submit">Submit</button>
                            </form>
                        </div>
                    </div>   
                </div>
            </>
          );
    }
}

export default SignIn;