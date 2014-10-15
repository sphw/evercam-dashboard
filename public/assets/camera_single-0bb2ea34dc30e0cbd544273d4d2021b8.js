function initialize(){if(""===cameraLong)return void $("#map-canvas").replaceWith("<p>The location of this camera was not found. You can set the location in the Settings tab.</p>");var e=new google.maps.LatLng(cameraLat,cameraLong),t={zoom:13,center:e,mapTypeControl:!1,streetViewControl:!1},a=new google.maps.Map(document.getElementById("map-canvas"),t),r=(new google.maps.Marker({position:e,map:a,title:"Camera Location"}),!1);$("#nav-tabs").click(function(){r||setTimeout(function(){google.maps.event.trigger(a,"resize"),r=!0,a.setCenter(e)},200)})}(function(){var e,t,a,r,n,i,o,s,c,d,l,u,h,p;h=function(e){return Notification.show(e),!0},p=function(e){return Notification.show(e),!0},u=function(e){var t,a;return a=$('meta[name="csrf-token"]'),a.size()>0&&(t={"X-CSRF-Token":a.attr("content")},e.headers=t),jQuery.ajax(e),!0},e=function(e){var t,a,r,d,l,u,h,p;return l=$("<tr>"),"share_request"===e.type?l.attr("share-request-id",e.share_id):l.attr("share-id",e.share_id),a=$("<td>",{"class":"col-lg-4"}),a.append(document.createTextNode(" "+e.email)),"share_request"===e.type&&(p=$("<small>",{"class":"blue"}),p.text(" ...pending"),a.append(p)),l.append(a),a=$("<td>",{"class":"col-lg-2"}),r=$("<div>",{"class":"input-group"}),u=$("<select>",{"class":"form-control reveal","show-class":"show-save"}),u.focus(o),d=$("<option>",{value:"minimal"}),"full"!==e.permissions&&d.attr("selected","selected"),d.text("Read Only"),u.append(d),d=$("<option>",{value:"full"}),"full"===e.permissions&&d.attr("selected","selected"),d.text("Full Rights"),u.append(d),r.append(u),a.append(r),l.append(a),a=$("<td>",{"class":"col-lg-2"}),t=$("<button>",{"class":"save show-save btn btn-primary"}),t.text("Save"),t.click("share"===e.type?s:c),a.append(t),l.append(a),a=$("<td>",{"class":"col-lg-2"}),r=$("<div>",{"class":"form-group"}),h=$("<span>"),h.append($("<span>",{"class":"glyphicon glyphicon-remove"})),"share"===e.type?(h.addClass("delete-share-control"),h.append($(document.createTextNode("Remove"))),h.click(n),h.attr("share_id",e.share_id)):(h.addClass("delete-share-request-control"),h.append($(document.createTextNode("Revoke"))),h.click(i),h.attr("email",e.email)),h.attr("camera_id",e.camera_id),r.append(h),a.append(r),l.append(a),l.hide(),$("#sharing_list_table tbody").append(l),l.find(".save").hide(),l.fadeIn(),!0},d=function(e){var t,a,r,n,i,o,s;switch(e.preventDefault(),o=$("input[name=sharingOptionRadios]:checked").val(),t=$("#set_permissions_submit"),a=$("#sharing_tab_camera_id").val(),r={},o){case"public_discoverable":r["public"]=!0,r.discoverable=!0,$(".show-on-public").show(),$(".show-on-private").hide();break;case"public_undiscoverable":r["public"]=!0,r.discoverable=!1,$(".show-on-public").show(),$(".show-on-private").hide();break;default:r["public"]=!1,r.discoverable=!1,$(".show-on-public").hide(),$(".show-on-private").show()}return n=function(){return h("Update of camera permissions failed. Please contact support."),t.removeAttr("disabled"),!1},i=function(e){return e.success?p("Camera permissions successfully updated."):h("Update of camera permissions failed. Please contact support."),t.removeAttr("disabled"),!0},s={cache:!1,data:r,dataType:"json",error:n,success:i,type:"POST",url:"/share/camera/"+a},t.attr("disabled","disabled"),u(s),!0},n=function(e){var t,a,r,n,i,o;return e.preventDefault(),t=$(e.currentTarget),i=t.parent().parent().parent(),a={camera_id:t.attr("camera_id"),share_id:t.attr("share_id")},r=function(){return h("Delete of camera shared failed. Please contact support."),!1},n=function(e){var t;return e.success?(t=function(){return i.remove()},i.fadeOut(t)):h("Delete of camera shared failed. Please contact support."),!0},o={cache:!1,data:a,dataType:"json",error:r,success:n,type:"DELETE",url:"/share"},u(o),!0},i=function(e){var t,a,r,n,i,o;return e.preventDefault(),t=$(e.currentTarget),i=t.parent().parent().parent(),a={camera_id:t.attr("camera_id"),email:t.attr("email")},r=function(){return h("Delete of share request failed. Please contact support."),!1},n=function(e){var t;return e.success?(t=function(){return i.remove()},i.fadeOut(t)):h("Delete of share request failed. Please contact support."),!0},o={cache:!1,data:a,dataType:"json",error:r,success:n,type:"DELETE",url:"/share/request"},u(o),!0},r=function(a){var r,n,i,o;return a.preventDefault(),r=$("#sharingUserEmail").val(),o="Full Rights"!==$("#sharingPermissionLevel").val()?"minimal":"full",n=function(){return h("Failed to share camera."),!1},i=function(t){var a;if(t.success)"share"===t.type?(e(t),p("Camera successfully shared with user")):("share_request"===t.type,e(t),p("A notification email has been sent to the specified email address.")),$("#sharingUserEmail").val("");else{switch(a="Adding a camera share failed.",t.code){case"camera_not_found_error":a="Unable to locate details for the camera in the system. Please refresh your view and try again.";break;case"duplicate_share_error":a="The camera has already been shared with the specified user.";break;case"duplicate_share_request_error":a="A share request for that email address already exists for this camera.";break;case"share_grantor_not_found_error":a="Unable to locate details for the user granting the share in the system.";break;case"invalid_parameters":a="Invalid rights specified for share creation request.";break;default:a=t.message}h(a)}return!0},t($("#sharing_tab_camera_id").val(),r,o,i,n),!0},s=function(e){var t,a,r,n,i,o,s;return e.preventDefault(),t=$(this),o=t.parent().parent(),a=o.find("select"),r={permissions:a.val(),camera_id:$("#ec_cam_id").text().trim()},n=function(){return h("Update of share failed. Please contact support."),!1},i=function(e){return e.success?(p("Share successfully updated."),t.fadeOut()):h("Update of share failed. Please contact support."),!0},s={cache:!1,data:r,dataType:"json",error:n,success:i,type:"PATCH",url:"/share/"+o.attr("share-id")},u(s),!0},c=function(e){var t,a,r,n,i,o,s;return e.preventDefault(),t=$(this),o=t.parent().parent(),a=o.find("select"),r={permissions:a.val(),camera_id:$("#ec_cam_id").text().trim()},n=function(){return h("Update of share request failed. Please contact support."),!1},i=function(e){return e.success?(p("Share request successfully updated."),t.fadeOut()):h("Update of share request failed. Please contact support."),!0},s={cache:!1,data:r,dataType:"json",error:n,success:i,type:"PATCH",url:"/share/request/"+o.attr("share-request-id")},u(s),!0},t=function(e,t,a,r,n){var i,o;return i={camera_id:e,email:t,permissions:a},o={cache:!1,data:i,dataType:"json",error:n,success:r,type:"POST",url:"/share"},u(o),!0},o=function(){return $(this).parent().parent().parent().find("td:eq(2) button").fadeIn(),!0},l=function(){var e;return e=$(this).val(),$("div.desc").hide(),$("#Shares"+e).show(),!0},a=function(){return $("#set_permissions_submit").click(d),$(".delete-share-control").click(n),$(".delete-share-request-control").click(i),$("#submit_share_button").click(r),$(".update-share-button").click(s),$(".update-share-request-button").click(c),$(".save").hide(),$(".reveal").focus(o),$("input[name$='sharingOptionRadios']").click(l),Notification.init(".bb-alert"),!0},window.Evercam||(window.Evercam={}),window.Evercam.Share={initializeTab:a,createShare:t}}).call(this),function(){var e,t,a,r,n,i,o,s,c,d,l,u,h,p,f,m,v,g,_,w,b,y,k,T,C,M,D,S,j,x,P,E,F,R,I,N,U,L,q,Y,O,z,Q,W,A,H,B,X,G,V,J,K,Z,et,tt,at,rt,nt,it,ot,st,ct;E="https://api.evercam.io/v1/",ot=null,st=0,it=0,U=0,F=0,w="tdI8",e=null,o=null,X=!1,_=!1,Z=250,i=3600,J=1e3,ct=0,I="",G=i,nt=679,K=1,et=1,r=0,tt=function(e){var t,a;return a=$('meta[name="csrf-token"]'),a.size()>0&&(t={"X-CSRF-Token":a.attr("content")},e.headers=t),jQuery.ajax(e),!0},H=function(){return $("#ui_date_picker_inline").datepicker().on("changeDate",q).on("changeMonth",L),$("#ui_date_picker_inline table th[class*='prev']").bind("click",function(){return R("p")}),$("#ui_date_picker_inline table th[class*='next']").bind("click",function(){R("n")}),$("#hourCalandar td[class*='day']").bind("click",function(){C($(this).html(),"tdI"+$(this).html())}),!0},R=function(e){var t,a,r,n,i,o,s,c;return $("#ui_date_picker_inline").datepicker("fill"),n=$("#ui_date_picker_inline").datepicker("getDate"),o=n.getMonth(),"n"===e&&(o+=2),r=$("#recording_tab_camera_id").val(),t=$("#recording_tab_api_id").val(),a=$("#recording_tab_api_key").val(),i={},i.api_id=t,i.api_key=a,s=function(){return!1},c={cache:!1,data:i,dataType:"json",error:s,success:m,contentType:"application/json; charset=utf-8",type:"GET",url:E+"cameras/"+r+"/snapshots/"+n.getFullYear()+"/"+o+"/days.json"},tt(c),"n"===e?n.setMonth(n.getMonth()+1):"p"===e&&n.setMonth(n.getMonth()-1),$("#ui_date_picker_inline").datepicker("setDate",n),ot=null,it=1,U=0,!0},q=function(a){var r,n,i,s,c;for(r=a.date,$("#divPointer").width(0),$("#divSlider").width(0),$("#ddlRecMinutes").val(0),$("#ddlRecSeconds").val(0),$("#divDisableButtons").removeClass("hide").addClass("show"),$("#divFrameMode").removeClass("show").addClass("hide"),$("#divPlayMode").removeClass("show").addClass("hide"),n=!1,s=0,c=e.length;c>s;s++)if(i=e[s],i===r.getDate()){n=!0;break}return N(),n?t(!1):v(),o=setTimeout(b,100),!0},L=function(e){var t,a,r,n,i,o,s;return n=e.date,r=$("#recording_tab_camera_id").val(),t=$("#recording_tab_api_id").val(),a=$("#recording_tab_api_key").val(),i={},i.api_id=t,i.api_key=a,o=function(){return!1},s={cache:!1,data:i,dataType:"json",error:o,success:m,contentType:"application/json; charset=utf-8",type:"GET",url:E+"cameras/"+r+"/snapshots/"+n.getFullYear()+"/"+(n.getMonth()+1)+"/days.json"},tt(s),ot=null,it=1,U=0,!0},N=function(){var e;return $("#hourCalandar td[class*='day']").removeClass("active"),e=$("#hourCalandar td[class*='day']"),e.each(function(){var e;return e=$(this),e.css("font-weight","normal")}),!0},b=function(){var t;clearTimeout(o),null!=e&&(t=$("#ui_date_picker_inline table td[class*='day']"),t.each(function(){var t,a,r;for(t=$(this),a=parseInt(t.text()),r=0;r<e.length;){if(e[r]===a){t.css("font-weight","bold");break}r++}}))},W=function(){var e,t,a;return t=function(e){var t,a,r,n,i,o;if(null!==ot&&0!==ot.length)return i=$("#divSlider").offset().left,n=i+$("#divSlider").width(),r=(e.pageX-i)/(n-i),0>r&&(r=0),t=Math.round(r*st),t>st-1&&(t=st-1),o=e.pageX-80,o>n-80&&(o=n-80),a="",$("#divPopup").html("Frame "+t+", "+at(new Date(1e3*ot[t].created_at))+a),$("#divPopup").show(),$("#divPopup").offset({top:e.pageY+20,left:o}),$("#divSlider").css("background-position",e.pageX-i+"px 0px"),$("#divPointer").css("background-position",e.pageX-i+"px 0px"),!0},$("#divSlider").mousemove(t),a=function(){return $("#divPopup").hide(),$("#divSlider").css("background-position","-3px 0px"),$("#divPointer").css("background-position","-3px 0px"),!0},$("#divSlider").mouseout(a),e=function(e){var t,a,r,n,i;return rt(),n=$("#divSlider").offset().left,r=n+$("#divSlider").width(),i=e.pageX-n,a=i/(r-n),t=parseInt(st*a),0===t&&(t=1),t>st&&(t=st),it=t,U=it+1,P(ot[t]),!0},$("#divSlider").click(e),!0},rt=function(){return $("#imgLoaderRec").width($("#imgPlayback").width()),$("#imgLoaderRec").height($("#imgPlayback").height()),$("#imgLoaderRec").css("top",$("#imgPlayback").css("top")),$("#imgLoaderRec").css("left",$("#imgPlayback").css("left")),$("#imgLoaderRec").show(),!0},M=function(e,t){var a;return $("#divInfo").fadeIn(),$("#divInfo").html("<b>Frame "+e+" of "+ct+"</b> "+t+" "),a=$("#divSlider").width(),$("#divPointer").width(a*e/st),!0},P=function(e){return rt(),M(U,at(new Date(1e3*e.created_at))),V(e.created_at),!0},n=function(e){var t,a;return a=e.split("/"),t=new Date(a[1]+"/"+a[0]+"/"+a[2]),s(t),!0},O=function(){var e,a;return a=$("#camera_time_offset").val(),r=parseInt(a)/3600,e=Y(a),F=e.getHours(),$("#hourCalandar td[class*='day']").removeClass("active"),$("#tdI"+F+" a").addClass("active"),w="tdI"+F,$("#ui_date_picker_inline").datepicker("setDate",e),rt(),f(),t(!1),!0},Y=function(e){var t,a,r;return t=new Date,r=t.getTime()+6e4*t.getTimezoneOffset(),r+=parseInt(e),a=new Date(r)},f=function(){var e,t,a,r,n,i,o;return r=$("#ui_date_picker_inline").datepicker("getDate"),a=$("#recording_tab_camera_id").val(),e=$("#recording_tab_api_id").val(),t=$("#recording_tab_api_key").val(),n={},n.api_id=e,n.api_key=t,i=function(){return!1},o={cache:!1,data:n,dataType:"json",error:i,success:m,contentType:"application/json; charset=utf-8",type:"GET",url:E+"cameras/"+a+"/snapshots/"+r.getFullYear()+"/"+(r.getMonth()+1)+"/days.json"},tt(o),!0},m=function(t){var a;return a=$("#ui_date_picker_inline table td[class*='day']"),e=t.days,a.each(function(){var e,a,r,n,i,o,s;for(e=$(this),a=parseInt(e.text()),o=t.days,s=[],n=0,i=o.length;i>n;n++){if(r=o[n],r===a){e.css("font-weight","bold");break}s.push(void 0)}return s}),!0},t=function(e){var t,r,n,i,o,s,c;return $("#divDisableButtons").removeClass("hide").addClass("show"),$("#divFrameMode").removeClass("show").addClass("hide"),$("#divPlayMode").removeClass("show").addClass("hide"),i=$("#ui_date_picker_inline").datepicker("getDate"),n=$("#recording_tab_camera_id").val(),t=$("#recording_tab_api_id").val(),r=$("#recording_tab_api_key").val(),o={},o.api_id=t,o.api_key=r,s=function(){return!1},c={cache:!1,data:o,dataType:"json",error:s,success:a,context:{isCall:e},contentType:"application/json; charset=utf-8",type:"GET",url:E+"cameras/"+n+"/snapshots/"+i.getFullYear()+"/"+(i.getMonth()+1)+"/"+i.getDate()+"/hours.json"},tt(c),!0},a=function(e){var t,a,n,i,o,s,c;for(i=0,t=!1,c=e.hours,o=0,s=c.length;s>o;o++)a=c[o],n=a+r,$("#tdI"+n).css("font-weight","bold"),i=n,t=!0;return t?this.isCall?l():C(i,"tdI"+i):v(),!0},l=function(){var e,t,a,r,n,o,s,c,d;return $("#divDisableButtons").removeClass("hide").addClass("show"),$("#divFrameMode").removeClass("show").addClass("hide"),$("#divPlayMode").removeClass("show").addClass("hide"),rt(),n=u()/1e3,d=h()/1e3,a=$("#recording_tab_camera_id").val(),e=$("#recording_tab_api_id").val(),t=$("#recording_tab_api_key").val(),r={},r.from=n,r.to=d,r.limit=G,r.page=1,r.api_id=e,r.api_key=t,o=function(){return!1},s=function(e){var t;return it=0,ot=e.snapshots,st=e.snapshots.length,ct=e.snapshots.length,null===e||0===e.snapshots.length?($("#divSliderMD").width("100%"),$("#MDSliderItem").html(""),$("#divNoMd").show(),v(),p()):($("#divDisableButtons").removeClass("show").addClass("hide"),$("#divFrameMode").removeClass("hide").addClass("show"),t=Math.ceil(ct/i),nt=Math.ceil(100/t),nt>100&&(nt=100),$("#divSlider").width(nt+"%"),U=1,M(U,at(new Date(1e3*ot[it].created_at))),V(ot[it].created_at)),!0},c={cache:!1,data:r,dataType:"json",error:o,success:s,contentType:"application/json; charset=utf-8",type:"GET",url:E+"cameras/"+a+"/snapshots/range.json"},tt(c),!0},V=function(e){var t,a,r,n,i,o,s;return r=$("#recording_tab_camera_id").val(),t=$("#recording_tab_api_id").val(),a=$("#recording_tab_api_key").val(),n={},n.with_data=!0,n.range=1,n.api_id=t,n.api_key=a,i=function(){return!1},o=function(e){return e.snapshots.length>0&&$("#imgPlayback").attr("src",e.snapshots[0].data),p(),!0},s={cache:!1,data:n,dataType:"json",error:i,success:o,contentType:"application/json; charset=utf-8",type:"GET",url:E+"cameras/"+r+"/snapshots/"+e+".json"},tt(s),!0},at=function(e){return d(e.getDate())+"/"+d(e.getMonth()+1)+"/"+e.getFullYear()+" "+d(e.getHours())+":"+d(e.getMinutes())+":"+d(e.getSeconds())},u=function(){var e,t,a;return e=$("#ui_date_picker_inline").datepicker("getDate"),a=parseInt(F),t=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),a,0,0)},h=function(){var e,t,a;return e=$("#ui_date_picker_inline").datepicker("getDate"),t=parseInt(F)+1,a=0,a=24===t?Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),23,59,59):Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),t,0,0)},x=function(e){return e.length>1&&"0"===e.substr(0,1)?e.substr(1):e},s=function(e){var t,a,r,n,i,o,s;return null===e?"":(s=e.getFullYear(),i=e.getMonth()+1,t=e.getDate(),a=e.getHours(),n=e.getMinutes(),o=e.getSeconds(),r=e.getMilliseconds()+"",2===r.length?r="0"+r:1===r.length?r="00"+r:(0===r.length||0===r)&&(r=""),""+d(s)+d(i)+d(t)+d(a)+d(n)+d(o)+r)},d=function(e){return 10>e?"0"+e:e},v=function(){return $("#divRecent").show(),$("#imgPlayback").attr("src","/assets/norecordings.gif"),$("#divInfo").fadeOut(),$("#divPointer").width(0),$("#divSliderBackground").width(0),$("#MDSliderItem").html(""),$("#divNoMd").show(),$("#divNoMd").text("No motion detected"),p(),st=0,!0},C=function(e,t){var a;return a=$("#"+t).html(),$("#ddlRecMinutes").val(0),$("#ddlRecSeconds").val(0),F=e,$("#"+w).removeClass("active"),$("#"+t).addClass("active"),w=t,ot=null,g(),U=0,$("#divPointer").width(0),$("#divSlider").width("0%"),$("#divDisableButtons").removeClass("hide").addClass("show"),$("#divFrameMode").removeClass("show").addClass("hide"),$("#divPlayMode").removeClass("show").addClass("hide"),"700"===$("#"+t).css("font-weight")||"bold"===$("#"+t).css("font-weight")?($("#divSliderBackground").width("100%"),$("#divSliderMD").width("100%"),$("#MDSliderItem").html(""),$("#divNoMd").show(),$("#divNoMd").text("Loading motions..."),$("#btnCreateHourMovie").removeAttr("disabled"),l()):($("#divRecent").show(),$("#divInfo").fadeOut(),$("#divSliderBackground").width("0%"),$("#txtCurrentUrl").val(""),$("#divSliderMD").width("100%"),$("#MDSliderItem").html(""),$("#btnCreateHourMovie").attr("disabled",!0),st=0,$("#imgPlayback").attr("src","/assets/norecordings.gif"),$("#divNoMd").show(),$("#divNoMd").text("No motion detected"),p()),!0},g=function(){return X=!1,$("#divFrameMode").removeClass("hide").addClass("show"),$("#divPlayMode").removeClass("show").addClass("hide"),_=!0,!0},p=function(){return $("#imgLoaderRec").hide(),!0},A=function(){return $(window).bind("resize",function(){var e;return e=$("#divSlider").width(),$("#divPointer").width(e*U/st)}),!0},Q=function(){$("#btnPlayRec").bind("click",function(){0!==st&&(K=1,et=1,$("#divFrameMode").removeClass("show").addClass("hide"),$("#divPlayMode").removeClass("hide").addClass("show"),X=!0,ot.length===it+1&&(it=0,U=1),c())}),$("#btnPauseRec").bind("click",function(){g()}),$("#btnFRwd").bind("click",function(){S(10,-1)}),$("#btnRwd").bind("click",function(){S(5,-1)}),$("#btnFFwd").bind("click",function(){S(10,1)}),$("#btnFwd").bind("click",function(){S(5,1)}),$(".skipframe").bind("click",function(){"+Frame"===$(this).html()?j(1,"n"):"+5"===$(this).html()?j(5,"n"):"+10"===$(this).html()?j(10,"n"):"+100"===$(this).html()?j(100,"n"):"-Frame"===$(this).html()?j(1,"p"):"-5"===$(this).html()?j(5,"p"):"-10"===$(this).html()?j(10,"p"):"-100"===$(this).html()&&j(100,"p")})},j=function(e,t){if("p"===t){if(0===it)return;0>it-e?(U=1,it=0):(U-=e,it-=e)}else if("n"===t){if(ot.length===it+1)return;it+e>ot.length-1?(it=ot.length-1,U=ot.length):(U+=e,it+=e)}_=!1,K=1,P(ot[it])},S=function(e,t){K=t,et=e},c=function(){var e,t,a,r,n,i,o,s;if(0!==st){if(ot.length===it)return g(),U=ot.length,void(it=ot.length-1);s=ot[it],a=$("#recording_tab_camera_id").val(),e=$("#recording_tab_api_id").val(),t=$("#recording_tab_api_key").val(),r={},r.with_data=!0,r.range=1,r.api_id=e,r.api_key=t,n=function(){return 1===K&&1===et?(U++,it++):1===K&&et>1?(U+=et,U>=ot.length&&(U=ot.length),it+=et,it>ot.length-1&&(it=ot.length-1)):-1===K&&et>1&&(U-=et,1>=U&&(U=1),it-=et,0>it&&(it=0),0===it&&g()),X&&window.setTimeout(c,Z),!1},i=function(e){return e.snapshots.length>0&&M(U,at(new Date(1e3*s.created_at))),$("#imgPlayback").attr("src",e.snapshots[0].data),1===K&&1===et?(U++,it++):1===K&&et>1?(U+=et,U>=ot.length&&(U=ot.length),it+=et,it>ot.length-1&&(it=ot.length-1)):-1===K&&et>1&&(U-=et,1>=U&&(U=1),it-=et,0>it&&(it=0),0===it&&g()),X&&window.setTimeout(c,Z),!0},o={cache:!1,data:r,dataType:"json",error:n,success:i,contentType:"application/json; charset=utf-8",type:"GET",url:E+"cameras/"+a+"/snapshots/"+s.created_at+".json"},tt(o)}},D=function(){""!==playFromTime&&isFoundPlayFrom?14===playFromTime.length?T(playFromTime):k(playFromTime):""!==playFromTime&&isFoundPlayFrom&&(14===playFromTime.length?T(playFromTime):k(playFromTime))},k=function(e){var t,a,r,i;for(a=0;a<ot.length;){if(i=ot[a],t=n(ot[a].date),t===e)return U=a+1,it=a,rt(),$("#img").attr("src",i.url),$("#hiddenimg").attr("src",i.url),SetInfoMessage1(U,i.date,t),p(),void(r=!1);a++}},T=function(){var e,t,a;for(e=0;e<ot.length;){if(a=ot[e],a.FDT===I)return U=e+1,it=e,rt(),$("#img").attr("src",a.Url),$("#hiddenimg").attr("src",a.Url),SetInfoMessage1(U,a.DT,a.FDT),p(),void(t=!1);e++}},y=function(){var e,t,a,r,n,i;if(a=d($("#ddlRecMinutes").val()),n=d($("#ddlRecSeconds").val()),e=Math.round(ot.length/60*parseInt(a)),e<ot.length-1)for(t=0;t<ot.length;){if(i=ot[t],r=i.date.substring(i.date.indexOf(" ")+1).split(":"),r[1]===a){if(r[2]===n)return U=t+1,it=t,void P(i);if(r[2]>n)return U=t,it=t-1,i=ot[it],r=i.date.substring(i.date.indexOf(" ")+1).split(":"),$("#ddlRecSeconds").val(r[2]),void P(i)}else if(r[1]>a)return U=t,it=t-1,i=ot[it],r=i.date.substring(i.date.indexOf(" ")+1).split(":"),$("#ddlRecSeconds").val(r[2]),void P(i);t++}else U=ot.length+1,it=ot.length,P(ot[it])},z=function(){var e,t;for(e=1;59>=e;)t=$("<option>").val(d(e)).append(d(e)),$("#ddlRecMinutes").append(t),t=$("<option>").val(d(e)).append(d(e)),$("#ddlRecSeconds").append(t),e++;$("#ddlRecMinutes").bind("change",function(){y()}),$("#ddlRecSeconds").bind("change",function(){y()})},B=function(){return H(),W(),A(),O(),z(),Q(),!0},window.Evercam||(window.Evercam={}),window.Evercam.Recordings={initializeTab:B}}.call(this),function(){var e,t;t=function(){return!0},e=function(){return $("#set_permissions_submit").click(t),$("img.snap").each(function(){var e;return e=$(this),$("<img />").attr("src",$(this).attr("data-proxy")).load(function(){return this.complete&&void 0!==this.naturalWidth&&0!==this.naturalWidth?e.replaceWith($(this)):console.log("camera offline")})}),$("#live-refresh").click(function(){var e;return e=$(".camera-preview img"),$("<img />").attr("src",e.attr("src")).load(function(){return e.replaceWith($(this))}),!1}),!0},window.Evercam||(window.Evercam={}),window.Evercam.Live={initializeTab:e}}.call(this),function(){var e,t,a,r,n,i,o;r=function(){return!0},o=function(){return $(".nav-tabs a[href=#sharing]").tab("show"),setTimeout(function(){return scrollTo(0,0)},10)},t=function(e){return e.preventDefault(),i(!0),!0},n=function(e){return $("#change_owner_error").text(e),""===e?$("#change_owner_error").hide():$("#change_owner_error").show(),!0},a=function(e){var t,a,r,o,s,c;return e.preventDefault(),r=$("#new_owner_email"),""!==r.val()&&(a=$("#change_owner_dialog"),a.modal("hide"),n(""),o=function(){return n("An error occurred transferring ownership of this camera. Please try again and, if the problem persists, contact support."),i(!1),!0},s=function(e){var t;return e.success?(alert("Camera ownership has been successfully transferred."),t=window.location,t.assign(t.protocol+"//"+t.host)):(n(e.message),i(!1)),!0},t={camera_id:$("#change_owner_camera_id").val(),email:r.val()},c={cache:!1,data:t,error:o,success:s,url:"/cameras/transfer"},jQuery.ajax(c)),!0},i=function(e){var t;return e&&($("#new_owner_email").val(""),$("#change_owner_error").hide()),$("#change_owner_dialog").modal("show"),t=function(){return $("#new_owner_email").select()},setTimeout(t,200),!0},e=function(){return $("#set_permissions_submit").click(r),$(".open-sharing").click(o),$("#change_owner_button").click(t),$("#submit_change_owner_button").click(a),!0},window.Evercam||(window.Evercam={}),window.Evercam.Info={initializeTab:e}}.call(this),function(){var e,t;t=function(){return!0},e=function(){return $("#set_permissions_submit").click(t),!0},window.Evercam||(window.Evercam={}),window.Evercam.Settings={initializeTab:e}}.call(this),function(){var e,t;t=function(){return!0},e=function(){return $("#set_permissions_submit").click(t),!0},window.Evercam||(window.Evercam={}),window.Evercam.Explorer={initializeTab:e}}.call(this),function(){var e,t,a,r;t=null,r=function(){var e,a,r,n,i,o,s;return e=$("#exid").val(),i=$("#current-page").val(),s=[],$.each($("input[name='type']:checked"),function(){return s.push($(this).val())}),a=new Date($("#datetimepicker").val()).getTime()/1e3,o=new Date($("#datetimepicker2").val()).getTime()/1e3,r="",isNaN(a)||(r+="&from="+a),isNaN(o)||(r+="&to="+o),n=$("#base-url").val()+"&page="+i+"&types="+s.join()+r,null!=t&&t.ajax.url(n).load(),null==t&&$("#ajax-url").val(n),!0},a=function(){return $("#all-types").is(":checked")?$("input[name='type']").prop("checked",!0):$("input[name='type']").prop("checked",!1)},e=function(){return $("#apply-types").click(r),$(".datetimepicker").datetimepicker(),$("#all-types").click(a),jQuery.fn.DataTable.ext.type.order["string-date-pre"]=function(e){return moment(e,"MMMM Do YYYY, H:mm:ss").format("X")},r(),t=$("#logs-table").DataTable({ajax:{url:$("#ajax-url").val(),dataSrc:"logs",error:function(e){return Notification.show(e.responseJSON.message)}},columns:[{data:function(e){return moment(1e3*e.done_at).format("MMMM Do YYYY, H:mm:ss")},orderDataType:"string-date",type:"string-date"},{data:function(e){return"shared"===e.action||"stopped sharing"===e.action?e.action+" with "+e.extra["with"]:e.action},className:"log-action"},{data:function(e){return"online"===e.action||"offline"===e.action?"System":e.who}}],iDisplayLength:50,order:[[0,"desc"]]}),!0},window.Evercam||(window.Evercam={}),window.Evercam.Logs={initializeTab:e}}.call(this),function(){var e,t,a,r,n,i,o,s,c;s=function(e){return Notification.show(e),!0},c=function(e){return Notification.show(e),!0},o=function(e){var t,a;return a=$('meta[name="csrf-token"]'),a.size()>0&&(t={"X-CSRF-Token":a.attr("content")},e.headers=t),jQuery.ajax(e),!0},e=function(e){var t,a,r,i,o;return i=$("<tr>"),i.attr("webhook-id",e.id),r=document.createElement("a"),r.appendChild(document.createTextNode(e.url)),r.href=e.url,r.target="_blank",t=$("<td>",{"class":"col-lg-8"}),t.append(r),i.append(t),t=$("<td>",{"class":"col-lg-2"}),a=$("<div>",{"class":"form-group"}),o=$("<span>"),o.append($("<span>",{"class":"glyphicon glyphicon-remove"})),o.addClass("delete-webhook-control"),o.append($(document.createTextNode(" Remove"))),o.click(n),o.attr("webhook_id",e.webhook_id),o.attr("camera_id",e.camera_id),a.append(o),t.append(a),i.append(t),i.hide(),$("#webhook_list_table tbody").append(i),i.fadeIn(),!0},n=function(e){var t,a,r,n,i,c;return e.preventDefault(),t=$(e.currentTarget),i=t.parent().parent().parent(),a={camera_id:t.attr("camera_id"),webhook_id:t.attr("webhook_id")},r=function(){return s("Deleting webhook failed. Please contact support."),!1},n=function(){var e;return t.off(),e=function(){return i.remove()},i.fadeOut("slow",e),!0},c={cache:!1,data:a,dataType:"json",error:r,success:n,type:"DELETE",url:"/webhooks/"+i.attr("webhook-id")},o(c),!0},r=function(a){var r,n,i;return a.preventDefault(),i=$("#newWebhookUrl").val(),""===i?void s("Webhook URL can't be blank."):(r=function(){return s("Failed to add new webhook to the camera."),!1},n=function(t){return t.success?(e(t),c("Webhook successfully added to the camera"),$("#newWebhookUrl").val("")):s("Failed to add new webhook to the camera. The provided url is not valid."),!0},t($("#sharing_tab_camera_id").val(),i,n,r),!0)},t=function(e,t,a,r){var n,i;return n={camera_id:e,url:t,user_id:window.Evercam.current_user},i={cache:!1,data:n,dataType:"json",error:r,success:a,type:"POST",url:"/webhooks"},o(i),!0},i=function(){return $(this).parent().parent().parent().find("td:eq(2) button").fadeIn(),!0},a=function(){return $(".delete-webhook-control").click(n),$("#submit_webhook_button").click(r),$("#newWebhookUrl").keypress(function(e){return 13===e.which?$("#submit_webhook_button").trigger("click"):void 0}),$(".save").hide(),$(".reveal").focus(i),Notification.init(".bb-alert"),!0},window.Evercam||(window.Evercam={}),window.Evercam.Webhook={initializeTab:a,createWebhook:t}}.call(this),window.onload=initialize;var handleSidebarMenu=function(){jQuery(".page-sidebar").on("click","li > a",function(e){if($(this).next().hasClass("sub-menu")===!1)return void(Metronic.getViewPort().width<992&&$(".page-header .responsive-toggler").click());if(!$(this).next().hasClass("sub-menu always-open")){var t=$(this).parent().parent(),a=$(this),r=$(".page-sidebar-menu"),n=jQuery(this).next(),i=r.data("auto-scroll"),o=parseInt(r.data("slide-speed"));t.children("li.open").children("a").children(".arrow").removeClass("open"),t.children("li.open").children(".sub-menu:not(.always-open)").slideUp(o),t.children("li.open").removeClass("open");var s=-200;n.is(":visible")?(jQuery(".arrow",jQuery(this)).removeClass("open"),jQuery(this).parent().removeClass("open"),n.slideUp(o,function(){1==i&&0==$("body").hasClass("page-sidebar-closed")&&($("body").hasClass("page-sidebar-fixed")?r.slimScroll({scrollTo:a.position().top}):Metronic.scrollTo(a,s)),handleSidebarAndContentHeight()})):(jQuery(".arrow",jQuery(this)).addClass("open"),jQuery(this).parent().addClass("open"),n.slideDown(o,function(){1==i&&0==$("body").hasClass("page-sidebar-closed")&&($("body").hasClass("page-sidebar-fixed")?r.slimScroll({scrollTo:a.position().top}):Metronic.scrollTo(a,s)),handleSidebarAndContentHeight()})),e.preventDefault()}})}();