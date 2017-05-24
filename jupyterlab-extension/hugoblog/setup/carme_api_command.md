+++
date = "2017-02-28T17:19:18+09:00"
draft = true
title = "carmeauth"
categories = "setup"
+++

src/carme_cloudresource/plugin.ts
    let command = 'instances:startvm';
    ...
          $.ajax({
            headers: {"X-Carme-Token": user_token},
            url: `http://${CarmeSettings.BaseApiUrl}/dashboard/servers/action/start`,
            data: `server_id=${instanceswidget.selectedGuid}`,
            type: 'POST',
            ...
          });

    command = 'instances:stopvm';
    ...
          $.ajax({
            headers: {"X-Carme-Token": user_token},
            url: `http://${CarmeSettings.BaseApiUrl}/dashboard/servers/action/shutoff`,
            data: `server_id=${instanceswidget.selectedGuid}`,
            type: 'POST',
            ...
          });

    command = 'instances:vncconsole';
    ...
      $.ajax({
        headers: {"X-Carme-Token": user_token},
        url: `http://${CarmeSettings.BaseApiUrl}/dashboard/servers/action/vncconsole`,
        data: `server_id=${instanceswidget.selectedGuid}`,
        type: 'POST',
        ...
      });

    command = 'instances:serialconsole';
      $.ajax({
        headers: {"X-Carme-Token": user_token},
        url: `http://${CarmeSettings.BaseApiUrl}/dashboard/servers/action/serialconsole`,
        data: `server_id=${instanceswidget.selectedGuid}`,
        type: 'POST',
        ...
      });

  export function do_portlimit(portid: string, limit_in: string, limit_out: string) {
    $.ajax({
      headers: {"X-Carme-Token": user_token},
      url: `http://${CarmeSettings.BaseApiUrl}/dashboard/port-limit`,
      data: `port_id=${portid}&bw_in=${limit_in}&bw_out=${limit_out}`,
      dataType: "html",
      type: 'PUT',
      ...
    });


src/carme_compute/plugin.ts
    let command = 'computehosts:enablehost';
          $.ajax({
            headers: {"X-Carme-Token": user_token},
            url: `http://${CarmeSettings.BaseApiUrl}/dashboard/compute/enable`,
            data: `hostname=${computehostswidget.selectedGuid}`,
            type: 'PUT',


    command = 'computehosts:disablehost';
          $.ajax({
            headers: {"X-Carme-Token": user_token},
            url: `http://${CarmeSettings.BaseApiUrl}/dashboard/compute/disable`,
            data: "hostname=" + computehostswidget.selectedGuid,
            type: 'PUT',
