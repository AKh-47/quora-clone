import React, { ReactElement, useState, useRef } from "react";
import "../styles/auth.scss";

import ReactTooltip from "react-tooltip";

import { useAuth } from "../context/AuthContext";

interface Props {}

export default function Auth({}: Props): ReactElement {
  const [emailSignUp, setEmailSignUp] = useState<boolean>(false);

  const switchSignup = () => {
    setEmailSignUp(true);
  };

  return (
    <div className="auth">
      <main>
        <div className="auth__heading">
          <h1>Quora</h1>
          <p>A place to share knowledge and better understand the world</p>
        </div>
        <section>
          <aside className="auth__left">
            {!emailSignUp ? (
              <SignUpProviders switchSignup={switchSignup} />
            ) : (
              <SignUpWithEmail />
            )}
          </aside>
          <aside className="auth__right">
            <h3>Login</h3>
            <form>
              <div className="auth__input">
                <label htmlFor="email">Email</label>
                <input id="email" type="text" placeholder="Your email" />
              </div>
              <div className="auth__input">
                <label htmlFor="pass">Password</label>
                <input id="pass" type="text" placeholder="Your password" />
              </div>
              <button>Login</button>
            </form>
          </aside>
        </section>
      </main>
    </div>
  );
}

function SignUpProviders({ switchSignup }: any): ReactElement {
  const { signUpWithGoogle } = useAuth();

  const handleSignUp = (provider: any) => {
    provider();
  };
  return (
    <React.Fragment>
      <button
        onClick={() => handleSignUp(signUpWithGoogle)}
        className="auth__button"
      >
        Continue with Google
      </button>
      <button
        onClick={switchSignup}
        className="auth__button auth__button--email"
      >
        Sign up with email
      </button>
    </React.Fragment>
  );
}

function SignUpWithEmail(): ReactElement {
  const { signUp } = useAuth();

  const form = {
    firstName: useRef<HTMLInputElement>(null),
    lastName: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    confirmPassword: useRef<HTMLInputElement>(null),
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formValues = {
      firstName: form.firstName.current?.value,
      lastName: form.lastName.current?.value,
      email: form.email.current?.value,
      password: form.password.current?.value,
      confirmPassword: form.confirmPassword.current?.value,
    };
    // console.log(formValues);
    signUp(
      formValues.firstName,
      formValues.lastName,
      formValues.email,
      formValues.password
    );
  };

  return (
    <React.Fragment>
      <h3>Sign Up</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="auth__input">
          <label htmlFor="fname">First Name</label>
          <input
            ref={form.firstName}
            id="fname"
            type="text"
            placeholder="Your first name"
          />
        </div>
        <div className="auth__input">
          <label htmlFor="lname">Last Name</label>
          <input
            ref={form.lastName}
            id="lname"
            type="text"
            placeholder="Your last name"
          />
        </div>
        <div className="auth__input">
          <label htmlFor="emailz">Email</label>
          <input
            ref={form.email}
            id="emailz"
            type="text"
            placeholder="Your email"
          />
        </div>
        <div className="auth__input">
          <label htmlFor="passz">Password</label>
          <span data-tip="8 character minimum" className="auth__pass-tip">
            i
          </span>
          <ReactTooltip effect="solid" />
          <input
            ref={form.password}
            id="passz"
            type="text"
            placeholder="Your password"
          />
        </div>
        <div className="auth__input">
          <label htmlFor="cpass">Confirm Password</label>
          <input
            ref={form.confirmPassword}
            id="cpass"
            type="text"
            placeholder="Confirm password"
          />
        </div>
        <button>Sign Up</button>
      </form>
    </React.Fragment>
  );
}
