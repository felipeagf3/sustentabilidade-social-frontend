document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formCadastro');
  const fileInput = document.getElementById('foto_perfil');
  const previewImg = document.getElementById('preview');

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      previewImg.src = URL.createObjectURL(file);
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar_senha').value;

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "/login.html";
      } else {
        const error = await response.json();
        alert(`Erro no cadastro: ${error.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao se conectar com o servidor:", error);
      alert("Erro de rede. Tente novamente mais tarde.");
    }
  });
});