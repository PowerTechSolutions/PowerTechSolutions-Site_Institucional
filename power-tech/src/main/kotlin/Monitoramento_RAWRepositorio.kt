import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.format.DateTimeFormatter

class Monitoramento_RAWRepositorio {

    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar(){
        jdbcTemplate = Conexao.jdbcTemplate!!
    }

    fun verificarDisco(FKMaquina:Int,componente:String):Boolean{
        var data = jdbcTemplate.queryForObject("""
            SELECT 
	            Data_Hora_Captura 
                FROM 
		            Monitoramento_RAW JOIN Componentes_monitorados 
		                ON FKComponente_Monitorado = IDComponente_monitorado 
			                JOIN Componentes_cadastrados 
				                ON FKComponente_cadastrado = IDComponente_cadastrado
					                JOIN Maquinas 
						                ON FKMaquina = IDMaquina
							                WHERE FKMaquina = $FKMaquina
								                AND Componentes_cadastrados.Apelido = "$componente"
                                                    LIMIT 1;
        """, BeanPropertyRowMapper(Monitoramento_RAW::class.java))

        return data != null

    }

    fun verificarRede(FKMaquina:Int):Boolean{

        var data = jdbcTemplate.queryForObject("""
            SELECT 
	            Data_Hora_Conexao 
                FROM 
		            Redes_conectadas WHERE FKMaquina = $FKMaquina
                        LIMIT 1;
        """, BeanPropertyRowMapper(RedesCapturadas::class.java))

        return data != null

    }

    fun buscarData(FKMaquina:Int,componente:String): LocalDateTime{

        var data = jdbcTemplate.queryForObject("""
            SELECT 
	            Data_Hora_Captura 
                FROM 
		            Monitoramento_RAW JOIN Componentes_monitorados 
		                ON FKComponente_Monitorado = IDComponente_monitorado 
			                JOIN Componentes_cadastrados 
				                ON FKComponente_cadastrado = IDComponente_cadastrado
					                JOIN Maquinas 
						                ON FKMaquina = IDMaquina
							                WHERE FKMaquina = $FKMaquina
								                AND Componentes_cadastrados.Apelido = "$componente"
                                                    LIMIT 1;
        """, BeanPropertyRowMapper(Monitoramento_RAW::class.java))

        var data_hora = data.Data_Hora_Captura

        var dataTrasform = LocalDateTime.parse(data_hora,DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"))

        return dataTrasform

    }

}