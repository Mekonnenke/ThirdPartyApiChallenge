
$(document).ready(function() {
  
    // to test flag
    const test = false;
  
    // get times from moment
    const now = moment().format('MMMM Do YYYY');
  
    // commented out for test in non-standard hours
    var nowHour24 = moment().format('H');
    var nowHour12 = moment().format('h');
  
    // set times for tesitng after hours
    if (test) {
      nowHour24 = 13;
      nowHour12 = 1;
    }
  
  var $dateDisplay = $('#currentDay');
    $dateDisplay.text(now);
    
    
    // this is the icon linc in images folder
    const saveIcon = "./assets/images/flopy.svg";  
  
    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    var descriptionStore = JSON.parse(localStorage.getItem("descriptionStore"));
  
    if (test) { console.log(descriptionStore); }
  
    // If plans were retrieved from localStorage, update the plan array to it
    if (descriptionStore !== null) {
      textInput = descriptionStore;
    } else {
      // this should only occur on first time the app is loaded in the browser
      // helpfully remind user that lunch is important
      textInput = new Array(9);
      textInput[4] = "Here is the app loading text";
    }
  
    if (test) { console.log("Long text input in the text box",textInput); }
  
    // set variable referencing planner element
    var $scheduler = $('#scheduleInput');
    // clear existing elements
    $scheduler.empty();
  
    if (test) { console.log("current time",nowHour12); }
  
  
    //calander index display
    for (var hour = 9; hour <= 17; hour++) {
      // index for array use offset from hour
    var index = hour - 9;
      
      // build row components
      var $rowContainer = $('<div>');
      $rowContainer.addClass('row');
      $rowContainer.addClass('plannerRow');
      $rowContainer.attr('hour-index',hour);
    
      // Start building Time box portion of row
      var $col2TimeDiv = $('<div>');
      $col2TimeDiv.addClass('col-md-2');
    
      // create timeBox element (contains time)
      const $timeBoxSpn = $('<span>');
      // can use this to get value
      $timeBoxSpn.attr('class','timeBox');
      
      // format hours for display
      var displayHour = 0;
      var both = "";
      if (hour > 12) { 
        displayHour = hour - 12;
        both = "pm";
      } else {
        displayHour = hour;
        both = "am";
      }
      
      // populate timeBox with time
      $timeBoxSpn.text(`${displayHour} ${both}`);
  
      // insert into col inset into timebox
      $rowContainer.append($col2TimeDiv);
      $col2TimeDiv.append($timeBoxSpn);
      // STOP building Time box portion of row
  
      // START building input portion of row
      // build row components
      var $textBoxEl = $('<textarea>');
  
      $textBoxEl.attr('id',`textarea-${index}`);
      $textBoxEl.attr('hour-index',index);
      $textBoxEl.attr('type','text');
      $textBoxEl.attr('class','textBoxSize');
  
      // access index from data array for hour 
      $textBoxEl.val(textInput[index] );
      
      // create col to control width
      let $col9IptDiv = $('<div>');
      $col9IptDiv.addClass('col-md-9');
  
      // add col width and row component to row
      $rowContainer.append($col9IptDiv);
      $col9IptDiv.append($textBoxEl);
      // STOP building Time box portion of row
  
      // START building save portion of row
      let $col1SaveDiv = $('<div>');
      $col1SaveDiv.addClass('col-md-1');
  
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"far fa-save saveIcon");
      
      // add col width and row component to row
      $rowContainer.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
      // STOP building save portion of row
  
      // set row color based on time
      updateRowColor($rowContainer, hour);
      
      // add row to planner container
      $scheduler.append($rowContainer);
    };
  
    //this function change color time depend of the 
    function updateRowColor ($hourRow,hour) { 
  
      if (test) { console.log("rowColor ",nowHour24, hour); }
  
      if ( hour < nowHour24) {
        // $hourRow.css('')
        if (test) { console.log("lessThan"); }
        $hourRow.css("background-color","lightgray")
      } else if ( hour > nowHour24) {
        if (test) { console.log("greaterthan"); }
        $hourRow.css("background-color","green")
      } else {
        if (test) { console.log("eqaul"); }
        $hourRow.css("background-color","red")
      }
    };
  
    // saves to local storage
    // conclick function to listen for user clicks on plan area
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      if (test) { console.log('click pta before '+textInput); }
  
      let $index = $(this).attr('save-id');
  
      let textareaId = '#textarea-'+$index;
      let $value = $(textareaId).val();
  
      textInput[$index] = $value;
  
  
      if (test) { console.log('value ', $value); }
      if (test) { console.log('index ', $index); }
      if (test) { console.log('click pta after '+ textInput); }
  
      // remove shawdow pulse class
      $(`#saveid-${$index}`).removeClass('shadowPulse');
      localStorage.setItem("descriptionStore", JSON.stringify(textInput));
    });  
    
    // function to color save button on change of input
    $(document).on('change','textarea', function(event) {
      event.preventDefault();  
      if (test) { console.log('onChange'); }
      if (test) { console.log('id', $(this).attr('hour-index')); }
  
      // neeed to check for save button
  
      let i = $(this).attr('hour-index');
  
      // add shawdow pulse class
      $(`#saveid-${i}`).addClass('shadowPulse');
    });
  });