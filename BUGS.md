Bug 1
How to reproduce: Open the app, add expenses, then check the Balances panel. Add all positive balances and compare with all negative balances.

What is wrong: The total owed did not equal the total receivable. Balances did not sum to zero.

What I changed: Corrected the balance calculation in computeBalances (balances.js) so the payer isn’t double‑counted. Now debts and credits cancel out exactly.

Bug 2
How to reproduce: In the “Add member” field, enter an existing member name (e.g., Aisha Khan). Click Add multiple times.

What is wrong: The app allowed duplicate members with the same name. Duplicates appeared in Balances and Split Between sections.

What I changed: Added validation in the reducer (store.js) to prevent adding a member if the name already exists.

Bug 3
How to reproduce: Add duplicate members, then check the Summary section.

What is wrong: Average per person was calculated using duplicated members, producing misleading results.

What I changed: Updated SummaryCards.jsx to calculate averages using only unique member names.

Bug 4
How to reproduce: Create an expense with percentage splits that don’t sum exactly to 100 due to rounding.

What is wrong: Validation failed because of strict equality check (percentsSumTo100).

What I changed: Allowed a tolerance of ±0.01 in percentsSumTo100 (balances.js) to handle floating‑point rounding errors.

Bug 5
How to reproduce: Add members with string IDs or mixed types.

What is wrong: nextMemberId could break if IDs weren’t numeric.

What I changed:Ensured IDs are converted to numbers before calculating the next ID.