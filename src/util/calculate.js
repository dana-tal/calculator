

// The browser-provided Intl API is used to prepare a formatter object
// This object offers a "format()" method that can be used to format numbers as currency
// Example Usage: formatter.format(1000) => yields "$1,000"
export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const isPositiveNum = (inputStr) =>{

  let is_num = true;
  let tempNum = Number(inputStr);
   
  if (!tempNum || tempNum<=0)
  {
    is_num = false;
  }
  return(is_num); 
}

const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    const yearlyData = []; // per-year results

    let currentSavings = +userInput['currentSavings']; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput['yearlyContribution']; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput['expectedReturn'] / 100;
    const duration = +userInput['duration'];
    let initialInvestment = +userInput['currentSavings'];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      
      let year = i+1;
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;

      let totalInterest = currentSavings - initialInvestment - (yearlyContribution * year);
      let investedCapital = initialInvestment +  (yearlyContribution * year); 

      yearlyData.push({
        // feel free to change the shape of the data pushed to the array!
       year,
        yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution,
        totalInterest,
        investedCapital
      });
    }

   return(yearlyData);
};

export default calculateHandler;
