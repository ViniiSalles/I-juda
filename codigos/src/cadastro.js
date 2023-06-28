let db = JSON.parse(localStorage.getItem("db")) || {
  nextId: 1,
  users: [],
};

let db_trabalhadores = JSON.parse(localStorage.getItem("db_trabalhadores")) || {
  nextId: 1,
  trabalhadores: [],
};

if (!db) {
  location.assign("./index.html");
}

$("#button").click(() => {
  let nome = $("#nome").val();
  let email = $("#email").val();
  let senha = $("#senha").val();
  let cel = $("#cel").val();
  let adress = $("#adress").val();
  let bairro = $("#bairro").val();
  let cep = $("#cep").val();
  let chkTrabalho = $(".check");
  let job;
  let xp;

  if (chkTrabalho.is(":checked")) {
    job = $(".trabalho #job").val();
    xp = $(".trabalho #xp").val();
    $(".trabalho").css("display", "block");
    const newUser = {
      id: db.nextId,
      nome: nome,
      email: email,
      senha: senha,
      cel: cel,
      adress: adress,
      bairro: bairro,
      cep: cep,
      job: job,
      xp: xp,
    };
    db.nextId = 1 + db.nextId;
    db.users.push(newUser);
    db = JSON.stringify(db);
    localStorage.removeItem("db");
    localStorage.setItem("db", db);

    const newUserTrabalhador = {
      id: db_trabalhadores.nextId,
      nome: nome,
      email: email,
      senha: senha,
      cel: cel,
      adress: adress,
      bairro: bairro,
      cep: cep,
      job: job,
      xp: xp,
    };
    db_trabalhadores.nextId = 1 + db_trabalhadores.nextId;
    db_trabalhadores.trabalhadores.push(newUserTrabalhador);
    db_trabalhadores = JSON.stringify(db_trabalhadores);
    localStorage.removeItem("db_trabalhadores");
    localStorage.setItem("db_trabalhadores", db_trabalhadores);

    localStorage.setItem("userId", newUser.id);
    window.location = "login.html";
  } else {
    const newUser = {
      id: db.nextId,
      nome: nome,
      email: email,
      senha: senha,
      cel: cel,
      adress: adress,
      bairro: bairro,
      cep: cep,
    };
    db.nextId = 1 + db.nextId;
    db.users.push(newUser);
    db = JSON.stringify(db);
    localStorage.removeItem("db");
    localStorage.setItem("db", db);
    localStorage.setItem("userId", newUser.id);
    window.location = "login.html";
  }
});

function displaytrabalho() {
  if (document.querySelector(".check").checked === true) {
    document.querySelector(".trabalho").style.display = "block";
    
  } else {
    document.querySelector(".trabalho").style.display = "none";
    
  }
}