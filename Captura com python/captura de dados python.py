import psutil
import time
import threading
import mysql.connector

event = threading.Event()
print(event)

def stop():
    event.set()
    print("\nFinalizando monitoramento")
    print(event)

  #Processamento 
cpuPercent= psutil.cpu_percent(interval=1)
ramPercent= psutil.virtual_memory().percent
diskPercent= psutil.disk_usage('/').percent

    #Armazenamento Livre
cpuLivrePercent = (100 - cpuPercent)
ramLivrePercent = (100 - ramPercent)

while (True):
    tentativas = 0
    resposta = input("Quer ver os dados? (s/n): ")
    
    if resposta == "s":
        while tentativas < 5:
           print("CPU:\nVocê está usando {:.1f}% da CPU.\n\nDisco:\nVocê esta usando {:.1f}% de Disco. \n\nMemória RAM:\nVocê está usando {:.1f}% de RAM. Você tem {:.1f}% de memória RAM disponível. \n\n\n\n\n".format(cpuPercent,diskPercent,ramPercent,ramLivrePercent))
           tentativas += 1
           time.sleep(2)
           
           info = psutil.disk_partitions(all=False)
           dia = datetime.now()
           if len(info) > 1:
               print('Um dispositivo de dado está conectado : '+ dia.strftime('%d/%m/%Y %H:%M:%S'))
               time.sleep(2)
               dia = datetime.now()



print('monitorando energia...')

while not event.is_set():
    bat = psutil.sensors_battery()[2]
    perc = psutil.sensors_battery()[0]
    if bat:
        print('Bateria {:.2f}%'.format(perc))    
    if not bat:
        print('Bateria {:.2f}% ...ALERTA'.format(perc))
        try:
            mydb = mysql.connector.connect(host = 'localhost',user = 'root', password = '@myLOVEisthe0506', database = 'logbateria')
            if mydb.is_connected():
                db_info = mydb.get_server_info()
                
                mycursor = mydb.cursor()

                sql_query = "INSERT INTO log VALUES (null, current_timestamp(), 'Bateria desconectada',%s)"
                val = [round(perc,2)]
                mycursor.execute(sql_query, val)

                mydb.commit()
                print(mycursor.rowcount, "registro inserido")
        except mysql.connector.Error as e:
            print("Erro ao conectar com o MySQL", e)
        finally:
            if(mydb.is_connected()):
                mycursor.close()
                mydb.close()
    time.sleep(5)

