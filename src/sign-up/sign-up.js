import React from 'react';

function SignUp() {
  return (
    <>
        <header class="landing-nav">
            <h1>CookIt</h1>
            <a href="./sign-up.html">Sign Up</a>
            <a href="./sign-in.html">Sign In</a>
        </header>
        <body>
            <div class="sign-up">
                <h2>Sign Up</h2>
                <form>
                    <label for="email">
                    Email:
                    </label>
                    <input type="text" id="email" name="email" />
                    <br />
                    <label for="nickname">
                    Nickname:
                    </label>
                    <input type="text" id="nickname" name="nickname" />
                    <br />
                    <label for="password">
                    Password:
                    </label>
                    <input type="text" id="password" name="password" />
                    <br />
                    <label for="repeat-password">
                    Repeat Password:
                    </label>
                    <input type="text" id="repeat-password" name="repeat-password" />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>   
        </body>
    </>
  );
}

export default SignUp;