var oForm = document.getElementById('form'),
    oData = new FormSerializer(
                  oForm.querySelectorAll( 'input, textarea, select'),
                  function( aData){
                      //console.log( aData);
                  }
                );

  oForm.onsubmit = function(e){
      var string;
      e.preventDefault();

      for(var data of oData.formData.entries()){
         console.log(data[0]+' => '+data[1]);
      }

      console.log( oData.object);

      return false;
  };
