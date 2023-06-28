let objDados = {};

function leDados() {
  let strDados = localStorage.getItem('db_trabalhadores');

  if (strDados) {
    objDados = JSON.parse(strDados);
  } else {
    objDados = {
      trabalhadores: [
        {
          "id": 1,
          "nome": "Cleiton Silva Santos",
          "email": "CleitonsilvaS@email.com.br",
          "cel": "(31) 99169-9122",
          "endereço": "Rua maria aparecida 999",
          "bairro": "Lagoa Santa",
          "cep": "31920470",
          "job": "Pedreiro",
          "xp": "5"
        },

        {
          "id": 2,
          "nome": "Diogo Oliveira",
          "email": "diogo@example.com",
          "cel": "(31) 99169-9122",
          "endereço": "Rua maria aparecida 999",
          "bairro": "Belo Horizonte",
          "cep": "31920471",
          "job": "Marceneiro",
          "xp": "1"
        },

        {
          "id": 3,
          "nome": "Joao Matos",
          "email": "joao@example.com",
          "cel": "(31) 99169-9122",
          "endereço": "Rua maria aparecida 999",
          "bairro": "Belo Horizonte",
          "cep": "31920472",
          "job": "Encanador",
          "xp": "4"
        },

        {
          "id": 4,
          "nome": "Cris santos",
          "email": "cris@example.com",
          "cel": "(31) 99169-9122",
          "endereço": "Rua maria aparecida 999",
          "bairro": "Vespasiano",
          "cep": "31920473",
          "job": "Marceneiro",
          "xp": "3"
        },

        {
          "id": 5,
          "nome": "Karla ",
          "email": "karla@example.com",
          "cel": "(31) 99169-9122",
          "endereço": "Rua maria aparecida 999",
          "bairro": "Vespasiano",
          "cep": "31920474",
          "job": "Pedreiro",
          "xp": "2"
        },

        {
          "id": 6,
          "nome": "Matheus",
          "email": "matheus@example.com",
          "cel": "(31) 99169-9122",
          "endereço": "Rua maria aparecida 999",
          "bairro": "Vespasiano",
          "cep": "31920475",
          "job": "Marceneiro",
          "xp": "3"
        }
      ]
    };
  }

  return objDados;
}

leDados();

let trabalhadores = objDados.trabalhadores;

let categoria = document.getElementsByClassName("categoria");
let regiao = document.getElementsByClassName("regiao");
let ordenar = document.getElementsByClassName("ordenar");
let submit = document.getElementById("submit");
let clean = document.getElementById("clean");

function removeTrabalhador(trabalhadorId) {
  if (trabalhadorId > -1) {
    trabalhadores.splice(trabalhadorId, 1);
  }
}

function filtroCategoria(valor) {
  let count = 0;

  for (let i = 0; i <= count; i++) {
    for (let x in trabalhadores) {
      if (trabalhadores[x].job !== valor) {
        count += 1;
        removeTrabalhador(x);
      }
    }
  }
}

function filtroRegiao(valor) {
  let count = 0;

  for (let i = 0; i <= count; i++) {
    for (let x in trabalhadores) {
      if (trabalhadores[x].bairro !== valor) {
        count += 1;
        removeTrabalhador(x);
      }
    }
  }
}

function comparaValor(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparacao = 0;

    if (varA > varB) {
      comparacao = 1;
    } else if (varA < varB) {
      comparacao = -1;
    }

    return (
      (order === 'desc') ? (comparacao * -1) : comparacao
    );
  };
}

submit.addEventListener("click", () => {
  if (categoria[1].selected) {
    filtroCategoria("Pedreiro");
  } else if (categoria[2].selected) {
    filtroCategoria("Encanador");
  } else if (categoria[3].selected) {
    filtroCategoria("Marceneiro");
  }

  if (regiao[1].selected) {
    filtroRegiao("Belo Horizonte");
  } else if (regiao[2].selected) {
    filtroRegiao("Lagoa Santa");
  } else if (regiao[3].selected) {
    filtroRegiao("Vespasiano");
  }

  if (ordenar[1].selected) {
    trabalhadores.sort(comparaValor("xp", "desc"));
  } else if (ordenar[2].selected) {
    trabalhadores.sort(comparaValor("xp"));
  }

  imprimeDados();
});

clean.addEventListener("click", () => {
  objDados = leDados();
  trabalhadores = objDados.trabalhadores;
  imprimeDados();
});

function imprimeDados() {
  let imprim_client = document.getElementById("imprim_client");
  let strHtml = '';

  for (let i = 0; i < objDados.trabalhadores.length; i++) {
    const trabalhador = objDados.trabalhadores[i];
    const modalId = `perfilExibition-${trabalhador.id}`; // ID único para cada modal

    strHtml += `
      <div class="card" data-bs-toggle="modal" data-bs-target="#${modalId}">
        <li> 
          <div class="d-flex">
            <div class="v1">
              <img class="trabalhos" src="./img/pictures/${trabalhador.cep}.png">
              <p>${trabalhador.nome}</p>
            </div>
            <div class="v2">
              <p><strong>${trabalhador.job}</strong></p>
              <p>${trabalhador.email}</p>
            </div>
            <div class="v3">
              <p>${trabalhador.xp} anos</p>
              <p>${trabalhador.bairro}</p>
            </div>
          </div>
        </li>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
            <img src="./img/user.jpg" class="img-user">
              <h5 class="modal-title" id="${modalId}Label">${trabalhador.nome}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><strong>Email:</strong> ${trabalhador.email}</p>
              <p><strong>Celular:</strong> ${trabalhador.cel}</p>
              <p><strong>Bairro:</strong> ${trabalhador.bairro}</p>
              <p><strong>CEP:</strong> ${trabalhador.cep}</p>
              <p><strong>Experiência:</strong> ${trabalhador.xp} anos</p>
              <button class="btn btn-success" data-bs-dismiss="modal">contratar</button> 
            </div>
          </div>
        </div>
      </div>
    `;
  }

  imprim_client.innerHTML = strHtml;
}

imprimeDados();


let searchBar = document.querySelector('.form-control');

searchBar.addEventListener('input', function () {
  let input = this.value.toLowerCase();
  let filteredTrabalhadores = trabalhadores.filter(function (trabalhador) {
    return (
      trabalhador.nome.toLowerCase().includes(input) ||
      trabalhador.job.toLowerCase().includes(input) ||
      trabalhador.bairro.toLowerCase().includes(input)
    );
  });

  objDados.trabalhadores = filteredTrabalhadores;
  imprimeDados();
});
