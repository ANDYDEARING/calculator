

let buttonList = document.querySelectorAll(".calc-button")
for (let button of buttonList){
    button.addEventListener('click', function(){
        document.querySelector(".display").value += button.value
    })
}