let Shop = sessionStorage.getItem("Shop")

let mobile = sessionStorage.getItem("mob")

let address = sessionStorage.getItem("add")


$(document).ready(function(){

    HI()

    Set_Date()

    Print_Item()

})

function HI(){
    

    document.getElementById("STNM").innerText = Shop

    document.getElementById("par-add-1").innerText = address

    document.getElementById("par-add-3").innerText = mobile
}

function Set_Date(){

    let System_date = new Date();

    let dd = System_date.getDate()

    let mm = System_date.getMonth()

    let yy = System_date.getFullYear()
    
    if(dd < 10) dd = "0" + dd

    if(mm < 10) mm = "0" + mm

    let date = dd+ "-" + mm + "-" + yy
    
    document.getElementById("date").innerText ="Date : " + date
}

function Print_Item(){

    let Row = 1

    Row = sessionStorage.getItem("Total_Row")

    var amt = 0

    for (let i = 0; i < Row; i++) {

        i ++

        document.getElementById("itemr"+i).innerText = sessionStorage.getItem("Item"+i)

        document.getElementById("Qtyr"+i).innerText = sessionStorage.getItem("QTY"+i)

        document.getElementById("Rater"+i).innerText = sessionStorage.getItem("Rate"+i)

        document.getElementById("Amtr"+i).innerText = Math.round(sessionStorage.getItem("QTY"+i) * sessionStorage.getItem("Rate"+i))

        amt = amt + Math.round(sessionStorage.getItem("QTY"+i) * sessionStorage.getItem("Rate"+i))

        i--
        
    }

    document.getElementById("Total_Amt").innerText = "Total Amount : "+amt

    window.print()

    window.location.assign("invoice.html")


}
