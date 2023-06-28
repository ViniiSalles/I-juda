$(document).ready(function () {

  var userId = localStorage.getItem("userId");

  if (!userId) {

    $(".navigation").html(`
        <ul class="ajuste menu-column">
          <li class="nav-item">
            <a href="./login.html" class="nav-link">Entrar</a>
          </li>
          |
          <li class="nav-item">
            <a href="./cadastro.html" class="nav-link">Cadastrar</a>
          </li>
        </ul>
      `);
    return;
  }


  var db = JSON.parse(localStorage.getItem("db"));


  var user = db.users.find(function (u) {
    return u.id == userId;
  });


  if (user.job && user.xp) {

    $(".navigation").html(`
        <h2>Perfil</h2>

        <a href="./perfil.html"><img src="./img/user.jpg "width=50px alt="Perfil"></a>
      `);
  } else {

    $(".navigation").html(`
      <div class="bk-nav">
        
        <a href="./perfil.html"><img src="./img/user.jpg" alt="Perfil" width="50px;"></a></div>
      `);
  }
});

$("#passageFiltro").click(function () {
  var userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Conecte-se a sua conta")
  } else {
    window.location.href = "filtro.html";
  }

})