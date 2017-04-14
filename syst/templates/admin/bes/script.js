$.fn.SelectCustomizer = function () {
    return this.each(function () {
        var obj = $(this);
        var name = obj.attr('id');
        var id_slc_options = name + '_options';
        var id_icn_select = name + '_iconselect';
        var id_holder = name + '_holder';
        var custom_select = name + '_customselect';
        obj.after("<div id=\"" + id_slc_options + "\"> </div>");
        obj.find('option').each(function (i) {
            $("#" + id_slc_options).append("<div title=\"" + $(this).attr("value") + "\" class=\"selectitems\"><span>" + $(this).html() + "</span></div>");
        });
        obj.before("<input type=\"hidden\" value =\"\" name=\"" + this.name + "\" id=\"" + custom_select + "\"/><div id=\"" + id_icn_select + "\">" + this.title + "</div><div id=\"" + id_holder + "\"> </div>").remove();
        $("#" + id_icn_select).click(function () {
            $("#" + id_holder).slideToggle(200);
        });
        $("#" + id_holder).append($("#" + id_slc_options)[0]);
        $("#" + id_holder + " .selectitems").mouseover(function () {
            $(this).addClass("hoverclass");
        });
        $("#" + id_holder + " .selectitems").mouseout(function () {
            $(this).removeClass("hoverclass");
        });
        $("#" + id_holder + " .selectitems").click(function () {
            $("#" + id_holder + " .selectedclass").removeClass("selectedclass");
            $(this).addClass("selectedclass");
            var thisselection = $(this).html();
            $("#" + custom_select).val(this.title);
            $("#" + id_icn_select).html(thisselection);
            $("#" + id_holder).slideToggle(250)
        });
    });
}


$(document).ready(function () {
    $("#date").datetimepicker({
        timeFormat: 'HH:mm:ss',
        dateFormat: 'yy-mm-dd'
    });
    $(".date").datetimepicker({
        timeFormat: 'HH:mm:ss',
        dateFormat: 'yy-mm-dd'
    });
    $('#selector').SelectCustomizer();

    $(".ajaxLink").click(function (e){
        e.stopPropagation();
        var link = $(this).attr('href');
        $.get( link, function( data ) {
            showAjaxResponse(data);
        });
        return false;
    });

    function showAjaxResponse(data) {
        if(data == 'true') {
            $( "#ajaxResult").html("Действие выполнено успешно").show('fast');
        } else if (data == 'false') {
            $( "#ajaxResult").html("Действие выполнено не было").show('fast');
        } else {
            $( "#ajaxResult").html( data ).show('fast');
        }
        setTimeout(function() { $("#ajaxResult").hide('fast'); }, 10000);
    }

    // ajaxForm
    var options = {
        target:        '#output1',   // target element(s) to be updated with server response
        beforeSubmit:  showRequest,  // pre-submit callback
        success:       showResponse  // post-submit callback

        // other available options:
        //url:       url         // override for form's 'action' attribute
        //type:      type        // 'get' or 'post', override for form's 'method' attribute
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type)
        //clearForm: true        // clear all form fields after successful submit
        //resetForm: true        // reset the form after successful submit

        // $.ajax options can be used here too, for example:
        //timeout:   3000
    };

    // pre-submit callback
    function showRequest(formData, jqForm, options) {
        // formData is an array; here we use $.param to convert it to a string to display it
        // but the form plugin does this for you automatically when it submits the data
                var queryString = $.param(formData);

        // jqForm is a jQuery object encapsulating the form element.  To access the
        // DOM element for the form do this:
        // var formElement = jqForm[0];

//                alert('About to submit: \n\n' + queryString);

        // here we could return false to prevent the form from being submitted;
        // returning anything other than false will allow the form submit to continue
                return true;
    }

    // post-submit callback
    function showResponse(responseText, statusText, xhr, $form)  {
        // for normal html responses, the first argument to the success callback
        // is the XMLHttpRequest object's responseText property

        // if the ajaxForm method was passed an Options Object with the dataType
        // property set to 'xml' then the first argument to the success callback
        // is the XMLHttpRequest object's responseXML property

        // if the ajaxForm method was passed an Options Object with the dataType
        // property set to 'json' then the first argument to the success callback
        // is the json data object returned by the server

        /*alert('status: ' + statusText + '\n\nresponseText: \n' + responseText +
            '\n\nThe output div should have already been updated with the responseText.');
            */
        showAjaxResponse(responseText);
    }

    $('.ajaxForm').ajaxForm(options);

});

/**
 * Выпадающие вкладки
 */
var openTab = false;
function openTabs(tabName) {

    changeTabsPointer(tabName);

    if (openTab !== false) {
        if (tabName == openTab) {
            $(".close_this").slideUp(100);
            openTab = false;
        } else {
            $(".close_this").slideUp(100);
            $("." + tabName + "").slideDown(100);
            openTab = tabName;
        }
    } else {
        $("." + tabName + "").slideDown(100);
        openTab = tabName;
    }
}

function changeTabsPointer(tabName) {

    if (openTab !== false) {
        if (tabName == openTab) {
            $('#' + tabName + '').addClass('white_arrow_bottom').removeClass('white_arrow_top');
        } else {
            $('div.white_arrow_top').addClass('white_arrow_bottom').removeClass('white_arrow_top');
            $('#' + tabName + '').addClass('white_arrow_top').removeClass('white_arrow_bottom');
        }
    } else {
        $('#' + tabName + '').addClass('white_arrow_top').removeClass('white_arrow_bottom');
    }

    /*    if(tabName == 'settings_tab') {
     if($("#pointer1").hasClass("white_arrow_bottom")) {
     $('#pointer1').addClass('white_arrow_top').removeClass('white_arrow_bottom');
     } else {
     $('#pointer1').addClass('white_arrow_bottom').removeClass('white_arrow_top');
     }
     } else if(tabName == 'help_tab') {
     if($('#pointer2').hasClass('white_arrow_bottom')) {
     $('#pointer2').addClass('white_arrow_top').removeClass('white_arrow_bottom');
     } else {
     $('#pointer2').addClass('white_arrow_bottom').removeClass('white_arrow_top');
     }
     }*/
}

$(document).ready(function () {
    $(".help_tab_button").click(function () {
        openTabs('help_tab');
    });
    $(".settings_tab_button").click(function () {
        openTabs('settings_tab');
    });
});


/* выпадающее меню гармошка (что слева вверху) */
$(document).ready(function () {
    $(".box ul").hide();
    //$(".box ul li:odd").addClass("alt");
    $(".box ul li:odd").css("background-color", "#757575");
    $("h3 span").click(function () {
        $(this).parent().next().slideToggle(100);
    });

    $('#notepad').click(function ( e ) {
        $.fn.custombox({
            url: '/syst/modules/notepad/admin/edit.php'
        });
        e.preventDefault();
    });
});