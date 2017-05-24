+++
date = "2017-02-28T17:19:18+09:00"
draft = true
title = "carme role"
categories = "setup"
+++


## Features with permission

* 'SideBar_Launcher'
* 'SideBar_Commands'
* 'SideBar_CloudCommands'
* 'SideBar_CloudCommands_LeftMenu'
* 'SideBar_Running'
* 'SideBar_Files'
* 'Menu_Files'
* 'Menu_Notebook'
* 'Menu_Editor'
* 'Menu_Terminal'
* 'Menu_Console'
* 'Menu_Settings'
* 'Menu_BookMark'
* 'Menu_Help'
* 'Widget_Landing'


## the permission logic for each feature


* 'SideBar_Launcher'
    src/launcher/plugin.ts class LandingModel function activate()
        if (features_enabled.indexOf('SideBar_Launcher') < 0) {
            console.log('Disabling launcher plugin because it is not allowed feature by role');
            return;
        }

* 'SideBar_Commands'
    src/commandpalette/plugin.ts function activate()
        if (features_enabled.indexOf('SideBar_Commands') < 0) {
            console.log('Disabling commands palette plugin because they are not allowed feature by role');
            return;
        }
    src/about/plugin.ts function activate()
          if (features_enabled.indexOf('SideBar_Commands') >= 0) {
            palette.addItem({command, category});
          }
    src/application/plugin.ts
          if (features_enabled.indexOf('SideBar_Commands') >= 0) {
            palette.addItem({ command: commandId, category: 'Main Area' });
          }
    src/faq/plugin.ts
          if (features_enabled.indexOf('SideBar_Commands') >= 0) {
            palette.addItem({ command, category });
          }
    src/help/plugin.ts
          if (features_enabled.indexOf('SideBar_Commands') >= 0) {
              RESOURCES.forEach(args => { palette.addItem({ args, command, category }); });
              palette.addItem({ command: 'statedb:clear', category });
          }
          if (features_enabled.indexOf('SideBar_Commands') >= 0) {
            palette.addItem({command: openClassicNotebookId, category});
          }
    src/imagewidget/plugin.ts
          if (features_enabled.indexOf('SideBar_Commands') >= 0) {
            [zoomInImage, zoomOutImage, resetZoomImage]
              .forEach(command => palette.addItem({command, category}));
          }
    src/inspector/plugin.ts
          if (features_enabled.indexOf('SideBar_Commands') >= 0) {
              palette.addItem({command, category});
          }
    src/filebrowser/plugin.ts
        if (features_enabled.indexOf('SideBar_Commands') >= 0) {
          disposables.add(
            palette.addItem({ command, category })
          );
        }
        ...
          if (features_enabled.indexOf('SideBar_Commands') >= 0) {
            [
              cmdIds.save,
              cmdIds.restoreCheckpoint,
              cmdIds.saveAs,
              cmdIds.close,
              cmdIds.closeAllFiles,
            ].forEach(command => { palette.addItem({ command, category }); });
          }
    src/codemirror/plugins.ts function activateEditorCommands()
      if (features_enabled.indexOf('SideBar_Commands') >= 0) {
        [
          cmdIds.lineNumbers,
          cmdIds.lineWrap,
          cmdIds.matchBrackets,
          cmdIds.vimMode,
          cmdIds.createConsole,
          cmdIds.runCode,
        ].forEach(command => palette.addItem({ command, category: 'Editor' }));
      }
    src/notebook/plugins.ts activateNotebookHandler()
      if (features_enabled.indexOf('SideBar_Commands') >= 0) {
        populatePalette(palette);
      }


* 'SideBar_CloudCommands'
    src/carme_cloudpalette/plugin.ts function activateCloudPalette()
        if (features_enabled.indexOf('SideBar_CloudCommands') < 0) {
            console.log('Disabling cloud command palette plugin because they are not allowed feature by role');
            return;
        }

    src/carme_compute/plugin.ts function activateCompute()
    src/carme_network/plugin.ts function activateNetwork()
    src/carme_cloudresource/plugin.ts function activateCloudResource()
        if (features_enabled.indexOf('SideBar_CloudCommands') < 0) {
            console.log('Disabling cloud command palette plugin because they are not allowed feature by role');
            return;
        }

