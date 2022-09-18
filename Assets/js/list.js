

var modal = document.getElementById("myModal");
    
    // Get the button that opens the modal
    var btn = document.getElementsByClassName("myBtn");
    
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
    function editdetailsstate(edittag){
        
        $(edittag).on("click", function (e) {
            console.log("res",$(edittag))
            e.preventDefault();
            console.log("reached list")
            var href = $(edittag).prop("href");
            $.get(href,function(data,status){
                console.log(data.data)
                $("#stateid").val(data.data.state._id);
                $("#editstate").val(data.data.state.State)
                modal.style.display = "block";
            })
        })
    }
    function editdetailscity(edittag){
        
        $(edittag).on("click", function (e) {
            console.log("res",$(edittag))
            e.preventDefault();
            console.log("reached list")
            var href = $(edittag).prop("href");
            $.get(href,function(data,status){
                console.log(data.data)
                $("#cityid").val(data.data.city._id);
                $("#editcity").val(data.data.city.City)
                modal.style.display = "block";
            })
        })
    }
    function editdetailscountry(edittag){
        
        $(edittag).on("click", function (e) {
            console.log("res",$(edittag))
            e.preventDefault();
            console.log("reached list")
            var href = $(edittag).prop("href");
            $.get(href,function(data,status){
                console.log(data.data)
                $("#countryid").val(data.data.country._id);
                $("#editcountry").val(data.data.country.Country_Name)
                modal.style.display = "block";
            })
        })
    }
    let apply_to_edit_state = function ()
    {
        var edit = $(".myBtn")
        for(let edit_a of edit){
            console.log("reachedd");
            editdetailsstate(edit_a);
        
        }
    }
    let apply_to_edit_city = function ()
    {
        var edit = $(".myCityBtn")
        for(let edit_a of edit){
            console.log("reachedd");
            editdetailscity(edit_a);
        
        }
    }
    let apply_to_edit_country = function ()
    {
        var edit = $(".myCountryBtn")
        for(let edit_a of edit){
            console.log("reachedd");
            editdetailscountry(edit_a);
        
        }
    }
    apply_to_edit_state();
    apply_to_edit_city();
    apply_to_edit_country();
