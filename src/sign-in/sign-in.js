import React from 'react';

function SignIn() {
  return (
    <>
        <header class="landing-nav">
            <h1>CookIt</h1>
            <a href="#">Sign Up</a>
            <a href="./sign-in.html">Sign In</a>
        </header>
        <body>
            <div class="sign-in">
                <h2>Sign In</h2>
                <form>
                    <label for="email">
                    Email:
                    </label>
                    <input type="text" id="email" name="email" />
                    <br />
                    <label for="password">
                    Password:
                    </label>
                    <input type="text" id="password" name="password" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>   
        </body>
    </>
  );
}

export default SignIn;