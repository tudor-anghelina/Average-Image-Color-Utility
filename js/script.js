  var imageNumber = '';
  var canvas = '';
  var ctx = '';
  var hex = "#";
  var imageSrcB = "";
  var bImage = "";

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function changeImage() {
    $.get("https://pixabay.com/api/?key=355419-f41a9c70d1c5acb1ab9f5d1f9&editors_choice=true&image_type=photo", function(data) {
      imageNumber = Math.floor((Math.random() * 19));
      $('body').css('background-image', 'url(' + data.hits[imageNumber].webformatURL + ')');
      $('#average-color').css('background-image', 'url(' + data.hits[imageNumber].webformatURL + ')');
      var image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = data.hits[imageNumber].webformatURL;
      $('#preloader-image').attr('src', data.hits[imageNumber].webformatURL);
      $('#preloader-image').on('load', function() {
        ctx.drawImage(image, 0, 0, 1, 1);
        var p = ctx.getImageData(0, 0, 1, 1).data;
        var bw = '';
        var wb = '';
        var wwb = '';
        var hex = rgbToHex(p[0], p[1], p[2]);
        var rgb = p[0] + ',' + p[1] + ',' + p[2];
        var rgbOpposite = (255 - p[0]) + ', ' + (255 - p[1]) + ', ' + (255 - p[2]);
        var hexOpposite = rgbToHex((255 - p[0]), (255 - p[1]), (255 - p[2]));
        $('.carousel-item > h1').css('color', hex);
        if ((p[0] + p[1] + p[2]) > 382) {
          bw = "rgba(0, 0, 0, 0.75)";
          wb = "#000";
          wwb ="#fff";
          $('.btn-dark').addClass('btn-light');
          $('.btn-dark').removeClass('btn-dark');
          $('.custom-file').removeClass('dark-file');
        } else {
          bw = "rgba(255, 255, 255, 0.75)";
          wb = "#fff";
          wwb = "#000";
          $('.btn-light').addClass('btn-dark');
          $('.btn-light').removeClass('btn-light');
          $('.custom-file').addClass('dark-file');
        }
        $('.carousel-item > h1').css('text-shadow', '1px 1px 1px ' + wb);
        $('.navbar').css('background-color', bw);
        $('#carouselExampleIndicators').css('background-color', bw);
        $('#toolbar-container').css('background-color', bw);
        $('.addsContainer').css('background-color', bw);
        $('#average-color-bar').css('background-color', hex);
        $('.carousel-item span').css('color', wwb);
        $('.navbar-brand').css('color', hex);
        $('.navbar-brand').css('text-shadow', '1px 1px 1px ' + wb);
        $('.nav-item .nav-link').css('color', 'rgba(' + rgb + ', 0.75)');
        $('.nav-item .nav-link').css('text-shadow', '1px 1px 1px ' + wb);
        $('.active .nav-link').css('color', hex);
        $('.active .nav-link').css('text-shadow', '1px 1px 1px ' + wb);
        $('#average-color-text').css('color', hex);
        $('#average-color-text').css('text-shadow', '1px 1px 1px ' + wb);
        console.log(hex);
        $('#average-color-text').text('Hex: ' + hex + '; RGB: rgb(' + rgb + ')');
      });
    });
  }

  function fromPixabay() {
    changeImage()
    $('#image-source-button').text('Pixabay Images');
    $('.dropdown-item').removeClass('active');
    $('#pb').addClass('active');
    $('.custom-file').hide();
    $('#change-image-btn').show();
  }

  function fromUpload() {
    $('#image-source-button').text('Upload Your Own Image');
    $('.dropdown-item').removeClass('active');
    $('#fu').addClass('active');
    $('.custom-file').show();
    $('#change-image-btn').hide();
  }

  var handleFileSelect = function(evt) {
    var file = evt.target.files[0];
    imageSrcB = 'data:' + file.type + ';base64,';
    $('.custom-file-control').text(file.name);
    var reader = new FileReader();
    reader.onload = function(readerEvt) {
      var binaryString = readerEvt.target.result;
      var b64 = btoa(binaryString);
      bImage = imageSrcB + b64;
      $('body').css('background-image', 'url(' + bImage + ')');
      $('#average-color').css('background-image', 'url(' + bImage + ')');
      var image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = bImage;
      $('#preloader-image').attr('src', bImage);
      $('#preloader-image').on('load', function() {
        ctx.drawImage(image, 0, 0, 1, 1);
        var p = ctx.getImageData(0, 0, 1, 1).data;
        var bw = '';
        var wb = '';
        var hex = rgbToHex(p[0], p[1], p[2]);
        var rgb = p[0] + ',' + p[1] + ',' + p[2];
        var rgbOpposite = (255 - p[0]) + ', ' + (255 - p[1]) + ', ' + (255 - p[2]);
        var hexOpposite = rgbToHex((255 - p[0]), (255 - p[1]), (255 - p[2]));
        $('.carousel-item > h1').css('color', hex);
        if ((p[0] + p[1] + p[2]) > 382) {
          bw = "rgba(0, 0, 0, 0.75)";
          wb = "#000";
          wwb = "#fff";
          $('.btn-dark').addClass('btn-light');
          $('.btn-dark').removeClass('btn-dark');
          $('.custom-file').removeClass('dark-file');
        } else {
          bw = "rgba(255, 255, 255, 0.75)";
          wb = "#fff";
          wwb = "#000";
          $('.btn-light').addClass('btn-dark');
          $('.btn-light').removeClass('btn-light');
          $('.custom-file').addClass('dark-file');
        }
        $('.carousel-item > h1').css('text-shadow', '1px 1px 1px ' + wb);
        $('.navbar').css('background-color', bw);
        $('#carouselExampleIndicators').css('background-color', bw);
        $('#toolbar-container').css('background-color', bw);
        $('.addsContainer').css('background-color', bw);
        $('#average-color-bar').css('background-color', hex);
        $('.carousel-item span').css('color', wwb);
        $('.navbar-brand').css('color', hex);
        $('.navbar-brand').css('text-shadow', '1px 1px 1px ' + wb);
        $('.nav-item .nav-link').css('color', 'rgba(' + rgb + ', 0.75)');
        $('.nav-item .nav-link').css('text-shadow', '1px 1px 1px ' + wb);
        $('.active .nav-link').css('color', hex);
        $('.active .nav-link').css('text-shadow', '1px 1px 1px ' + wb);
        $('#average-color-text').css('color', hex);
        $('#average-color-text').css('text-shadow', '1px 1px 1px ' + wb);
        console.log(hex);
        $('#average-color-text').text('Hex: ' + hex + '; RGB: rgb(' + rgb + ')');
      });
    };
    reader.readAsBinaryString(file);
  };

  $(document).ready(function() {
    canvas = document.getElementById("pixelCanvas");
    ctx = canvas.getContext("2d");
    $('#carouselExampleIndicators').css('height', ($(window).height() * 0.68) - 45 + 'px');
    $('.carousel-item').each(function() {
      $(this).css('height', ($(window).height() * 0.6) - 45 + 'px');
    });
    $('.carousel').carousel();
    changeImage();
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  });

  (adsbygoogle = window.adsbygoogle || []).push({});