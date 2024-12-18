import React, { useContext } from "react";

import ExpensesOutput from "../component/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expense-context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallbackText={"No registered expenses found!!"}
    />
  );
};

export default AllExpenses;
