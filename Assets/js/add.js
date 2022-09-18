//console.log("add");
function _(element){
    ////console.log("element",elememt)
    return document.getElementById(element);
}
function fetch_data(parent_ele,child_ele,type)
{
    //console.log(parent_ele.value)
    fetch('/get_data?type='+type+'&parent_value='+parent_ele.value).then(
        function(response){
            return response.json();
    }).then(function(responseData){
        //console.log(responseData)
        var html = " ";
        if(type == 'load_state'){
            html = '<option value="">Select State</option>';
        }
        if(type=="load_city"){
            html = '<option value="">Select City</option>';
        }
        for(var count = 0; count<responseData.length;count++){
            html += '<option value = "'+responseData[count]+'">'+responseData[count]+'</option>'
        }
        child_ele.innerHTML = html; 
    });
   
}
_("country").onchange = function(){
    fetch_data(_("country"),_("state"),"load_state")
}
if(_("head").innerHTML=="Register-Form"){
    
 _("state").onchange = function(){
    fetch_data(_("state"),_("city"),"load_city")
}
}