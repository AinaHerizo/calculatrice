document.addEventListener("DOMContentLoaded", function(){
// SELECTOR
    const numberButtons = document.querySelectorAll("[data-number]");
    const operationButtons = document.querySelectorAll("[data-operation]");
    const equalsButton = document.querySelector("[data-equals]");
    const clearButton = document.querySelector("[data-clear]");
    const deleteButton = document.querySelector("[data-delete]");
    const resultScreen = document.querySelector("[data-result]");
    const operationScreen = document.querySelector("[data-screen-operation]");
    let op,resultat

// CLEAR BUTTON
    clearButton.addEventListener("click", () => {
        resultScreen.innerHTML=""
        operationScreen.innerHTML=""
        op = ""
    })

// DELETE BUTTON
    deleteButton.addEventListener("click", () => {
        operationScreen.innerHTML = operationScreen.innerHTML.toString().slice(0,-1)
    })


// FUNCTION CALCULATION
    function calculation(firstNumber, secondNumber, ret, opTag) {
        switch(opTag){
            case "+":
                ret = firstNumber + secondNumber
                break
            case "-":
                ret = firstNumber - secondNumber
                break
            case "*":
                ret = firstNumber * secondNumber
                break
            case "/":
                ret = firstNumber / secondNumber
                break
            default:
                return
            }
        return ret
    }

// NUMBER
    numberButtons.forEach(number => {
        number.addEventListener("click", () => {
            if (number.innerText === "." && operationScreen.innerHTML.includes(".")) return
            operationScreen.innerHTML = operationScreen.innerHTML.toString() + number.innerText.toString()
        })
    });

// OPERATION
    operationButtons.forEach(operation => {
        operation.addEventListener("click",() => {
            // SI L'ECRAN OPERATION ET L'ECRAN RESULT EST VIDE
            if (operationScreen.innerHTML === "" && resultScreen.innerHTML === "") {
                return
            }

            //  SI SEUL L'ECRAN OPERATION EST VIDE
            else if (operationScreen.innerHTML === "" && resultScreen.innerHTML !== "") {
                // si une operation est deja choisi celui-ci change
                if(op === undefined){
                    op = operation.innerHTML
                    resultScreen.innerHTML = ""+resultScreen.innerHTML+" "+op
                }
                else{
                    resultScreen.innerHTML = resultScreen.innerHTML.slice(0,-2)
                    op = operation.innerHTML
                    resultScreen.innerHTML = ""+resultScreen.innerHTML+" "+op
                }
            }

            // SI LES DEUX ECRANS NE SONT PAS VIDE 
            else if (operationScreen.innerHTML !== "" && resultScreen.innerHTML !== ""){
                if (op === undefined) {
                    op = operation.innerHTML
                    resultScreen.innerHTML = ""+operationScreen.innerHTML.toString()+" "+op
                    operationScreen.innerHTML =""
                }
                else{
                    let first = parseFloat(resultScreen.innerHTML.slice(0,-2))  
                    resultScreen.innerHTML=calculation(first,parseFloat(operationScreen.innerHTML), resultat,op)
                    op = operation.innerHTML
                    resultScreen.innerHTML=""+resultScreen.innerHTML+" "+op
                    operationScreen.innerHTML=""
                }
            }

            else{
                op = operation.innerHTML
                resultScreen.innerHTML = ""+operationScreen.innerHTML.toString()+" "+op
                operationScreen.innerHTML =""
            }
        })
    });


// ON EQUALS
    equalsButton.addEventListener("click", ()=>{
        let calculate
        if(resultScreen.innerHTML.includes(op)) {resultScreen.innerHTML.slice(0,-2)}
        const result = parseFloat(resultScreen.innerHTML)
        const set = parseFloat(operationScreen.innerHTML)

        if (isNaN(result) || isNaN(set)) return
        resultScreen.innerHTML=calculation(result,set,calculate,op)
        operationScreen.innerHTML =""
        op=undefined
    })
});