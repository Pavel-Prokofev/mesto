import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithError from '../components/PopupWithError.js'
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  listOfCurrentClassesBasic,
  formEdit, formEditAvatar, formAdd,
  profileEditButton, profileEditAvatarButton, profileAddButton,
  popupEditInputName, popupEditInputInfo,
  configApi
} from '../utils/constants.js';

const popupWithErrorNew = new PopupWithError('.popup_error');
popupWithErrorNew.setEventListeners();

const renderLoading = (button, loadingButtonText) => button.textContent = loadingButtonText;
const renderEndLoading = (button, defaultButtonText) => button.textContent = defaultButtonText;

const api = new Api(configApi);

const userInfoNew = new UserInfo({
  userNameSelector: '.profile__name',
  userOccupationSelector: '.profile__info',
  userAvatarSelector: '.profile__avatar',
  userDataError: (err) => {
    popupWithErrorNew.open(`Ошибка при загрузке с сервера ${err} пользователя`);
  }
});

const popupEditNew = new PopupWithForm('.popup_edit',
  (inputValues, button, defaultButtonText) => {
    popupEditNew.renderRemoveLoadingError();
    if (userInfoNew.transferMyId()) {
      renderLoading(button, 'Сохранение...');
      api.patchUserInfo({ name: inputValues.username, about: inputValues.occupation })
        .then((res) => {
          userInfoNew.setUserInfo(res);
          popupEditNew.close();
        })
        .catch((err) => {
          popupEditNew.renderLoadingError(`Ошибка при перезаписи данных пользователя: ${err}.`);
        })
        .finally(() => {
          renderEndLoading(button, defaultButtonText);
        });
    } else {
      popupEditNew.renderLoadingError(`Ошибка при загрузке новых данных на сервер вызваная некорреректной загрузкой данных пользователя.`);
    }
  }
);
const formValidatorPopupEdit = new FormValidator(listOfCurrentClassesBasic, formEdit);
popupEditNew.setEventListeners();
formValidatorPopupEdit.enableValidation();
profileEditButton.addEventListener('click',
  () => {
    popupEditNew.open();
    const userData = userInfoNew.getUserInfo();
    popupEditInputName.value = userData.userName;
    popupEditInputInfo.value = userData.userOccupation;
    formValidatorPopupEdit.resetErrorWhenOpeningPopup();
  }
);

const popupEditAvatarNew = new PopupWithForm('.popup_edit-avatar',
  (inputValues, button, defaultButtonText) => {
    popupEditAvatarNew.renderRemoveLoadingError();
    if (userInfoNew.transferMyId()) {
      renderLoading(button, 'Сохранение...');
      api.patchUserAvatar(inputValues)
        .then((res) => {
          userInfoNew.setUseravatar(res);
          popupEditAvatarNew.close();
        })
        .catch((err) => {
          popupEditAvatarNew.renderLoadingError(`Ошибка при перезаписи аватара пользователя: ${err}.`);
        })
        .finally(() => {
          renderEndLoading(button, defaultButtonText);
        });
    } else {
      popupEditAvatarNew.renderLoadingError(`Ошибка при загрузке новых данных на сервер вызваная некорреректной загрузкой данных пользователя.`);
    }
  }
);
const formValidatorPopupEditAvatar = new FormValidator(listOfCurrentClassesBasic, formEditAvatar);
popupEditAvatarNew.setEventListeners();
formValidatorPopupEditAvatar.enableValidation();
profileEditAvatarButton.addEventListener('click',
  () => {
    popupEditAvatarNew.open();
    formValidatorPopupEditAvatar.resetErrorWhenOpeningPopup();
  }
);

const popupViewingNew = new PopupWithImage('.popup_viewing');
popupViewingNew.setEventListeners();

const popupWithConfirmationNew = new PopupWithConfirmation('.popup_del-card');
popupWithConfirmationNew.setEventListeners();

const creatCard = (card) => {
  if (userInfoNew.transferMyId()) {
    const newCard = new Card(
      card,
      {
        cardTemplateSelector: '#gallery__card-template',

        handleCardClick: (image, title) => {
          popupViewingNew.open(image, title);
        },

        myId: userInfoNew.transferMyId(),

        handleDelCard: () => {
          popupWithConfirmationNew.open((button, defaultButtonText) => {
            popupWithConfirmationNew.renderRemoveLoadingError();

            renderLoading(button, 'Удаление...');
            api.delCard(card._id)
              .then(() => {
                newCard.delCard();
                popupWithConfirmationNew.close();
              })
              .catch((err) => {
                popupWithConfirmationNew.renderLoadingError(`Ошибка при удалении карточки с сервера: ${err}.`);
              })
              .finally(() => {
                renderEndLoading(button, defaultButtonText);
              });
          })
        },

        hendleAddLike: (cardId) => {
          api.putCardLike(cardId)
            .then((res) => {
              newCard.addLike();
              newCard.handlelikesCounter(res);
            })
            .catch((err) => {
              popupWithErrorNew.open(`Ошибка при добавлении лайка карточки на сервер: ${err}.`);
            });
        },

        hendleRemoveLike: (cardId) => {
          api.delCardLike(cardId)
            .then((res) => {
              newCard.removeLike();
              newCard.handlelikesCounter(res);
            })
            .catch((err) => {
              popupWithErrorNew.open(`Ошибка при удалении лайка карточки с сервера: ${err}.`);
            });
        },

        cardDataError: () => {
          popupWithErrorNew.open(`Ошибка при загрузке с сервера ${err} карточки`);
        }
      }
    );
    return newCard.generateCard();
  } else {
    popupWithErrorNew.open(`Ошибка при загрузке новой карточки на сервер вызваная некорреректной загрузкой данных пользователя.`);
  };
}

const newSection = new Section(
  (card) => {
    newSection.addDefaultItems(creatCard(card));
  },
  '.gallery__cards'
);

const popupAddNew = new PopupWithForm('.popup_add',
  (inputValues, button, defaultButtonText) => {
    popupAddNew.renderRemoveLoadingError();
    if (userInfoNew.transferMyId()) {
      renderLoading(button, 'Создание...');
      api.postNewCard({ name: inputValues.title, link: inputValues.img })
        .then((res) => {
          newSection.addItem(creatCard(res));
          popupAddNew.close();
        })
        .catch((err) => {
          popupAddNew.renderLoadingError(`Ошибка при загрузке новой карточки на сервер: ${err}.`);
        })
        .finally(() => {
          renderEndLoading(button, defaultButtonText);
        });
    } else {
      popupAddNew.renderLoadingError(`Ошибка при загрузке новой карточки на сервер вызваная некорреректной загрузкой данных пользователя.`);
    };
  });

const formValidatorPopupAdd = new FormValidator(listOfCurrentClassesBasic, formAdd);
popupAddNew.setEventListeners();
formValidatorPopupAdd.enableValidation();

profileAddButton.addEventListener('click',
  () => {
    popupAddNew.open();
    formValidatorPopupAdd.resetErrorWhenOpeningPopup();
  });

api.getUserInfo()
  .then((res) => {
    userInfoNew.setUserInfo(res);
    userInfoNew.setUseravatar(res);
    if (res._id) {
      api.getAllCards()
        .then((res) => {
          newSection.renderItems(res);
        })
        .catch((err) => {
          popupWithErrorNew.open(`Ошибка при загрузке карточек с сервера: ${err}.`);
        });
    }
  })
  .catch((err) => {
    popupWithErrorNew.open(`Ошибка при загрузке данных пользователя с сервера: ${err}.`);
  });