function criarPdf() {
    //tira a div de escolha
    fecharMsg();

    //define o que sera utilizado para converter como img
    const printscreen = document.getElementById('conteudo-ID');

    //seta o scroll do printscreen
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    //chama a biblioteca jsPDF e cria um pdf vazio
    const pdf = new jsPDF();

    //adiciona uma fonte ao pdf
    pdf.addFont('Barlow', 'Barlow', 'normal');

    //usa o html2canvas para transformar o printscreen em img
    html2canvas(printscreen, {
        allowTaint: true,
        taintTest: false,
        type: "view",
    }).then(function (canvas) {
        //cria uma url para a img ser utilizada depois 
        const imgData = canvas.toDataURL('image/png');
        
        // define largura e a altura
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        // adiciona a img ao pdf, passando a extensão da foto, margens e a altura e largura
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        //cria uma data atual e formata ela 
        const currentDate = new Date();
        const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    
        //coloca o tamanho da fonte
        pdf.setFontSize(22);
    
        //adiciona a data como texto se baseando na largura do pdf, e define margens e alinhamentos
        pdf.text(pdfWidth / 2, 130, formattedDate, { align: 'center', marginBottom: '50%'});

        //cria o pdf dando um nome e extensao e possibilita o download
        pdf.save("Relatorio-de-desempenho.pdf");
    });
}

  
  

function fecharMsg() {
    // Transforma as classes em variáveis
    var pdfClass = document.getElementsByClassName('pdf');
    // var grafico1 = document.getElementsByClassName('graph1');
    // var tituloGraf= document.getElementById('title');

    // Laço de repetição que percorre cada elemento das classes acima
    for (var i = 0; i < pdfClass.length; i++) {
        // Para cada elemento existente nas classes, estabelece as propriedades abaixo:
        pdfClass[i].style.display = 'none';
        // grafico1[i].style.marginTop = '0';
        // grafico1[i].style.height= '60vh';
    }

    // Valida se o pdfID existe
    var pdfID = document.getElementById('baixarpdf');
    if (pdfID) {
        pdfID.innerHTML = '';
        tituloGraf.style.marginTop= '7%';
    }
}
