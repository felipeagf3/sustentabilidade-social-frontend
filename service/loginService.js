
document.getElementById("login-form").addEventListener("submit", async function (event) {
event.preventDefault(); // Impede o submit tradicional

const email = document.getElementById("email").value;
const password = document.getElementById("senha").value;

try {
    const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include", // Muito importante para receber o cookie
    body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
    // Login deu certo → redireciona para o feed
    window.location.href = "/index.html";
    } else {
    const erro = await response.json();
    alert("Erro ao logar: " + erro.message || "verifique seus dados");
    }
} catch (err) {
    console.error("Erro ao conectar com o servidor:", err);
    alert("Erro de conexão. Tente novamente mais tarde.");
}
});