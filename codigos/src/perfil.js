$(document).ready(function () {
  var userId = localStorage.getItem("userId");

  var db = JSON.parse(localStorage.getItem("db"));
  var db_trabalhadores = JSON.parse(localStorage.getItem("db_trabalhadores"));

  var user = db.users.find(function (u) {
    return u.id == userId;
  });

  if (user.job && user.xp) {
    $(".conteudo-perfil").html(`
      <h2>Perfil de trabalhador</h2>
      <p class=inputPadrao >Nome: ${user.nome}</p>
      <p class=inputPadrao >Email: ${user.email}</p>
      <p class=inputPadrao >Telefone: ${user.cel}</p>
      <p class=inputPadrao >Endereço: ${user.adress}</p>
      <p class=inputPadrao >Bairro: ${user.bairro}</p>
      <p class=inputPadrao >CEP: ${user.cep}</p>
      <p class=inputPadrao >Profissão: ${user.job}</p>
      <p class=inputPadrao >Experiência: ${user.xp}</p>
    `);
  } else {
    $(".conteudo-perfil").html(`
      <h2>Perfil</h2>
      <p class=inputPadrao >Nome: ${user.nome}</p>
      <p class=inputPadrao >Email: ${user.email}</p>
      <p class=inputPadrao >Telefone: ${user.cel}</p>
      <p class=inputPadrao >Endereço: ${user.adress}</p>
      <p class=inputPadrao >Bairro: ${user.bairro}</p>
      <p class=inputPadrao >CEP: ${user.cep}</p>
    `);
  }

  function atualizarDadosTrabalhador() {
    var trabalhador = db_trabalhadores.find(function (t) {
      return t.id == userId;
    });

    if (trabalhador) {
      trabalhador.nome = user.nome;
      trabalhador.email = user.email;
      trabalhador.cel = user.cel;
      trabalhador.adress = user.adress;
      trabalhador.bairro = user.bairro;
      trabalhador.cep = user.cep;
      trabalhador.job = user.job;
      trabalhador.xp = user.xp;

      localStorage.setItem("db_trabalhadores", JSON.stringify(db_trabalhadores));
    }
  }

  function exibirPerfil() {
    if (user.job && user.xp) {
      $(".conteudo-perfil").html(`
        <h2>Perfil de trabalhador</h2>
        <p class=inputPadrao >Nome: ${user.nome}</p>
        <p class=inputPadrao >Email: ${user.email}</p>
        <p class=inputPadrao >Telefone: ${user.cel}</p>
        <p class=inputPadrao >Endereço: ${user.adress}</p>
        <p class=inputPadrao >Bairro: ${user.bairro}</p>
        <p class=inputPadrao >CEP: ${user.cep}</p>
        <p class=inputPadrao >Profissão: ${user.job}</p>
        <p class=inputPadrao >Experiência: ${user.xp}</p>
        <button id="buttonEdit" type="button" class="btn btn-warning">Editar conta</button><br>
      `);
    } else {
      $(".conteudo-perfil").html(`
        <a href="./perfil.html"><img src="./img/user.jpg" alt="Perfil" width="90px;"></a></div><br>
        <br><h2 style>Perfil de usuário</h2>
        <p class=inputPadrao >Nome: ${user.nome}</p>
        <p class=inputPadrao >Email: ${user.email}</p>
        <p class=inputPadrao >Telefone: ${user.cel}</p>
        <p class=inputPadrao >Endereço: ${user.adress}</p>
        <p class=inputPadrao >Bairro: ${user.bairro}</p>
        <p class=inputPadrao >CEP: ${user.cep}</p>
        <button id="buttonEdit" type="button" class="btn btn-warning">Editar conta</button><br>
      `);
    }

    $("#buttonEdit").click(function () {
      habilitarEdicao();
    });
  }


  function habilitarEdicao() {

    $(".conteudo-perfil").html(`
      <h2>Perfil</h2>
      <label><p>Nome: </p></label><br>
      <input class=inputPadrao type="text" id="inputNome" value="${user.nome}"><br>
      <label><p>Email: </p></label><br>
      <input class=inputPadrao type="text" id="inputEmail" value="${user.email}"><br>
      <label><p>Telefone: </p></label><br>
      <input class=inputPadrao type="text" id="inputTelefone" value="${user.cel}"><br>
      <label><p>Endereço: </p></label><br>
      <input class=inputPadrao type="text" id="inputEndereco" value="${user.adress}"><br>
      <label><p>Bairro: </p></label><br>
      <input class=inputPadrao type="text" id="inputBairro" value="${user.bairro}"><br>
      <label><p>CEP: </p></label><br>
      <input class=inputPadrao type="text" id="inputCEP" value="${user.cep}"><br>
      <label><p>Profissão: </p></label><br>
      ${user.job && user.xp ? `<input type="text" id="inputProfissao" value="${user.job}">` : ''}<br>
      <label><p>Tempo de trabalho: </p></label><br>
      ${user.job && user.xp ? `<input type="text" id="inputExperiencia" value="${user.xp}">` : ''}<br>
      <br>
      <button id="btnSalvar" class="btn btn-success">Salvar</button>
      <button id="btnCancelar" class="btn btn-primary">Cancelar</button>
    `);

  
    $("#btnSalvar").click(function () {
  
      var nome = $("#inputNome").val();
      var email = $("#inputEmail").val();
      var telefone = $("#inputTelefone").val();
      var endereco = $("#inputEndereco").val();
      var bairro = $("#inputBairro").val();
      var cep = $("#inputCEP").val();
      var profissao = $("#inputProfissao").val();
      var experiencia = $("#inputExperiencia").val();

  
      user.nome = nome;
      user.email = email;
      user.cel = telefone;
      user.adress = endereco;
      user.bairro = bairro;
      user.cep = cep;
      user.job = profissao;
      user.xp = experiencia;

  
      localStorage.setItem("db", JSON.stringify(db));

      
      if (user.job && user.xp) {
      
        atualizarDadosTrabalhador();
      }

  
      exibirPerfil();
    });

  
    $("#btnCancelar").click(function () {
  
      exibirPerfil();
    });
  }

  
  function excluirUsuario() {
  
    var userIndex = db.users.findIndex(function (u) {
      return u.id == userId;
    });
    if (userIndex > -1) {
      db.users.splice(userIndex, 1);
      localStorage.setItem("db", JSON.stringify(db));
    }

  
    if (user.job && user.xp) {
  
      var trabalhadorIndex = db_trabalhadores.findIndex(function (t) {
        return t.id == userId;
      });
      if (trabalhadorIndex > -1) {
        db_trabalhadores.splice(trabalhadorIndex, 1);
        localStorage.setItem("db_trabalhadores", JSON.stringify(db_trabalhadores));
      }
    }

  
    localStorage.removeItem("userId");

  
    alert("Usuário excluído com sucesso.");
    window.location.href = "index.html";
  }

  
  $("#btnExcluir").click(function () { 
    var confirmarExclusao = confirm("Deseja realmente excluir o usuário?");
    if (confirmarExclusao) {
      excluirUsuario();
    }
  });

  $("#btnSair").click(function () {
    localStorage.removeItem("userId");

    window.location.href = "index.html";
  });

  exibirPerfil();
});