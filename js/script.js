document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões 'Comentar' (usamos a classe 'toggle-comment-area')
    const commentButtons = document.querySelectorAll('.toggle-comment-area');

    commentButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Encontra o 'post' pai do botão clicado
            const post = button.closest('.post');

            // Tenta encontrar a área de comentário existente para este post
            let commentArea = post.querySelector('.add-comment-area');

            // Se a área de comentário ainda não existe, cria ela
            if (!commentArea) {
                commentArea = document.createElement('div');
                commentArea.classList.add('add-comment-area');
                commentArea.innerHTML = `
                    <input type="text" placeholder="Escreva um comentário..." class="comment-input">
                    <button class="send-comment-btn">Comentar</button>
                `;
                // Insere a nova área de comentário depois dos comentários existentes
                post.querySelector('.post-comments').after(commentArea);
            }

            // Alterna a classe 'active' para mostrar/esconder a área de comentário
            commentArea.classList.toggle('active');

            // Opcional: Se a área de comentário foi aberta, foca no input
            if (commentArea.classList.contains('active')) {
                commentArea.querySelector('.comment-input').focus();
            }
        });
    });
});
