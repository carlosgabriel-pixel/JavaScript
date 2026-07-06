// 1 - Definição do array de objetos para armazenar os livros no estoque
const estoque = [];

// 2 & 3 - Funções para gerenciar o estoque com validações condicionais

// Adiciona um novo livro ao estoque se ele ainda não existir
function adicionarLivro(titulo, autor, quantidade) {
    // Procura se o livro já existe usando um laço interno implícito (find)
    const livroExistente = estoque.find(livro => livro.titulo.toLowerCase() === titulo.toLowerCase());

    if (livroExistente) {
        console.log(`Erro: O livro "${titulo}" já está cadastrado no estoque.`);
    } else {
        estoque.push({ titulo, autor, quantidade });
        console.log(`Sucesso: Livro "${titulo}" adicionado com sucesso.`);
    }
}

// Remove um livro do estoque pelo título caso ele exista
function removerLivro(titulo) {
    const indice = estoque.findIndex(livro => livro.titulo.toLowerCase() === titulo.toLowerCase());

    if (indice !== -1) {
        const livroRemovido = estoque.splice(indice, 1);
        console.log(`Sucesso: O livro "${livroRemovido[0].titulo}" foi removido do estoque.`);
    } else {
        console.log(`Erro: O livro "${titulo}" não foi encontrado no estoque para remoção.`);
    }
}

// Atualiza a quantidade de um livro existente no estoque
function atualizarQuantidade(titulo, novaQuantidade) {
    const livro = estoque.find(livro => livro.titulo.toLowerCase() === titulo.toLowerCase());

    if (livro) {
        livro.quantidade = novaQuantidade;
        console.log(`Sucesso: A quantidade do livro "${livro.titulo}" foi atualizada para ${novaQuantidade}.`);
    } else {
        console.log(`Erro: Livro "${titulo}" não encontrado para atualizar a quantidade.`);
    }
}

// 4 - Lista todos os livros utilizando um laço de repetição explícito (for...of)
function listarLivros() {
    if (estoque.length === 0) {
        console.log("O estoque está completamente vazio.");
        return;
    }

    console.log("--- LIVROS DISPONÍVEIS NO ESTOQUE ---");
    for (const livro of estoque) {
        console.log(`Título: ${livro.titulo} | Autor: ${livro.autor} | Qtd: ${livro.quantidade}`);
    }
    console.log("--------------------------------------");
}