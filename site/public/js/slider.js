let count = 1;
document.getElementById("radio1").checked = true;


  setInterval(function() {
    proximaImage();
  }, 6000); 

  function proximaImage() {
    count++;
    if (count > 5) {
      count = 1;
    }

    document.getElementById("radio" + count).checked = true;
  }


