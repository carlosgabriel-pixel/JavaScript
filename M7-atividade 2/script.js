// Seleção dos elementos da interface via DOM
const usernameInput = document.getElementById('usernameInput');
const searchBtn = document.getElementById('searchBtn');
const resultContainer = document.getElementById('resultContainer');

// Função assíncrona que faz o fetch na API do GitHub
async function buscarUsuario() {
    const username = usernameInput.value.trim();

    if (username === '') {
        alert('Por favor, digite um nome de usuário!');
        return;
    }

    // Limpa a tela mostrando um estado de carregando
    resultContainer.innerHTML = '<p style="text-align:center; color:#57606a;">Buscando...</p>';

    try {
        // Faz a requisição HTTP GET para o endpoint público do GitHub
        const resposta = await fetch(`https://api.github.com/users/${username}`);

        // Caso o status seja 404 (Not Found), cai na regra do enunciado
        if (resposta.status === 404) {
            resultContainer.innerHTML = `<p class="error-msg">Não foram encontrados usuários para esta pesquisa.</p>`;
            return;
        }

        if (!resposta.ok) {
            throw new Error('Erro na requisição');
        }

        const dadosUsuario = await resposta.json();

        // Monta uma lista estruturada com os dados retornados pela API
        resultContainer.innerHTML = `
            <ul class="user-card">
                <img src="${dadosUsuario.avatar_url}" alt="Avatar" class="avatar">
                <li><strong>Nome:</strong> ${dadosUsuario.name || 'Não informado'}</li>
                <li><strong>Username:</strong> ${dadosUsuario.login}</li>
                <li><strong>Bio:</strong> ${dadosUsuario.bio || 'Sem bio disponível'}</li>
                <li><strong>Repositórios públicos:</strong> ${dadosUsuario.public_repos}</li>
                <li><strong>Seguidores:</strong> ${dadosUsuario.followers}</li>
            </ul>
        `;

    } catch (error) {
        // Fallback genérico para problemas de conexão/rede
        resultContainer.innerHTML = `<p class="error-msg">Ocorreu um erro ao conectar com a API. Tente novamente.</p>`;
        console.error(error);
    }
}

// Vincula o gatilho de busca ao evento de clique no botão
searchBtn.addEventListener('click', buscarUsuario);

// Permite disparar a pesquisa também pressionando o "Enter" no teclado
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarUsuario();
    }
});
