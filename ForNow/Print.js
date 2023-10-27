let Shop = sessionStorage.getItem("Shop")
let mobile = sessionStorage.getItem("mob")
let address = sessionStorage.getItem("add")

$(document).ready(function(){

    HI()

})

function HI(){
    document.getElementById("STNM").innerText = Shop

    document.getElementById("par-add-1").innerText = address

    document.getElementById("par-add-3").innerText = mobile
}
