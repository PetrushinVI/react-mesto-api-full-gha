import React, {useEffect, useState} from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/Api.js';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import * as authorization from '../utils/Authorization';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import UnionOk from '../images/Union-ok.svg'
import UnionNo from '../images/Union-no.svg'

function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [isEmail, setIsEmail] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [popupStatus, setPopupStatus] = useState({image: '', message: ''});

    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            authorization.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setIsLoggedIn(true);
                        setIsEmail(res.data.email);
                        navigate("/");
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [navigate]);

    useEffect(() => {
        Promise.all([api.getUserInfo()
            , api.getInitialCard()
        ])
            .then(([userData, cardData]) => {
                setCurrentUser(userData);
                setCards(cardData);
            })
            .catch((err) => console.log(`${err}`))
    }, [])

    const handleRegister = (email, password) => {
        authorization.register(email, password)
            .then((res) => {
                localStorage.setItem('jwt', res.jwt);
                localStorage.setItem('email', res.email);
                setPopupStatus({
                    image: UnionOk,
                    message: 'Вы успешно зарегистрировались!'
                });
                navigate("/sign-in");
                setIsLoggedIn(true);
                setIsEmail(res.data.email);
            })
            .catch(() => {
                setPopupStatus({
                    image: UnionNo,
                    message: 'Что-то пошло не так! Попробуйте еще раз.'
                });
            })
            .finally(handleInfoTooltip);
    };

    const handleLogin = (email, password) => {
        authorization.login(email, password)
            .then((res) => {
                localStorage.setItem('jwt', res.token);
                localStorage.setItem('email', res.email);
                setIsLoggedIn(true);
                setIsEmail(email);
                navigate("/")
            })
            .catch((err) => {
                setPopupStatus({image: UnionNo, message: 'Что-то пошло не так! Попробуйте еще раз.'});
                handleInfoTooltip();
            });
    };

    const handleLoggedOut = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('email');
        setIsLoggedIn(false);
        setIsEmail(null);
        navigate("/");
    };

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card.id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card.id ? newCard : c));
            })
            .catch(() => console.log("Ошибка постановки лайка"))
    }

    const handleCardDelete = (card) => {
        api.deleteCard(card.id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card.id));
            })
            .catch(() => console.log("Ошибка удаления карточки"))
    }

    const handleUpdateUser = (currentUser) => {
        api.editUserInfo(currentUser)
            .then((userData) => {
                closeAllPopups();
                setCurrentUser(userData);
            })
            .catch(() => console.log("Ошибка обновления данных пользователя"))
    }

    const handleUpdateAvatar = (currentUser) => {
        console.log(currentUser)
        api.editUserAvatar(currentUser.avatar)
            .then((userData) => {
                closeAllPopups();
                setCurrentUser(userData);
            })
            .catch(() => console.log("Ошибка обновления аватара"))
    }

    const handleAddPlaceSubmit = (card) => {
        api.addCard(card)
            .then((newCard) => {
                closeAllPopups();
                setCards([newCard, ...cards]);
            })
            .catch(() => console.log("Ошибка добавления карточки"))

    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleInfoTooltip() {
        setIsInfoTooltipPopupOpen(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
        setIsInfoTooltipPopupOpen(false);
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">
                <Routes>
                    <Route path='/sign-up' element={
                        <>
                            <Header title='Войти' route='/sign-in'/>
                            <Register onRegister={handleRegister}/>
                        </>
                    }
                    />
                    <Route path='/sign-in' element={
                        <>
                            <Header title='Регистрация' route='/sign-up'/>
                            <Login onLogin={handleLogin}/>
                        </>
                    }
                    />
                    <Route path='/' element={
                        <>
                            <Header title='Выйти' route='' email={isEmail} onClick={handleLoggedOut}/>
                            <ProtectedRoute
                                path="/"
                                component={Main}
                                isLoggedIn={isLoggedIn}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onCardDelete={handleCardDelete}
                                onCardLike={handleCardLike}
                                cards={cards}
                            />
                            <Footer/>
                        </>
                    }
                    />
                    <Route path="*" element={isLoggedIn ? <Navigate to="/"/> : <Navigate to="/sign-in"/>}/>
                </Routes>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <PopupWithForm
                    title="Вы уверены?"
                    name="confirmation"
                    onClose={closeAllPopups}
                    buttonText="Да"
                />

                <InfoTooltip
                    popupStatus={popupStatus}
                    isOpen={isInfoTooltipPopupOpen}
                    onClose={closeAllPopups}
                />
            </div>

        </CurrentUserContext.Provider>
    );
}

export default App;
