$(document).ready(function(){
    //initialize all modals           
    $('.modal').modal();

    $('#addYoutube').click(function(){
        var url = $('#url').val()
        $.ajax({
            method: "POST",
            url: "/youtube/addChannel",
            data: { channel: url }
        }).done(function(data){
            //alert(data)
        }).fail(function(){
            alert("The request has failed")
        }).always(function(){
            //alert("complete")
        })
    });
})