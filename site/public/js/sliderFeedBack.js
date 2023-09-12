let x = 1;
  document.getElementById("radioFeedback1").checked = true;

  setInterval(function() {
    proximaImage();
  }, 4000); 

  function proximaImage() {
    x++;
    if (x > 5) {
      x = 1;
    }

    document.getElementById("radioFeedBack" + count).checked = true;
  }