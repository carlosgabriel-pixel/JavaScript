// Array que armazena os objetos de Tarefa
const tarefas = [];

// Captura dos elementos do DOM pelos IDs do HTML
const inputElement = document.getElementById('novaTarefaInput');
const botaoElement = document.getElementById('adicionarBtn');
const listaElement = document.getElementById('listaTarefas');

// Função para desenhar as tarefas na tela
function renderizarTarefas() {
    listaElement.innerHTML = ''; // Limpa a lista existente

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');

        // Cria a checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.status;
        
        // Dispara a mudança de status ao clicar
        checkbox.addEventListener('change', () => {
            alternarStatus(index);
        });

        // Cria o texto da tarefa
        const span = document.createElement('span');
        span.textContent = tarefa.descricao;

        // Aplica o CSS de concluída se o status for true
        if (tarefa.status) {
            span.classList.add('concluida');
        }

        // Monta a estrutura e adiciona na lista (ul)
        li.appendChild(checkbox);
        li.appendChild(span);
        listaElement.appendChild(li);
    });
}

// Função para adicionar nova tarefa
function adicionarNovaTarefa() {
    const descricaoTexto = inputElement.value.trim();
    
    if (descricaoTexto === '') {
        alert('Por favor, informe uma descrição para a tarefa!');
        return;
    }

    // Adiciona o objeto no padrão solicitado no exercício
    tarefas.push({
        descricao: descricaoTexto,
        status: false
    });

    inputElement.value = ''; // Limpa o input
    renderizarTarefas();     // Atualiza o visual
}

// Inverte o booleano do status (true -> false / false -> true)
function alternarStatus(index) {
    tarefas[index].status = !tarefas[index].status;
    renderizarTarefas();
}

// Eventos de clique e teclado
botaoElement.addEventListener('click', adicionarNovaTarefa);
inputElement.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') adicionarNovaTarefa();
});