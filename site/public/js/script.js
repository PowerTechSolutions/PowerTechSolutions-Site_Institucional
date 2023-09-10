document.addEventListener("DOMContentLoaded", function() {
    // Adicione um evento de clique ao botão
    document.getElementById("scrollButton").addEventListener("click", function() {
        // Use scrollIntoView() para rolar para a seção desejada
        document.getElementById("outraSessao").scrollIntoView({ behavior: "smooth", block: "start" });
    });
});
