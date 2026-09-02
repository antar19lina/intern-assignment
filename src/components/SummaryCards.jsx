import React from "react";

export default function SummaryCards({ members, expenses }) {
  const totalExpense = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  
  const uniqueMembers = [...new Set(members.map(m => m.name))];
  const avgPerPerson = uniqueMembers.length > 0 
    ? (totalExpense / uniqueMembers.length).toFixed(2) 
    : 0;

  return (
    <div className="summary-cards">
      <div className="card">
        <h3>Total Expense</h3>
        <p>${totalExpense.toFixed(2)}</p>
      </div>
      <div className="card">
        <h3>Average per Person</h3>
        <p>${avgPerPerson}</p>
      </div>
    </div>
  );
}
