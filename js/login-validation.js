//executa o código após a estrutura html da página estiver completamente carregada
document.addEventListener('DOMContentLoaded', () => {
    //obtem as referências dos elementos html
    const LoginForm = document.getElementById('LoginForm');
    const emailInput = document.getElementById('email');
    const senhaInput = document.getElementById('senha');
    const emailErro = document.getElementById('emailErro');
    const senhaerro = document.getElementById('senhaErro');
    const mensagemGeralErro = document.getElementById('mensagemGeralErro');

    //função para verificar se o e-mail tem o formato padrão "texto@texto.dominio"
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    //função que remove as mensagens de erro e limpa os campos
    function clearErros() {
        emailErro.textContent = ''; // Apaga o texto de erro do e-mail
        senhaErro.textContent = ''; // Apaga o texto de erro da senha
        mensagemGeralErro.textContent = ''; // Apaga o texto de erro geral
        mensagemGeralErro.style.display = 'none'; // Esconde a mensagem de erro geral
        emailInput.classList.remove('invalido'); // Remove a borda vermelha do input de e-mail
        senhaInput.classList.remove('invalido'); // Remove a borda vermelha do input de senha
    }

    //adicionando ouvinte para formulário quando botão entrar for clicado
    LoginForm.addEventListener('submit', async function (event) {
        event.preventDefault();//impede que a página seja recarregada para visualizar as mensagens de erro
        clearErros();

        let isValid = true; //começa como verdadeiro e muda caso encontre algum erro

        //validação do campo e-mail

        //se o campo email estiver vázio
        if (!emailInput.value.trim()) {
            emailErro.textContent = 'O e-mail é obrigatório.'; // Mostra a mensagem de erro
            emailInput.classList.add('invalido'); // Adiciona a classe CSS para deixar a borda vermelha
            isValid = false; // indica que o formulário tem um erro
        }

        //se o e-mail não estiver vázio, mas não tiver um formato válido 
        else if (!isValidEmail(emailInput.value.trim())) {
            emailErro.textContent = 'Por favor, insira um e-mail válido.';
            emailInput.classList.add('invalido');
            isValid = false;
        }

        //validação do campo senha

        //se o campo senha estiver vázio
        if (!senhaInput.value.trim()) {
            senhaErro.textContent = 'A senha é obrigatória.';
            senhaInput.classList.add('invalido');
            isValid = false;
        }

        //se a senha digitada for muito curta(definido menos de 6 caracteres como senha curta)
        else if (senhaInput.value.trim().length < 6) {
            senhaErro.textContent = 'A senha deve ter pelo menos 6 caracteres.';
            senhaInput.classList.add('invalido');
            isValid = false;
        }

        //se isValid assumir o valor false é por que algum erro foi encontrado e solicita correção dos campos
        if (!isValid) {
            mensagemGeralErro.textContent = 'Por favor, corrija os erros no formulário.';
            mensagemGeralErro.style.display = 'block'; // Mostra a mensagem de erro geral
            return; // Interrompe a função, impedindo o envio de dados para o backend.
        }

        //envia os dados para o backend caso passe pelas verificações
        const email = emailInput.value.trim();
        const senha = senhaInput.value.trim();

        console.log("Validação ok");
        console.log("E-mail digitado:", email);
        console.log("Senha digitada:", senha);
    });

});
