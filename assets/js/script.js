<input type="text" value ="today();" id="datepicker"/>
JS:

 $('#datepicker').datepicker();
function today(){
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1;
    var curr_year = d.getFullYear();
    document.write(curr_date + "-" + curr_month + "-" + curr_year);
}


$(function()
{


setTimeout("displaytime()", 1000)
})
function displaytime(){

    var dt= new Date();
    $("#idtime").html(dt.toLocaleTimeString());

    setTimeout('displaytime()', 1000);
}


// modal is fully visible
$("#task-form-modal").on("shown.bs.modal", function() {
  // highlight textarea
  $("#modalTaskDescription").trigger("focus");
});


$(document).ready(function(){
    $(".table-2").mouseover(function(){
      $(".table-2").css("background-color", "green");
    });
    $(".table-2").mouseout(function(){
      $(".table-2").css("background-color", "lightgray");
    });
  });