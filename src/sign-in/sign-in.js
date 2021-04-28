import React, { Component } from 'react';
import { API_BASE_URL } from '../config';
import AuthAPIService from '../services/auth-api-service';
import tokenService from '../services/token-service';
import TokenService from '../services/token-service';
import './sign-in.css'

class SignIn extends Component {
    state = {
        error: null,
    }

    handleSignIn = (e) => {
        e.preventDefault();
        const { email, password } = e.target;
        this.setState({ error: null })
        const user = {
            email: email.value,
            password: password.value,
        }
        AuthAPIService.signinUser(user).then(signinResponse => {
            TokenService.saveAuthToken(signinResponse.authToken)
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
            console.log(res.error)
            this.setState({error: res.message});
        })
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