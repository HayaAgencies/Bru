
function GetPrint()
{
    /*For Print*/
    window.print();
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
    var rate = document.getElementsByName("rate")[index].value;

    var amt = qty * rate;
    document.getElementsByName("amt")[index].value = amt;

    GetTotal();
}

function GetTotal()
{
    /*Footer Calculation*/   

    var sum=0;
    var amts =  document.getElementsByName("amt");

    for (let index = 0; index < amts.length; index++)
    {
        var amt = amts[index].value;
        sum = +(sum) +  +(amt) ; 
    }

    document.getElementById("FTotal").value = sum;

}
 
$(document).ready(function () {
    FillDataList();
});

function FillDataList()
{
        $.getJSON("https://script.google.com/macros/s/AKfycbznmBRZdKIKDjKYsTNN63Clu9KsIkVqM0TEXmOtog7WIpRkL2fIuK9cYhW3d7CCL1qYgw/exec?page=dropdown", 
        function (data) {                              //01
          var Options="";                              
          $.each(data, function(key, value)            //02
          {
            Options = Options + '<option>' + value + '</option>';   //03
          });
          $(".item_nm").append(Options);               //04
        });
}

$(document).ready(function () {
    customer();
});

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
function itemdata(v)
{
  var index = $(v).parent().parent().index()
  var item = document.getElementsByName("item_nm")[index].value;
  var BRURATE = 180;
  var boostrs5 = 4.60;
  var brusac2 = 1.80;
  var brusac5 = 4.45;
  var redlabel = 500;
  if(item == "BRU 180"){
    document.getElementsByName("rate")[index].value = BRURATE;
  }
  else if(item == "BOOST Rs 5"){
    document.getElementsByName("rate")[index].value = boostrs5;
  }
  else if(item == "HORLICKS Rs 5"){
    document.getElementsByName("rate")[index].value = boostrs5;
  }
  else if(item == "BRU Rs 2"){
    document.getElementsByName("rate")[index].value = brusac2;
  }
  else if(item == "BRU Rs 5"){
    document.getElementsByName("rate")[index].value = brusac5;
  }
  else if(item == "RED LABEL"){
    document.getElementsByName("rate")[index].value = redlabel;
  }
}