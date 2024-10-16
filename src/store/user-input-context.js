
import {createContext} from 'react';

export const defaultInput = {
    currentSavings:10000,
    yearlyContribution:1200,   /* we save $100 per month */
    expectedReturn:7,         /* 7 percent */
    duration:10    /* 10 years */
}

 const UserInputContext = createContext({ 
                                                userInput: defaultInput,
                                                onChange: ()=>{},
                                                onReset:()=>{},
                                                onSubmit:()=>{}
                                            });

export default UserInputContext;
