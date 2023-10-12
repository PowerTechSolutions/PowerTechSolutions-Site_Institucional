import org.springframework.jdbc.core.BeanPropertyRowMapper
import org.springframework.jdbc.core.JdbcTemplate

class FuncionarioRepositorio {

    lateinit var jdbcTemplate: JdbcTemplate

    fun iniciar(){
        jdbcTemplate = Conexao.jdbcTemplate!!
    }

    fun autenticar(Cpf:String):Boolean{
        var usuario = jdbcTemplate.queryForObject("""
            SELECT * FROM Funcionarios WHERE Cpf = '$Cpf'
        """, BeanPropertyRowMapper(Funcionarios::class.java))

        return usuario.IDFuncionario != null

    }

    fun resgatarinfo(Cpf: String):Funcionarios{
        var usuario = jdbcTemplate.queryForObject("""
            SELECT * FROM Funcionarios WHERE Cpf = '$Cpf'
        """, BeanPropertyRowMapper(Funcionarios::class.java))

        return usuario
    }

}