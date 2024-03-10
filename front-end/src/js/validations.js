import {  buttonbacklogin, fieldpassword, fildRegister, inputEmail, inputUpdateuser, inputLogin, inputLoginPassword, inputNameupdate, inputPasswordupdate, inputPasswordRegister, inputuserRegistration,  sectionLogin, sectionMenu, tableUsers, fieldTitle, inputEmailregister, inputNewemailupdate,} from "./constantes.js";



export function displayMessageSuccess(texto) {
  const message = document.createElement("div");
  message.textContent = texto;
  message.classList.add("message", "success");
  document.body.appendChild(message);
  setTimeout(() => {
    document.body.removeChild(message);
  }, 1000); 
}

export function displayMessageError(texto) {''
  const message = document.createElement("div");
  message.textContent = texto;
  message.classList.add("message", "error");
  document.body.appendChild(message);
  setTimeout(() => {
    document.body.removeChild(message);
  }, 1000); 
}
export function cleanFieldLogin() {
  inputLogin.value = "";
  inputLoginPassword.value = "";
}
export function cleanFieldRegister() {
  inputuserRegistration.value="";
  inputPasswordRegister.value="";
  inputEmailregister.value="";
}
export function cleanFieldUpdate(){
  inputUpdateuser.value = "";
  inputNameupdate.value = "";
  inputPasswordupdate.value = "";
  inputNewemailupdate.value = "";
 
}

export function cleanFieldEmail(){
  inputEmail.value="";
  
}


export function handleInvalidCredentials() {
  buttonbacklogin.hidden=false;
  sectionLogin.hidden=true;
  fildRegister.hidden=true;
  sectionMenu.hidden=false;
  fieldTitle.hidden=true;
  fieldpassword.hidden=true;
  
  
}
export function showDataInTable(data) {
  clearUsersTable(); 

  // Adicionar cabeçalho
  const headerRow = document.createElement('tr');
  
  const headerUsuario = document.createElement('th');
  headerUsuario.textContent = 'Usuário';
  headerRow.appendChild(headerUsuario);

  const headerId = document.createElement('th');
  headerId.textContent = 'ID';
  headerRow.appendChild(headerId);

  const headerEmail = document.createElement('th');
  headerEmail.textContent = 'E-mail';
  headerRow.appendChild(headerEmail);

  tableUsers.appendChild(headerRow);

  // Adicionar dados
  data.forEach((usuario) => {
    addUserInTable(usuario);
  });
}

function addUserInTable(usuario) {
  const row = document.createElement('tr');
  
  const cellUsuario = document.createElement('td');
  cellUsuario.textContent = usuario.usuario;
  row.appendChild(cellUsuario);
 
  const cellId = document.createElement('td');
  cellId.textContent = usuario.id; 
  row.appendChild(cellId);

  const cellEmail = document.createElement('td');
  cellEmail.textContent = usuario.email;
  row.appendChild(cellEmail);

  tableUsers.appendChild(row);
}

function clearUsersTable() {
  while (tableUsers.firstChild) {
    tableUsers.removeChild(tableUsers.firstChild);
  }
}

export function fadeOut(element) {
  
  let opacity = 1;
  const fadeInterval = setInterval(() => {
    if (opacity > 0) {
      opacity -= 0.1;
      element.style.opacity = opacity;
    } else {
      clearInterval(fadeInterval);
      element.textContent = "";
      element.classList.remove("success", "error");
      element.style.opacity = 1; 
    }
  }, 100);
}



export function displayTableUsers() {
 
  setTimeout(() => {
   tableUsers.hidden=true;
  }, 2000); 
}
export function togglePasswordVisibility() {
  const passwordInput = document.getElementById('loginPassword');
  const visibilityIcon = document.getElementById('loginIcon');

  if (passwordInput && visibilityIcon) {
    visibilityIcon.addEventListener('click', function () {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        visibilityIcon.textContent = 'visibility';
      } else {
        passwordInput.type = 'password';
        visibilityIcon.textContent = 'visibility_off';
      }
    });
  } else {
    console.error('Element not found. Check your element IDs.');
  }
}

// Chame a função para aplicar a funcionalidade ao seu formulário
togglePasswordVisibility();

export function togglePasswordVisibilityCreater(){
  const passwordInputCreate = document.getElementById('password');
  const visibilityIconCreate = document.getElementById('create-icons');

  if (passwordInputCreate && visibilityIconCreate) {
    visibilityIconCreate.addEventListener('click', function () {
      if (passwordInputCreate.type === 'password') {
        passwordInputCreate.type = 'text';
        visibilityIconCreate.textContent = 'visibility';
      } else {
        passwordInputCreate.type = 'password';
        visibilityIconCreate.textContent = 'visibility_off';
      }
    });
  } else {
    console.error('Element not found. Check your element IDs.');
  }
}
togglePasswordVisibilityCreater();
export function togglePasswordVisibilityUpdate(){
  const passwordInputUodate=document.getElementById("updateUserPassword");
  const visibilityIconUpdate=document.getElementById("updateIcones");
  if (passwordInputUodate && visibilityIconUpdate) {
    visibilityIconUpdate.addEventListener('click', function () {
      if (passwordInputUodate.type === 'password') {
        passwordInputUodate.type = 'text';
        visibilityIconUpdate.textContent = 'visibility';
      } else {
        passwordInputUodate.type = 'password';
        visibilityIconUpdate.textContent = 'visibility_off';
      }
    });
  } else {
    console.error('Element not found. Check your element IDs.');
  }

}
togglePasswordVisibilityUpdate();