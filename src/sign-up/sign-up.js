import React from 'react';
import './sign-up.css';

function SignUp(props) {
  return (
    <>
        <header className="landing-nav">
            <h1>CookIt</h1>
            <button onClick={() => props.history.push('/')}>Cancel</button>
            <button onClick={() => props.history.push('/sign-in')}>Sign In</button>
        </header>
        <div>
            <div className="sign-up">
                <h2>Sign Up</h2>
                <form>
                    <label for="email">
                    Email:
                    </label>
                    <input type="email" id="email" name="email" />
                    <br />
                    <label for="nickname">
                    Nickname:
                    </label>
                    <input type="text" id="nickname" name="nickname" />
                    <br />
                    <label for="password">
                    Password:
                    </label>
                    <input type="password" id="password" name="password" />
                    <br />
                    <label for="repeat-password">
                    Repeat Password:
                    </label>
                    <input type="password" id="repeat-password" name="repeat-password" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>   
        </div>
    </>
  );
}

export default SignUp;