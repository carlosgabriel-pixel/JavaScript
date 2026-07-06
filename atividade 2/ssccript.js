// Array para guardar os nomes (estado da aplicação)
const pessoasQueCurtiram = [];

// Capturando elementos do DOM
const nomeInput = document.getElementById('nomeInput');
const btnCurtir = document.getElementById('btnCurtir');
const feedbackCurtidas = document.getElementById('feedback-curtidas');

// Gerencia o texto do parágrafo baseado no tamanho do array
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

// Executa as regras de validação ao clicar em Curtir
function processarCurtida() {
    const nomeValido = nomeInput.value.trim();

    if (nomeValido === "") {
        alert("Por favor, digite um nome válido antes de curtir.");
        return;
    }

    // Validação para evitar nomes duplicados na lista
    const jaCurtiu = pessoasQueCurtiram.some(nome => nome.toLowerCase() === nomeValido.toLowerCase());

    if (jaCurtiu) {
        alert("Esta pessoa já curtiu o post!");
    } else {
        pessoasQueCurtiram.push(nomeValido);
        atualizarTextoFeedback();
    }

    // Reseta o campo de texto
    nomeInput.value = "";
    nomeInput.focus();
}

// Ouvintes de eventos (Listeners)
btnCurtir.addEventListener('click', processarCurtida);

nomeInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        processarCurtida();
    }
});