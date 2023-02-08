class UserInfo {
  constructor({ userNameSelector, userOccupationSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userOccupation = document.querySelector(userOccupationSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
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
    this._userName.textContent = name;
    this._userOccupation.textContent = about;
    this._myId = _id
  };

  setUseravatar({ avatar }) {
    this._userAvatar.src = avatar;
  };
}

export default UserInfo;