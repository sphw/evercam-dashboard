window.updateSidebar = ->
  data =
    user_id: Evercam.User.id
    api_id: Evercam.User.api_id
    api_key: Evercam.User.api_key
    include_shared: true

  onSuccess = (data, status, jqXHR) ->
    renderSidebar(data.cameras)
  settings =
    cache: false
    data: data
    dataType: 'json'
    success: onSuccess
    type: 'GET'
    url: "#{Evercam.API_URL}cameras.json"
  sendAJAXRequest(settings)

renderSidebar = (cameras) ->
  sidebar = ""
  for camera in cameras
    classes = if camera.is_online then "" else "sidebar-offline"
    row = """
    <li class="sub-menu-item #{classes}">
      <a href="/v1/cameras/#{camera.id}">#{camera.name}</a>
    </li>\n
    """
    sidebar = sidebar + row
  $(".sidebar-cameras-list").html(sidebar)
  hideOfflineCameras()

window.showOfflineButton = ->
  offline_cameras = $('.sub-menu.sidebar-cameras-list .sidebar-offline').length
  if offline_cameras > 0
    $('#offline-btn').show()
  else
    $('#offline-btn').hide()
  if $.cookie("offline-btn")
    $("#offline-btn").text("Show Offline")
    $("#offline-btn").addClass("active")
    $('.sub-menu, .dropdown-menu.scroll-menu, #camera-index').addClass('cam-active')
  $('#offline-btn').on 'click', (event) ->
    $(this).toggleClass('active')
    text = $(this).text()
    if text is 'Hide Offline'
      $(this).text('Show Offline')
      $.cookie("offline-btn",$(this).text('Show Offline'),{ expires: 365, path: "/" })
      $('.sub-menu, .dropdown-menu.scroll-menu, #camera-index').toggleClass('cam-active')
    else
      $(this).text('Hide Offline')
      $.removeCookie("offline-btn",{ path: "/" })
      $('.sub-menu, .dropdown-menu.scroll-menu, #camera-index').toggleClass('cam-active')

handlePusherEventUser = ->
  if Evercam && Evercam.Pusher
    channel = Evercam.Pusher.subscribe(Evercam.User.username)
    channel.bind 'user_cameras_changed', (data) ->
      updateSidebar()

handleSidebarToggle = ->
  $('.toggle-sidebar').on 'click', (event) ->
    event.preventDefault()
    $(this).toggleClass('active')
    $('#cbp-spmenu-s1').toggleClass('cbp-spmenu-open')

window.hideOfflineCameras = ->
  total_offline_cameras = $(".sidebar-cameras-list li.sidebar-offline").length
  $("#total-offline-cameras").attr("data-original-title", "#{total_offline_cameras} Offline cameras")
  $("#total-offline-cameras sub").text(total_offline_cameras)
  if $.cookie("hide-offline-cameras")
    if total_offline_cameras is 0
      $("#total-offline-cameras").removeClass("hide").addClass("hide")
    else
      $("#total-offline-cameras").removeClass("hide")
    $(".sidebar-cameras-list li.sidebar-offline").removeClass("hide").addClass("hide")
  else
    $("#total-offline-cameras").removeClass("hide").addClass("hide")
    $(".sidebar-cameras-list li.sidebar-offline").removeClass("hide")

$ ->
  showOfflineButton()
  handleSidebarToggle()
  hideOfflineCameras()
  $('[data-toggle="tooltip"]').tooltip()

$(window).load ->
  handlePusherEventUser()