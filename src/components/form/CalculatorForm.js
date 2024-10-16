import  classes from './CalculatorForm.module.css';
import {useContext} from 'react';
import UserInputContext from '../../store/user-input-context';
import  {isPositiveNum} from '../../util/calculate';
import {useState} from 'react';

export default function CalculatorForm()
{

   const { userInput:formInput, onSubmit,onReset,onChange} = useContext(UserInputContext);
   const [isValid,setIsValid] = useState({currentSavings:true,yearlyContribution:true,expectedReturn:true,duration:true});

   function handleReset()
   {
        onReset();
        setIsValid({currentSavings:true,yearlyContribution:true,expectedReturn:true,duration:true});
   }

   function handleChange(fieldname,val)
   {
        if (isPositiveNum(val))
        {
          setIsValid((prev)=>({...prev,[fieldname]:true}));
        }
   }

   function handleBlur(fieldname,val)
   {
      if (!isPositiveNum(val))
      {
        setIsValid((prev)=>({...prev,[fieldname]:false}));
      }
   }
   
   function handleSubmit(e)
   {
        let allValid = true;

      e.preventDefault();
      const fd = new FormData(e.target);
      const dataObj = Object.fromEntries(fd.entries());

      for (const [key, value] of Object.entries(dataObj)) 
      {
          if (!isPositiveNum(value))
          {
              allValid = false;
              setIsValid((prev)=>({...prev,[key]:false}));
          }
      }

      if (allValid)
      {
          setIsValid({currentSavings:true,yearlyContribution:true,expectedReturn:true,duration:true});
          dataObj.currentSavings = +dataObj.currentSavings;
          dataObj.yearlyContribution = +dataObj.yearlyContribution;
          dataObj.expectedReturn = +dataObj.expectedReturn;
          dataObj.duration = +dataObj.duration;
          onSubmit(dataObj);
      }
   }

    const allOk = isValid.currentSavings && isValid.yearlyContribution && isValid.expectedReturn && isValid.duration;

    return (<form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes['input-group']}>
          <p>
            <label htmlFor="currentSavings">Current Savings ($)</label>
            <input type="number" id="currentSavings" name="currentSavings" 
               onChange={(e)=>handleChange('currentSavings',e.target.value)}
               onBlur={ (e)=>handleBlur('currentSavings',e.target.value)}
               defaultValue={formInput.currentSavings} 
               className={isValid.currentSavings?'transparent':classes.errorInput }
            />
           
          </p>
          <p>
            <label htmlFor="yearlyContribution">Yearly Savings ($)</label>
            <input type="number" id="yearlyContribution" name="yearlyContribution" 
             onChange={(e)=>handleChange('yearlyContribution',e.target.value)}
             onBlur={ (e)=>handleBlur('yearlyContribution',e.target.value)}
             defaultValue={formInput.yearlyContribution} 
             className={isValid.yearlyContribution?'transparent':classes.errorInput }
             />
          </p>
        </div>
        <div className={classes['input-group']}>
          <p>
            <label htmlFor="expectedReturn">
              Expected Interest (%, per year)
            </label>
            <input type="number" id="expectedReturn" name="expectedReturn" 
            onChange={(e)=>handleChange('expectedReturn',e.target.value)}
            onBlur={ (e)=>handleBlur('expectedReturn',e.target.value)}
            defaultValue={formInput.expectedReturn} 
            className={isValid.expectedReturn?'transparent':classes.errorInput }
            />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input type="number" id="duration" name="duration"
              onChange={(e)=>handleChange('duration',e.target.value)}
              onBlur={ (e)=>handleBlur('duration',e.target.value)}
              defaultValue={formInput.duration}
              className={isValid.duration?'transparent':classes.errorInput }
            />
          </p>
        </div>
        
        <p className={classes.actions}>
          <button type="reset" onClick={handleReset}  className={classes.button}>
            Reset
          </button>
          <button type="submit" className={classes.button}>
            Calculate
          </button>
        </p>
        
         <div className={allOk ? classes.hideme: classes['error_msg']}>Please enter only positive numbers</div>
        
      </form>);
}
