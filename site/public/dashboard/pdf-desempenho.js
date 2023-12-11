function criarPdf() {
    // Tira a div de escolha
    fecharMsg();

    // Define o que será utilizado para converter como img
    const printscreen = document.getElementById('conteudo-ID');

    // Seta o scroll do printscreen
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Chama a biblioteca jsPDF e cria um pdf vazio
    const pdf = new jsPDF();

    // adiciona uma fonte ao pdf
    pdf.addFont('Barlow', 'Barlow', 'normal');

    // usa o html2canvas para transformar o printscreen em img
    html2canvas(printscreen, {
        allowTaint: true,
        taintTest: false,
        type: "view",
    }).then(function (canvas) {
        // cria uma url para a img ser utilizada depois 
        const imgData = canvas.toDataURL('image/png');

        // Define a largura da imagem no PDF com base no CSS fornecido
        const pdfImageWidth = 80; // Largura em porcentagem do tamanho total do PDF

        // Converte a largura de porcentagem para milímetros
        const pdfWidth = 210; // Largura padrão em milímetros (A4)
        const pdfImageWidthInMM = (pdfImageWidth / 100) * pdfWidth;

        // Calcula a altura da imagem proporcionalmente
        const pdfImageHeight = (canvas.height * pdfImageWidthInMM) / canvas.width;

        // adiciona a img ao pdf, passando a extensão da foto, margens e a altura e largura
        pdf.addImage(imgData, 'PNG', (pdfWidth - pdfImageWidthInMM) / 2, 0, pdfImageWidthInMM, pdfImageHeight);

        // cria uma data atual e formata ela 
        const currentDate = new Date();
        const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    
        // coloca o tamanho da fonte
        pdf.setFontSize(22);
    
        // adiciona a data como texto se baseando na largura do pdf, e define margens e alinhamentos
        pdf.text(pdfWidth / 2, 130, formattedDate, { align: 'center', marginBottom: '40%' });

        // cria o pdf dando um nome e extensão e possibilita o download
        pdf.save("Relatorio-de-desempenho.pdf");
    });
}

function fecharMsg() {
    // Transforma as classes em variáveis
    var pdfClass = document.getElementsByClassName('pdf');

    // Laço de repetição que percorre cada elemento das classes acima
    for (var i = 0; i < pdfClass.length; i++) {
        // Para cada elemento existente nas classes, estabelece as propriedades abaixo:
        pdfClass[i].style.display = 'none';
    }

    // Valida se o pdfID existe
    var pdfID = document.getElementById('baixarpdf');
    if (pdfID) {
        pdfID.innerHTML = '';
    }
}
