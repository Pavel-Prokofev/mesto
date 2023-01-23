class UserInfo {
  constructor({ userNameSelector, userOccupationSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userOccupation = document.querySelector(userOccupationSelector);
  };

  getUserInfo() {
    const userData = {};
    userData.userName = this._userName.textContent;
    userData.userOccupation = this._userOccupation.textContent;
    return userData;
  };

  setUserInfo(newUserName, newUserOccupation) {
    this._userName.textContent = newUserName.value;
    this._userOccupation.textContent = newUserOccupation.value;
  };
}

export default UserInfo;