import {
  buttonLogin,
  sectionLogin,
  sectionMenu,
  fildRegister,
  linkRegister,
  sectionCreateuser,
  linksearchuser,
  sectionSearchuser,
  linkUpdateuser,
  sectionUpdateuser,
  linkDeleteuser,
  sectionDeleteuser,
  buttonUpdateUser,
  tableUsers,
  buttonbtnCreateuser,
  fieldTitle,
  loadingContainer,
  fieldpassword,
  passwordRecovery,
  sendemail,
  buttonsearchAllUsers,
  buttonDeleteUser,
  buttonbacklogin,
} from "./constantes";

import {
  updateUser,
  SearchAll,
  registerUser,
  checkEmail,
  deleteUser,
  sendLogin,
} from "./requisicao";

import { cleanFieldLogin } from "./validations";

document.addEventListener("DOMContentLoaded", () => {
  if (fildRegister) {
    fildRegister.hidden = false;
    fieldTitle.hidden = false;
  }

  buttonLogin.addEventListener("click", async (event) => {
    event.preventDefault();
    loadingContainer.hidden = false;

    try {
      const loginSucesso = await sendLogin();
      loadingContainer.hidden = true;

      if (loginSucesso) {
        cleanFieldLogin();
        buttonbacklogin.hidden = false;
      } else {
        cleanFieldLogin();
      }
    } catch (error) {
      cleanFieldLogin();
    }
  });

  buttonsearchAllUsers.addEventListener("click", (event) => {
    event.preventDefault();
    SearchAll();

    sectionSearchuser.hidden = true;
  });

  buttonUpdateUser.addEventListener("click", (event) => {
    event.preventDefault();
    updateUser();
  });

  buttonDeleteUser.addEventListener("click", (event) => {
    event.preventDefault();
    deleteUser();
  });

  buttonbtnCreateuser.addEventListener("click", (event) => {
    event.preventDefault();
    registerUser();
  });

  sendemail.addEventListener("click", (event) => {
    event.preventDefault();
    checkEmail();
  });

  linkRegister.addEventListener("click", (event) => {
    event.preventDefault();

    if (linkRegister) {
      sectionLogin.hidden = true;
      sectionMenu.hidden = true;
      sectionCreateuser.hidden = false;
      fildRegister.hidden = true;
      buttonbacklogin.hidden = false;
    }
  });

  linksearchuser.addEventListener("click", (event) => {
    event.preventDefault();

    if (linksearchuser) {
      sectionSearchuser.hidden = false;
      sectionUpdateuser.hidden = true;
      sectionDeleteuser.hidden = true;
      tableUsers.hidden = true;
    }
  });

  linkUpdateuser.addEventListener("click", (event) => {
    event.preventDefault();

    if (linkUpdateuser) {
      sectionUpdateuser.hidden = false;
      sectionSearchuser.hidden = true;
      sectionDeleteuser.hidden = true;
      tableUsers.hidden = true;
    }
  });

  linkDeleteuser.addEventListener("click", (event) => {
    event.preventDefault();

    if (linkDeleteuser) {
      sectionDeleteuser.hidden = false;
      sectionSearchuser.hidden = true;
      sectionUpdateuser.hidden = true;
      tableUsers.hidden = true;
    }
  });

  buttonbacklogin.addEventListener("click", (event) => {
    event.preventDefault();

    if (buttonbacklogin) {
      passwordRecovery.hidden = true;
      sectionCreateuser.hidden = true;
      sectionSearchuser.hidden = true;
      sectionUpdateuser.hidden = true;
      sectionMenu.hidden = true;
      sectionLogin.hidden = false;
      buttonbacklogin.hidden = true;
      fildRegister.hidden = false;
      sectionDeleteuser.hidden = true;
      tableUsers.hidden = true;
      fieldTitle.hidden = false;
      fieldpassword.hidden = false;

      cleanFieldLogin();
    }
  });

  fieldpassword.addEventListener("click", (event) => {
    event.preventDefault();

    if (fieldpassword) {
      buttonbacklogin.hidden = false;
      sectionLogin.hidden = true;
      passwordRecovery.hidden = false;
      fildRegister.hidden = true;
    }
  });
});
