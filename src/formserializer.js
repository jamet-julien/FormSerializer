( function( scope){

  FormSerializer = function( oForm, fAction ){

    element = null;
    data    = {};
    action  = fAction || function( aData){};

    if( oForm instanceof NodeList){
      element = [].slice.call( oForm);
    }else if( oForm instanceof Element){
      element = [oForm];
    }

   _init();

    function _init(){

      var i        = 0,
          iLen     = element.length,
          oElement = null,
          oData    = {},
          sKey     = '';

      for(; i < iLen ; i++ ){

        oElement      = element[ i ];
        sKey          = oElement.hasAttribute( "name") ? oElement.getAttribute( "name") : '';

        if( sKey !== ''){
          _computeListener( sKey, oElement);
        }
      }
    }

    /**
     *
     */
    function _computeListener( sKey, oElement){

      var sName   = oElement.tagName.toLowerCase(),
          sType   = (oElement.getAttribute('type') || '').toLowerCase(),
          sAction = sName !== 'select' ? 'input' : 'change',
          fAction = (function( oElement, data, action) {
            return function( e){
              data[ sKey ] = oElement.value;
              action.call( null, data);
            };
          })(oElement, data, action);

      sAction = ( !~[ 'radio', 'checkbox'].indexOf( sType))?  sAction : 'change';

      if( sType == 'checkbox'){

        fAction = (function( oElement, data, action) {
                    return function( e){
                    if( oElement.checked){
                      data[ sKey ] = oElement.value;
                    }else if( data.hasOwnProperty( sKey)){
                      delete data[ sKey ];
                    }
                    action.call( null, data);
                  };
                })(oElement, data, action);


      }
      oElement.addEventListener( sAction, fAction);
      fAction();
    }


    return {
      data : data
      }
    };

  scope.FormSerializer = FormSerializer;

})(window);
