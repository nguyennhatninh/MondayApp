import classNames from 'classnames/bind';

import styles from './LoginPage.module.scss';
import RegisterForm from './RegisterForm';
import Button from '~/components/Button/Button';
import RegisterSupport from './RegisterSupport';
import { auth, googleProvider } from '../../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const cx = classNames.bind(styles);

function LoginPage() {
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const idToken = await result.user.getIdToken();

            const response = await axios.post(
                `${process.env.REACT_APP_SERVER}/auth/google`,
                {
                    idToken: idToken,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );

            const data = await response.data;
            localStorage.setItem('accessToken', data.access_token);
        } catch (error) {
            console.error('Error logging in with Google:', error);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-body')}>
                <div className={cx('login-container')}>
                    <h1 className={cx('login-title')}>
                        <b>Log </b>In
                    </h1>
                    <RegisterForm logIn></RegisterForm>
                    <div className={cx('login-separator')}>
                        <span className={cx('separator-line')}></span>
                        <div>Or Sign in with </div>
                        <span className={cx('separator-line')}></span>
                    </div>
                    <div className={cx('other-login-btn')} onClick={handleGoogleLogin}>
                        <Button
                            leftIcon={<img src="https://cdn.monday.com/images/logo_google_v2.svg" alt=""></img>}
                            outline
                        >
                            Google
                        </Button>
                    </div>
                    <RegisterSupport link=" Sign up " href="./signup">
                        Don't have an account yet?
                    </RegisterSupport>
                    <RegisterSupport link="Visit our help center" href="./">
                        Can't log in?
                    </RegisterSupport>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;