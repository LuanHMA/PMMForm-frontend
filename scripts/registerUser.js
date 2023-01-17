const signUpButton = document.getElementById("signUpButton");
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const passwordConfirm = document.getElementById("userPasswordConfirm");

(() => {
  userEmail.focus();
})();

const isFetching = (value) => {
  if (value) {
    signUpButton.disabled = true;
    signUpButton.innerHTML = "<div class='loader'></div>";
  } else if (!value) {
    signUpButton.disabled = false;
    signUpButton.innerHTML = "Cadastrar";
  }
};

const removeStyle = () => {
  userEmail.classList.remove("animateError");
  userPassword.classList.remove("animateError");
};

const registerUser = () => {
  // isFetching(true);
  console.log("Executou");

  axios
    .post("http://localhost:3000/signUp", {
      email: userEmail.value,
      password: userPassword.value,
    })
    .then((response) => {
      console.log(response);
      //Requisiçaõ deu certo
      if (response.data.error) {
        //BACKEND RETORNOU UM
        alertError(response.data.error);
        userEmail.value = "";
        userPassword.value = "";
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
  // .finally(() => isFetching(false));
};

const alertError = (error) => {
  removeStyle();
  switch (error) {
    case "As senhas digitadas não batem!":
      passwordConfirm.value = "";
      passwordConfirm.classList.add("animateError");
      userPassword.value = "";
      userPassword.focus();
      userPassword.classList.add("animateError");
      break;
    case "Sua senha precisa ter mais de 4 digitos":
      userPassword.value = "";
      userPassword.focus();
      userPassword.classList.add("animateError");
    default:
      break;
  }
  alert(error);
};

const hasEmptyField = () => {
  const passwordField = userPassword.value && passwordConfirm.value;
  if (userEmail.value && passwordField) {
    return false;
  } else {
    return true;
  }
};

signUpButton.addEventListener("click", (event) => {
  event.preventDefault();

  //Validações antes de acionar a função de cadastro
  if (hasEmptyField()) {
    if (!userEmail.value) {
      userEmail.focus();
    } else if (!userPassword.value) {
      userPassword.focus();
    }
    alertError("Preencha todos os campos por favor!");
  } else if (userPassword.value.length < 5) {
    alertError("Sua senha precisa ter mais de 4 digitos");
  } else if (passwordConfirm.value !== userPassword.value) {
    alertError("As senhas digitadas não batem!");
  } else {
    registerUser();
  }
});
