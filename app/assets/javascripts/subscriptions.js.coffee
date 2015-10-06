# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

sendAJAXRequest = (settings) ->
  token = $('meta[name="csrf-token"]')
  if token.size() > 0
    headers =
      "X-CSRF-Token": token.attr("content")
    settings.headers = headers
  xhrRequestChangeMonth = jQuery.ajax(settings)
  true

createAddRemoveLicence = ->
  $(".remove-licence").on 'click', ->
    control_id = $(this).attr("data-val")
    quantity = parseInt($("##{control_id}-qty").val())
    licence_price = parseInt($("##{control_id}").val())
    new_price = parseInt($("##{control_id}-new-price").text())

    if quantity is 0
      current_quantity = parseInt($("##{control_id}-current-qty").text())
      if current_quantity > 0
        current_quantity--
        $("##{control_id}-current-qty").text(current_quantity)
        $("##{control_id}-current-price").text(licence_price * current_quantity)
        $("##{control_id}-new-price").text(new_price + licence_price)
        $("##{control_id}-sign").text("-")
    else
      quantity--
      new_price = licence_price *  quantity
      $("##{control_id}-qty").val(quantity)
      $("##{control_id}-new-price").text(new_price)
      $("##{control_id}-sign").text("+")

    $(".new-price-annual").each ->
      price = parseInt($(this).text())
      total_price = parseInt($("#new-total-price-annual").text())
      $("#new-total-price-annual").text(price + total_price)

  $(".add-licence").on 'click', ->
    control_id = $(this).attr("data-val")
    quantity = parseInt($("##{control_id}-qty").val())
    licence_price = parseInt($("##{control_id}").val())
    new_price = parseInt($("##{control_id}-new-price").text())

    if quantity is 0 && new_price > 0
      current_quantity = parseInt($("##{control_id}-current-qty").text())
      current_quantity++
      $("##{control_id}-current-qty").text(current_quantity)
      $("##{control_id}-current-price").text(licence_price * current_quantity)
      substract_price = Math.abs(new_price - licence_price)
      if substract_price is 0
        $("##{control_id}-new-price").text(0)
        $("##{control_id}-sign").text("+")
      else
        $("##{control_id}-new-price").text(substract_price)
    else
      quantity++
      new_price = licence_price *  quantity
      $("##{control_id}-qty").val(quantity)
      $("##{control_id}-new-price").text(new_price)


showConfirmation = ->
  $('.delete-add-ons').on 'click', ->
    confirm('Are you sure you wish to cancel this add-on?')

onCheckoutConfirmCard = ->
  $(".add-card-to-continue").on 'click', ->
    has_credit_card = $("#has-credit-card").val()
    if has_credit_card is "false"
      $("#plan-descprition").html('Add a credit card before changing your plan.')
      $("#change-plan-action").val("")
      $("#btn-change-plan").val($(".stripe-button-el span").text())
      $('#upgradeDwongradeModal').modal('show')
      $("#upgradeDwongradeModal").on "show.bs.modal", ->
        centerModal(this)
      return false

onUpgradeDownGrade = ->
  $('.change-plan').on 'click', ->
    quantity = parseInt($("##{$(this).attr("data-plan-id")}-qty").val())
    if quantity is 0
      Notification.show "Please enetr quantity."
      return false
    clearModal()
    plan_control = $(this)
    plan_change_to =  plan_control.val()
    has_credit_card = $("#has-credit-card").val()
    $("#change-plan-id").val(plan_control.attr('data-plan-id'))
    $("#upgradeDwongradeModal").on "show.bs.modal", ->
      if has_credit_card is "false"
        $("#plan-descprition").html('Add a credit card before changing your plan.')
        $("#change-plan-action").val("")
        $("#btn-change-plan").val($(".stripe-button-el span").text())
      else
        if plan_change_to is "Upgrade"
          $("#section-downgrade").hide()
          $("#change-plan-action").val("upgrade")
          $("#btn-change-plan").val("Upgrade my plan")
          $("#plan-descprition").html("The #{plan_control.attr('data-period')} cost for you to upgrade " +
            "to the #{plan_control.attr('data-plan')} will be #{plan_control.attr('data-price')} #{plan_control.attr('data-period')}. We will credit you for any time you have not used on your current plan against the cost of this.")
        else if plan_change_to is "Switch to Monthly" || plan_change_to is "Switch to Annual"
          $("#change-plan-action").val("switch")
          $("#btn-change-plan").val(plan_change_to)
          $("#plan-descprition").html("Your plan and add-ons switch to #{plan_control.attr('data-period')} billing and cost " +
              "to the #{plan_control.attr('data-plan')} will be #{plan_control.attr('data-price')} #{plan_control.attr('data-period')}. We will credit you for any time you have not used on your current plan against the cost of this.")
        else
          $("#change-plan-action").val("downgrade")
          $("#btn-change-plan").val("Downgrade my plan")
          $("#plan-descprition").html("The #{plan_control.attr('data-plan')} plan will change your " +
            "#{plan_control.attr('data-period')} cost to #{plan_control.attr('data-price')}. We will credit you for any time you have not used on your current plan against the cost of this.")
          $("#section-downgrade").show()
      centerModal(this)
    true

