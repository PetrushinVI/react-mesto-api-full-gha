import {CurrentUserContext} from '../contexts/CurrentUserContext';
import React from "react";

function Card(card) {

    const user = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === user._id;
    const isLiked = card.likes.some(i => i._id === user._id);
    const cardLikeButtonClassName =
        `element__btn ${isLiked && 'element__btn_active'}`;

    function handleCard() {
        card.onCardClick(card);
    }

    function handleLikeClick() {
        card.onCardLike(card);
    }

    function handleCardDelete() {
        card.onCardDelete(card);
    }

    return (
        <article className="element">
            <button className="element__big-img">
                <img src={card.link} alt={card.name} className="element__picture" onClick={handleCard}/>
            </button>
            {isOwn && <button className="element__delete" type="button" onClick={handleCardDelete}></button>}
            <div className="element__description">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </article>
    );
}

export default Card;