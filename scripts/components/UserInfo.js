export class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {Name: this._name.textContent,
            Description: this._description.textContent};
  }

  setUserInfo(newName, newDescription) {
    this._name.textContent = newName;
    this._description.textContent = newDescription;
  }
}
