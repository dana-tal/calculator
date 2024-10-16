import classes from './ResultsTable.module.css';
import {useContext} from 'react';
import UserInputContext from '../../store/user-input-context';
import { formatter } from '../../util/calculate';
import  calculateHandler from '../../util/calculate';


const ResultsTable = () =>{

  
  const { userInput} = useContext(UserInputContext);
  const data = calculateHandler(userInput);

  //console.log(data);

    return ( <table className={classes.result}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Savings</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
            {  data.map( (yearInfo)=>
                <tr key={ yearInfo.year}>
                    <td>{yearInfo.year}</td>
                    <td>{formatter.format(yearInfo.savingsEndOfYear)}</td>
                    <td>{formatter.format(yearInfo.yearlyInterest)}</td>
                    <td>{formatter.format(yearInfo.totalInterest)}</td>
                    <td>{formatter.format(yearInfo.investedCapital)}</td>
                </tr>)
            }       
        </tbody>
      </table>);
};

export default ResultsTable;
