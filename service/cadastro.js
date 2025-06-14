document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio tradicional do formulário

        const picture_profile_url = "foto"

        const username = document.getElementById('usuario').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;
        const confirmPassword = document.getElementById('confirmar_senha').value;

        if (password !== confirmPassword) {
            alert("Os e-mails não coincidem.");
            return;
        }

        const payload = {
            picture_profile_url,
            username,
            email,
            password
        };

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const data = await response.json();
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
