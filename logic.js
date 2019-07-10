// track if currently displayed number is an answer
let answer = false

// return error on invalid input
function evaluateExpression(expression){
    try {
        return math.evaluate(expression)
    } catch {
        return "ERROR"
    }
}

// AREA FOR IMPROVEMENT: could change class selectors to ids

// removes the default 0 on a click event in the display
document.querySelector(".display").addEventListener('click', function(){
    if (document.querySelector(".display").value === "0"){
        document.querySelector(".display").value = ''

    // if the user clicks on the display move cursor to the end
    } else {

        // trick to force cursor left: add a space then delete it
        document.querySelector(".display").value += " "
        tempArray = document.querySelector(".display").value.split('')
        tempArray.splice(tempArray.length-1,1)
        document.querySelector(".display").value = tempArray.join('')

        // in case it was an answer that was clicked
        answer = false
    }
})

// AREA FOR IMPROVEMENT: could add functionality for all keys and shift-
// accessible operands. Need to override defaults on key presses, especially
// highlight on button "presses" with keyboard.

// allows the user to press enter to evaluate the display when typing
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
            document.querySelector(".display").value = `${evaluateExpression(expression)}`
            answer = true

        // if clear, add the default 0 back
        } else if (button.value==="clear"){
            document.querySelector(".display").value = "0"
            answer = false

        } else {
            
            // if the display is currently 0 or an answer
            if ( (document.querySelector(".display").value === "0") || (answer) ){
                
                // change the answer state
                answer = false

                // and if an operand is pressed
                if ((isNaN(button.value))&&!(button.value===".")){

                    // then append the operand
                    document.querySelector(".display").value += button.value

                // otherwise overwrite the display
                } else {
                    document.querySelector(".display").value = button.value
                }

            // otherwise simply add the latest button press to the string
            } else {
                document.querySelector(".display").value += button.value
            }
        }

        // special cases for "."
        if (button.value === "."){
            checkIndex = document.querySelector(".display").value.length - 2

            // if a . is pressed right away, change to "0."
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