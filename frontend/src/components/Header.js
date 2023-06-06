import logo from '../images/Vector.svg';
import {Link} from 'react-router-dom';

function Header(props) {
    return (
        <header className='header'>
            <img src={logo} alt='Логотип' className='header__logo'/>
            <div className='header__menu'>
                <p className='header__user-email'>{props.email}</p>
                <Link to={props.route} className='header__link' onClick={props.onClick}>{props.title}</Link>
            </div>
        </header>
    )
}

export default Header;