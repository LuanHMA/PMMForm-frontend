const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const signInButton = document.getElementById("signInButton");
const url = "http://localhost:3000";

(() => {
  userEmail.focus();
})();

function removeStyle() {
  userEmail.classList.remove("animateError");
  userPassword.classList.remove("animateError");
}

function loginUser() {
  axios
    .post(`${url}/signIn`, {
      email: userEmail.value,
      password: userPassword.value,
    })
    .then((response) => {
      //Requisição deu certo

      if (response.data.error) {
        alertError(response.data.error);
        return;
      }
      if (response.data == "auth/too-many-requests") {
        alertError(
          "Estamos recebendo muitos pedidos de login, aguarde um instante!"
        );
        return;
      } else {
        //USUARIO LOGADO
        window.location.href = "PMMForm-frontend-master/pages/userPage.html";
      }
    })
    .catch((error) => {
      //Requisição deu errado
      alertError("Houve um problema interno ao logar-se, desculpe!");
      console.log(error);
    });
}

function alertError(error) {
  removeStyle();
  switch (error) {
    case "Senha incorreta!":
      userPassword.value = "";
      userPassword.focus();
      userPassword.classList.add("animateError");

      break;
    case "Usuário não encontrado!":
      userEmail.value = "";
      userEmail.focus();
      userEmail.classList.add("animateError");
    default:
      break;
  }
  alert(error);
}

function fieldValid() {
  if (userEmail.value && userPassword.value) {
    return true;
  } else {
    return false;
  }
}

signInButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (!fieldValid()) {
    if (!userEmail.value) {
      userEmail.focus();
    } else if (!userPassword.value) {
      userPassword.focus();
    }
    alert("Preencha todos os campos por favor!");
  } else {
    loginUser();
  }
});
