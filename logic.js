// return error on invalid input
// AREA FOR IMPROVEMENT: could find a way to track an answer without "="
function evaluateExpression(expression){
    try {
        return math.evaluate(expression)
    } catch {
        return "ERROR"
    }
}

// removes the default 0 on a click event in the display
// AREA FOR IMPROVEMENT: could change class selectors to ids
// AREA FOR IMPROVEMENT: could find a way to track an answer without "="
document.querySelector(".display").addEventListener('click', function(){
    if (document.querySelector(".display").value === "0"){
        document.querySelector(".display").value = ''
    }
})

// allows the user to press enter to evaluate the display when typing
// AREA FOR IMPROVEMENT: could add functionality for all keys and shift-
// accessible operands. Need to override defaults on key presses. JQuery?
document.querySelector(".display").addEventListener("keydown", function(event){
    if (event.keyCode === 13) {
        document.querySelector(".equals").click()
    }
})

// get all the buttons
let buttonList = document.querySelectorAll(".calc-button")

// loop through them and add event listeners
for (let button of buttonList){
    button.addEventListener('click', function(){

        // if "equals", evaluate and add a "= " to the answer
        if (button.value==="equals"){
            expression = document.querySelector(".display").value
            document.querySelector(".display").value = `= ${evaluateExpression(expression)}`

        // if clear, add the default 0 back
        } else if (button.value==="clear"){
            document.querySelector(".display").value = "0"

        // otherwise
        } else {

            // add the button value without the 0 if first input
            // AREA FOR IMPROVEMENT: could keep the 0 on an operand
            if (document.querySelector(".display").value === "0"){
                document.querySelector(".display").value = button.value

            // if an answer is on the display, keep the number if an operand is
            // pressed, otherwise delete the answer and begin anew
            } else if (document.querySelector(".display").value[0] === "=" ){
                if (isNaN(button.value)){
                    tempArray = document.querySelector(".display").value.split('')
                    tempArray.splice(0,2)
                    document.querySelector(".display").value = tempArray.join('')
                    document.querySelector(".display").value += button.value
                } else {
                    document.querySelector(".display").value = button.value
                }

            // otherwise simply add the latest button press to the string
            } else {
                document.querySelector(".display").value += button.value
            }
        }

        // special cases for .
        if (button.value === "."){
            checkIndex = document.querySelector(".display").value.length - 2

            // if a . is pressed right away, change to 0.
            if (checkIndex < 0) {
                document.querySelector(".display").value = "0."

            // otherwise insert a 0 if the preceding char is not a number
            } else if (isNaN(document.querySelector(".display").value[checkIndex])) {
                tempArray = document.querySelector(".display").value.split('')
                tempArray.splice(checkIndex+1,0,"0")
                document.querySelector(".display").value = tempArray.join('')
            }
        }
    })
}