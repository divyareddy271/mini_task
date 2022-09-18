
function formvalidation(){ 
   
   var Name= document.forms["myForm"]["Name"].value;
    var email =  document.forms["myForm"]["email"].value;
    var phnno= document.forms["myForm"]["phnno"].value;
    var DOB =  document.forms["myForm"]["DOB"].value;
    var Gender= document.forms["myForm"]["Gender"].value;
    var Address =  document.forms["myForm"]["Address"].value;
    var Country= document.forms["myForm"]["Country"].value;
    var State =  document.forms["myForm"]["State"].value;
    var Name= document.forms["myForm"]["Name"].value;
    var City =  document.forms["myForm"]["City"].value;
    var password= document.forms["myForm"]["password"].value;
    var confirm_password = document.forms["myForm"]["C_password"].value
    var docs =  document.forms["myForm"]["docs"].value;
    var avtar =  document.forms["myForm"]["avtar"].value;
    var lowerCaseLetters = /[a-z]/g;  var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var valid = true;
    var phoneno = /^\d{10}$/;
    
    if(password == confirm_password){
        $("#span-C_password").html("")
    }
    else{
        $("#span-C_password").html("Both the passwords are not matching")
        valid = false;
    }
    if(password == ""){
        $("#span-Password").html("Password filed can't be empty")
        valid = false;
    }
    else if(!(password.match(lowerCaseLetters) || password.match(numbers)|| password.length >= 8 || password.match(upperCaseLetters))) {  

        $("#span-Password").html("Password should have more than 8 characters. Password should have uppercase letters, lowercase letters and numeric values")
        valid = false;
    } else {
        $("#span-Password").html("")
    }  
    if (Name == "") {
        $("#span-Name").html("Name filed can't be empty")
        valid = false;
    }
    else{
        $("#span-Name").html("") 
    }
    if (email == "") {
        $("#span-Email").html("Email filed can't be empty");
        valid = false;
    }
    else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        $("#span-Email").html("");
        valid = true;
    }else{
        $("#span-Email").html("You have entered an invalid email address!")
        valid = false;
    } 
    if (phnno == "") {
        $("#span-Mno").html("Mobile Number filed can't be empty");
        valid = false;
    } 
    if(! phnno.match('[0-9]{10}')){
        console.log(phnno)
        $("#span-Mno").html("You have entered invalid number");
        valid = false;
    }
    else{
        $("#span-Mno").html("");
        valid = true;
    }
    if (avtar == "") {
        $("#span-PP").html("Upload your profile picture");
        valid = false;
    }
    else{
        var fileInput = document.getElementById('file');
        var filePath = fileInput.value;
        var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (!allowedExtensions.exec(filePath)) {
            $("#span-PP").html("Invalid file type. Upload jpg/png files");
            valid = false;
        }
    }
    
    if (docs == "") {
        $("#span-doc").html("Upload your documents")  
        valid = false;
    }
    else{
        var fileInput = document.getElementById('file');
        var filePath = fileInput.value;
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.pdf|\.xls)$/i;
        if (!allowedExtensions.exec(filePath)) {
            $("#span-doc").html("Invalid file type. Upload pdf/xls/jpg/png ");
            valid = false;
        }
    }
    if (Address == "") {
        $("#span-Adr").html("Address filed can't be empty");
        valid = false; 
    }
    if (Country == "") {
        $("#span-Country").html("Country filed can't be empty")
        valid = false;
    }
    if (State == "") {
        $("#span-State").html("State filed can't be empty")
        valid = false;
    }
    if (City == "") {
        $("#span-City").html("City filed can't be empty")
        valid = false;
    }
     
    console.log(DOB);
    if(DOB){
        
         //Check whether valid dd/MM/yyyy Date Format.
         var parts = DOB.split("-");
         console.log(parts[0],parts[1],parts[2])
         var dtDOB = new Date(parts[1] + "-" + parts[2] + "-" + parts[0]);
         var dtCurrent = new Date();
         console.log(dtDOB,dtCurrent)
         if (dtCurrent.getFullYear() - dtDOB.getFullYear() < 18) {
            $("#span-DOB").html("Eligibility 18 years ONLY")
            valid = false;
         }
        if (dtCurrent.getFullYear() - dtDOB.getFullYear() == 18) {

             //CD: 11/06/2018 and DB: 15/07/2000. Will turned 18 on 15/07/2018.
             if (dtCurrent.getMonth() < dtDOB.getMonth()) {
                $("#span-DOB").html("Eligibility 18 years ONLY")
                valid = false;
             }
             if (dtCurrent.getMonth() == dtDOB.getMonth()) {
                 //CD: 11/06/2018 and DB: 15/06/2000. Will turned 18 on 15/06/2018.
                 if (dtCurrent.getDate() < dtDOB.getDate()) {
                    $("#span-DOB").html("Eligibility 18 years ONLY")
                    valid = false;
                 }
            }
        } 
    }
    if(valid){
        return true;
    }
    return false;
}
