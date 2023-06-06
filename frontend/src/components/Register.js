import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Register({onRegister}) {

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
        onRegister(email, password);
    };

    return (
        <div className='register'>
            <h3 className='register__title'>Регистрация</h3>
            <form className='register__form' onSubmit={handleSubmit}>
                <input type='email' className='register register__input' value={email} placeholder='Email'
                       onChange={handleEmailInput} required></input>
                <span className='form__input-error'></span>
                <input type='password' className='register register__input' value={password} placeholder='Пароль'
                       onChange={handlePasswordInput} required></input>
                <span className='form__input-error'></span>
                <button type='submit' className='register__submit-button'>Зарегистрироваться</button>
            </form>
            <div className='register__footer'>
                <p className='register__text'>Уже зарегистрированы?&nbsp;</p>
                <Link to='/sign-in' className='register__link'>Войти</Link>
            </div>
        </div>
    );
};