const userText = document.getElementById("userText");

function getUserData() {
  axios
    .get("http://localhost:3000/")
    .then((response) => {
      userText.innerHTML = `<b>Usuário logado:</b> ${response.data[0].email}`;
    })
    .catch((error) => {
      console.log(error);
    });
}
