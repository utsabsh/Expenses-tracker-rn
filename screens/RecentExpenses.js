import { ExpensesContext } from "../store/expense-context";
import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../component/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import LoadingOverlay from "../component/UI/LoadingOverlay";
import ErrorOverlay from "../component/UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false);
      expensesCtx.setExpenses(expenses);
    }

    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onconfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText={"No expenses registered for the last 7 days."}
    />
  );
}
export default RecentExpenses;
