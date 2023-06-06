import React, {useEffect} from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    useEffect(() => {
        setName(currentUser.name ?? '');
        setDescription(currentUser.about ?? '');
    }, [currentUser, props.isOpen]);

    function handleNameEdit(e) {
        setName(e.target.value);
    }

    function handleDescriptionEdit(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
                name,
                about: description,
            }
        );
    }

    return (
        <PopupWithForm title="Редактировать профиль" name="editProfile" buttonText="Сохранить" isOpen={props.isOpen}
                       onSubmit={handleSubmit} onClose={props.onClose}>
            <>
                <input type="text" className="form__input form__input_type_name" name="inputName" placeholder="Ваше имя"
                       minLength="2" maxLength="40" id="inputName" value={name} onChange={handleNameEdit} required/>
                <span className="form__input-error"></span>
                <input type="text" className="form__input form__input_type_about" name="inputAbout"
                       placeholder="Ваш род деятельности" minLength="2" maxLength="200" id="inputAbout"
                       value={description} onChange={handleDescriptionEdit} required/>
                <span className="form__input-error"></span>
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup;