import { renderEmployeeTable } from './components/EmployeeTable.js';
import { showEmployeeFormModal } from './components/hooks/showModals.js';

document.addEventListener('DOMContentLoaded', () => {
    renderEmployeeTable();
    document.getElementById('addEmployeeBtn').addEventListener('click', () => {
        showEmployeeFormModal();
    });
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        renderEmployeeTable(searchInput.value);
    });
});