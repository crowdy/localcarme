/**
 * Created by tkim on 2017/04/14.
 */
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  Menu
} from '@phosphor/widgets';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  MainMenu, IMainMenu
} from '@jupyterlab/apputils';

import {
  CarmeSettings
} from "@carme/carme-settings";

/**
 * The user assignments list page extension.
 */
const plugin: JupyterLabPlugin<void> = {
  id: 'jupyter.extensions.profile',
  activate: activateProfile,
  autoStart: true,
  requires: [IMainMenu]
};

/**
 * Export the plugin as default.
 */
export default plugin;

// -----------------------------------------------------------

/**
 * Activate the help handler extension.
 *
 * @param app - The phosphide application object.
 * @param mainMenu
 * @param palette
 * returns A promise that resolves when the extension is activated.
 */
function activateProfile(app: JupyterLab, mainMenu: IMainMenu): Promise<void> {
  console.debug("--------------activateProfile---------------");

  // this function is available for every one

  // logout command
  let command_logout = `Profile:logout`;
  app.commands.addCommand(command_logout, {
    label: `Log Out`,
    execute: () => {
      window.location.assign(CarmeSettings.LoginUrl);
      
    }
  });

  // Profile menu
  let {commands} = app;
  let menu = new Menu({commands});
  menu.title.label = 'Profile';
  menu.addItem({command: command_logout});


  // add menu to the main menu
  (<MainMenu>mainMenu).addMenu(menu, {rank: -50});

  return Promise.resolve(void 0);
}
