// Dados das bikee
var bicicletarios = [
    {
        id: 1,
        nome: "Entrada Principal",
        localizacao: "Bloco Administrativo",
        capacidade: 15,
        bicicletas: 8,
        coberto: true,
        iluminacao: true,
        vigilancia: false
    },
    {
        id: 2,
        nome: "Bloco A",
        localizacao: "Próximo à cantina",
        capacidade: 16,
        bicicletas: 12,
        coberto: false,
        iluminacao: true,
        vigilancia: true
    },
    {
        id: 3,
        nome: "Biblioteca",
        localizacao: "Lado esquerdo",
        capacidade: 10,
        bicicletas: 10,
        coberto: true,
        iluminacao: true,
        vigilancia: false
    },
    {
        id: 4,
        nome: "Bloco B",
        localizacao: "Pátio dos laboratórios",
        capacidade: 12,
        bicicletas: 5,
        coberto: false,
        iluminacao: false,
        vigilancia: false
    }
];

// Função para verificar o status visual das bikee
function getStatus(bicicletas, capacidade) {
    if (bicicletas >= capacidade) {
        return "lotado";
    } else if (bicicletas >= capacidade / 2) {
        return "quase-cheio";
    } else {
        return "disponivel";
    }
}

// Função para renderizar os "cartões"
function renderizarBicicletarios() {
    var container = document.querySelector(".bicicletarios");
    container.innerHTML = "";

    for (var i = 0; i < bicicletarios.length; i++) {
        var b = bicicletarios[i];
        
        var status = getStatus(b.bicicletas, b.capacidade);

        var porcentagem = (b.bicicletas / b.capacidade) * 100;

        var cartao = document.createElement("article");
        cartao.className = "cartao " + status;
        
        cartao.setAttribute("data-id", b.id);

        cartao.innerHTML =
            '<div class="cabecalho-cartao">' +
                '<h3>' + b.nome + '</h3>' +
                '<span class="status">' + status.replace("-", " ") + '</span>' +
            '</div>' +
            '<div class="corpo-cartao">' +
                '<p class="localizacao">📍 ' + b.localizacao + '</p>' +
                '<p class="vagas">🚲 ' + b.bicicletas + ' de ' + b.capacidade + ' vagas ocupadas</p>' +
                '<div class="barra-capacidade">' +
                    '<div class="preenchimento" style="width: ' + porcentagem + '%"></div>' +
                '</div>' +
                '<div class="info">ℹ️ ' + (b.coberto ? "Coberto" : "Ao ar livre") +
                    ' • ' + (b.iluminacao ? "Com iluminação" : "Sem iluminação") +
                    (b.vigilancia ? " • Com vigilância" : " • Sem vigilância") +
                '</div>' +
                '<div class="botoes">' +
                    '<button class="btn-adicionar" onclick="adicionarBicicleta(' + b.id + ')">+ Bicicleta</button>' +
                    '<button class="btn-remover" onclick="removerBicicleta(' + b.id + ')">- Bicicleta</button>' +
                '</div>' +
            '</div>';

        cartao.addEventListener("click", function() {
            var id = parseInt(this.getAttribute("data-id"));
            mostrarDetalhes(id);
        });

        container.appendChild(cartao);
    }
}

// Mostrar as coisa la no alert
function mostrarDetalhes(id) {
    var b = null;

    if (id === 1) b = bicicletarios[0];
    if (id === 2) b = bicicletarios[1];
    if (id === 3) b = bicicletarios[2];
    if (id === 4) b = bicicletarios[3];

    if (b) {
        alert("Detalhes:\n" +
              "Nome: " + b.nome + "\n" +
              "Local: " + b.localizacao + "\n" +
              "Vagas: " + b.bicicletas + "/" + b.capacidade);
    }
}

// coloca as bike
function adicionarBicicleta(id) {
    for (var i = 0; i < bicicletarios.length; i++) {
        if (bicicletarios[i].id === id) {
            if (bicicletarios[i].bicicletas < bicicletarios[i].capacidade) {
                bicicletarios[i].bicicletas++;
                renderizarBicicletarios();
            } else {
                alert("❌ Este bicicletário já está lotado.");
            }
        }
    }
}

// Remove as bikee
function removerBicicleta(id) {
    for (var i = 0; i < bicicletarios.length; i++) {
        if (bicicletarios[i].id === id) {
            if (bicicletarios[i].bicicletas > 0) {
                bicicletarios[i].bicicletas--;
                renderizarBicicletarios();
            } else {
                alert("❌ Não há bicicletas para remover.");
            }
        }
    }
}

// Inicializa
window.onload = function() {
    renderizarBicicletarios();
};
