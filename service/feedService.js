
document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/posts', {
    method: "GET",
    credentials: "include"
  }) 
    .then(res => res.json())
    .then(posts => {
      const container = document.getElementById('feed-posts');
      container.innerHTML = ''; // limpa antes de inserir

      posts.forEach(post => {
        const article = document.createElement('article');
        article.classList.add('post');
        const button = null;

        console.log(post);

        let likedText = 'Curtir';
        let likedStatus = 'false';
        let likedStyle = ''; // opcional, para mudar cor

        if (post.liked === 'like') {
          likedText = 'Descurtir';
          likedStatus = 'true';
          likedStyle = 'style="color: gray;"';
        } else {
          likedText = 'Curtir';
          likedStatus = 'false';
        }
//inicio da verificação da foto de perfil
        let urlImageProfile = "/assets/icons/user-avatar-default.png"; // <-- MUDE ESTE CAMINHO

        if (post.picture_profile_url !== null && post.picture_profile_url !== undefined && post.picture_profile_url !== '') {
          urlImageProfile = post.picture_profile_url;
        }

        console.log(post.picture_profile_url)
//fim da verificação da foto de perfil
        article.innerHTML = `
          <h3 class="post-title">${post.title}</h3>
          <div class="post-header">
            <img src="${post.picture_profile_url}" alt="Avatar do Usuário" class="avatar">
            <span class="nome-usuario" data-slug="${post.slug}">${post.username}</span>
            <span class="data-post">${formatarData(post.dateTime)}</span>
          </div>
          <div class="post-content">
            <p>${post.content}</p>
          </div>
          <div class="post-actions">
            <button class="curtir-btn" data-id="${post.id}" data-liked="${likedStatus}" ${likedStyle}>
              ${likedText} (${post.likes})
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

      document.querySelectorAll('.curtir-btn').forEach(button => {
      button.addEventListener('click', async (e) => {
        const btn = e.currentTarget;
        const postId = btn.getAttribute('data-id');
        const alreadyLiked = btn.dataset.liked === 'true';

        try {
          let likes = parseInt(btn.innerText.match(/\d+/)[0]);

          if (!alreadyLiked) {
            // CURTIR
            const res = await fetch(`http://localhost:3000/${postId}/post/like`, {
              method: 'POST',
              credentials: "include"
            });

            if (!res.ok) throw new Error(await res.text());

            likes += 1;
            btn.innerText = `Descurtir (${likes})`;
            btn.setAttribute('data-liked', 'true');
            btn.style.color = 'gray';

          } else {
            // DESCURTIR
            const res = await fetch(`http://localhost:3000/${postId}/post/removelike`, {
              method: 'PUT',
              credentials: "include"
            });

            if (!res.ok) throw new Error(await res.text());

            likes -= 1;
            btn.innerText = `Curtir (${likes})`;
            btn.setAttribute('data-liked', 'false');
            btn.style.color = '';
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

document.addEventListener('DOMContentLoaded', () => {
  const btnPublicar = document.getElementById('btn-publicar');

  btnPublicar.addEventListener('click', async () => {
    const title = document.getElementById('titulo').value;
    const content = document.getElementById('conteudo').value;
    const fileInput = document.getElementById('arquivo');
    const file = fileInput.files[0];

    if (!content) {
      alert("A publicação não pode estar vazia.");
      return;
    }

    const dateTime = new Date().toISOString(); // formato ISO padrão

    // Usando FormData para permitir envio de arquivo
    const formData = new FormData();
    formData.append("title", title); // ou permitir título separado se necessário
    formData.append("content", content);
    formData.append("dateTime", dateTime);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (response.ok) {
        alert("Publicação enviada com sucesso!");
        // limpar campos
        document.getElementById('conteudo').value = '';
        document.getElementById('titulo').value = '';
        fileInput.value = '';
      } else {
        const err = await response.json();
        alert(`Erro ao publicar: ${err.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      alert("Erro ao conectar com o servidor.");
    }
  });
});


async function logout(event) {
  event.preventDefault(); // impede o redirecionamento automático do link

  try {
    const response = await fetch("http://localhost:3000/users/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const result = await response.json();
      alert(result.message);
      window.location.href = "/login.html";
    } else {
      const erro = await response.json();
      alert("Erro ao deslogar: " + (erro.message || "verifique seus dados"));
    }
  } catch (err) {
    console.error("Erro ao conectar com o servidor:", err);
    alert("Erro de conexão. Tente novamente mais tarde.");
  }
}