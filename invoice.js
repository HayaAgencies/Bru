var Appsscript = "https://script.google.com/macros/s/AKfycbwF6ckQ1Q-coiP45ZCFgzY_Hw-A4bLTv_Td42QyZ5vqTn5W8C1ZamxwbeA9HJsqOR56VQ/";

var Address_From_Appsscript = "https://script.google.com/macros/s/AKfycbygBasdHUIeE02uKRgnDhMzw551Sj_k_67MNT1G9JJRu-k7wOTmbTwaP_PJNTputD5f/exec"

var ap="https://script.google.com/macros/s/AKfycbwmFlYBrHsbaR2I4R-EIsKvhi0aTLhjAHPMwg5unk9CroeOiCGV1xEBn2LX_GrH-ucK/exec"

var tttindex = 1;

var Addresss = Boolean()

Addresss = false

var Ratee = 0 

var Ind = 0
 
$(document).ready(function () {

  FillDataList();

  FormValidation();

  customer();

  Inv()

});

function GetPrint()
{

  /*For Print*/

  let dt = document.getElementById("Date").value

  let nm = document.getElementById("Party").value

  document.getElementById("shopnm").innerText = nm

  sessionStorage.setItem("Shop", nm)

  sessionStorage.setItem("dt",dt)

  /*$(".NoPrint").hide()

  $(".btn").hide()

  $(".ToPrint").show()

  ch()*/

  if(Addresss){
    
    window.location.assign("Print.html")
  
  }

}

function Get_ADD_PHNO(){

  let party = $("#Party").val()

  $.getJSON(Address_From_Appsscript+"?page=getaddress&party="+party,
  
  function(data){

    var record = data

    let ind = 1

    $.each(record, function(key, value){

      $.each(value, function(key1 , value1){

        if(ind == 1){

          sessionStorage.setItem("mob", value1)
          ind ++

        }
        else if(ind == 2){

          sessionStorage.setItem("add", value1)
          ind ++

        }

      })

    })

  })

  Addresss = true

}

function Get_QTY(v){

  let index = $(v).parent().parent().index()

  index = index + 1

  let QTY = $(v).val()

  sessionStorage.setItem("QTY"+index, QTY)

  sessionStorage.setItem("Total_Row",index)

}

function Get_Item(v){

  let index = $(v).parent().parent().index()

  index = index + 1

  let item = $(v).val()
  
  sessionStorage.setItem("Item"+index, item)

}

function Get_Rate(){

  sessionStorage.setItem("Rate"+Ind, Ratee)

}

function BtnAdd()
{

  /*Add Button*/

  var v = $("#TRow").clone().appendTo("#TBody") ;

  $(v).find("input").val('');

  $(v).removeClass("d-none");

  $(v).find("th").first().html($('#TBody tr').length - 1);

  tttindex ++

}

function BtnDel(v)
{

  /*Delete Button*/

  $(v).parent().parent().remove(); 

  GetTotal();


  
  $("#TBody").find("tr").each(
  
    function(index)
  
    {
  
      $(this).find("th").first().html(index);
  
    }

  );

  tttindex --

}

function Calc(v)
{

  /*Detail Calculation Each Row*/

  var index = $(v).parent().parent().index();

  var qty = document.getElementsByName("qty")[index].value;

  var rate = document.getElementsByName("Mrp")[index].value;


  
  var amt = qty * rate;
  
  document.getElementsByName("Amt")[index].value = amt;

  GetTotal();
}

function GetTotal()
{

  var sum=0;

  var amts =  document.getElementsByName("Amt");

  for (let index = 0; index < amts.length; index++)

  {

    var amt = amts[index].value;

    sum = +(sum) +  +(amt) ; 

  }

  sum = Math.round(sum)

  document.getElementById("TotalAmt").value = sum;

}

function FillDataList()
{

  $.getJSON(ap+"?page=DropDown", 

  function (data) {                              //01

    var Options="";                              

    $.each(data, function(key, value)            //02

    {

      Options = Options + '<option>' + value + '</option>';   //03

    });

    $(".item_nm").append(Options);               //04

  });
}

function customer()
{

  $.getJSON("https://script.google.com/macros/s/AKfycbyg0scZrIPtWIJk-CftfKRcgxnGfunyrVF4wyO4kGJirRNxE9TcFmp2Vaphe3gBQP9o/exec?page=dropdown", 

  function (data) {                              //01

    var Options="";                              

    $.each(data, function(key, value)            //02

    {

      Options = Options + '<option>' + value + '</option>';   //03

    });

    $(".cust").append(Options);               //04

  });

}

function getrate(v)
{

  var index = $(v).parent().parent().index();
  
  Ind = $(v).parent().parent().index() + 1;

  var no = $(v).val();

  $.getJSON(ap+"?page=Search&item="+no,

  function(data){

    if(data > 0)

    {

      document.getElementsByName("Mrp")[index].value = data;

      Calc(v)

      Ratee = data
      
      Get_Rate()

    }      

  })

  
}

function FormValidation()
{

  // Example starter JavaScript for disabling form submissions if there are invalid fields

  (function () {

    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to

    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
  
    Array.prototype.slice.call(forms)
  
    .forEach(function (form) {
  
      form.addEventListener('submit', function (event) {
  
        if (!form.checkValidity()) {
  
          event.preventDefault()
  
          event.stopPropagation()
  
        }

        form.classList.add('was-validated')

      }, false)

    })

  })()

}

function Inv()
{

  $.getJSON(ap+"?page=InvNoGenerate",

  function(data){

    $("#Inv").val(data)

  })
}