clearModal = ->
  $("#change-plan-id").val("")
  $("#change-plan-action").val("")
  $("#plan-descprition").show()
  $(".modal-footer").show()
  $("#confirm-upgrading").hide()
  $("#section-downgrade").hide()
  true

changePlan = ->
  $("#btn-change-plan").on 'click', ->
    if $("#has-credit-card").val() is "false"
      $(".stripe-button-el").click()
      $('.modal').modal('hide')
      return
    action = $("#change-plan-action").val()

    if action is "downgrade" && $("#downgrade-plan").val() is ''
      Notification.show "Please type 'downgrade' to confirm."
      return
    if $("#change-plan-id").val() is ""
      Notification.show "Empty plan id."
      return
    if action is "upgrade"
      $(".change-plan-desc").text("One moment while we upgrade your account...")
    else if action is "switch"
      $(".change-plan-desc").text("One moment while we switch your plan and add-ons...")

    if action is "upgrade" || action is "switch"
      $("#plan-descprition").hide()
      $(".modal-footer").hide()
      $("#confirm-upgrading").show()

    plan_id = $("#change-plan-id").val()
    data = {}
    data.plan_id = plan_id
    data.quantity = $("##{plan_id}-qty").val()

    onError = (jqXHR, status, error) ->
      if action is "upgrade"
        $("#plan-descprition").show()
        $(".modal-footer").show()
        $("#confirm-upgrading").hide()
      false

    onSuccess = (result, status, jqXHR) ->
      if result.success
        Notification.show "Your account has been successfully #{action}d."
        location.reload()
      else
        Notification.show "Failed to #{action} plan."
        $('.modal').modal('hide')

    settings =
      cache: false
      data: data
      dataType: 'json'
      error: onError
      success: onSuccess
      contentType: "application/x-www-form-urlencoded"
      type: 'POST'
      url: "/v1/users/#{Evercam.User.username}/billing/plans/change"

    sendAJAXRequest(settings)

centerModal = (model) ->
  $(model).css "display", "block"
  $dialog = $(model).find(".modal-dialog")
  offset = ($(window).height() - $dialog.height()) / 2
  $dialog.css "margin-top", offset

initEditQuantity = ->
  $('.edit-quantity').on "click", ->
    if $(this).text() is "Save"
      if $("#has-credit-card").val() is "false"
        $("#saveSubscriptions").val($(".stripe-button-el span").text())
        $("#checkout-message").hide()
        $("#add-card-message").show()
      else
        $("#checkout-message").show()
        $("#add-card-message").hide()
        $("#saveSubscriptions").val("Save Plans")
      $("#payNowModal").modal("show")
    else
      if $(".quantity-text").hasClass("no-editable")
        $(".quantity-text").removeClass("no-editable")
        $(".quantity-text").removeAttr("disabled")
      else
        $(".quantity-text").addClass("no-editable")
        $(".quantity-text").attr("disabled", true)

  $("#saveSubscriptions").on "click", ->
    if $("#has-credit-card").val() is "false"
      $(".stripe-button-el").click()
      $('#payNowModal').modal('hide')
    else
      $("#form-make-payment").submit()
  $('.quantity-text').on "keyup", ->
    $('.edit-quantity').text("Save")
  $('.quantity-text').on 'click', ->
    @select()

addToCart = ->
  $(".add-to-cart").on "click", ->
    plan = $(this).attr("data-plan")
    quantity = parseInt($("##{plan}-qty").val())
    if quantity is 0
      Notification.show "Please enter quantity."
      return false
    else
      $("##{plan}-quantity").val(quantity)
      return true

updateTotalPrice = ->
  $("#payNowModal").on "show.bs.modal", ->
    $("#spnTotalPrice").text($("#total-price").val())

  $("#upgradeDwongradeModal").on "hide.bs.modal", ->
    $(".quantity-textsmall").val(0)

window.initializeSubscription = ->
  Notification.init(".bb-alert")
  showConfirmation()
  onUpgradeDownGrade()
  onCheckoutConfirmCard()
  createAddRemoveLicence()
  changePlan()
  initEditQuantity()
  addToCart()
  updateTotalPrice()

window.initializeChangePlan = ->
  onUpgradeDownGrade()
  onCheckoutConfirmCard()
  createAddOns()
  changePlan()

$ ->
  $('[data-toggle="tooltip"]').tooltip()
  return