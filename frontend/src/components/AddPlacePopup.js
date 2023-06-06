import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

    const name = React.useRef();
    const link = React.useRef();
    const onClear = () => {
        props.onClose();
        name.current.value = '';
        link.current.value = '';
    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: name.current.value,
            link: link.current.value,
        });
        name.current.value = '';
        link.current.value = '';
    }

    return (
        <PopupWithForm title="Новое место" name="addPlace" buttonText="Создать" isOpen={props.isOpen}
                       onSubmit={handleSubmit} onClose={onClear}>
            <>
                <input ref={name} type="text" className="form__input form__input_type_name-card" name="inputNameCard"
                       placeholder="Название" minLength="2" maxLength="30" id="inputNameCard" required/>
                <span className="form__input-error"></span>
                <input ref={link} type="url" className="form__input form__input_type_url-card" name="inputUrlCard"
                       placeholder="Ссылка на картинку" minLength="2" maxLength="200" id="inputUrlCard" required/>
                <span className="form__input-error"></span>
            </>
        </PopupWithForm>
    )
}

export default AddPlacePopup;