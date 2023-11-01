class CarroPobre: Carro() {

    override fun getReacaoPessoas(): String {

        velocidade -= 3.0
        normalizarVelocidade()

        return "Nooooosa! Que carrão esse $fabricante $modelo"

    }

    override fun getVelocidadeAceleracao(): Double {
        return 25.0
    }

    override fun getFreioValor(): Double {
        return 15.00
    }

    override fun getVelocidadeMaxima(): Double {
        return 250.00
    }

}