/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(x) {
    this.result += x;
  }

  subtract(x) {
    this.result -= x;
  }

  multiply(x) {
    this.result *= x;
  }

  divide(x) {
    if(x===0) {
      throw new error("Division not possible with 0");
    }

    this.result /= x;
  }

  clear() {
    this.result = 0;
  }

  getResult() {
    return this.result;
  }

  calculate(str) {
    let operandStack = [];
    let operatorStack = [];
    let i=0;

    while(i<str.length) {
      if(isNaN(parseInt(str[i]))) {
        if(str[i]===' ') {
          i++;
          continue;
        }
        else if(str[i]==='*' || str[i]==='/' || str[i]==='+' || str[i]==='-' || str[i]==='(' || str[i]===')') {
          if(operatorStack.length===0) {
            operatorStack.push(str[i]);
          }
          else {
            if(str[i]==='*') {
              while(operatorStack.length>0 && (operatorStack[operatorStack.length-1]!=='+' && operatorStack[operatorStack.length-1]!=='-' && operatorStack[operatorStack.length-1]!=='(')) {
                const op = operatorStack.pop();
                const op2 = operandStack.pop();
                if(op==='/' && op2===0) {
                  throw new Error("Divison not possible");
                }
                const op1 = operandStack.pop();
                this.result = op1;
                this.divide(op2);
                operandStack.push(this.getResult());
              }
              operatorStack.push(str[i]);
            }
            else if(str[i]==='/') {
              while(operatorStack.length>0 && (operatorStack[operatorStack.length-1]!=='+' && operatorStack[operatorStack.length-1]!=='-' && operatorStack[operatorStack.length-1]!=='(')) {
                const op = operatorStack.pop();
                const op2 = operandStack.pop();
                const op1 = operandStack.pop();
                this.result = op1;
                this.multiply(op2);
                operandStack.push(this.getResult());
              }
              operatorStack.push(str[i]);
            }
            else if(str[i]==='+' || str[i]==='-') {
              while(operatorStack.length>0 && operatorStack[operatorStack.length-1]!=='(') {
                const op = operatorStack.pop();
                const op2 = operandStack.pop();
                const op1 = operandStack.pop();
                this.result = op1;
                if(op==='*') {
                  this.multiply(op2);
                }
                else if(op==='+') {
                  this.add(op2);
                }
                else if(op==='-') {
                  this.subtract(op2);
                }
                else {
                  this.divide(op2);
                }
                operandStack.push(this.getResult());
              }
              operatorStack.push(str[i]);
            }
            else if(str[i]===')') {
              while(operatorStack.length>0 && operatorStack[operatorStack.length-1]!=='(') {
                const op = operatorStack.pop();
                const op2 = operandStack.pop();
                const op1 = operandStack.pop();
                this.result = op1;
                if(op==='+') {
                  this.add(op2);
                }
                else if(op==='-') {
                  this.subtract(op2);
                }
                else if(op==='*') {
                  this.multiply(op2);
                }
                else if(op==='/') {
                  if(op2===0) {
                    throw new error("Division by zero not possible");
                  }
                  else {
                    this.divide(op2);
                  }
                }
                operandStack.push(this.getResult());
              }
              if(operatorStack.length===0) {
                throw new error("Mismatched parentheses");
              }
              if(operatorStack[operatorStack.length-1]==='(') {
                operatorStack.pop();
              }
            }
            else if(str[i]==='(') {
              operatorStack.push(str[i]);
            }
          }
          i++;
        }
        else {
          throw new error("Not a number, calculation not possible");
        }
      }
      else {
        let s = "";
        while(!isNaN(parseInt(str[i])) || str[i]==='.') {
          s+=str[i++];
        }
        if(s.includes('.')) {
          operandStack.push(parseFloat(s));
        }
        else {
          operandStack.push(parseInt(s));
        }
      }
    }

    while(operatorStack.length!=0) {
      const op = operatorStack.pop();
      const op2 = operandStack.pop();
      const op1 = operandStack.pop();
      this.result = op1;
      if(op==='+') {
        this.add(op2);
      }
      else if(op==='-') {
        this.subtract(op2);
      }
      else if(op==='*') {
        this.multiply(op2);
      }
      else if(op==='/') {
        if(op2===0) {
          throw new error("Division by zero not possible");
        }
        else {
          this.divide(op2);
        }
      }
      else if(op==='(') {
        throw new error("Invalid operator");
      }
      operandStack.push(this.getResult());
    }
    return operandStack[0];
  }
}

module.exports = Calculator;