* 'SideBar_CloudCommands_LeftMenu'
    src/carme_cloudresource/plugin.ts function activateCloudResource() * 2 places
          if (features_enabled.indexOf('SideBar_CloudCommands_LeftMenu') >= 0) {
            r.on('contextmenu', (event: JQueryMouseEventObject) => {
              event.preventDefault();
              instanceswidget.selectedGuid = data[8]; // instance guid
              instances_contextMenu.open(event.clientX, event.clientY);
            });
          }
    src/carme_compute/plugin.ts function activateCompute()
          if (features_enabled.indexOf('SideBar_CloudCommands_LeftMenu') >= 0) {
            $(row).on('contextmenu', (event: JQueryMouseEventObject) => {
              event.preventDefault();
              computehostswidget.selectedGuid = data[0]; // hostname
              Private.previous_description = data[10]; // description
              computehosts_contextMenu.open(event.clientX, event.clientY);
            });
          }


* 'SideBar_Running'
    src/running/plugins.ts function activate()
        if (features_enabled.indexOf('SideBar_Running') < 0) {
            console.log('Disabling running palette plugin because it is not allowed feature by role');
            return;
        }


* 'SideBar_Files'
* 'Menu_Files'
    src/filebrowser/plugins.ts function activate()
        if (features_enabled.indexOf('Menu_Files') < 0 || features_enabled.indexOf('SideBar_Files') < 0) {
            console.log('Disabling file browser plugin because it is not allowed feature by role');
            return;
        }

* 'Menu_Notebook'
    src/landing/widgets.ts class LandingModel function constructor()
        if (features_enabled.indexOf('Menu_Notebook') >= 0) {
          this.activities.push( ['Notebook', 'file-operations:new-notebook'] );
        }
    src/notebook/plugins.ts function activateNotebookHandler()
        if (features_enabled.indexOf('Menu_Notebook') < 0) {
            console.log('Disabling notebooks plugin because they are not allowed feature by role');
            return;
        }

* 'Menu_Editor'
    src/landing/widgets.ts class LandingModel function constructor()
        if (features_enabled.indexOf('Menu_Editor') >= 0) {
          this.activities.push( ['Text Editor', 'file-operations:new-text-file'] );
        }

    src/codemirror/plugins.ts function activateEditorCommands()
        if (features_enabled.indexOf('Menu_Editor') < 0) {
            console.log('Disabling editor plugin because it isnot allowed feature by role');
            return;
        }

* 'Menu_Terminal'
    src/landing/widgets.ts class LandingModel function constructor()
        if (terminalsAvailable && features_enabled.indexOf('Menu_Terminal') >= 0) {
          this.activities.push(
            ['Terminal', 'terminal:create-new']
          );
        }
    src/terminal/plugins.ts function activate()
        if (features_enabled.indexOf('Menu_Terminal') < 0) {
            console.log('Disabling terminals plugin because they are not allowed feature by role');
            return;
        }


* 'Menu_Console'
    src/console/plugin.ts function activate()
        if (features_enabled.indexOf('Menu_Console') < 0) {
            console.log('Disabling console plugin because it is not allowed feature by role');
            return;
        }

* 'Menu_Settings'
    src/carme_settings/plugin.ts function activate()
        if (features_enabled.indexOf('Menu_Settings') < 0) {
            console.log('Disabling carme setting plugin because it is not allowed feature by role');
            return;
        }

* 'Menu_BookMark'
    src/carme_tkimtool/plugin.ts function activate()
        if (features_enabled.indexOf('Menu_BookMark') < 0) {
            console.log('Disabling bookmark widget plugin because it is not allowed feature by role');
            return;
        }

* 'Menu_Help'

* 'Widget_Landing'
    src/landing/plugin.ts function activate()
        if (features_enabled.indexOf('Widget_Landing') < 0) {
            console.log('Disabling landing widget plugin because it is not allowed feature by role');
            return;
        }
