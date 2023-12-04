var processoModel = require("../models/processoModel");

async function ExibirUltimosProcessos(req, res) {
    try {
        var data = await processoModel.Exibir_Processos();

        console.log(`DEBUG tipo da response dentro da controller: ${typeof data}` )

        if (data.length > 0) {
            res.status(200).json(data);
            console.log('Estou na controller, e a resposta foi bem-sucedida!');
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
            console.log('Estou na controller, mas a consulta não retornou resultados.');
        }
    } catch (error) {
        console.error("Houve um erro ao buscar as últimas medidas:", error);
        res.status(500).json({ error: "Houve um erro no servidor." });
    }
}

async function ListarCriticos(req, res) {
    try {
        var data = await processoModel.ListarCriticos();

        console.log(`DEBUG tipo da response dentro da controller: ${typeof data}` )

        if (data.length > 0) {
            res.status(200).json(data);
            console.log('Estou na controller, e a resposta foi bem-sucedida!');
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
            console.log('Estou na controller, mas a consulta não retornou resultados.');
        }
    } catch (error) {
        console.error("Houve um erro ao buscar as últimas medidas:", error);
        res.status(500).json({ error: "Houve um erro no servidor." });
    }
}

async function plotarGrafico_picos(req, res) {
    try {
        var data = await processoModel.plotarGrafico_picos();

        console.log(`DEBUG tipo da response dentro da controller: ${typeof data}` )

        if (data.length > 0) {
            res.status(200).json(data);
            console.log('Estou na controller, e a resposta foi bem-sucedida!');
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
            console.log('Estou na controller, mas a consulta não retornou resultados.');
        }
    } catch (error) {
        console.error("Houve um erro ao buscar as últimas medidas:", error);
        res.status(500).json({ error: "Houve um erro no servidor." });
    }
}

async function obterDadosGrafico_picos(req, res) {
    try {
        var data = await processoModel.obterDadosGrafico_picos();

        console.log(`DEBUG tipo da response dentro da controller: ${typeof data}` )

        if (data.length > 0) {
            res.status(200).json(data);
            console.log('Estou na controller, e a resposta foi bem-sucedida!');
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
            console.log('Estou na controller, mas a consulta não retornou resultados.');
        }
    } catch (error) {
        console.error("Houve um erro ao buscar as últimas medidas:", error);
        res.status(500).json({ error: "Houve um erro no servidor." });
    }
}


module.exports = {
   ExibirUltimosProcessos,
   ListarCriticos,
   plotarGrafico_picos,
   obterDadosGrafico_picos
}
