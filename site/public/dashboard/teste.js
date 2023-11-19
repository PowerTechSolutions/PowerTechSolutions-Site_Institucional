function criarPdf(){

new jsPDF();

var doc = new jsPDF();

var conteudoHTML = document.getElementById('all').innerHTML;

doc.fromHTML(conteudoHTML);

doc.save("Relatorio-de-desempenho.pdf");

// doc.output('dataurlnewwindow');

}