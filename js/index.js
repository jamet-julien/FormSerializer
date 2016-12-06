var oForm = document.getElementById('form'),
    oData = new FormSerializer(
                  oForm.querySelectorAll( 'input, textarea, select'),
                  function( aData){
                      //console.log( aData);
                  }
                );

  oForm.onsubmit = function(e){
      e.preventDefault();

      console.log( oData.data);

      return false;
  };
