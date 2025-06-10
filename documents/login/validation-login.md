# Documentação Técnica - Módulo de Validação de Login (JavaScript)
## Visão Geral
Este documento descreve a implementação da validação de formulário do módulo de login do website "Fórum de Sustentabilidade Social". A validação é realizada no lado do cliente (frontend) usando JavaScript puro para fornecer feedback instantâneo ao usuário e melhorar a experiência de uso antes de qualquer interação com o backend.

## Localização do Código
* Arquivo HTML: login.html
* Arquivo JavaScript: js/login-validation.js
* Arquivo CSS (Estilos de erro): css/style.css (Seção /*início dos estilos de erro de login*/)
## Elementos HTML Envolvidos
O formulário de login (#LoginForm) contém os seguintes elementos críticos para a validação:

* **Formulário:** `<form id="LoginForm">`
* **Campo de E-mail:** `<input type="email" id="email" name="email">`
    * `emailErro` (`<span>` para mensagem de erro específica do e-mail)
* **Campo de Senha:** `<input type="password" id="senha" name="senha">`
    * `senhaErro` (`<span>` para mensagem de erro específica da senha)
* **Mensagem de Erro Geral:** `<p class="erro-mensagem" id="mensagemGeralErro">` (parágrafo para mensagem de erro geral do formulário)
## Fluxo de Validação
1. Carregamento da Página: O script login-validation.js é executado após o carregamento completo do DOM (DOMContentLoaded event listener).
2. Captura de Elementos: Referências aos campos de input, spans de erro e o formulário são obtidas através de seus IDs.
3. Evento de Submissão: Um event listener é anexado ao evento submit do formulário (#LoginForm).
* event.preventDefault() é chamado para evitar o comportamento padrão de submissão do formulário, permitindo que a validação JavaScript seja executada.
4. Limpeza de Erros Anteriores: A função clearErros() é invocada no início de cada tentativa de submissão para remover quaisquer mensagens de erro e estilos visuais de erro de validações anteriores.
5. Validação de Campos Individuais:
* E-mail:
* Verifica se o campo está vazio.
* Se não estiver vazio, verifica se o valor corresponde a um formato de e-mail válido usando uma expressão regular (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).
* Senha:
* Verifica se o campo está vazio.
* Verifica se a senha tem no mínimo 6 caracteres.
6. Feedback Visual de Erro:
* Se um campo falhar na validação, uma mensagem de erro (emailErro ou senhaErro) é exibida com textContent.
* A classe CSS invalido é adicionada ao elemento input correspondente, ativando estilos visuais de erro (borda vermelha).
7. Mensagem de Erro Geral:
* Se qualquer validação falhar (isValid for false), uma mensagem de erro geral (mensagemGeralErro) é exibida na parte inferior do formulário, instruindo o usuário a corrigir os erros.
* A execução da função de submissão é interrompida (return;).
8. Envio de Dados (Sucesso):
* Se todas as validações forem bem-sucedidas (isValid for true), os valores dos campos de e-mail e senha são capturados.
* Atualmente, eles são apenas logados no console (console.log). Em um cenário real, esses dados seriam enviados para um servidor (via fetch ou XMLHttpRequest) para autenticação no backend.
9. Funções Auxiliares
* isValidEmail(email):
Propósito: Valida o formato de uma string de e-mail.
Parâmetros: email (string) - O endereço de e-mail a ser validado.
Retorno: boolean - true se o e-mail for válido, false caso contrário.
* clearErros():
Propósito: Limpa todas as mensagens de erro visíveis e remove a classe invalido dos campos de input.
Parâmetros: Nenhum.
Efeito Colateral: Modifica diretamente o DOM.