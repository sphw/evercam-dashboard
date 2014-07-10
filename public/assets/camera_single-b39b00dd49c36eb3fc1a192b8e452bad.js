(function(){var e,a,t,r,n,s,i,c,o,l,u,d,p,h;p=function(e){return Notification.show(e),!0},h=function(e){return Notification.show(e),!0},d=function(e){var a,t;return t=$('meta[name="csrf-token"]'),t.size()>0&&(a={"X-CSRF-Token":t.attr("content")},e.headers=a),jQuery.ajax(e),!0},e=function(e){var a,t,r,l,u,d,p,h;return u=$("<tr>"),"share_request"===e.type?u.attr("share-request-id",e.share_id):u.attr("share-id",e.share_id),t=$("<td>",{"class":"col-lg-4"}),t.append(document.createTextNode(" "+e.email)),"share_request"===e.type&&(h=$("<small>",{"class":"blue"}),h.text(" ...pending"),t.append(h)),u.append(t),t=$("<td>",{"class":"col-lg-2"}),r=$("<div>",{"class":"input-group input-group-sm"}),d=$("<select>",{"class":"form-control reveal","show-class":"show-save"}),d.focus(i),l=$("<option>",{value:"minimal"}),"full"!==e.permissions&&l.attr("selected","selected"),l.text("Read Only"),d.append(l),l=$("<option>",{value:"full"}),"full"===e.permissions&&l.attr("selected","selected"),l.text("Full Rights"),d.append(l),r.append(d),t.append(r),u.append(t),t=$("<td>",{"class":"col-lg-2"}),a=$("<button>",{"class":"save show-save btn btn-primary bt-sm"}),a.text("Save"),a.click("share"===e.type?c:o),t.append(a),u.append(t),t=$("<td>",{"class":"col-lg-2"}),r=$("<div>",{"class":"form-group"}),p=$("<span>"),p.append($("<span>",{"class":"glyphicon glyphicon-remove"})),"share"===e.type?(p.addClass("delete-share-control"),p.append($(document.createTextNode(" Remove User"))),p.click(n),p.attr("share_id",e.share_id)):(p.addClass("delete-share-request-control"),p.append($(document.createTextNode(" Revoke Request"))),p.click(s),p.attr("email",e.email)),p.attr("camera_id",e.camera_id),r.append(p),t.append(r),u.append(t),u.hide(),$("#sharing_list_table tbody").append(u),u.fadeIn(),!0},l=function(e){var a,t,r,n,s,i,c;switch(e.preventDefault(),i=$("input[name=sharingOptionRadios]:checked").val(),a=$("#set_permissions_submit"),t=$("#sharing_tab_camera_id").val(),r={},i){case"public_discoverable":r["public"]=!0,r.discoverable=!0,$(".show-on-public").show(),$(".show-on-private").hide();break;case"public_undiscoverable":r["public"]=!0,r.discoverable=!1,$(".show-on-public").show(),$(".show-on-private").hide();break;default:r["public"]=!1,r.discoverable=!1,$(".show-on-public").hide(),$(".show-on-private").show()}return n=function(){return p("Update of camera permissions failed. Please contact support."),a.removeAttr("disabled"),!1},s=function(e){return e.success?h("Camera permissions successfully updated."):p("Update of camera permissions failed. Please contact support."),a.removeAttr("disabled"),!0},c={cache:!1,data:r,dataType:"json",error:n,success:s,type:"POST",url:"/share/camera/"+t},a.attr("disabled","disabled"),d(c),!0},n=function(e){var a,t,r,n,s,i;return e.preventDefault(),a=$(e.currentTarget),s=a.parent().parent().parent(),t={camera_id:a.attr("camera_id"),share_id:a.attr("share_id")},r=function(){return p("Delete of camera shared failed. Please contact support."),!1},n=function(e){var a;return e.success?(a=function(){return s.remove()},s.fadeOut("slow",a)):p("Delete of camera shared failed. Please contact support."),!0},i={cache:!1,data:t,dataType:"json",error:r,success:n,type:"DELETE",url:"/share"},d(i),!0},s=function(e){var a,t,r,n,s,i;return e.preventDefault(),a=$(e.currentTarget),s=a.parent().parent().parent(),t={camera_id:a.attr("camera_id"),email:a.attr("email")},r=function(){return p("Delete of share request failed. Please contact support."),!1},n=function(e){var a;return e.success?(a=function(){return s.remove()},s.fadeOut("slow",a)):p("Delete of share request failed. Please contact support."),!0},i={cache:!1,data:t,dataType:"json",error:r,success:n,type:"DELETE",url:"/share/request"},d(i),!0},r=function(t){var r,n,s,i;return t.preventDefault(),r=$("#sharingUserEmail").val(),i="Full Rights"!==$("#sharingPermissionLevel").val()?"minimal":"full",n=function(){return p("Add camera shared failed."),!1},s=function(a){var t;if(a.success)"share"===a.type?(e(a),h("Camera successfully shared with User")):("share_request"===a.type,e(a),h("A notification email has been dispatched to the specified email address.")),$("#sharingUserEmail").val("");else{switch(t="Adding a camera share failed.",a.code){case"camera_not_found_error":t="Unable to locate details for the camera in the system. Please refresh your view and try again.";break;case"duplicate_share_error":t="The camera has already been shared with the specified user.";break;case"duplicate_share_request_error":t="A share request for the specified email address already exists for this camera.";break;case"share_grantor_not_found_error":t="Unable to locate details for the user granting the share in the system.";break;case"invalid_parameters":t="Invalid rights specified for share creation request.";break;default:t=a.message}p(t)}return!0},a($("#sharing_tab_camera_id").val(),r,i,s,n),!0},c=function(e){var a,t,r,n,s,i,c;return e.preventDefault(),a=$(this),i=a.parent().parent(),t=i.find("select"),r={permissions:t.val(),camera_id:$("#ec_cam_id").text()},n=function(){return p("Update of share failed. Please contact support."),!1},s=function(e){return e.success?(h("Share successfully updated."),a.fadeOut()):p("Update of share failed. Please contact support."),!0},c={cache:!1,data:r,dataType:"json",error:n,success:s,type:"PATCH",url:"/share/"+i.attr("share-id")},d(c),!0},o=function(e){var a,t,r,n,s,i,c;return e.preventDefault(),a=$(this),i=a.parent().parent(),t=i.find("select"),r={permissions:t.val()},n=function(){return p("Update of share request failed. Please contact support."),!1},s=function(e){return e.success?(h("Share request successfully updated."),a.fadeOut()):p("Update of share request failed. Please contact support."),!0},c={cache:!1,data:r,dataType:"json",error:n,success:s,type:"PATCH",url:"/share/request/"+i.attr("share-request-id")},d(c),!0},a=function(e,a,t,r,n){var s,i;return s={camera_id:e,email:a,permissions:t},i={cache:!1,data:s,dataType:"json",error:n,success:r,type:"POST",url:"/share"},d(i),!0},i=function(){return $(this).parent().parent().parent().find("td:eq(2) button").fadeIn(),!0},u=function(){var e;return e=$(this).val(),$("div.desc").hide(),$("#Shares"+e).show(),!0},t=function(){return $("#set_permissions_submit").click(l),$(".delete-share-control").click(n),$(".delete-share-request-control").click(s),$("#submit_share_button").click(r),$(".update-share-button").click(c),$(".update-share-request-button").click(o),$(".save").hide(),$(".reveal").focus(i),$("input[name$='sharingOptionRadios']").click(u),Notification.init(".bb-alert"),!0},window.Evercam||(window.Evercam={}),window.Evercam.Share={initializeTab:t,createShare:a}}).call(this),function(){var e,a;a=function(){return!0},e=function(){return $("#set_permissions_submit").click(a),$("img.snap").each(function(){var e;return e=$(this),$("<img />").attr("src",$(this).attr("data-proxy")).load(function(){return this.complete&&void 0!==this.naturalWidth&&0!==this.naturalWidth?e.replaceWith($(this)):console.log("camera offline")})}),$("#live-refresh").click(function(){var e;return e=$(".camera-preview img"),$("<img />").attr("src",e.attr("src")).load(function(){return this.complete&&void 0!==this.naturalWidth&&0!==this.naturalWidth?e.replaceWith($(this)):console.log("refresh failed - camera offline")}),!1}),!0},window.Evercam||(window.Evercam={}),window.Evercam.Live={initializeTab:e}}.call(this),function(){var e,a,t,r,n,s,i;r=function(){return!0},i=function(){return $(".nav-tabs a[href=#sharing]").tab("show"),setTimeout(function(){return scrollTo(0,0)},10)},a=function(e){return e.preventDefault(),s(!0),!0},n=function(e){return $("#change_owner_error").text(e),""===e?$("#change_owner_error").hide():$("#change_owner_error").show(),!0},t=function(e){var a,t,r,i,c,o;return e.preventDefault(),r=$("#new_owner_email"),""!==r.val()&&(t=$("#change_owner_dialog"),t.modal("hide"),n(""),i=function(){return n("An error occurred transferring ownership of this camera. Please try again and, if the problem persists, contact support."),s(!1),!0},c=function(e){var a;return e.success?(alert("Camera ownership has been successfully transferred."),a=window.location,a.assign(a.protocol+"//"+a.host)):(n(e.message),s(!1)),!0},a={camera_id:$("#change_owner_camera_id").val(),email:r.val()},o={cache:!1,data:a,error:i,success:c,url:"/cameras/transfer"},jQuery.ajax(o)),!0},s=function(e){var a;return e&&($("#new_owner_email").val(""),$("#change_owner_error").hide()),$("#change_owner_dialog").modal("show"),a=function(){return $("#new_owner_email").select()},setTimeout(a,200),!0},e=function(){return $("#set_permissions_submit").click(r),$(".open-sharing").click(i),$("#change_owner_button").click(a),$("#submit_change_owner_button").click(t),!0},window.Evercam||(window.Evercam={}),window.Evercam.Info={initializeTab:e}}.call(this),function(){var e,a;a=function(){return!0},e=function(){return $("#set_permissions_submit").click(a),!0},window.Evercam||(window.Evercam={}),window.Evercam.Settings={initializeTab:e},jQuery(function(){return $("div").tooltip()})}.call(this),function(){var e,a;a=function(){return!0},e=function(){return $("#set_permissions_submit").click(a),!0},window.Evercam||(window.Evercam={}),window.Evercam.Explorer={initializeTab:e}}.call(this),function(){var e,a,t,r;a=null,r=function(){var e,t,r,n,s,i,c;return e=$("#exid").val(),s=$("#current-page").val(),c=[],$.each($("input[name='type']:checked"),function(){return c.push($(this).val())}),t=new Date($("#datetimepicker").val()).getTime()/1e3,i=new Date($("#datetimepicker2").val()).getTime()/1e3,r="",isNaN(t)||(r+="&from="+t),isNaN(i)||(r+="&to="+i),n=$("#base-url").val()+"&page="+s+"&types="+c.join()+r,null!=a&&a.ajax.url(n).load(),null==a&&$("#ajax-url").val(n),!0},t=function(){return $("#all-types").is(":checked")?$("input[name='type']").prop("checked",!0):$("input[name='type']").prop("checked",!1)},e=function(){return $("#apply-types").click(r),$(".datetimepicker").datetimepicker(),$("#all-types").click(t),jQuery.fn.DataTable.ext.type.order["string-date-pre"]=function(e){return moment(e,"MMMM Do YYYY, H:mm:ss").format("X")},r(),a=$("#logs-table").DataTable({ajax:{url:$("#ajax-url").val(),dataSrc:"logs",error:function(e){return Notification.show(e.responseJSON.message)}},columns:[{data:function(e){return moment(1e3*e.done_at).format("MMMM Do YYYY, H:mm:ss")},orderDataType:"string-date",type:"string-date"},{data:function(e){return"shared"===e.action||"stopped sharing"===e.action?e.action+" with "+e.extra["with"]:e.action},className:"log-action"},{data:function(e){return"online"===e.action||"offline"===e.action?"System":e.who}}],iDisplayLength:50,order:[[0,"desc"]]}),!0},window.Evercam||(window.Evercam={}),window.Evercam.Logs={initializeTab:e}}.call(this);