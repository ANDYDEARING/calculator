function evaluateExpression(expression){
    try {
        return math.evaluate(expression)
    } catch {
        return "ERROR"
    }
}

document.querySelector(".display").addEventListener('click', function(){
    if (document.querySelector(".display").value === "0"){
        document.querySelector(".display").value = ''
    }
})

document.querySelector(".display").addEventListener("keyup", function(event){
    if (event.keyCode === 13) {
        document.querySelector(".equals").click()
    }
})

let buttonList = document.querySelectorAll(".calc-button")
for (let button of buttonList){
    button.addEventListener('click', function(){
        if (button.value==="equals"){
            expression = document.querySelector(".display").value
            document.querySelector(".display").value = `= ${evaluateExpression(expression)}`
        } else if (button.value==="clear"){
            document.querySelector(".display").value = "0"
        } else {
            if (document.querySelector(".display").value === "0"){
                document.querySelector(".display").value = button.value
            } else if (document.querySelector(".display").value[0] === "=" ){
                if (isNaN(button.value)){
                    tempArray = document.querySelector(".display").value.split('')
                    tempArray.splice(0,2)
                    document.querySelector(".display").value = tempArray.join('')
                    document.querySelector(".display").value += button.value
                } else {
                    document.querySelector(".display").value = button.value
                }
            } else {
                document.querySelector(".display").value += button.value
            }
        }
        if (button.value === "."){
            checkIndex = document.querySelector(".display").value.length - 2
            if (checkIndex < 0) {
                document.querySelector(".display").value = "0."
            } else if (isNaN(document.querySelector(".display").value[checkIndex])) {
                tempArray = document.querySelector(".display").value.split('')
                tempArray.splice(checkIndex+1,0,"0")
                document.querySelector(".display").value = tempArray.join('')
            }
        }
    })
}