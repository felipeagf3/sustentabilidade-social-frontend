document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/posts') // substitua pela URL da sua API
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById('feed-posts');
      container.innerHTML = ''; // limpa antes de inserir

      posts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('post');

        article.innerHTML = `
          <h3 class="post-title">${post.title}</h3>
          <div class="post-header">
            <img src="assets/avatar.png" alt="Avatar do Usuário" class="avatar">
            <span class="nome-usuario" data-slug="${post.slug}">${post.username}</span>
            <span class="data-post">${formatarData(post.dateTime)}</span>
          </div>
          <div class="post-content">
            <p>${post.content}</p>
          </div>
          <div class="post-actions">
            <button class="curtir-btn" data-id="${post.id}" data-liked="false">
              Curtir (${post.likes})
            </button>
            <button class="comentar-btn">Comentar</button>
            <button class="compartilhar-btn">Compartilhar</button>
          </div>
          <div class="post-comments">
            <!-- Comentários virão aqui futuramente -->
          </div>
        `;

        container.appendChild(article);
      });

      // Evento de clique no nome do usuário
      document.querySelectorAll('.nome-usuario').forEach(el => {
        el.addEventListener('click', e => {
          const slug = e.target.getAttribute('data-slug');
          console.log('Buscar perfil do usuário com slug:', slug);
          // Faça a requisição aqui para buscar o perfil com base no slug
          window.location.href = `/perfil.html?slug=${slug}`; // Exemplo de redirecionamento
        });
      });

      // Evento de clique nos botões Curtir/Descurtir
      document.querySelectorAll('.curtir-btn').forEach(button => {
        button.addEventListener('click', async (e) => {
          const btn = e.currentTarget;
          const postId = btn.getAttribute('data-id');
          const alreadyLiked = btn.getAttribute('data-liked') === 'true';

          try {
            let likes = parseInt(btn.innerText.match(/\d+/)[0]);

            if (!alreadyLiked) {
              // Curtir (POST)
              const res = await fetch(`http://localhost:3000/${postId}/post/like`, {
                method: 'POST',
                credentials: "include"
              });
              if (!res.ok) throw new Error('Erro ao curtir', await res.json().message);

              likes += 1;
              btn.innerText = `Descurtir (${likes})`;
              btn.setAttribute('data-liked', 'true');
            } else {
              // Remover curtida (DELETE)
              const res = await fetch(`http://localhost:3000/${postId}/post/removelike`, {
                method: 'PUT',
                credentials: "include"
              });
              if (!res.ok) throw new Error('Erro ao remover like');

              likes -= 1;
              btn.innerText = `Curtir (${likes})`;
              btn.setAttribute('data-liked', 'false');
            }
          } catch (err) {
            console.error('Erro ao processar like:', err);
          }
        });
      });

    })
    .catch(err => {
      console.error('Erro ao carregar posts:', err);
    });

  // Formata a data de forma legível
  function formatarData(dateString) {
    const data = new Date(dateString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
});
