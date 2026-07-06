// Recupera o estado salvo no disco local ou monta a lista limpa
const arrayTarefas = JSON.parse(localStorage.getItem('bancoTarefas')) || [];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Centraliza a gravação no LocalStorage para evitar repetição de código
function sincronizarStorage() {
    localStorage.setItem('bancoTarefas', JSON.stringify(arrayTarefas));
}

// Cria os elementos do DOM injetando as classes e listeners dinamicamente
function renderizarVisual() {
    taskList.innerHTML = '';

    arrayTarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        
        // Container esquerdo (Checkbox + Texto)
        const contentDiv = document.createElement('div');
        contentDiv.className = 'task-content';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.status;
        checkbox.addEventListener('change', () => alternarStatus(index));

        const span = document.createElement('span');
        span.textContent = tarefa.descricao;
        if (tarefa.status) {
            span.className = 'concluida';
        }

        contentDiv.appendChild(checkbox);
        contentDiv.appendChild(span);

        // Botão de Exclusão Individual exigido no Módulo 1.2
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => removerTarefa(index));

        // Montagem final do item de lista
        li.appendChild(contentDiv);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function cadastrarTarefa() {
    const textoDigitado = taskInput.value.trim();

    if (textoDigitado === '') {
        alert('Insira uma descrição válida para a tarefa.');
        return;
    }

    arrayTarefas.push({
        descricao: textoDigitado,
        status: false
    });

    taskInput.value = '';
    sincronizarStorage();
    renderizarVisual();
}

function alternarStatus(index) {
    arrayTarefas[index].status = !arrayTarefas[index].status;
    sincronizarStorage();
    renderizarVisual();
}

// Remove o item usando o índice, salvando o novo estado no LocalStorage
function removerTarefa(index) {
    arrayTarefas.splice(index, 1);
    sincronizarStorage();
    renderizarVisual();
}

addTaskBtn.addEventListener('click', cadastrarTarefa);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') cadastrarTarefa();
});

// Inicialização imediata ao carregar a página
renderizarVisual();