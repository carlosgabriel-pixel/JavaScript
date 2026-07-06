// Define a data-alvo para o fim do ano de 2028 conforme sugerido na interface do portal
const dataDestino = new Date("December 31, 2028 22:00:00").getTime();

function calcularTempoRestante(dataFutura) {
    const agora = new Date().getTime();
    const diferenca = dataFutura - agora;

    // Se o tempo já expirou, zera as variáveis
    if (diferenca <= 0) {
        return { dias: 0, horas: 0, minutos: 0, segundos: 0, expirado: true };
    }

    // Conversões matemáticas de milissegundos para unidades de tempo comuns
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    return { dias, horas, minutes: minutos, segundos, expirado: false };
}

function atualizarTemporizador() {
    const tempo = calcularTempoRestante(dataDestino);
    const display = document.getElementById('timer');

    if (tempo.expirado) {
        display.textContent = "Tempo esgotado!";
        clearInterval(intervaloId);
        return;
    }

    // Formata a string de exibição na tela conforme exigido no passo 2
    display.textContent = `${tempo.dias}d ${tempo.horas}h ${tempo.minutes}m ${tempo.segundos}s`;
}

// Configura o batimento repetitivo a cada 1 segundo (1000 milissegundos)
const intervaloId = setInterval(atualizarTemporizador, 1000);

// Execução imediata para evitar lag visual de 1 segundo ao carregar a página
atualizarTemporizador();