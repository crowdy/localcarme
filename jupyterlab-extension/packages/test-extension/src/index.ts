// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette, ILayoutRestorer, InstanceTracker
} from '@jupyterlab/apputils';

import {
  TestModel, TestWidget
} from './widget';


/**
 * The command IDs used by the test plugin.
 */
namespace CommandIDs {
  export
  const open = 'test-jupyterlab:open';
}


/**
 * The test page extension.
 */
const plugin: JupyterLabPlugin<void> = {
  activate,
  id: 'jupyter.extensions.test',
  autoStart: true,
  requires: [ICommandPalette, ILayoutRestorer]
};


/**
 * Export the plugin as default.
 */
export default plugin;


function activate(app: JupyterLab, palette: ICommandPalette, restorer: ILayoutRestorer): void {
  const namespace = 'test-jupyterlab';
  const model = new TestModel({ version: app.info.version });
  const command = CommandIDs.open;
  const category = 'Help';
  const { shell, commands } = app;
  const tracker = new InstanceTracker<TestWidget>({ namespace, shell });

  restorer.restore(tracker, {
    command,
    args: () => null,
    name: () => 'test'
  });

  let widget: TestWidget;

  function newWidget(): TestWidget {
    let widget = new TestWidget();
    widget.model = model;
    widget.id = 'test';
    widget.title.label = 'Test';
    widget.title.closable = true;
    tracker.add(widget);
    return widget;
  }

  commands.addCommand(command, {
    label: 'Test JupyterLab',
    execute: () => {
      if (!widget || widget.isDisposed) {
        widget = newWidget();
        shell.addToMainArea(widget);
      }
      tracker.activate(widget);
    }
  });

  palette.addItem({ command, category });
}
