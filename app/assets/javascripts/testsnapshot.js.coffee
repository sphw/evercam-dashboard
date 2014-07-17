validate_hostname= (str) ->
  ValidIpAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
  ValidHostnameRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/
  ValidIpAddressRegex.test(str) || ValidHostnameRegex.test(str)


$ ->
  $('#test').click((e) ->
    intRegex = /^\d+$/
    port = $('#port').val()
    ext_url = $('#camera-url').val()
    $snap = $('#snapshot')
    jpg_url = $snap.val()
    # Auto-fix snapshot
    if (jpg_url.indexOf('/') == 0)
      $snap.val(jpg_url.substring(1))
      jpg_url = $snap.val()

    # Encode parameters
    jpg_url = jpg_url.replace(/\?/g, 'X_QQ_X').replace(/&/g, 'X_AA_X')
    e.preventDefault();
    # Validate port
    if(port != '' && (!intRegex.test(port) || port > 65535))
      $('#test-error').text('Port value is incorrect')
      return
    else if (port != '')
      port = ':' + port

    # Validate host
    if (ext_url == '' || !validate_hostname(ext_url))
      $('#test-error').text('External URL is incorrect')
      return
    else if (ext_url.indexOf('192.168') == 0 || ext_url.indexOf('127.0.0') == 0 || ext_url.indexOf('10.') == 0)
      $('#test-error').text('This is local IP. Please use external IP.')
      return

    params = ['external_url=http://' + ext_url + port,
              'jpg_url=/' + jpg_url,
              'cam_username=' + $('#camera-username').val(),
              'cam_password=' + $('#camera-password').val()]

    l = Ladda.create(this);
    l.start();
    progress = 0;
    interval = setInterval( ->
      progress = Math.min(progress + 0.025, 1);
      l.setProgress(progress);
      if (progress == 1)
        l.stop()
        clearInterval(interval)
    , 200);

    $.getJSON(EVERCAMP_API + 'cameras/test.json?' + params.join('&'))
    .done((resp) ->
      console.log('success')
      $('#test-error').text('Snapshot successfully retrieved')
      $('#testimg').attr('src', resp.data)
    )
    .fail((resp) ->
      $('#test-error').text(resp.responseJSON.message)
      console.log('error')
    )
    .always(() ->
      l.stop()
      clearInterval(interval)
    )
  )