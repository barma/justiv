$(document).ready(function () {


    $(".ajaxLink").click(function (e){
        e.stopPropagation();
        var link = $(this).attr('href');
        $.get( link, function( data ) {
            showAjaxResponse(data);
        });
        return false;
    });

    function showAjaxResponse(data) {
//        alert('asd');
        if(data == 'true') {
            $( "#ajaxResult").html("Действие выполнено успешно").show('slow');
        } else if (data == 'false') {
            $( "#ajaxResult").html("Действие выполнено не было").show('slow');
        } else {
            $( "#ajaxResult").html( data ).show('slow');
        }
        setTimeout(function() { $("#ajaxResult").hide('slow'); }, 10000);
    }

});
