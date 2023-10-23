
import java.io.File

object ScriptInstalacao {

    fun executarScript(){

        var codigoScriptLinux = """
#! /bin/bash
            
echo "Deu certo"
"""

        val nomeArquivoSHDefault = "ScriptInst.sh"

        File(nomeArquivoSHDefault).writeText(codigoScriptLinux)
        Runtime.getRuntime().exec("bash $nomeArquivoSHDefault")

        println("Script feito")

    }

}