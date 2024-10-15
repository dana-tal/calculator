import Header from './components/header/Header';
import CalculatorForm from './components/form/CalculatorForm';
import ResultsTable from './components/results/ResultsTable';
import {useState} from 'react';
import UserInputContext,{defaultInput} from './store/user-input-context';


function App() {

                       
  const [userInput, setUserInput ] = useState(defaultInput);

  function handleSubmit(userInput)
  {
      // console.log("userInput:");
      // console.log(userInput);
      setUserInput(userInput);
  }

  function handleReset()
  {
       setUserInput(defaultInput);
  }

  function handleChange(inputName,inputVal)
  {
      //  setUserInput( (prevInput)=>({ ...prevInput, [inputName]:inputVal}));
  }

   const ctxValue = {
           userInput,
           onSubmit:handleSubmit,
           onReset:handleReset,
           onChange:handleChange 
   }

   //formInput={userInput} onSubmit={handleSubmit} onReset={handleReset} onChange={handleChange} 

  return (

    <UserInputContext.Provider value={ctxValue} >
    <div>
           <Header />
           <CalculatorForm  /> 
      
      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
          <ResultsTable />
     
    </div>
    </UserInputContext.Provider>
  );
}

export default App;
