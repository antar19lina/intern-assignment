const KEY = "fairshare-v1";

function hydrate(data) {
  return {
    groupName: data.groupName,
    members: data.members.map((m) => ({ ...m })),
    expenses: data.expenses.map((e) => ({
      ...e,
      date: new Date(e.date),
    })),
  };
}

export function loadState(seed) {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const initial = hydrate(seed);
      localStorage.setItem(KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    // ✅ Fix: validate structure before returning
    if (!parsed.members || !parsed.expenses) {
      const initial = hydrate(seed);
      localStorage.setItem(KEY, JSON.stringify(initial));
      return initial;
    }
    return parsed;
  } catch {
    return hydrate(seed);
  }
}

export function persistState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function nextExpenseId() {
  return `e-${Date.now()}`;
}

export function nextMemberId(members) {
  const max = members.reduce((m, x) => {
    const idNum = Number(x.id);
    return idNum > m ? idNum : m;
  }, 0);
  return max + 1;
}

export function reducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE": {
      return { ...state, expenses: [...state.expenses, action.expense] };
    }
    case "DELETE_EXPENSE": {
      const next = state.expenses.slice();
      next.splice(action.index, 1);
      return { ...state, expenses: next };
    }
    case "UPDATE_EXPENSE": {
      const next = state.expenses.slice();
      next[action.index] = { ...next[action.index], ...action.patch };
      return { ...state, expenses: next };
    }
    case "ADD_MEMBER": {
      if (state.members.some(m => m.name === action.member.name)) {
        return state;
      }
      return { ...state, members: [...state.members, action.member] };
    }
    case "DELETE_MEMBER": {
      const hasExpenses = state.expenses.some(
        e => e.paidBy === action.id || e.splitWith.includes(action.id)
      );
      if (hasExpenses) {
        alert("Cannot delete member linked to existing expenses.");
        return state;
      }
      return { ...state, members: state.members.filter(m => m.id !== action.id) };
    }
    default:
      return state;
  }
}
