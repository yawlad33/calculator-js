class Calculator{

    constructor(prevOperandText, currentOperandText){
        this.prevOperandText = prevOperandText
        this.currentOperandText = currentOperandText
        this.clear()
    }

    clear(){
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }   

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.prevOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand 
        this.currentOperand = ''

    }
 
    compute(){
        let compitation = undefined
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)

        console.log("compute")
        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                compitation = prev + current
                break
             case '-':
                 compitation = prev - current
                 break
            case '*':
                 compitation = prev * current
                 break
            case '÷':
                  compitation = prev / current
                  break
            default: return
        }

        this.currentOperand = compitation
        this.operation = undefined
        this.prevOperand = ''
    }

    updateDisplay(){
        this.currentOperandText.innerText = this.currentOperand
        if(this.operation){
        this.prevOperandText.innerText = this.prevOperand + this.operation}
        else   this.prevOperandText.innerText = this.prevOperand 
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const eqButton = document.querySelector('[data-eq]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOperandText = document.querySelector('[data-prev-operand]')
const currentOperandText = document.querySelector('[data-current-operand]')

const calculator = new Calculator(prevOperandText,currentOperandText)

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        console.log('yes')
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


eqButton.addEventListener('click', ()=>{
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', ()=>{
    calculator.delete()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', ()=>{
    calculator.clear()
    calculator.updateDisplay()
})
