// 1. Inicializa o array buscando dados salvos no localStorage (ou cria vazio se não houver nenhum)
const pessoasQueCurtiram = JSON.parse(localStorage.getItem('listaCurtidas')) || [];

// Capturando elementos do DOM
const nomeInput = document.getElementById('nomeInput');
const btnCurtir = document.getElementById('btnCurtir');
const btnLimpar = document.getElementById('btnLimpar');
const feedbackCurtidas = document.getElementById('feedback-curtidas');

// Renderiza a frase de curtidas baseado no estado do array
function atualizarTextoFeedback() {
    const total = pessoasQueCurtiram.length;

    if (total === 0) {
        feedbackCurtidas.textContent = "Ninguém curtiu";
    } else if (total === 1) {
        feedbackCurtidas.textContent = `${pessoasQueCurtiram[0]} curtiu`;
    } else if (total === 2) {
        feedbackCurtidas.textContent = `${pessoasQueCurtiram[0]} e ${pessoasQueCurtiram[1]} curtiram`;
    } else {
        const restante = total - 2;
        feedbackCurtidas.textContent = `${pessoasQueCurtiram[0]}, ${pessoasQueCurtiram[1]} e mais ${restante} pessoas curtiram`;
    }
}

// Salva e processa o clique em "Curtir"
function processarCurtida() {
    const nomeValido = nomeInput.value.trim();

    if (nomeValido === "") {
        alert("Por favor, digite um nome válido antes de curtir.");
        return;
    }

    // Validação para evitar duplicados
    const jaCurtiu = pessoasQueCurtiram.some(nome => nome.toLowerCase() === nomeValido.toLowerCase());

    if (jaCurtiu) {
        alert("Esta pessoa já curtiu o post!");
    } else {
        pessoasQueCurtiram.push(nomeValido);
        
        // Sincroniza o array com o localStorage transformando em string JSON
        localStorage.setItem('listaCurtidas', JSON.stringify(pessoasQueCurtiram));
        
        atualizarTextoFeedback();
    }

    nomeInput.value = "";
    nomeInput.focus();
}

// Nova função para resetar e limpar o histórico de curtidas local
function limparHistorico() {
    if (pessoasQueCurtiram.length === 0) return;

    if (confirm("Tem certeza que deseja apagar todas as curtidas do localStorage?")) {
        // Zera o tamanho do array original
        pessoasQueCurtiram.length = 0;
        
        // Remove a chave do banco local
        localStorage.removeItem('listaCurtidas');
        
        atualizarTextoFeedback();
    }
}

// Configuração dos eventos
btnCurtir.addEventListener('click', processarCurtida);
btnLimpar.addEventListener('click', limparHistorico);

nomeInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        processarCurtida();
    }
});

// Executa uma vez ao carregar o arquivo para reconstruir a frase com os dados que já estavam salvos
atualizarTextoFeedback();