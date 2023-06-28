function loginUser(form) {
  event.preventDefault(); 


  let email = $("#email").val();
  let password = $("#password").val();


  if (!email || !password) {
    alert("Por favor, preencha todos os campos");
    return;
  }

  let db = JSON.parse(localStorage.getItem("db")) || {
    nextId: 1,
    users: [],
  };
  let user = db.users.find((user) => user.email === email && user.senha === password);

  if (user) {
    localStorage.setItem("userId", user.id);
    alert("Login bem-sucedido");
    window.location = "index.html";

  } else {
    alert("Usuário ou senha incorretos");
  }
}