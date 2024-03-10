import { inputDeleteuser, inputEmailregister, inputPasswordRegister, inputuserRegistration, tableUsers } from "./constantes.js";
import {
  showDataInTable,
  displayMessageError,
  displayMessageSuccess,
  handleInvalidCredentials,
  cleanFieldEmail,
  cleanFieldUpdate,
  cleanFieldRegister,
  fadeOut,
  displayTableUsers,
} from "./validations.js";

export function storeToken(token) {
  sessionStorage.setItem("token", token);
}

export function recoverToken() {
  return sessionStorage.getItem("token");
}

export function sendLogin() {
  const usuario = document.getElementById("loginUsername").value;
  const senha = document.getElementById("loginPassword").value;
  if (!usuario || !senha) {
    displayMessageError("Por favor, preencha todos os campos.");
    return;
  }

  return fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario, senha }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Credenciais inválidas");
      }
    })
    .then((data) => {
      if (data && data.token) {
        storeToken(data.token);
        console.log("Login realizado com sucesso !");
        displayMessageSuccess("Operação realizada com sucesso!");
        handleInvalidCredentials();
        return true;
      } else {
        throw new Error("Token inválido");
      }
    })
    .catch((error) => {
      if (error.message === "Credenciais inválidas") {
        displayMessageError("Ocorreu um erro na operação.");
      } else {
        console.error("Erro ao fazer login:", error);
      }
      return false;
    });
}

export function deleteToken() {
  sessionStorage.removeItem("token");
}

document
  .getElementById("loginForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    sendLogin();
  });

export function registerUser() {
  const usuario = document.getElementById("username").value;
  const senha = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  if (!usuario || !senha || !email) {
    displayMessageError("Por favor, preencha todos os campos.");
    inputPasswordRegister.value="";
    inputEmailregister.value="";
    inputuserRegistration.value="";
    return;
  }

  const regexUsername = /^[a-z]+$/;
  if (!regexUsername.test(usuario)) {
    displayMessageError(
      "O nome de usuário deve conter apenas letras minúsculas."
    );
    return;
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    displayMessageError("Por favor, insira um endereço de email válido.");
    return;
  }

  if (senha.length > 8) {
    displayMessageError("A senha deve ter no máximo 8 caracteres.");
    return;
  }

  fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usuario, senha, email }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao cadastrar usuário.");
      }
    })
    .then((data) => {
      displayMessageSuccess("Usuário cadastrado com sucesso");
      console.log("Usuário cadastrado com sucesso:", data);
      cleanFieldRegister();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar usuário:", error);
      displayMessageError("Erro ao cadastrar usuário.");
    });
}

export function SearchAll() {
  const token = recoverToken();

  if (!token) {
    console.error("Token não encontrado. Usuário não autenticado.");
    return;
  }
  fetch("http://localhost:3000/usuarios", {
    headers: {
      "x-api-key": token,
    },
  })
    .then((response) => {
      if (response.ok) {
        displayMessageSuccess("lista exibida com sucesso");
        return response.json();
      } else {
        displayMessageError("erro ao buscar todos os usúarios");
        throw new Error("Erro ao buscar todos os usuários");
      }
    })

    .then((data) => {
      console.log("Todos os usuários:", data);
      tableUsers.hidden = false;
      showDataInTable(data);
    })
    .catch((error) => {
      console.error("Erro ao buscar todos os usuários:", error);
    });
}

// ...
export function updateUser() {
  const userId = document.getElementById("updateUserId");
  const username = document.getElementById("updateUserUsername");
  const newPassword = document.getElementById("updateUserPassword");
  const newEmailInput = document.getElementById("updateNewemail");
  const token = recoverToken();

  if (!token) {
    console.error("Token não encontrado. Usuário não autenticado.");
    return;
  }

  const userIdValue = userId.value;
  const usernameValue = username.value;
  const newPasswordValue = newPassword.value;
  const newEmailValue = newEmailInput.value;

  if (!userIdValue || !usernameValue || !newPasswordValue || !newEmailValue) {
    displayMessageError("Erro, por favor, preencha todos os campos.");
    console.error("Por favor, preencha todos os campos.");
    return;
  }

  const data = {
    usuario: usernameValue,
    senha: newPasswordValue,
    email: newEmailValue, // Adicionando o email aos dados a serem enviados
  };

  fetch(`http://localhost:3000/usuarios/${userIdValue}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
        
      } else {
        displayMessageError("Erro ao atualizar.");
        
        throw new Error("Erro ao atualizar usuário");
      }
    })
    .then((data) => {
      displayTableUsers()
      cleanFieldUpdate()
      displayMessageSuccess("Usuário atualizado com sucesso.");
      console.log("Usuário atualizado:", data);

      cleanFieldUpdate();
      SearchAll();
      
    })
    .catch((error) => {
      displayMessageError(
        "Erro ao atualizar usuário. Verifique sua conexão ou tente novamente mais tarde."
      );
      console.error("Erro ao atualizar usuário:", error);
    });
}

export function deleteUser() {
  const userId = document.getElementById("deleteUserId").value;
  const token = recoverToken();

  if (!token) {
    console.error("Token não encontrado. Usuário não autenticado.");
    return;
  }

  fetch(`http://localhost:3000/usuarios/${userId}`, {
    method: "DELETE",
    headers: {
      "x-api-key": token,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erro ao deletar usuário");
      }
    })
    .then((data) => {
      console.log("Usuário excluído com sucesso:", data);
      displayTableUsers()
      displayMessageSuccess("Usuário excluído com sucesso");
      inputDeleteuser.value = "";
      SearchAll();
    })
    .catch((error) => {
      displayMessageError("erro", "Erro ao excluir usuário.");
      console.error("Erro ao excluir usuário:", error);
    });
}
export async function checkEmail() {
  const emailInput = document.getElementById("emailInput");
  const resultMessage = document.getElementById("resultMessage");

  const email = emailInput.value.trim();

  if (!email) {
    resultMessage.textContent = displayMessageError(
      "Por favor, insira um email"
    );
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      resultMessage.textContent = data.message;

      if (data.message.includes("Sucesso")) {
        resultMessage.classList.add("success");
      } else {
        resultMessage.classList.add("error");
      }

      setTimeout(() => {
        cleanFieldEmail();
        fadeOut(resultMessage);
      }, 3000);
    } else {
      resultMessage.textContent = data.error || "Erro desconhecido.";

      setTimeout(() => {
        cleanFieldEmail();
        fadeOut(resultMessage);
      }, 2000);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    resultMessage.textContent = "Erro na requisição.";

    setTimeout(() => {
      cleanFieldEmail();
      fadeOut(resultMessage);
    }, 2000);
  }
}
