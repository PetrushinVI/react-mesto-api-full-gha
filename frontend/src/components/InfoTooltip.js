export default function InfoTooltip(props) {
    return (
        <div className={`popup popup_tooltip ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={props.onClose}></button>
                <div className="popup__tooltip-status">
                    <img className="popup__icon" src={props.popupStatus.image}
                         alt={`Информационное сообщение: ${props.popupStatus.message}`}/>
                    <p className="popup__title popup__title_icon">{props.popupStatus.message}</p>
                </div>
            </div>
        </div>
    );
};