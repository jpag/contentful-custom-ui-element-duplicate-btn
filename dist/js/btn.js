
// This is the main entry point for widgets.
//
// The widget API reference explains in detail what you can do with
// the 'api' object.
  window.contentfulWidget.init(function (widget) {
  	var metaData = widget.entry.getSys()

  	console.log(widget);
  	console.log(' entry data', widget.entry ); 
    console.log(' meta ' , metaData);

    // console.log('fields ', widget.entry.getSys() );
    

    var btn = document.querySelector(".cf-btn-secondary");
    btn.addEventListener('click', duplicate );




    function duplicate(e) {
      console.log('--- lets duplicate!');

      // console.log(' entry data', widget.entry );

      var newFields = {};

      for(key in widget.entry.fields ){
        var field = widget.entry.fields[key];
        console.log(key, field);

        // only use the default locale data. we aren't translating.
        var localeData = field._fieldLocales[ field._defaultLocale ];

        // if( widget.field.id == field.id ){
          // potential match, verify the sys.id first before skipping.
          // do not copy over the duplicate button?
        // }

        
        if( typeof localeData._value == 'undefined' ){
          continue;
        }

        if( typeof localeData._value == 'string' ){

          var newVal = {};
  
          newVal[field._defaultLocale] = localeData._value;
          newFields[key] = newVal;

        }else{
          
          console.log(' value IS NOT STRING!');

          var newVal = {};
  
          newVal[field._defaultLocale] = localeData._value;
          newFields[key] = newVal;
            
        }

        
      }

      // data.sys.contentType ?
      var contentType = metaData.contentType;
      
      console.log(' contentType ' , contentType);
      
      console.log(' cid ' , contentType.sys.id);

      console.log('newFields', newFields);

      var obj = {
          // sys: {
          //   id: '-duplicate'
          // },

          fields: newFields
      };

      console.log(JSON.stringify(obj));




      widget.space
        .createEntry(contentType.sys.id, obj)
        .catch(function(error) {
          console.log('Error creating entry: ' + error.toString());
          throw error;
        });

    }

  });




