function criarPdf() {

    new jsPDF();

    var doc = new jsPDF();

    var conteudoHTML = document.getElementById('all').innerHTML;

    doc.fromHTML(conteudoHTML);

    doc.save("Relatorio-de-desempenho.pdf");

    // doc.output('dataurlnewwindow');

}

function fecharMsg() {
    // Transforma as classes em variáveis
    var pdfClass = document.getElementsByClassName('pdf');
    var grafico1 = document.getElementsByClassName('graph1');
    var tituloGraf= document.getElementById('title');

    // Laço de repetição que percorre cada elemento das classes acima
    for (var i = 0; i < pdfClass.length; i++) {
        // Para cada elemento existente nas classes, estabelece as propriedades abaixo:
        pdfClass[i].style.display = 'none';
        grafico1[i].style.marginTop = '0';
        grafico1[i].style.height= '60vh';
    }

    // Valida se o pdfID existe
    var pdfID = document.getElementById('baixarpdf');
    if (pdfID) {
        pdfID.innerHTML = '';
        tituloGraf.style.marginTop= '7%';
    }
}
