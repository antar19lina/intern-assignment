# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---
## BUG 1
How to reproduce:
1. Open the default Goa Weekend dataset.
2. View the Balances panel.
3. Add all positive balances and compare with all negative balances.

What is wrong:
The total amount owed does not equal the total amount receivable.
Balances do not sum to zero.

Expected:
In a closed group, total debts and credits must cancel out exactly.

What I changed:
Investigated and corrected the balance calculation logic to ensure all member balances sum to zero.
-----
## Bug 2

How to reproduce:
1. In the "Add member" field, enter an existing member name (Aisha Khan).
2. Click Add multiple times.

What is wrong:
The application allows duplicate members with the same name.
The member count increases and duplicate entries appear in Balances and Split Between sections.

Expected:
The application should prevent duplicate members from being added.

What I changed:
Added validation to check if a member already exists before adding a new member.
-----
## Bug 3

How to reproduce:
1. Add duplicate members.
2. Observe the Summary section.

What is wrong:
Average per person is calculated using duplicated members, producing misleading results.

Expected:
Average per person should be based on unique group members only.