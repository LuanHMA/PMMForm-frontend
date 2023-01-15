const signUpButton = document.getElementById("signUpButton");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const url = "http://localhost:3000/";

(() => {
  userEmail.focus();
})();

function removeStyle() {
  userEmail.classList.remove("animateError");
  userPassword.classList.remove("animateError");
}

function registerUser() {
  axios
    .post(`${url}/signUp`, {
      email: userEmail.value,
      password: userPassword.value,
    })
    .then((response) => {
      //Requisiçaõ deu certo
      if (response.data.error) {
        alertError(response.data.error);
      } else {
        //USUARIO CADASTRADO
        alert("Usuário cadastrado com sucesso!");
        window.location.href = "../index.html";
      }
    })
    .catch((error) => {
      //Requisição deu errado
      alertError("Houve um problema interno ao registra-se, desculpe!");
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

signUpButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (!fieldValid()) {
    if (!userEmail.value) {
      userEmail.focus();
    } else if (!userPassword.value) {
      userPassword.focus();
    }
    alert("Preencha todos os campos por favor!");
  } else if (userPassword.value.length < 5) {
    alert("Sua senha precisa ter mais de 4 digitos");
  } else {
    registerUser();
  }
});
