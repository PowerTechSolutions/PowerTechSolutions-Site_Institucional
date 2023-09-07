// script.js

// Seleciona o botão e a seção
const rolagem = document.getElementById("rolagem");
const sessao = document.getElementById("sessao");

// Adiciona um ouvinte de evento ao botão
botaoRolagem.addEventListener("click", () => {
    // Rola a página suavemente até a seção usando scrollIntoView
    minhaSecao.scrollIntoView({ behavior: "smooth" });
});
