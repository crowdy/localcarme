/**
 * Created by tkim on 2017/04/14.
 */
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  Menu, Widget
} from '@phosphor/widgets';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  IFrameWidget, IMainMenu, ICommandPalette
} from '@jupyterlab/apputils';

/**
 * The user assignments list page extension.
 */
const plugin: JupyterLabPlugin<void> = {
  id: 'jupyter.extensions.bookmark',
  activate: activateBookmark,
  autoStart: true,
  requires: [IMainMenu]
};


declare const features_enabled: [string];

/**
 * Export the plugin as default.
 */
export default plugin;

// -----------------------------------------------------------

/**
 * Book Marks
 * each item generates command whose id is 'BookMark-{name}:show'
 */
export const BookMarks = [
  /*
   {
   name: 'merriam webster',
   url: 'http://www.merriam-webster.com/',
   description: 'merriam webster dictionary'
   }, */
  {
    name: 'CARME blog',
    url: 'http://172.21.227.142:1313/',
    description: 'CARME blog',
    target: 'widget'
  },
  {
    name: 'CARME chatops(試し)',
    url: 'https://cldapi.slack.com/messages/carme/',
    description: 'CARME chatops',
    target: '_blank'
  },
 /*
   {
   name: 'music-for-programming',
   url: 'http://musicforprogramming.net/?one',
   description: 'music for programming'
   }, 
   {
   name: 'test rest api',
   url: `${CarmeSettings.BaseApiUrl}/dashboard/instances`,
   description: 'test rest api'
   }, */
  {
    name: '監視アラート対応手順',
    url: 'http://nc.internal-gmo/wiki/doku.php?id=management:vps:api:soft_alert',
    description: '監視アラート対応手順',
    target: 'widget'
  }

];

export const BookMarks_Carme = [
  {
    name: 'Carme Enterprise Dev (tyo2)',
    url: 'http://dev-manage-front21001.g1.tyo2.v4.internal-gmo:8080/login',
    description: 'Carme Enterprise Development Environment',
    target: '_blank'
  },
  {
    name: 'Carme Enterprise Prod (jpt1)',
    url: 'http://manage-front21001.g1.jpt1.v4.internal-gmo:8080/login',
    description: 'Carme Enterprise Production Envirionment',
    target: '_blank'
  },
  {
    name: 'Carme SuzuyoOEM Dev (gmo01)',
    url: 'http://dev-manage-front30001.g1.gmo01.v4.internal-gmo:8080/login',
    description: 'Carme SuzuyoOEM Development Environment',
    target: '_blank'
  },
  {
    name: 'Carme SuzuyoOEM Prod (odc01)',
    url: 'http://manage-front-j0b1001.g1.j0b1.v4.internal-gmo:8080/login',
    description: 'Carme SuzuyoOEM Production Environment',
    target: '_blank'
  },
  {
    name: 'Carme Enterprise Thai Prod (bkk2)',
    url: 'http://manage-front-j0a1001.g1.j0a1.v4.internal-gmo:8080/login',
    description: 'Carme Enterprise Thai Production Environment',
    target: '_blank'
  }
];

export const BookMarks_ApiMan = [
  {
    name: 'ApiMan Japan',
    url: 'http://dev-staff-api21001.g1.tyo2.v4.internal-gmo:8080/tool',
    description: 'ApiMan Japan',
    target: '_blank'
  },
  {
    name: 'ApiMan Thai',
    url: 'http://api-cache-j0a1001.g1.j0a1.v4.internal-gmo:8080/tool/home',
    description: 'ApiMan Thai',
    target: '_blank'
  }
];

export const BookMarks_CMS = [
  {
    name: 'LMS',
    url: 'http://projectx.internal-gmo/projects',
    description: 'LMS',
    target: '_blank'
  },
  {
    name: 'SMSN',
    url: 'http://smsn.sputnik.internal-gmo/projects/',
    description: 'SMSN',
    target: 'widget'
  },
  {
    name: 'SQIP',
    url: 'http://sqip.sputnik.internal-gmo/projects/',
    description: 'SQIP',
    target: 'widget'
  },
  {
    name: 'ITS',
    url: 'http://its.internal-gmo/projects/carme',
    description: 'ITS',
    target: 'widget'
  }
]

export const BookMarks_ETC = [
  {
    name: 'CARME presentation',
    url: '/files/presentation.html?transition_fade',
    description: 'CARME presentation資料',
    target: 'widget'
  },
  {
    name: 'hide tool',
    url: 'http://staff-api21001.g1.jpt1.v4.internal-gmo/hidetools/',
    description: 'hide tool',
    target: 'widget'
  },
  {
    name: 'extIP Stock',
    url: 'http://172.21.158.144:3000/dashboard/db/extip-stock?from=now-3d&to=now',
    description: 'extIP Stock',
    target: 'widget'
  },
  {
    name: 'revealjs',
    url: 'http://lab.hakim.se/reveal-js/#/',
    description: 'reveal.js the html presentation framework',
    target: 'widget'
  }
]

