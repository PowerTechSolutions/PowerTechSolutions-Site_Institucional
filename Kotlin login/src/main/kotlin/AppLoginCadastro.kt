import java.util.Scanner

fun main() {

    val sn = Scanner(System.`in`)
    val listaFuncionarios = mutableListOf<cadastroFuncionario>()

    print("Nome da empresa: ")
    val empresa = sn.next()

    print("Digite seu token de acesso: ")
    val token = sn.next()

    if (token == "abc123") {
        print(
            "Você realizou seu login como $empresa com sucesso!\r\n" +
                    "=====================================================\r\n"
        )


        while (true) {
            print(
                    "1 - Capturar dados \r\n" +
                    "2 - Cadastrar funcionário novo \r\n" +
                    "3 - Mostrar usuários cadastrados \r\n" +
                    "4 - Sair" +
                        "\r\n" +
                        "=====================================================\r\n"
            )
            val opcao: String = sn.next()

            if (opcao == "1"){
                print("Capturando dados...\r\n\r\n")
                print("""
                    Você está usando 2.8% da CPU.

                    Disco:
                    Você esta usando 16.8% de Disco.

                    Memória RAM:
                    Você está usando 68.8% de RAM. Você tem 20.2% de memória RAM disponível.

                    -------------------------------------------------------------------------

                    Um dispositivo de dado está conectado : 13/09/2023 10:53:27
                    CPU:
                    Você está usando 2.8% da CPU.

                    Disco:
                    Você esta usando 16.8% de Disco.

                    Memória RAM:
                    Você está usando 69.0% de RAM. Você tem 20.2% de memória RAM disponível.

                    =====================================================
                    
                """.trimIndent())
            }

            if (opcao == "2") {
                print("Cadastrando usuário novo: \r\n")
                val funcionario1 = cadastroFuncionario()
                print("Nome: ")
                funcionario1.nome = sn.next()
                print("\r\nEmail: ")
                funcionario1.email = sn.next()
                print("\r\nCPF: ")
                funcionario1.cpf = sn.next().toBigInteger().toInt()
                print("\r\nTelefone: ")
                funcionario1.telefone = sn.next().toBigInteger().toInt()
                listaFuncionarios.add(funcionario1)
                print("Cadastro de ${funcionario1.nome} realizado com sucesso!\r\n" +
                        "=====================================================" +
                        "\r\n")

            }
            if (opcao == "3") {
                print("Funcionarios cadastrados: \r\n")

                var contador = 0
                while (contador < listaFuncionarios.size) {
                    print(
                        "Nome:${listaFuncionarios[contador].nome}, Email:${listaFuncionarios[contador].email}, CPF:${listaFuncionarios[contador].cpf}, Telefone:${listaFuncionarios[contador].telefone} \r\n" +
                                "=====================================================\r\n\r\n"
                    )
                    contador++
                }
            }

            if (opcao == "4"){
                print("Saindo!\r\n")
                break
            }
        }

    }
}

