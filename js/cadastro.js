document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const usuarioInput = document.getElementById('usuario');
    const emailInput = document.getElementById('email');
    const confirmarEmailInput = document.getElementById('confirmar_email');
    const senhaInput = document.getElementById('senha');

    // --- ADICIONE AS FUNÇÕES AUXILIARES AQUI, ANTES DE validateForm ---

    // Helper function to display error messages
    function displayError(inputElement, message) {
        let errorElement = inputElement.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
        errorElement.textContent = message;
        inputElement.classList.add('input-error');
    }

    // Helper function to remove error messages
    function removeError(inputElement) {
        let errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        inputElement.classList.remove('input-error');
    }

    // Basic email validation regex
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // --- AGORA A FUNÇÃO validateForm PODE CHAMAR ELAS SEM ERRO ---
    function validateForm() {
        let isValid = true;
        console.log('Iniciando validação dos campos...');

        // --- Validate Username ---
        console.log('Validando Nome de Usuário...');
        if (usuarioInput.value.trim() === '') {
            displayError(usuarioInput, 'O nome de usuário é obrigatório.');
            isValid = false;
            console.log('Erro no Usuário: campo vazio.');
        } else if (usuarioInput.value.trim().length < 3) {
            displayError(usuarioInput, 'O nome de usuário deve ter pelo menos 3 caracteres.');
            isValid = false;
            console.log('Erro no Usuário: muito curto.');
        } else {
            removeError(usuarioInput); // ESTA LINHA CAUSAVA O ERRO ANTES
            console.log('Usuário: OK.');
        }
        console.log('Valor do Usuário: "' + usuarioInput.value.trim() + '"');


        // ... (o restante da sua função validateForm) ...

        // --- Validate Email ---
        console.log('Validando E-mail...');
        if (emailInput.value.trim() === '') {
            displayError(emailInput, 'O e-mail é obrigatório.');
            isValid = false;
            console.log('Erro no E-mail: campo vazio.');
        } else if (!isValidEmail(emailInput.value.trim())) {
            displayError(emailInput, 'Por favor, insira um e-mail válido.');
            isValid = false;
            console.log('Erro no E-mail: formato inválido.');
        } else {
            removeError(emailInput);
            console.log('E-mail: OK.');
        }
        console.log('Valor do E-mail: "' + emailInput.value.trim() + '"');


        // --- Confirm Email ---
        console.log('Confirmando E-mail...');
        if (confirmarEmailInput.value.trim() === '') {
            displayError(confirmarEmailInput, 'Confirme seu e-mail.');
            isValid = false;
            console.log('Erro na Confirmação de E-mail: campo vazio.');
        } else if (confirmarEmailInput.value.trim() !== emailInput.value.trim()) {
            displayError(confirmarEmailInput, 'Os e-mails não coincidem.');
            isValid = false;
            console.log('Erro na Confirmação de E-mail: não coincide.');
        } else {
            removeError(confirmarEmailInput);
            console.log('Confirmação de E-mail: OK.');
        }
        console.log('Valor da Confirmação de E-mail: "' + confirmarEmailInput.value.trim() + '"');


        // --- Validate Password ---
        console.log('Validando Senha...');
        if (senhaInput.value.trim() === '') {
            displayError(senhaInput, 'A senha é obrigatória.');
            isValid = false;
            console.log('Erro na Senha: campo vazio.');
        } else if (senhaInput.value.trim().length < 6) {
            displayError(senhaInput, 'A senha deve ter pelo menos 6 caracteres.');
            isValid = false;
            console.log('Erro na Senha: muito curta.');
        } else {
            removeError(senhaInput);
            console.log('Senha: OK.');
        }
        console.log('Comprimento da Senha: ' + senhaInput.value.trim().length);


        console.log('Validação dos campos concluída. Resultado final: ' + isValid);
        return isValid;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('--- Tentativa de Envio do Formulário ---');

        if (validateForm()) {
            console.log('Validação do formulário: SUCESSO');
            alert('Cadastro realizado com sucesso!');
            form.reset();
        } else {
            console.log('Validação do formulário: FALHA');
            alert('Por favor, corrija os erros no formulário.');
        }
        console.log('------------------------------------');
    });

});