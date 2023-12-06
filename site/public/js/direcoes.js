
function geral(){
    window.location.href = "geralAdm.html";
}

function MF(){
    window.location.href = "maquina_fisica.html";
}

function MV(){
    window.location.href = "admin.html";
}

function permi(){
    window.location.href = "permissoes_usuario.html";
}

function user(){
    window.location.href = "cadastro.html";
}

function boot(FKMaquina){
    sessionStorage.setItem("FKMaquina", FKMaquina);
    window.location.href = "bootime.html";
}

function sarah(){
    window.location.href = "dashboard_sarah.html";
}