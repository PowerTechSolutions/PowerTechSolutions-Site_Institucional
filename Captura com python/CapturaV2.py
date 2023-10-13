import psutil
import time
import threading
import mysql.connector


while (True):
    cpu = psutil.cpu_percent(interval=1)
    try:
        mydb = mysql.connector.connect(host = 'localhost', user = 'root',password = '@myLOVEisthe0506',database = 'PowerTechSolutions')
        if mydb.is_connected():
            db_info = mydb.get_server_info()

            mycursor = mydb.cursor()

            sql_querry = "INSERT INTO Monitoramento_RAW VALUES (NULL, CURRENT_TIMESTAMP(), %s,1)"
            val = [round(cpu,2)]
            mycursor.execute(sql_querry, val)

            mydb.commit()
            print(mycursor.rowcount, "Registro inserido")
    except mysql.connector.Error as e:
        print("Erro ao conectar com o MySQL", e)
    finally:
        if(mydb.is_connected()):
            mycursor.close()
            mydb.close()
time.sleep(5)
                
