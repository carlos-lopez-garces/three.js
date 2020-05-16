/**
 * @author mrdoob / http://mrdoob.com/
 */

import { UIPanel, UIRow, UISelect, UIText, UIInteger } from './libs/ui.js';
import { UIBoolean } from './libs/ui.three.js';

import { SidebarSettingsViewport } from './Sidebar.Settings.Viewport.js';
import { SidebarSettingsShortcuts } from './Sidebar.Settings.Shortcuts.js';

var SidebarSettings = function ( editor ) {

	var config = editor.config;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setBorderTop( '0' );
	container.setPaddingTop( '20px' );
  container.setPaddingBottom( '20px' );
  
  // Uses IndexedDB to save.
  var autosaveRow = new UIRow();
  var autosave = new UIBoolean( editor.config.getKey( 'autosave' ) );  
	autosave.onChange( function () {
		var value = this.getValue();
		editor.config.setKey( 'autosave', value );
		if ( value === true ) {
			editor.signals.sceneGraphChanged.dispatch();
		}
	} );
	container.add( autosaveRow );
	editor.signals.savingStarted.add( function () {
		autosave.text.setTextDecoration( 'underline' );
	} );
	editor.signals.savingFinished.add( function () {
		autosave.text.setTextDecoration( 'none' );
  } );
  autosaveRow.add( new UIText( strings.getKey( 'sidebar/settings/autosave' ) ).setWidth( '90px' ) );
  autosaveRow.add( autosave );

	// language

	var options = {
		en: 'English',
		fr: 'Français',
		zh: '中文'
	};

	var languageRow = new UIRow();
	var language = new UISelect().setWidth( '150px' );
	language.setOptions( options );

	if ( config.getKey( 'language' ) !== undefined ) {

		language.setValue( config.getKey( 'language' ) );

	}

	language.onChange( function () {

		var value = this.getValue();

		editor.config.setKey( 'language', value );

	} );

	languageRow.add( new UIText( strings.getKey( 'sidebar/settings/language' ) ).setWidth( '90px' ) );
	languageRow.add( language );

	container.add( languageRow );

	// export precision

	var exportPrecisionRow = new UIRow();
	var exportPrecision = new UIInteger( config.getKey( 'exportPrecision' ) ).setRange( 2, Infinity );

	exportPrecision.onChange( function () {

		var value = this.getValue();

		editor.config.setKey( 'exportPrecision', value );

	} );

	exportPrecisionRow.add( new UIText( strings.getKey( 'sidebar/settings/exportPrecision' ) ).setWidth( '90px' ) );
	exportPrecisionRow.add( exportPrecision );

	container.add( exportPrecisionRow );

	//

	container.add( new SidebarSettingsShortcuts( editor ) );
	container.add( new SidebarSettingsViewport( editor ) );

	return container;

};

export { SidebarSettings };
