class Console {
  __history = {};
  __options = {};
  __element = {};
  __deliver( type , text ) {
    if ( !text.length ) return this;
    var content = '' , logHTML = '' , root = this;
    var icons = {
      e : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z"/></svg>`,
      i : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"/></svg>`,
      s : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>`,
      w : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"/></svg>`,
      v : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM339.8 211.8C350.7 200.9 350.7 183.1 339.8 172.2C328.9 161.3 311.1 161.3 300.2 172.2L192 280.4L147.8 236.2C136.9 225.3 119.1 225.3 108.2 236.2C97.27 247.1 97.27 264.9 108.2 275.8L172.2 339.8C183.1 350.7 200.9 350.7 211.8 339.8L339.8 211.8z"/></svg>`,
      l : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256c0 141.4 114.6 256 256 256s256-114.6 256-256C512 114.6 397.4 0 256 0zM358.6 278.6l-112 112c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25L290.8 256L201.4 166.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l112 112C364.9 239.6 368 247.8 368 256S364.9 272.4 358.6 278.6z"/></svg>`,
    };

    if ( ![ 'log' , 'info' , 'error' , 'success' , 'valid' , 'warn' ].includes( type ) ) type = 'message';

    text.forEach(( item , i ) => {
      logHTML += `${String( item )} `;
      if ( typeof item === 'number' || typeof item === 'boolean' ) item = Js.ce( 'span' , '.purple' , String( item ) ).toString();
      if ( typeof item === 'undefined' || item === undefined || item === null ) item = Js.ce( 'span' , '.opaque' , String( item ) ).toString();
      content += String( item );
      if ( i < text.length - 1 ) content += ' &nbsp;';
    });

    content = Js.urlify( content )/*.replace( /<a/g , '<link-span' ).replace( /<\/a>/g , '</link-span>')*/;

    if ( root.__history && content === root.__history.text && type === root.__history.type ) {
      var element = root.__element.lodger.children().last().find( 'console-count' );
      element.html( ( ( +element.html() || 1 ) + 1 ) );

    } else {
      var element = Js.ce(
        'console-element',
        '.console-' + type,
        [
          Js.ce(
            'console-icon',
            '.console-workspace-svg-holder',
            ( icons[ type.charAt( 0 ).toLowerCase() ] ),
          ),
          Js.ce('console-count'),
          Js.ce(
            'console-content',
            [
              Js.ce(
                'console-stamp',
                null,
                `${Js.time.times()} `,
              ).attr( 'title' , Js.time.full() ),
              Js.ce( 'console-text' ).html( content ),
            ],
          ),
        ],
      ).appendTo( root.__element.lodger );
      element.find( 'console-text' ).find( 'a' ).each(function(item) {
        item.attr( 'title' , `Dblclick open : ${item.attr( 'href' )}` );
      });
    }

    if ( root.__options.display ) {
      clearTimeout( Js( root.__options.display ).data( 'consoleWorkspaceAutoHide' ) );
      Js( root.__options.display ).html( logHTML ).data( 'consoleWorkspaceAutoHide' , setTimeout(function () {
        Js( root.__options.display ).empty();
      }, 5000));
    }

    root.__history = {
      text : content,
      type : type,
    };

    if ( ( parseInt( r.__options.maxLength ) || 0 ) && root.__element.lodger.children().length > ( parseInt( root.__options.maxLength ) || 0 ) ) root.__element.lodger.children().first().remove();

    return this;
  }
  constructor( options ) {
    var root = this;

    if ( Is.object( options ) ) {
      this.__options = options;
    } else if ( Is.string( options ) || ( Is.function( options ) && ( options = options() ) && String( options ) ) ) {
      this.__options.workspace = options;
    }

    var workspace = Js( root.__options.workspace );
    if ( !workspace.length ) return root;
    root.__element.workspace = workspace;
    workspace = workspace.shadow();
    root.__element.shadow = workspace;
    Js.styleSheet([
      {
        'console-workspace-inset::-webkit-scrollbar' : {
          width : '.8em',
          height : '.8em',
        },
        'console-workspace-inset::-webkit-scrollbar-button' : {
          width : '0',
          height : '0',
        },
        'console-workspace-inset::-webkit-scrollbar-corner' : {
          background : 'transparent',
        },
        'console-workspace-inset::-webkit-scrollbar-thumb' : {
          backgroundColor : '#abb2bf',
          borderWidth : '0 .3em',
          borderStyle : 'solid',
          borderColor : 'transparent',
          backgroundClip : 'padding-box',
          minHeight : '1.5em',
          minWidth : '1.5em',
          WebkitBoxShadow : 'none',
          boxShadow : 'none',
        },
        'console-workspace-inset::-webkit-scrollbar-track' : {
          backgroundColor : 'transparent',
          backgroundClip : 'padding-box',
          border : '.1em solid transparent',
        },
        'console-workspace-inset::-webkit-scrollbar-track-piece' : {
          borderWidth : '0',
        },
        'console-workspace-inset::-webkit-scrollbar-thumb:active' : {
          borderWidth : '0',
        },
      },
      {
        ':host' : {
          position : 'relative',
          boxSizing : 'border-box',
        },
        ':host *' : {
          boxSizing : 'border-box',
          outline : 'none !important',
        },
        'console-workspace-inset' : {
          fontFamily : '"Consolas" !important',
          paddingBottom : '3em',
          fontSize : '12px',
          display : 'flex',
          flexDirection : 'column-reverse',
          position : 'absolute',
          background : 'transparent',
          inset : '0',
          overflow : 'hidden auto',
          cursor : 'auto',
        },
        'console-workspace-offset' : {
          display : 'block',
          marginBottom : 'auto',
          width : '100%',
          WebkitUserSelect : 'text',
          userSelect : 'text',
        },
        'console-workspace-logset' : {
          display : 'block',
          width : '100%',
        },
        '.console-workspace-svg-holder' : {
          width : '2em',
          minWidth : '2em',
          maxWidth : '2em',
          display : 'inline-flex',
          justifyContent : 'center',
          alignItems : 'center',
          marginRight : '.3em',
        },
        '.console-workspace-svg-holder svg' : {
          maxWidth : '2em',
          width : '1em',
          fill : 'currentColor',
          maxHeight : '2em',
        },
      },
      {
        'console-element' : {
          padding : '.25em 2em .25em 0',
          whiteSpace : 'initial',
          wordWrap : 'break-word',
          borderBottomWidth : '1px',
          borderBottomStyle : 'solid',
          borderColor : '#7777',
          display : 'flex',
          width : '100%',
          flexDirection : 'row',
          flexWrap : 'nowrap',
          justifyContent : 'flex-start',
          alignItems : 'baseline',
          minHeight : '2.286em',
        },
        'console-count' : {
          display : 'inline-flex',
          flexWrap : 'nowrap',
          whiteSpace : 'nowrap',
          height : '14px',
          lineHeight : '1em',
          alignItems : 'center',
          padding : '.1em .75em 0',
          fontSize : '.9em',
          marginRight : '1em',
          background : '#2c68df',
          borderRadius : '1.5em',
          color : '#fff',
          userSelect : 'none',
          WebkitUserSelect : 'none',
        },
        'console-count:empty' : {
          display : 'none',
        },
        'console-content' : {
          alignItems : 'baseline',
          justifyContent : 'flex-start',
          flex : '1',
          whiteSpace : 'initial',
          wordWrap : 'break-word',
          display : '-webkit-box',
          WebkitLineClamp : '100',
          WebkitBoxOrient : 'vertical',
          overflow : 'hidden',
        },
        'console-stamp' : {
          float : 'right',
          fontSize : '.8em',
          textDecoration : 'underline',
          cursor : 'default',
          paddingLeft : '1em',
          overflow : 'hidden',
          whiteSpace : 'nowrap',
          color : '#727888 !important',
        },
        'console-text' : {
          fontWeight : '500',
        },
        'console-element.console-log' : {},
        'console-element.console-info' : {},
        'console-element.console-warn' : {
          color : '#ffa500',
          background : '#eed20244',
        },
        'console-element.console-error' : {
          color : '#ff0000',
          background : '#ff634744',
        },
        'console-element.console-success' : {
          color : '#3cb371',
          background : '#73c99044',
        },
        'console-element.console-valid' : {
          color : '#4285f4',
          background : '#4285f444',
        },
        '.purple' : {
          color : '#8a2be2 !important',
        },
        '.opaque' : {
          opacity : '.7 !important',
        },
        'a.link' : {
          color : 'initial !important',
          cursor : 'pointer !important',
          textDecoration : 'underline !important',
        },
        'console-icon, console-count' : {
          position : 'sticky',
          top : '.8em',
          marginBottom : '.4em',
        },
      },
    ], workspace , '#console-style-agent' ).append(
      Js.cssStyle( root.__options.override )
    );

    Js.ce(
      'console-workspace-inset',
      Js.ce(
        'console-workspace-offset',
        Js.ce(
          'console-workspace-logset',
        ),
      ),
    ).addClass( root.__options.addClass ).appendTo( workspace );

    root.__element.lodger = workspace.find( 'console-workspace-logset' );
  }
  clear() {
    Js( this.__element.lodger ).empty();
    return this;
  }
  log( ...args ) {
    return this.__deliver( 'log' , args );
  }
  info( ...args ) {
    return this.__deliver( 'info' , args );
  }
  error( ...args ) {
    return this.__deliver( 'error' , args );
  }
  warn( ...args ) {
    return this.__deliver( 'warn' , args );
  }
  success( ...args ) {
    return this.__deliver( 'success' , args );
  }
  valid( ...args ) {
    return this.__deliver( 'valid' , args );
  }
}
