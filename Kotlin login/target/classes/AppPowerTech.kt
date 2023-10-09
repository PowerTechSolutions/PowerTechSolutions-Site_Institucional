import com.github.britooo.looca.api.core.Looca
import com.github.britooo.looca.api.group.dispositivos.DispositivoUsb
import com.github.britooo.looca.api.group.dispositivos.DispositivosUsbGrupo
import com.github.britooo.looca.api.group.janelas.Janela
import com.github.britooo.looca.api.group.janelas.JanelaGrupo
import com.github.britooo.looca.api.group.processos.Processo
import com.github.britooo.looca.api.group.processos.ProcessoGrupo
import com.github.britooo.looca.api.group.rede.Rede
import com.github.britooo.looca.api.group.rede.RedeInterface
import com.github.britooo.looca.api.group.rede.RedeInterfaceGroup
import com.github.britooo.looca.api.group.rede.RedeParametros
import com.github.britooo.looca.api.group.servicos.Servico
import com.github.britooo.looca.api.group.servicos.ServicoGrupo
import com.github.britooo.looca.api.group.sistema.Sistema

fun main() {

    val looca:Looca = Looca()
//
//    val sistema:Sistema = looca.sistema
//
//    //println(sistema)
//
//    var gruposervicoa:ServicoGrupo = looca.grupoDeServicos
//
//    var servicos:Int = gruposervicoa.totalDeServicos
//
//    println(servicos)
////    for (servico in servicos){
////        println(servico)
////    }
//
//    var redeparametro:RedeParametros = looca.rede.parametros
//
//    var redeinterface:RedeInterfaceGroup = looca.rede.grupoDeInterfaces
//
//    var redeinterface2:MutableList<RedeInterface>  = redeinterface.interfaces
//
//    println(redeparametro.hostName)
//    println(redeparametro.servidoresDns)
//    println(redeparametro.nomeDeDominio)
//
//    var rede2:Rede = looca.rede
//
//    println(rede2)
//
//
//    for (rede in redeinterface2){
//        println(rede)
//    }
//
//    var janela:JanelaGrupo = looca.grupoDeJanelas
//
//    var grupojanelas:MutableList<Janela> = janela.janelas
//
//    for (janela2 in grupojanelas){
//
//        if (janela2.isVisivel){
//            println(janela2.titulo)
//        }
//
//    }

    var usb:DispositivosUsbGrupo = looca.dispositivosUsbGrupo

//    println(usb.dispositivosUsb)
    println(usb.dispositivosUsbConectados)
//    println(usb.totalDispositvosUsb)
    println(usb.totalDispositvosUsbConectados)

}
