import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useBudget } from '../hooks/useBudget';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ExpensesPieChart = () => {
    const { state } = useBudget();

    // Datos de ejemplo: puedes reemplazar esto con los datos reales de tus gastos
    const expenses = state.expenses || [
        { category: 'Comida', amount: 200 },
        { category: 'Transporte', amount: 150 },
        { category: 'Entretenimiento', amount: 100 },
        { category: 'Otros', amount: 50 },
    ];

    const data = {
        labels: expenses.map(expense => expense.category),
        datasets: [
            {
                data: expenses.map(expense => expense.amount),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <h2 className="text-center text-lg font-bold mb-4">Distribución de Gastos</h2>
            <Pie data={data} />
        </div>
    );
};