import psutil
import time
from datetime import datetime
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
