( function( scope){

  FormSerializer = function( oData, fAction ){

    var _element     = null,
        _isForm      = false,
        _data        = new FormData(),
        _action      = fAction || function( aData){},
        _scope       = this,
        _dynFunction = {};

    if( oData instanceof NodeList){

      _element = [].slice.call( oData);

    }else if( oData instanceof Element){

      if( oData.tagName.toLowerCase() !== 'form'){
        _element = [oData];
      }else{
        _isForm = true;
        _data   = new FormData( oData);
      }

    }

/***************************************************
  ______   ___   _
 |  _ \ \ / / \ | |
 | | | \ V /|  \| |
 | |_| || | | |\  |
 |____/ |_| |_| \_|
***************************************************/
    /**
     * [_buildInputGetValue description]
     * @param  {[type]} oElement [description]
     * @param  {[type]} sKey     [description]
     * @param  {[type]} action   [description]
     * @return {[type]}          [description]
     */
    _dynFunction._buildInputGetValue = function( oElement, sKey, action) {
     return function( e){
       _insert( sKey, oElement.value);
       action.call( null, _data);
     };
    }

    /**
    * [_buildCheckboxGetValue description]
    * @param  {[type]} oElement [description]
    * @param  {[type]} sKey     [description]
    * @param  {[type]} action   [description]
    * @return {[type]}          [description]
    */
    _dynFunction._buildCheckboxGetValue = function( oElement, sKey, action) {
       return function( e){

       if( oElement.checked){
         _insert( sKey, oElement.value);
       }else if( _data.has( sKey)){
         _data.delete( sKey);
       }
       action.call( null, _data);
     };
    }

    /**
    * [_buildFileGetValue description]
    * @param  {[type]} oElement [description]
    * @param  {[type]} sKey     [description]
    * @param  {[type]} action   [description]
    * @return {[type]}          [description]
    */
    _dynFunction._buildFileGetValue = function( oElement, sKey, action) {
       return function( e){

       if( oElement.files[0]){
         _insert( sKey, oElement.files[0], oElement.value);
       }else if( _data.has( sKey)){
         _data.delete( sKey);
       }else{
         _insert( sKey, oElement.value);
       }

       action.call( null, _data);
     };
    }

/****************************************************
  _____ _   _ _   _  ____ _____ ___ ___  _   _
 |  ___| | | | \ | |/ ___|_   _|_ _/ _ \| \ | |
 | |_  | | | |  \| | |     | |  | | | | |  \| |
 |  _| | |_| | |\  | |___  | |  | | |_| | |\  |
 |_|    \___/|_| \_|\____| |_| |___\___/|_| \_|

*****************************************************/

    /**
     * [_init description]
     * @return {[type]} [description]
     */
    function _init(){
      var i        = 0,
          iLen     = _element.length,
          oElement = null,
          oData    = {},
          sKey     = '';

      for(; i < iLen ; i++ ){

        oElement = _element[ i ];
        sKey     = oElement.getAttribute( "name") || '';

        if( sKey !== ''){
          _computeListener( sKey, oElement);
        }
      }
    }

    /**
     * [_insert description]
     * @param  {[type]} sKey   [description]
     * @param  {[type]} sValue [description]
     * @return {[type]}        [description]
     */
    function _insert( sKey, sValue, filename){

      var fInsert = _data.has( sKey)? 'set' : 'append';
      _data[ fInsert ].apply( _data, arguments);

    }

    /**
     *
     */
    function _computeListener( sKey, oElement){

      var sName   = oElement.tagName.toLowerCase(),
          sType   = (oElement.getAttribute('type') || '').toLowerCase(),
          sAction = sName !== 'select' ? 'input' : 'change',
          sMethode = '_buildInputGetValue',
          fAction;

      sAction = ( !~[ 'radio', 'checkbox', 'file'].indexOf( sType))? sAction : 'change';

      if( sType == 'checkbox'){
        sMethode = '_buildCheckboxGetValue'
      }else if( sType == 'file'){
        sMethode = '_buildFileGetValue';
      }

      fAction = _dynFunction[ sMethode ]( oElement, sKey, _action);

      oElement.addEventListener( sAction, fAction);
      fAction();
    }


      _isForm || _init();

      return {
        data : _data
      }
    };

  scope.FormSerializer = FormSerializer;

})(window);
