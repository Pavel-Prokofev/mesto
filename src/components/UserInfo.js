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

  setUserInfo({ username, occupation }) {
    this._userName.textContent = username;
    this._userOccupation.textContent = occupation;
  };
}

export default UserInfo;