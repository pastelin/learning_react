import { Category, DraftExpense, Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';

export type BudgetActions =
    | { type: 'add_budget'; payload: { budget: number } }
    | { type: 'show-modal' }
    | { type: 'close-modal' }
    | { type: 'add_expense'; payload: { expense: DraftExpense } }
    | { type: 'remove_expense'; payload: { id: string } }
    | { type: 'get-expense-by-id'; payload: { id: Expense['id'] } }
    | { type: 'update-expense'; payload: { expense: Expense } }
    | { type: 'reset-app' }
    | { type: 'add-filter-category'; payload: { id: Category['id'] } };

export type BudgetState = {
    budget: number;
    modal: boolean;
    expenses: Expense[];
    editingId: Expense['id'];
    currentCategory: Category['id'];
};

const initialBudget = (): number => {
    const budget = localStorage.getItem('budget');
    return budget ? +budget : 0;
};

const initialExpenses = (): Expense[] => {
    const expenses = localStorage.getItem('expenses');
    return expenses ? JSON.parse(expenses) : [];
};

export const initialState: BudgetState = {
    budget: initialBudget(),
    modal: false,
    expenses: initialExpenses(),
    editingId: '',
    currentCategory: '',
};

const createExpense = (draftExpense: DraftExpense): Expense => {
    return {
        ...draftExpense,
        id: uuidv4(),
    };
};

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    if (action.type === 'add_budget') {
        console.log(action.payload.budget);
        return {
            ...state,
            budget: action.payload.budget,
        };
    }

    if (action.type === 'show-modal') {
        return {
            ...state,
            modal: true,
        };
    }

    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: '',
        };
    }

    if (action.type === 'add_expense') {
        const expense = createExpense(action.payload.expense);
        return {
            ...state,
            expenses: [...state.expenses, expense],
            modal: false,
        };
    }

    if (action.type === 'remove_expense') {
        return {
            ...state,
            expenses: state.expenses.filter(
                (expense) => expense.id !== action.payload.id
            ),
        };
    }

    if (action.type === 'get-expense-by-id') {
        return {
            ...state,
            editingId: action.payload.id,
            modal: true,
        };
    }

    if (action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map((expense) =>
                expense.id === action.payload.expense.id
                    ? action.payload.expense
                    : expense
            ),
            editingId: '',
            modal: false,
        };
    }

    if (action.type == 'reset-app') {
        return {
            ...state,
            budget: 0,
            expenses: [],
        };
    }

    if (action.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id,
        };
    }

    return state;
};
