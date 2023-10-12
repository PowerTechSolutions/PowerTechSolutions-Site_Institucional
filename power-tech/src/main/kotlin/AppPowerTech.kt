import javax.swing.JOptionPane

fun main() {

        val funcionario_repositorio = FuncionarioRepositorio()
        val maquina_repositorio = MaquinasRepositorio()
        val servicoMonitoradorepositorio = ServicoMonitoradoRepositorio()
        val servicoCadastradorepositorio = ServicoCadastradoRepositorio()

        servicoCadastradorepositorio.iniciar()
        servicoMonitoradorepositorio.iniciar()
        maquina_repositorio.iniciar()
        funcionario_repositorio.iniciar()

        JOptionPane.showMessageDialog(null,"Bem vindo a PowerTech Por favor realize o login para utilizar nosso sistema")

        var Cpf:String = JOptionPane.showInputDialog(null,"Insira seu Cpf")

        if (funcionario_repositorio.autenticar(Cpf)){

            var funcionario:Funcionarios = funcionario_repositorio.resgatarinfo(Cpf)

            var maquinas:String = maquina_repositorio.pegarMaquinas(funcionario.IDFuncionario)

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
                    pegarTudo(servicos,maquinaEscolhida)
                }else if (funcoes.contains("R") and funcoes.contains("J")){
                    println("Não capturar USB")
                    exceptUsb(servicos,maquinaEscolhida)
                }else if (funcoes.contains("R") and funcoes.contains("U")){
                    println("Não capturar Janelas")
                    exceptJanelas(servicos,maquinaEscolhida)
                }else if (funcoes.contains("U") and funcoes.contains("J")){
                    println("Não capturar REDE")
                    exceptRede(servicos,maquinaEscolhida)
                }else if (funcoes.contains("R")){
                    println("Não capturar USB e Janelas")
                    excepUsbAndJanelas(servicos,maquinaEscolhida)
                }else if (funcoes.contains("J")){
                    println("Não capturar USB e redes")
                    excepUsbAndRedes(servicos, maquinaEscolhida)
                }else if (funcoes.contains("U")){
                    println("Não capturar Janelas e redes")
                    excepJanelasAndRedes(servicos, maquinaEscolhida)
                }else {
                    println("Não capturar Janelas e USB e redes")
                    exceptLooca(servicos)
                }
            }else{
                if (funcoes.contains("R") and funcoes.contains("J") and funcoes.contains("U")){
                    println("Capturar tudo exceto Python")
                    pegarTudoExcepPY(maquinaEscolhida)
                }else if (funcoes.contains("R") and funcoes.contains("J")){
                    println("Não capturar USB exceto Python")
                    exceptUsbExcepPY(maquinaEscolhida)
                }else if (funcoes.contains("R") and funcoes.contains("U")){
                    println("Não capturar Janelas exceto Python")
                    exceptJanelasExcepPY(maquinaEscolhida)
                }else if (funcoes.contains("U") and funcoes.contains("J")){
                    println("Não capturar REDE exceto Python")
                    exceptRedeExcepPY(maquinaEscolhida)
                }else if (funcoes.contains("R")){
                    println("Não capturar USB e Janelas exceto Python")
                    excepUsbAndJanelasExcepPY(maquinaEscolhida)
                }else if (funcoes.contains("J")){
                    println("Não capturar USB e redes exceto Python")
                    excepUsbAndRedesExcepPY(maquinaEscolhida)
                }else if (funcoes.contains("U")){
                    println("Não capturar Janelas e redes exceto Python")
                    excepJanelasAndRedesExcepPY(maquinaEscolhida)
                }
            }


        }

    }



fun pegarTudo(servicos:MutableList<ServicosMonitorados>,maquinaEscolhida:Int){
    pegarRede(maquinaEscolhida)
    pegarJanelas(maquinaEscolhida)
    pegarusbs(maquinaEscolhida)
    CodigoPython.execpython(servicos)
}

fun exceptUsb(servicos:MutableList<ServicosMonitorados>,maquinaEscolhida:Int){
    pegarRede(maquinaEscolhida)
    pegarJanelas(maquinaEscolhida)
    CodigoPython.execpython(servicos)
}

fun exceptJanelas(servicos:MutableList<ServicosMonitorados>,maquinaEscolhida:Int){
    pegarRede(maquinaEscolhida)
    pegarusbs(maquinaEscolhida)
    CodigoPython.execpython(servicos)
}

fun exceptRede(servicos:MutableList<ServicosMonitorados>,maquinaEscolhida:Int){
    pegarJanelas(maquinaEscolhida)
    pegarusbs(maquinaEscolhida)
    CodigoPython.execpython(servicos)
}

fun excepUsbAndJanelas(servicos:MutableList<ServicosMonitorados>,maquinaEscolhida:Int){
    pegarRede(maquinaEscolhida)
    CodigoPython.execpython(servicos)
}

fun excepUsbAndRedes(servicos:MutableList<ServicosMonitorados>,maquinaEscolhida:Int){
    pegarJanelas(maquinaEscolhida)
    CodigoPython.execpython(servicos)
}

fun excepJanelasAndRedes(servicos:MutableList<ServicosMonitorados>,maquinaEscolhida:Int){
    pegarusbs(maquinaEscolhida)
    CodigoPython.execpython(servicos)
}

fun exceptLooca(servicos:MutableList<ServicosMonitorados>){
    CodigoPython.execpython(servicos)
}

fun pegarTudoExcepPY(maquinaEscolhida:Int){
    pegarRede(maquinaEscolhida)
    pegarJanelas(maquinaEscolhida)
    pegarusbs(maquinaEscolhida)
}

fun exceptUsbExcepPY(maquinaEscolhida:Int){
    pegarRede(maquinaEscolhida)
    pegarJanelas(maquinaEscolhida)
}

fun exceptJanelasExcepPY(maquinaEscolhida:Int){
    pegarRede(maquinaEscolhida)
    pegarusbs(maquinaEscolhida)
}

fun exceptRedeExcepPY(maquinaEscolhida:Int){
    pegarJanelas(maquinaEscolhida)
    pegarusbs(maquinaEscolhida)
}

fun excepUsbAndJanelasExcepPY(maquinaEscolhida:Int){
    pegarRede(maquinaEscolhida)
}

fun excepUsbAndRedesExcepPY(maquinaEscolhida:Int){
    pegarJanelas(maquinaEscolhida)
}

fun excepJanelasAndRedesExcepPY(maquinaEscolhida:Int){
    pegarusbs(maquinaEscolhida)
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