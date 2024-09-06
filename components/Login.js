import FacebookIcon from '@material-ui/icons/Facebook';
import useInput from '../hooks/use-input';
import { useState } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

const isEmail = (value) => value.includes('@');
const isPass = (value) => value.length > 8;
const isNotEmpty = (value) => value.trim() !== '';

async function CreateUser(dataUser) {
  const result = await fetch('/api/auth/sginUp', {
    method: "POST",
    body: JSON.stringify(dataUser),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await result.json();
  if (!result.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

function Login() {
  const [isLogIn, setIsLogInn] = useState(false);
  const [disButton, setDisButton] = useState(false);
  const router = useRouter();

  const {
    value: UserNameValue,
    isValid: UserNameIsValid,
    hasError: UserNameHasError,
    valueChangeHandler: UserNameChangeHandler,
    inputBlurHandler: UserNameBlurHandler,
    reset: resetUserName,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPass,
  } = useInput(isPass);

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    const userFormData = { emailValue, passwordValue, UserNameValue: UserNameIsValid ? UserNameValue : null };

    if (isLogIn && UserNameIsValid) {
      try {
        setDisButton(true);
        const result = await CreateUser(userFormData);
        resetUserName();
        resetEmail();
        resetPass();
        setIsLogInn(prev => !prev);
        setDisButton(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setDisButton(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: emailValue,
        password: passwordValue,
      });

      if (!result.error) {
        router.replace('/Home');
      } else {
        setDisButton(false);
        alert(result.error);
      }
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
        <h1 className="bg-no-repeat instagram-logo"></h1>
        <form className="mt-8 w-64 flex flex-col" onSubmit={submitHandler}>
          {isLogIn && (
            <input
              className={`text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none ${UserNameHasError ? 'border-red-500' : ''}`}
              id="username"
              value={UserNameValue}
              onChange={UserNameChangeHandler}
              onBlur={UserNameBlurHandler}
              placeholder="User Name"
            />
          )}
          {UserNameHasError && <p className="text-red-500 text-xs mb-2">Please enter a valid User Name.</p>}

          <input
            type="email"
            className={`text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none ${emailHasError ? 'border-red-500' : ''}`}
            id="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            placeholder={`${isLogIn ? 'Email' : 'Phone number, username, or email'}`}
          />
          {emailHasError && <p className="text-red-500 text-xs mb-2">Please enter a valid email.</p>}

          <input
            className={`text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none ${passwordHasError ? 'border-red-500' : ''}`}
            id="password"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type="password"
            placeholder="Password"
          />
          {passwordHasError && <p className="text-red-500 text-xs mb-4">Password must be at least 8 characters long.</p>}

          <button
            disabled={disButton}
            className={`text-sm text-center bg-blue-500 text-white py-1 rounded font-medium ${disButton ? 'opacity-50' : ''}`}
          >
            {isLogIn ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        <div className="flex justify-evenly space-x-2 w-64 mt-4">
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
          <span className="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
          <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
        </div>
        <button className="mt-4 flex items-center">
          <FacebookIcon className="mr-1 text-blue-900" />
          <span className="text-xs text-blue-900 font-semibold">Log in with Facebook</span>
        </button>
        <a className="text-xs text-blue-900 mt-4 cursor-pointer">Forgot password?</a>
      </div>
      <div className="bg-white border border-gray-300 text-center w-80 py-4">
        <span className="text-sm">Don't have an account?</span>
        <a onClick={() => setIsLogInn(!isLogIn)} className="text-blue-500 text-sm font-semibold cursor-pointer">
          {isLogIn ? 'Log In' : 'Sign Up'}
        </a>
      </div>
      <div className="mt-3 text-center">
        <span className="text-xs">Get the app</span>
        <div className="flex mt-3 space-x-2">
          <div className="bg-no-repeat apple-store-logo"></div>
          <div className="bg-no-repeat google-store-logo"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
