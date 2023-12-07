

window.onload = obterDadosGrafico_picos()

function obterDadosGrafico_picos() {

    fetch(`/processo/obterdadospico`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                const dadosAgrupadosPorDia = resposta.reduce((acc, obj) => {
                    const dia_semana = obj.dia_semana;
                    if (!acc[dia_semana]) {
                        acc[dia_semana] = [];
                    }
                    acc[dia_semana].push(obj);
                    return acc;
                }, {});
                plotarGrafico_picos(dadosAgrupadosPorDia);
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

function plotarGrafico_picos(dadosAgrupadosPorDia) {
    console.log(dadosAgrupadosPorDia)
    // Criando estrutura para plotar gráfico - labels e dados
    let labels = Object.keys(dadosAgrupadosPorDia);
    let dadosCPU = [];
    let dadosRAM = [];

    // Preenchendo arrays com os dados
    labels.forEach(dia => {
        const registros = dadosAgrupadosPorDia[dia];
        if (registros && registros.length > 0) {
            // Assumindo que cada dia tem apenas um registro (pico_RAM e pico_CPU)
            const registro = registros[0];
            dadosCPU.push(registro.pico_CPU);
            dadosRAM.push(registro.pico_RAM);
        } else {
            // Se não houver dados para o dia, preencher com valores vazios
            dadosCPU.push(null);
            dadosRAM.push(null);
        }
    });

    // Criando estrutura para plotar gráfico - dados
    const dados = {
        labels: labels,
        datasets: [{
            label: 'Uso CPU',
            data: dadosCPU,
            fill: false,
            borderColor: '#FFD700',
            backgroundColor: '#FFD700'
        }, {
            label: 'Uso RAM',
            data: dadosRAM,
            fill: false,
            borderColor: '#FF4500',
            backgroundColor: '#FF4500'
        }]
    };
    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart_CPU = new Chart(
        document.getElementById(`myChart1`),
        config
    );

   // setTimeout(() => atualizarGrafico_picos(dados, myChart_CPU), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models

function atualizarGrafico_picos(dados) {

    fetch(`/processo/tempo-real_pico`, { cache: 'no-store' }).then(function (response) {
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
                proximaAtualizacao_Umi = setTimeout(() => atualizarGrafico_picos(dados, myChart1), 3000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao_Umi = setTimeout(() => atualizarGrafico_picos(dados, myChart1), 3000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}