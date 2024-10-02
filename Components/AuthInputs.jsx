import { useState } from "react";

export default function AuthInputs() {
  const [enteredA, setEnteredA] = useState("");
  const [enteredB, setEnteredB] = useState("");
  const [enteredC, setEnteredC] = useState("");
  const [output, setOutput] = useState("Answer");

  //Handle changes in textbox and set variable to its value
  function handleInputChange(identifier, value) {
    if (identifier === "a") {
      setEnteredA(parseInt(value));
    } else if(identifier === "b") {
      setEnteredB(parseInt(value));
    }
    else if(identifier === "c") {
      setEnteredC(parseInt(value));
    }
  }

  //calculates and outputs quadratic equation 
  const calculateHandler = () => {
    //checks if entered vaule is int
    const start = Date.now();
    if (!Number.isInteger(enteredA) || !Number.isInteger(enteredB) || !Number.isInteger(enteredC)) 
    {
      setOutput("Please enter an integer")
    }
    else
    {
      let Radical = (enteredB**2 - (4*enteredA*enteredC))
      let xOne = simplify(Radical, 1), xTwo = simplify(Radical, 2)
      setOutput("x = " + xOne + ", " + xTwo )  
    }
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
  }

  const simplify = (num, sign) => {
    let radical = num, negRadical = false, numerator
    let outside = 1
    //checks if radical is negative
    if (Math.sign(radical) === -1) {
      negRadical = true
      radical = radical / -1
    }
    //simplifies radical
    let multiple = 2
    while (multiple * multiple <= radical)
    {
      if (radical % (multiple * multiple) === 0)
      {
        radical = radical / (multiple * multiple)
        outside = outside * multiple
      }
      else 
      {
        multiple = multiple + 1 
      }
    }

    //simplify values that multiply by one by getting rid of the 1
    if (outside === 1 && radical === 1)
    {
      outside = 1
    }
    else if (outside === 1 && radical !== 1)
    {
      outside = ""
    }

    //Checks if radical simplified to a whole number and is not negative
    if (radical === 1 && !negRadical)
    {

      //Simplify full numerator for addition
      if(sign === 1)
      {
        numerator =  (enteredB * -1) + (outside * 1)
      }
      //Simplify full numerator for subtraction
      else if(sign === 2)
      {
        numerator =  (enteredB * -1) - (outside * 1)
      }

      let denominator = 2 * enteredA
      let factor = 2
      //find factors and simplifies
      while (Math.abs(factor) <= Math.abs(numerator) || Math.abs(factor) <= Math.abs(denominator))
      {
        if (numerator % factor === 0 && denominator % factor === 0)
        {
          numerator = numerator / factor
          denominator = denominator / factor
        }
        else 
        {
          factor = factor + 1 
        }
      }
      if (denominator !== 1)
      {
        numerator = numerator + "/" + denominator
      }
    }
    //outputs when radical is not simplified
    else
    {
      //gets rid of redundant radical bc it multiples by 1
      if (radical === 1)
        {
          radical = ""
        }
      //adds sqrt symbol if cannot not be cancelled out
      else
        {
          radical = "√" + radical
        }
      //adds imaginary number if radical is negative
      let denominator = 2 * enteredA
      let factor = 2
      let firstTerm = -1 * enteredB


      //find factors and simplifies
      while (Math.abs(factor) <= Math.abs(denominator) || Math.abs(factor) <= Math.abs(outside) || Math.abs(factor) <= Math.abs(firstTerm))
      {
        if (firstTerm % factor === 0 && denominator % factor === 0 && outside % factor === 0)
        {
          firstTerm = firstTerm / factor
          denominator = denominator / factor
          outside = outside / factor
        }
        else 
        {
          factor = factor + 1 
        }
      }
      if(outside === 1)
      {
        outside = ""
      }
      if (negRadical === true) 
        {
          outside = outside + "i"
        }
      //Create numerator for addition
      if(sign === 1)
        {
          numerator = "(" + (firstTerm) + " + " + outside + radical + ")" + " / " + (denominator)
        }
      //Create numerator for subtraction
      else if(sign === 2)
        {
          numerator = "(" + (firstTerm) + " - " + outside +  radical + ")" + " / " + (denominator)
        }

    }
    return numerator
  }


  return (
    <div id="auth-inputs">
      <div className="controls">
        <p>
          <div>
            <input
            type="A"
            onChange={(event) => handleInputChange("a", event.target.value)}
            />
           <label>
              x<sup>2</sup> +  
           </label>
           <input
            type="B"
            onChange={(event) =>
              handleInputChange("b", event.target.value)
            }
          />
          <label>x +</label>
          <input
            type="C"
            onChange={(event) =>
              handleInputChange("c", event.target.value)
            }
          />
          </div>
        </p>
      </div>

      <div className="actions">
        <button className="button" onClick={calculateHandler}>
          Calculate
        </button>
      </div>
      <h1>{output}</h1>
    </div>
  );
}
