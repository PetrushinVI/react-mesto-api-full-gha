import {useContext} from 'react';
import Card from './Card.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {

    const user = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <button onClick={props.onEditAvatar} className="profile__avatar-button">
                    <img src={user.avatar} alt="Аватар" className="profile__avatar"/>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{user.name}</h1>
                    <button onClick={props.onEditProfile} className="profile__btn" type="button"></button>
                    <p className="profile__description">{user.about}</p>
                </div>
                <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    <Card key={card._id} id={card._id} owner={card.owner} name={card.name} link={card.link}
                          likes={card.likes} onCardClick={props.onCardClick} onCardLike={props.onCardLike}
                          onCardDelete={props.onCardDelete}></Card>))
                }
            </section>
        </main>
    );
}

export default Main;