/**
 * Activate the help handler extension.
 *
 * @param app - The phosphide application object.
 * @param mainMenu
 * @param palette
 * returns A promise that resolves when the extension is activated.
 */
function activateBookmark(app: JupyterLab, mainMenu: IMainMenu, palette: ICommandPalette): Promise<void> {
  console.debug("--------------activateResourcetool---------------");

  if (features_enabled.indexOf('Menu_BookMark') < 0) {
    console.log('Disabling bookmark widget plugin because it is not allowed feature by role');
    return;
  }

  // create new commands and add them to app.commands
  function appendNewCommand(item:any) {
    let iframe: any = null;

    let command = `BookMark-${item.name}:show`;
    app.commands.addCommand(command, {
      label: item.name,
      execute: () => {

        if (item.target == '_blank') {
          let win = window.open(item.url, '_blank');
          win.focus();
        } else if (item.target == 'widget') {
          if (!iframe) {
            iframe = new IFrameWidget();
            iframe.url = item.url;
            iframe.id = item.name;
            iframe.title.label = item.name;
            iframe.title.closable = true;
            iframe.node.style.overflowY = 'auto';
          }

          if (iframe == null || !iframe.isAttached) {
            app.shell.addToMainArea(iframe);
            app.shell.activateById(iframe.id);
          } else {
            app.shell.activateById(iframe.id);
          }
        }
      }
    });
  }

  BookMarks.forEach(item => appendNewCommand(item));
  BookMarks_Carme.forEach(item => appendNewCommand(item));
  BookMarks_ApiMan.forEach(item => appendNewCommand(item));
  BookMarks_CMS.forEach(item => appendNewCommand(item));
  BookMarks_ETC.forEach(item => appendNewCommand(item));

  // add to mainMenu
  let menu = Private.createMenu(app);
  mainMenu.addMenu(menu, {rank:80});

  return Promise.resolve(void 0);
}

/**
 * A namespace for help plugin private functions.
 */
namespace Private {
  /**
   * Creates a menu for the help plugin.
   */
  export function createMenu(app: JupyterLab): Menu {

  	// menu
    let {commands} = app;

    let menu = new Menu({commands});
    menu.title.label = 'BookMark';
    BookMarks.forEach(item => menu.addItem({command: `BookMark-${item.name}:show`}));

    // submenu 'Carme Group'
  	let submenu_carme = new Menu({commands});
  	submenu_carme.title.label = 'Carme Group';
    BookMarks_Carme.forEach(item => submenu_carme.addItem({command: `BookMark-${item.name}:show`}));
    menu.addItem({ type: 'separator' });
    menu.addItem({ type: 'submenu', submenu: submenu_carme });

  	// submenu 'ApiMan Group'
  	let submenu_apiman = new Menu({commands});
  	submenu_apiman.title.label = 'ApiMan Group';
    BookMarks_ApiMan.forEach(item => submenu_apiman.addItem({command: `BookMark-${item.name}:show`}));
    menu.addItem({ type: 'submenu', submenu: submenu_apiman });

    // submenu 'CMS Group'
    let submenu_cms = new Menu({commands});
    submenu_cms.title.label = 'LMS / SMSN / SQIP';
    BookMarks_CMS.forEach(item => submenu_cms.addItem({command: `BookMark-${item.name}:show`}));
    menu.addItem({ type: 'submenu', submenu: submenu_cms });

    // submenu 'ETC'
    let submenu_etc = new Menu({commands});
    submenu_etc.title.label = 'etc';
    BookMarks_ETC.forEach(item => submenu_etc.addItem({command: `BookMark-${item.name}:show`}));
    menu.addItem({ type: 'submenu', submenu: submenu_etc });

    return menu;
  }

  /**
   * Attach the help iframe widget to the application shell.
   */
  export function attachHelp(app: JupyterLab, iframe: Widget): void {
    if (!iframe.isAttached) {
      app.shell.addToRightArea(iframe);
    }
  }

  /**
   * Show the help widget.
   */
  export function showHelp(app: JupyterLab, iframe: Widget): void {
    app.shell.activateById(iframe.id);
  }

  /**
   * Hide the help widget.
   */
  export function hideHelp(app: JupyterLab, iframe: Widget): void {
    if (!iframe.isHidden) {
      app.shell.collapseRight();
    }
  }

  /**
   * Toggle whether the help widget is shown or hidden.
   */
  export function toggleHelp(app: JupyterLab, iframe: Widget): void {
    if (iframe.isHidden) {
      showHelp(app, iframe);
    } else {
      hideHelp(app, iframe);
    }
  }
}