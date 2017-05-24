/**
 * Created by tkim on 2016/12/20.
 */
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  IDocumentManager
} from '@jupyterlab/docmanager';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  Menu
} from '@phosphor/widgets';

import {
  IFrameWidget, IMainMenu, showDialog
} from '@jupyterlab/apputils';

import {

} from '@types/jquery';

import {
  CarmeSettings
} from "./settings";

/**
 * The compute instances list page extension.
 */
const plugin: JupyterLabPlugin<void> = {
  id: 'jupyter.extensions.settings',
  activate: activateSettings,
  autoStart: true,
  requires: [IMainMenu, IDocumentManager]
};

declare const features_enabled: [string];

declare const bg_color: string;
/**
 * Export the plugin as default.
 */
export default plugin;

export * from "./settings";

// -----------------------------------------------------------

/**
 * Activate the help handler extension.
 *
 * @param app - The phosphide application object.
 * @param mainMenu
 * returns A promise that resolves when the extension is activated.
 */
function activateSettings(app: JupyterLab, mainMenu: IMainMenu, documentManager: IDocumentManager): Promise<void> {
  console.debug("--------------activateSettings---------------");

  if (features_enabled.indexOf('Menu_Settings') < 0) {
    console.log('Disabling carme setting plugin because it is not allowed feature by role');
    return;
  }


  /****************************************************************************
   * pre process
   ***************************************************************************/
  let {commands} = app;
  let menu = new Menu({commands});

  /****************************************************************************
   * ResourceUsage Widget
   ***************************************************************************/

  /**
   * 'settings-baseapiurl' Command Begin
   */
  let settings_baseapiurl = 'settings-baseapiurl';
  app.commands.addCommand(settings_baseapiurl, {
    label: 'Edit Base API URL',
    execute: () => {
      // Private.dialogDemo();
      Private.inputSettingsBaseApiUrl(CarmeSettings.BaseApiUrl);
    }
  });

  /**
   * 'settings-baseapiurl' Command Begin
   */
  let settings_openiframe = 'settings_openiframe';
  app.commands.addCommand(settings_openiframe, {
    label: 'Enter URL to open as a widget',
    execute: () => {
      Private.inputIframeWidgetUrl(app);
    }
  });


  /**
   * 'settings-opendocument' Command Begin
   */
  let settings_opendocument = 'settings_opendocument';
  app.commands.addCommand(settings_opendocument, {
    label: 'Enter Document path to open',
    execute: () => {
      Private.inputDocumentFilePath(app, documentManager);
    }
  });


  /****************************************************************************
   * post process
   ***************************************************************************/

  // add to menu
  menu.title.label = 'Settings';
  menu.addItem({command: settings_baseapiurl});
  menu.addItem({command: settings_openiframe});
  menu.addItem({command: settings_opendocument});
  mainMenu.addMenu(menu, {rank:90});

  /****************************************************************************
   * custom setting
   ***************************************************************************/

  console.log(`bg_color is ${bg_color}`);
  if (bg_color) {
    console.log("hello here");

    let nodes = document.querySelectorAll('#jp-main-dock-panel');
    for (let i = 0; i < nodes.length; i++) {
      console.log("found " + i);
      (<HTMLElement>nodes[i]).style.backgroundColor = bg_color;
    }

    $('#jp-main-dock-panel').css('background-color', bg_color);
    // console.log('background-color is ' + $('#jp-main-dock-panel').css('background-color'));
    $('#jp-MainMenu').css('background-color', bg_color);
    $('#jp-top-panel').css('background-color', bg_color);
  } else {
    console.log('bg_color is undefined??');
  }

  return Promise.resolve(void 0);

}


/**
 * A namespace for private data.
 */
namespace Private {
  /**
   * Get a base api url from the user.
   */
  export
  function inputSettingsBaseApiUrl(default_msg: string = CarmeSettings.BaseApiUrl): Promise<string> {
    let input = document.createElement('input');
    input.value = default_msg;
    let options = {
      title: 'Input Base API URL',
      body: input,
      primaryElement: input,
      okText: 'SAVE'
    };
    return showDialog(options).then(result => {
      if (result.accept) {
        CarmeSettings.BaseApiUrl = input.value;
        console.log('Carme BaseAPiUrl was changed to ' +  CarmeSettings.BaseApiUrl);
      }
      return null;
    });
  }

  /**
   * Get a url to open as a widget from the user.
   */
  export
  function inputIframeWidgetUrl(app: JupyterLab, default_url: string = null): Promise<string> {
    let input = document.createElement('input');
    input.value = default_url;

    let options = {
      title: 'Input URL to open as a widget',
      body: input,
      primaryElement: input,
      okText: 'OPEN'
    };
    return showDialog(options).then(result => {
      if (result.accept) {
        let iframe = new IFrameWidget();
        iframe.url = input.value;
        iframe.id = input.value;
        iframe.title.label = input.value;
        iframe.title.closable = true;
        iframe.node.style.overflowY = 'auto';

        if (!iframe.isAttached) {
          app.shell.addToMainArea(iframe);
          app.shell.activateById(iframe.id);
        }
        return null;
      }
    });
  }

  /**
   * Get a new file path from the user.
   */
  export
  function inputDocumentFilePath(app: JupyterLab, documentManager: IDocumentManager, default_path: string = null): Promise<string> {
    let input = document.createElement('input');
    input.value = default_path;

    let options = {
      title: 'Input filepath to open as a widget',
      body: input,
      primaryElement: input,
      okText: 'OPEN'
    };
    return showDialog(options).then(result => {
      if (result.accept) {
        documentManager.openOrReveal(input.value);
        return null;
      }
    });
  }

  export
  function dialogDemo(): void {
    let body = document.createElement('div');
    let input = document.createElement('input');
    input.value = 'Untitled.ipynb';
    let selector = document.createElement('select');
    let option0 = document.createElement('option');
    option0.value = 'python';
    option0.text = 'Python 3';
    selector.appendChild(option0);
    let option1 = document.createElement('option');
    option1.value = 'julia';
    option1.text = 'Julia';
    selector.appendChild(option1);
    body.appendChild(input);
    body.appendChild(selector);
    showDialog({
      title: 'Create new notebook',
      body: body
    }).then(result => {
      if (result.accept) {
        console.log('input:' + input.value);
        console.log('select:' + selector.value);
      }
    })
  }
}