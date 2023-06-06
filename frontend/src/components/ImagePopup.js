function ImagePopup({card, onClose}) {
    return (
        <section className={`popup popup_type_big-img ${card && 'popup_opened'}`}>
            <div className="popup__image-container">
                <img className="popup__image-item" src={card && card.link} alt={card && card.name}/>
                <button type="button" className="popup__close" onClick={onClose}></button>
                <h2 className="popup__image-title">{card && card.name}</h2>
            </div>
        </section>
    );
}

export default ImagePopup;