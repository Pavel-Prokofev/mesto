class UserInfo {
  constructor({ userNameSelector, userOccupationSelector, userAvatarSelector, userDataError }) {
    this._userName = document.querySelector(userNameSelector);
    this._userOccupation = document.querySelector(userOccupationSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
    this._userDataError = userDataError;
  };

  getUserInfo() {
    const userData = {};
    userData.userName = this._userName.textContent;
    userData.userOccupation = this._userOccupation.textContent;
    return userData;
  };

  transferMyId() {
    return this._myId;
  };

  setUserInfo({ name, about, _id }) {
    if (name) {
      this._userName.textContent = name;
    } else {this._userDataError('Имени');};
    if (about) {
      this._userOccupation.textContent = about;
    } else {this._userDataError('Характеристик');};
    if (_id) {
      this._myId = _id
    } else {this._userDataError('_id');};
  };

  setUseravatar({ avatar }) {
    if (avatar) {
      this._userAvatar.src = avatar;
    } else {this._userDataError('Аватара');};
  };
}

export default UserInfo;