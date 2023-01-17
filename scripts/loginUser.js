// window.location.href = "pages/userPage.html";

const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const signInButton = document.getElementById("signInButton");

(() => {
  userEmail.focus();
})();

const isFetching = (value) => {
  if (value) {
    signInButton.disabled = true;
    signInButton.innerHTML = "<div class='loader'></div>";
  } else if (!value) {
    signInButton.disabled = false;
    signInButton.innerHTML = "Cadastrar";
  }
};

const removeStyle = () => {
  userEmail.classList.remove("animateError");
  userPassword.classList.remove("animateError");
};

const loginUser = () => {
  isFetching(true);

  axios
    .post("http://localhost:3000/signIn", {
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
        window.location.href = "pages/userPage.html";
      }
    })
    .catch((error) => {
      //Requisição deu errado
      alertError("Houve um problema interno ao logar-se, desculpe!");
      console.log(error);
    })
    .finally(() => isFetching(false));
};

const alertError = (error) => {
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
};

const fieldValid = () => {
  if (userEmail.value && userPassword.value) {
    return true;
  } else {
    return false;
  }
};

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
