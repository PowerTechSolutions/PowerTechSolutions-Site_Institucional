function fazerbusca(IDMaquina){
    sessionStorage.IDMaquina = IDMaquina;
    buscarDiscos(IDMaquina)
}

function geral() {
    window.location.href = "cards.html"
}

function exibirgraph(valor){

    var grafico_RAM = document.getElementById("myChart_RAM");
    var grafico_CPU = document.getElementById("myChart_CPU");

    var idMaquina = sessionStorage.IDMaquina;

    if(valor == 1){
        
        obterDadosGrafico_RAM(idMaquina)
        
        grafico_CPU.style.display = "none";
        grafico_RAM.style.display = "block";
    
    }else if(valor == 2){
        
        obterDadosGrafico_CPU(idMaquina)
        
        grafico_RAM.style.display = "none";
        grafico_CPU.style.display = "block";
    
    }
}

function atualizarFeed_usuarios() {

    var IDEmpresaVar = sessionStorage.FKUnidade;

    fetch("/usuarios/listar_usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idEmpServer: IDEmpresaVar,
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            if (resposta.status == 204) {
                    var feed = document.getElementById("arrangement");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Nenhum resultado encontrado."
                    feed.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("arrangement");
                for (let contador_usuario = 0; contador_usuario < resposta.length; contador_usuario++) {
                    var publicacao = resposta[contador_usuario];
                    // criando e manipulando elementos do HTML via JavaScript

                    var usuario = document.createElement("div");
                    usuario.onchange = "fazerbusca(publicacao.IDUsuario)";
                    usuario.className = "infoemp";

                    var id = document.createElement("p");
                    id.innerHTML = publicacao.IDUsuario;
                    usuario.appendChild(id);

                    var nome = document.createElement("a");
                    nome.innerHTML = publicacao.Nome;
                    usuario.appendChild(nome);

                    var data = new Date();
                    var dia = String(data.getDate()).padStart(2, '0');
                    var mes = String(data.getMonth() + 1).padStart(2, '0');
                    var ano = data.getFullYear();
                    var dataAtual = dia + '/' + mes + '/' + ano;

                    var data = document.createElement("p");
                    data.innerHTML = dataAtual;
                    usuario.appendChild(data);

                    var situacao = document.createElement("p");
                    situacao.innerHTML = "Normal";
                    usuario.appendChild(situacao);

                    feed.appendChild(usuario);

                }
            });
        } else {
            throw ("Houve um erro ao tentar realizar A pesquisa!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}

function atualizarFeed_maquina() {

    var IDFuncionario = sessionStorage.IDFuncionario;

    fetch(`/usuarios/listar_maquinas/${IDFuncionario}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            if (resposta.status == 204) {
                    var feed = document.getElementById("maquinas");
                    var mensagem = document.createElement("option");
                    mensagem.innerHTML = "Nenhum resultado encontrado."
                    feed.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("maquinas");
                feed.innerHTML = "";

                var escolha = document.createElement("option");
                escolha.innerHTML = "Selecione a maquina para visualizar os dados";
                feed.appendChild(escolha)

                for (let contador_usuario = 0; contador_usuario < resposta.length; contador_usuario++) {
                    var publicacao = resposta[contador_usuario];
                    // criando e manipulando elementos do HTML via JavaScript

                    var maquina = document.createElement("option");
                    maquina.innerHTML = publicacao.Apelido
                    maquina.value = publicacao.IDMaquina
                    feed.appendChild(maquina)

                }
            });
        } else {
            throw ("Houve um erro ao tentar realizar A pesquisa!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}

function buscarDiscos(FKMAQUINA){

    fetch(`/medidas/buscarDiscos/${FKMAQUINA}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        console.log("resposta: ", resposta);
        var feed = document.getElementById("discos");
        feed.innerHTML = "";

        if (resposta.ok) {

            if (resposta.status == 204) {
                    var feed = document.getElementById("discos");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Nenhum resultado encontrado."
                    feed.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                var feed = document.getElementById("discos");
                feed.innerHTML = "";
                for (let contador_usuario = 0; contador_usuario < resposta.length; contador_usuario++) {
                    var publicacao = resposta[contador_usuario];
                    // criando e manipulando elementos do HTML via JavaScript

                    var disco = document.createElement("span");
                    disco.id = `disco${publicacao.IDMonitoramento}`;

                    var label = document.createElement("span");
                    label.innerHTML = `Disco ${contador_usuario+1} - `;
                    disco.appendChild(label);

                    var porcentagem = document.createElement("span");
                    porcentagem.id = `porcentage${publicacao.IDMonitoramento}`;
                    porcentagem.innerHTML = `${publicacao.Uso_DIsco}`;
                    disco.appendChild(porcentagem)

                    feed.appendChild(disco)

                }
            });
        } else {
            throw ("Houve um erro ao tentar realizar A pesquisa!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        //finalizarAguardar();
    });

    return false;
}   

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function obterDadosGrafico_CPU(FKMAQUINA) {

    // alterarTitulo(idUsuario)

    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }

    fetch(`/medidas/ultimas_CPU/${FKMAQUINA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico_CPU(resposta,FKMAQUINA);
                
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico_CPU(resposta, FKMAQUINA) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Uso de CPU (em porcentagem)',
            data: [],
            fill: false,
            borderColor: '#009EA3',
            backgroundColor: '#009EA3'
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.Uso_CPU);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart_CPU = new Chart(
        document.getElementById(`myChart_CPU`),
        config
    );

    setTimeout(() => atualizarGrafico_CPU(FKMAQUINA, dados, myChart_CPU), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico_CPU(FKMAQUINA, dados, myChart_CPU) {

    fetch(`/medidas/tempo-real_CPU/${FKMAQUINA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

            console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
            console.log(`Dados atuais do gráfico:`);
            console.log(dados);

            let avisoCaptura = document.getElementById(`avisoCaptura`)
            avisoCaptura.innerHTML = ""

            if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                console.log("---------------------------------------------------------------")
                console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i>Foi recebido o dado mais atual capturado pela API. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                console.log("Horário do novo dado capturado:")
                console.log(novoRegistro[0].momento_grafico)
                console.log("Horário do último dado capturado:")
                console.log(dados.labels[dados.labels.length - 1])
                console.log("---------------------------------------------------------------")
            } else {
                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                dados.datasets[0].data.push(novoRegistro[0].Uso_CPU); // incluir uma nova medida de umidade

                // dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                // dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                myChart_CPU.update();
            }

            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao_Umi = setTimeout(() => atualizarGrafico_CPU(FKMAQUINA, dados, myChart_CPU), 3000);
        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao_Umi = setTimeout(() => atualizarGrafico_CPU(FKMAQUINA, dados, myChart_CPU), 3000);
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function obterDadosGrafico_RAM(FKMAQUINA) {

    // alterarTitulo(idUsuario)

    // if (proximaAtualizacao != undefined) {
    //     clearTimeout(proximaAtualizacao);
    // }

    fetch(`/medidas/ultimas_RAM/${FKMAQUINA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico_RAM(resposta, FKMAQUINA);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico_RAM(resposta, FKMAQUINA) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Uso de RAM (em porcentagem)',
            data: [],
            fill: false,
            borderColor: '#009EA3',
            backgroundColor: '#009EA3'
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.Uso_RAM);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart_RAM = new Chart(
        document.getElementById(`myChart_RAM`),
        config
    );

    setTimeout(() => atualizarGrafico_RAM(FKMAQUINA, dados, myChart_RAM), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico_RAM(FKMAQUINA, dados, myChart_RAM) {

    fetch(`/medidas/tempo-real_RAM/${FKMAQUINA}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

            console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
            console.log(`Dados atuais do gráfico:`);
            console.log(dados);

            let avisoCaptura = document.getElementById(`avisoCaptura`)
            avisoCaptura.innerHTML = ""

            if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                console.log("---------------------------------------------------------------")
                console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi recebido o dado mais atual capturado pela API. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                console.log("Horário do novo dado capturado:")
                console.log(novoRegistro[0].momento_grafico)
                console.log("Horário do último dado capturado:")
                console.log(dados.labels[dados.labels.length - 1])
                console.log("---------------------------------------------------------------")
            } else {
                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                dados.datasets[0].data.push(novoRegistro[0].Uso_RAM); // incluir uma nova medida de umidade

                // dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                // dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                myChart_CPU.update();
            }

            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao_Umi = setTimeout(() => atualizarGrafico_RAM(FKMAQUINA, dados, myChart_RAM), 3000);
        });
    } else {
        console.error('Nenhum dado encontrado ou erro na API');
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        proximaAtualizacao_Umi = setTimeout(() => atualizarGrafico_RAM(FKMAQUINA, dados, myChart_RAM), 3000);
    }
})
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}