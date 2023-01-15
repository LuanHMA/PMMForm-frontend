const userText = document.getElementById("userText");
const url = "https://pmmform-backend.onrender.com";

function getUserData() {
  axios
    .get(url)
    .then((response) => {
      userText.innerHTML = `<b>Usuário logado:</b> ${response.data[0].email}`;
    })
    .catch((error) => {
      console.log(error);
    });
}
