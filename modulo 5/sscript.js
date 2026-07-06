// 1 e 4. Função para calcular o tempo restante manipulando o objeto Date
function calcularTempoRestante(dataFutura) {
    const agora = new Date().getTime();
    const destino = new Date(dataFutura).getTime();
    const diferenca = destino - agora;

    // Se a data futura já passou, zera o temporizador
    if (diferenca <= 0) {
        return { dias: 0, horas: 0, minutos: 0, segundos: 0, encerrado: true };
    }

    // Cálculos matemáticos para converter milissegundos em unidades de tempo
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    return { dias, horas, minutos, segundos, encerrado: false };
}

// Definição da data futura de exemplo (Altere para a data que desejar)
const dataAlvo = "December 31, 2028 22:00:00";
let intervaloId;

// 2. Função para atualizar o temporizador na tela (ou console, como fallback)
function atualizarTemporizador() {
    const tempo = calcularTempoRestante(dataAlvo);

    // Formata os números com um zero à esquerda caso sejam menores que 10 (ex: 05 segundos)
    const d = String(tempo.dias).padStart(2, '0');
    const h = String(tempo.horas).padStart(2, '0');
    const m = String(tempo.minutos).padStart(2, '0');
    const s = String(tempo.segundos).padStart(2, '0');

    // Tenta atualizar os elementos no HTML se eles existirem
    const elementoContador = document.getElementById("contador");
    if (elementoContador) {
        elementoContador.innerText = `${d}d ${h}h ${m}m ${s}s`;
    } else {
        // Fallback para o console caso seja executado fora do navegador
        console.log(`Restam: ${d}d ${h}h ${m}m ${s}s`);
    }

    // Se a contagem regressiva chegar ao fim, interrompe o setInterval
    if (tempo.encerrado) {
        clearInterval(intervaloId);
        if (elementoContador) {
            elementoContador.innerText = "Tempo Esgotado!";
        }
        console.log("Contagem regressiva encerrada!");
    }
}

// 3. Uso do setInterval para rodar a função a cada 1 segundo (1000 milissegundos)
intervaloId = setInterval(atualizarTemporizador, 1000);

// Executa uma vez imediatamente para evitar o atraso inicial de 1 segundo do setInterval
atualizarTemporizador();