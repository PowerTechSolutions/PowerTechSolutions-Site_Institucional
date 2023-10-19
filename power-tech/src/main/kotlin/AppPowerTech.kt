
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import javax.swing.JOptionPane


fun main() {

    var dataAtual = LocalDateTime.now()

        val usuario_repositorio:UsuarioRepositorio = UsuarioRepositorio()
        val maquina_repositorio:MaquinasRepositorio = MaquinasRepositorio()
        val servicoMonitoradorepositorio:ServicoMonitoradoRepositorio = ServicoMonitoradoRepositorio()
        val servicoCadastradorepositorio:ServicoCadastradoRepositorio = ServicoCadastradoRepositorio()

        servicoCadastradorepositorio.iniciar()
        servicoMonitoradorepositorio.iniciar()
        maquina_repositorio.iniciar()
        usuario_repositorio.iniciar()

        JOptionPane.showMessageDialog(null,"Bem vindo a PowerTech Por favor realize o login para utilizar nosso sistema")

        var Cpf:String = JOptionPane.showInputDialog(null,"Insira seu Cpf")

        if (usuario_repositorio.autenticar(Cpf)){

            var funcionario:Usuario = usuario_repositorio.resgatarinfo(Cpf)

            var maquinas:String = maquina_repositorio.pegarMaquinas(funcionario.IDUsuario)

            var maquinaEscolhida = JOptionPane.showInputDialog("Qual a numeração da maquina e está que está instalando o serviço? $maquinas").toInt()

            var servicos:MutableList<ServicosMonitorados> = servicoMonitoradorepositorio.buscarComponentes(maquinaEscolhida)

            var funcoes:MutableList<String> = mutableListOf()

            for (servico in servicos){

                var apelido:String = servicoCadastradorepositorio.buscarComponente(servico.FKComponente_cadastrado)

                when(apelido){

                    "REDE" -> {
                        funcoes.add("R")
                    }
                    "JANELAS" -> {
                        funcoes.add("J")
                    }
                    "USB" -> {
                        funcoes.add("U")
                    }
                    else -> {
                        funcoes.add("P")
                    }

                }

            }

            if (funcoes.contains("P")){
                if (funcoes.contains("R") and funcoes.contains("J") and funcoes.contains("U")){
                    println("Capturar tudo")
                    pegarTudo(servicos,maquinaEscolhida,dataAtual)

                }else if (funcoes.contains("R") and funcoes.contains("J")){
                    println("Não capturar USB")

                }else if (funcoes.contains("R") and funcoes.contains("U")){
                    println("Não capturar Janelas")

                }else if (funcoes.contains("U") and funcoes.contains("J")){
                    println("Não capturar REDE")

                }else if (funcoes.contains("R")){
                    println("Não capturar USB e Janelas")

                }else if (funcoes.contains("J")){
                    println("Não capturar USB e redes")

                }else if (funcoes.contains("U")){
                    println("Não capturar Janelas e redes")

                }else {
                    println("Não capturar Janelas e USB e redes")

                }
            }else{
                if (funcoes.contains("R") and funcoes.contains("J") and funcoes.contains("U")){
                    println("Capturar tudo exceto Python")

                }else if (funcoes.contains("R") and funcoes.contains("J")){
                    println("Não capturar USB exceto Python")

                }else if (funcoes.contains("R") and funcoes.contains("U")){
                    println("Não capturar Janelas exceto Python")

                }else if (funcoes.contains("U") and funcoes.contains("J")){
                    println("Não capturar REDE exceto Python")

                }else if (funcoes.contains("R")){
                    println("Não capturar USB e Janelas exceto Python")

                }else if (funcoes.contains("J")){
                    println("Não capturar USB e redes exceto Python")

                }else if (funcoes.contains("U")){
                    println("Não capturar Janelas e redes exceto Python")

                }
            }


        }

    }

fun pegarTudo(servicos: MutableList<ServicosMonitorados>, maquinaEscolhida: Int, dataAtual: LocalDateTime){

    var repositorio = Monitoramento_RAWRepositorio()
    repositorio.iniciar()

//    var dataDisco = LocalDateTime.now()
//    var dataRedeJanelas = LocalDateTime.now()

    while(true){

//        var verificacaoDisco = repositorio.verificarDisco(maquinaEscolhida,"DISCO")
//        var verificacaoJanela = repositorio.verificarRede(maquinaEscolhida)

//        if (verificacaoDisco){
//            dataDisco = repositorio.buscarData(maquinaEscolhida,"DISCO")
//            if (dataDisco.dayOfWeek == dataAtual.dayOfWeek){
//                println("Deu certo")
//                monitoramentoSemanal(servicos)
//            }else{
//                println("não passou 1 semana")
//            }
//        }else{
//            if (dataDisco.dayOfWeek == dataAtual.dayOfWeek){
//                println("Deu certo")
//                monitoramentoSemanal(servicos)
//            }else{
//                println("não passou 1 semana")
//            }
//        }





//        if (verificacaoJanela){
//            dataRedeJanelas = repositorio.buscarData(maquinaEscolhida,"REDE")
//            if (dataRedeJanelas.hour+8==dataAtual.hour){
//                println("Passou 8 horas")
//                monitoramentoDiario(maquinaEscolhida)
//            }else{
//                println("Não passou 8 horas")
//            }
//        }else{
//            if (dataRedeJanelas.hour==dataAtual.hour){
//                println("Primeira captura")
//                monitoramentoDiario(maquinaEscolhida)
//            }else{
//                println("Não passou 8 horas")
//            }
//        }
        monitoramentoSemanal(servicos)
        monitoramentoDiario(maquinaEscolhida)
        monitoramentoConst(servicos,maquinaEscolhida)
        Thread.sleep(5000)
    }

    }

fun monitoramentoConst(servicos:MutableList<ServicosMonitorados>,maquinaEscolhida:Int){
    pegarusbs(maquinaEscolhida)
    CodigoPythonConst.execpython(servicos)
}

fun monitoramentoDiario(maquinaEscolhida:Int){
    pegarJanelas(maquinaEscolhida)
    pegarRede(maquinaEscolhida)
}

fun monitoramentoSemanal(servicos:MutableList<ServicosMonitorados>){
    CodigoPythonPeri.execpython(servicos)
}

fun pegarRede(maquinaEscolhida: Int){

    var capturarede = CapturaRede()
    capturarede.iniciar()

    var inserts = capturarede.inserirBanco(maquinaEscolhida)

    println("$inserts Registros inseridos em redes")

}

fun pegarJanelas(maquinaEscolhida: Int){

    var capturajanela = CapturaJanelas()
    capturajanela.iniciar()

    var inserts = capturajanela.inserirBanco(maquinaEscolhida)

    println("$inserts Registro inseridos em janelas")

}

fun pegarusbs(maquinaEscolhida: Int){

    var capturausb = CapturaUsb()
    capturausb.iniciar()

    var inserts = capturausb.inserirBanco(maquinaEscolhida)

    println("$inserts Registro inseridos em usbs")

}


