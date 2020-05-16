/**
 * @author mrdoob / http://mrdoob.com/
 */

import * as THREE from '../../build/three.module.js';

import { UIPanel, UIText, UIImage } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';

var MenubarStatus = function ( editor ) {

	var strings = editor.strings;

	var container = new UIPanel();
	container.setClass( 'menu right' );

  var autosave = new UIBoolean( editor.config.getKey( 'autosave' ), strings.getKey( 'menubar/status/autosave' ) );
	autosave.onChange( function () {

		var value = this.getValue();

		editor.config.setKey( 'autosave', value );

		if ( value === true ) {

			editor.signals.sceneGraphChanged.dispatch();

		}

	} );
	container.add( autosave );

	editor.signals.savingStarted.add( function () {

		autosave.text.setTextDecoration( 'underline' );

	} );

	editor.signals.savingFinished.add( function () {

		autosave.text.setTextDecoration( 'none' );

	} );
  
  var credits = new UIText( 'powered by' );
	credits.setClass( 'title' );
	credits.setOpacity( 0.5 );
  container.add( credits );
  
  var threejsLogo = new UIText( 'three.js' );
  threejsLogo.setClass( 'title' );
  threejsLogo.dom.style.fontFamily = 'Roboto Mono, monospace';
  threejsLogo.setOpacity( 0.5 );
  container.add( threejsLogo );
  
  var version = new UIText( 'r' + THREE.REVISION );
  version.setClass( 'title' );
  version.dom.style.fontFamily = 'Roboto Mono, monospace';
	version.setOpacity( 0.5 );
  container.add( version );

	return container;

};

export { MenubarStatus };
