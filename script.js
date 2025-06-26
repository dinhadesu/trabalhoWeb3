// Dados dos bicicletários (array de objetos)
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
        bicicletas: 4,
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
        bicicletas: 9,
        coberto: false,
        iluminacao: false,
        vigilancia: false
    }
];

// Função para atualizar o status com base na ocupação
function atualizarStatus(bicicletas, capacidade) {
    if (bicicletas >= capacidade) {
        return "lotado";
    } else if (bicicletas >= capacidade / 2) {
        return "quase-cheio";
    } else {
        return "disponivel";
    }
}

// Função para renderizar os bicicletários na tela
function renderizarBicicletarios() {
    var container = document.querySelector('.bicicletarios');
    container.innerHTML = ''; // Limpa o container

    bicicletarios.forEach(function(bicicletario) {
        var status = atualizarStatus(bicicletario.bicicletas, bicicletario.capacidade);
        
        var cartao = document.createElement('article');
        cartao.className = 'cartao ' + status;
        cartao.setAttribute('data-id', bicicletario.id);
        
        var porcentagem = (bicicletario.bicicletas / bicicletario.capacidade) * 100;
        
        cartao.innerHTML = `
            <div class="cabecalho-cartao">
                <h3>${bicicletario.nome}</h3>
                <span class="status">${status.replace('-', ' ')}</span>
            </div>
            <div class="corpo-cartao">
                <p class="localizacao">📍 ${bicicletario.localizacao}</p>
                <p class="vagas">🚲 ${bicicletario.bicicletas} de ${bicicletario.capacidade} vagas livres</p>
                <div class="barra-capacidade">
                    <div class="preenchimento" style="width: ${porcentagem}%"></div>
                </div>
                <p class="info">ℹ️ ${bicicletario.coberto ? 'Coberto' : 'Ao ar livre'} • ${bicicletario.iluminacao ? 'Com iluminação' : 'Sem iluminação'}</p>
                <div class="botoes">
                    <button class="btn-adicionar" onclick="adicionarBicicleta(${bicicletario.id})">+ Bicicleta</button>
                    <button class="btn-remover" onclick="removerBicicleta(${bicicletario.id})">- Bicicleta</button>
                </div>
            </div>
        `;
        
        container.appendChild(cartao);
    });
}

// Função para adicionar uma bicicleta
function adicionarBicicleta(id) {
    var bicicletario = bicicletarios.find(function(b) {
        return b.id === id;
    });
    
    if (bicicletario && bicicletario.bicicletas < bicicletario.capacidade) {
        bicicletario.bicicletas++;
        renderizarBicicletarios();
    } else {
        alert("Este bicicletário já está lotado!");
    }
}

// Função para remover uma bicicleta
function removerBicicleta(id) {
    var bicicletario = bicicletarios.find(function(b) {
        return b.id === id;
    });
    
    if (bicicletario && bicicletario.bicicletas > 0) {
        bicicletario.bicicletas--;
        renderizarBicicletarios();
    } else {
        alert("Não há bicicletas para remover!");
    }
}

// Função para mostrar detalhes ao clicar no cartão
function configurarCliqueCartoes() {
    document.querySelectorAll('.cartao').forEach(function(cartao) {
        cartao.addEventListener('click', function() {
            var id = parseInt(this.getAttribute('data-id'));
            var bicicletario = bicicletarios.find(function(b) {
                return b.id === id;
            });
            
            if (bicicletario) {
                var mensagem = `Detalhes do bicicletário:\n\n` +
                                `Nome: ${bicicletario.nome}\n` +
                                `Local: ${bicicletario.localizacao}\n` +
                                `Vagas: ${bicicletario.bicicletas}/${bicicletario.capacidade}\n` +
                                `Coberto: ${bicicletario.coberto ? 'Sim' : 'Não'}\n` +
                                `Iluminação: ${bicicletario.iluminacao ? 'Sim' : 'Não'}\n` +
                                `Vigilância: ${bicicletario.vigilancia ? 'Sim' : 'Não'}`;
                
                alert(mensagem);
            }
        });
    });
}

// Inicializa a aplicação quando a página carrega
window.onload = function() {
    renderizarBicicletarios();
    configurarCliqueCartoes();
    
    // Atualiza a data/hora
    var agora = new Date();
    document.getElementById('update-time').textContent = 
        agora.toLocaleDateString() + ' ' + agora.toLocaleTimeString();
};