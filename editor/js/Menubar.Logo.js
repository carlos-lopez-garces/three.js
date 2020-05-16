import { UIPanel, UIImage } from './libs/ui.js';

var MenubarLogo = function ( editor ) {

	var container = new UIPanel();
  container.setClass( 'menu' );
  container.setId('logo');

  var logo = new UIImage('images/hover-logo-house-only-white.svg');
  logo.setId( 'logo' );
	container.add( logo );

	return container;

};

export { MenubarLogo };
