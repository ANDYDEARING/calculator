function evaluateExpression(expression){
    return math.evaluate(expression)
}

let buttonList = document.querySelectorAll(".calc-button")
for (let button of buttonList){
    button.addEventListener('click', function(){
        if (button.value==="equals"){
            expression = document.querySelector(".display").value
            document.querySelector(".display").value = evaluateExpression(expression)
        } else if (button.value==="clear"){
            document.querySelector(".display").value = "0"
        } else {
            if (document.querySelector(".display").value === "0"){
                document.querySelector(".display").value = button.value
            } else {
                document.querySelector(".display").value += button.value
            }
        }
    })
}