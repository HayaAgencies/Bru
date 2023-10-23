var Appsscript = "https://script.google.com/macros/s/AKfycbwF6ckQ1Q-coiP45ZCFgzY_Hw-A4bLTv_Td42QyZ5vqTn5W8C1ZamxwbeA9HJsqOR56VQ/";

var ap="https://script.google.com/macros/s/AKfycbwmFlYBrHsbaR2I4R-EIsKvhi0aTLhjAHPMwg5unk9CroeOiCGV1xEBn2LX_GrH-ucK/exec"

function GetPrint()
{

  /*For Print*/

  let dt = document.getElementById("Date").value

  let nm = document.getElementById("Party").value

  document.getElementById("shopnm").innerText = nm

  document.getElementById("Dt").innerText  = dt

  $(".NoPrint").hide()

  $(".btn").hide()

  $(".ToPrint").show()

  window.print();

  setTimeout(ch, 3000)

}

function ch(){
  
  $(".ToPrint").hide()

  $(".NoPrint").show()

  $(".btn").show()

}

function BtnAdd()
{

  /*Add Button*/

  var v = $("#TRow").clone().appendTo("#TBody") ;

  $(v).find("input").val('');

  $(v).removeClass("d-none");

  $(v).find("th").first().html($('#TBody tr').length - 1);

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
 
$(document).ready(function () {

  FillDataList();

  FormValidation();

  customer();

  Inv()

});

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

  var no = $(v).val();

  $.getJSON(ap+"?page=Search&item="+no,

  function(data){

    if(data > 0)

    {

      document.getElementsByName("Mrp")[index].value = data;

      Calc(v)

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