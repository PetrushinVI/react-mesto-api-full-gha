function PopupWithForm({name, isOpen, title, children, buttonText, onClose, onSubmit}) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="form">
                <div className="form popup__container">
                    <form className={`form popup__form_type_${name}`} name={`${name}`} onSubmit={onSubmit}>
                        <h3 className="form__title">{`${title}`}</h3>
                        {children}
                        <button type="submit" className="form__btn">{buttonText}</button>
                    </form>
                    <button className="popup__close" type="button" onClick={onClose}></button>
                </div>
            </div>
        </div>
    );
}

export default PopupWithForm;