import {useState} from 'react';

export default function Login({onLogin}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInput = event => {
        setEmail(event.target.value);
    };

    const handlePasswordInput = event => {
        setPassword(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className='login'>
            <h3 className='register__title'>Вход</h3>
            <form className='register__form' onSubmit={handleSubmit}>
                <input type='email' className='register__input' value={email} placeholder='Email'
                       onChange={handleEmailInput} required></input>
                <span className="form__input-error"></span>
                <input type='password' className='register__input' value={password} placeholder='Пароль'
                       onChange={handlePasswordInput} required></input>
                <span className="form__input-error"></span>
                <button type='submit' className='register__submit-button'>Войти</button>
            </form>
        </div>
    );
};