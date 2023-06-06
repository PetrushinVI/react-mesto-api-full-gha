import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

    const link = React.useRef();

    const onClear = () => {
        props.onClose();
        link.current.value = '';

    };

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: link.current.value,
        });
        link.current.value = '';
    }

    return (
        <PopupWithForm title="Обновить аватар" name="editAvatar" buttonText="Сохранить" isOpen={props.isOpen}
                       onSubmit={handleSubmit} onClose={onClear}>
            <>
                <input ref={link} type="url" className="form__input form__input_type_avatar" name="inputAvatarName"
                       placeholder="Ссылка на картинку" minLength="2" maxLength="200" id="inputAvatarName" required/>
                <span className="form__input-error"></span>
            </>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;