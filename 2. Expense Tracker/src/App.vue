<template>
  <div>
    <h2>Expense Tracker</h2>
    <div>Budget: ${{ budget.toFixed(2) }}</div>
    <br>

    <div style="display: flex; gap: 10px;">
      <input
        type="text"
        v-model="expenseDescription"
        placeholder="Enter expense description"
      />
      <input
        type="number"
        v-model.number="expenseAmount"
        placeholder="Enter expense amount"
      />
      <button @click="addExpense">Add Expense</button>
    </div>

    <h2>Expenses</h2>
    <div
      v-for="(item, index) in expenses"
      :key="index"
      class="expense-item"
      @mouseenter="hoveredIndex = index"
      @mouseleave="hoveredIndex = null"
    >
      <h4>
        {{ item.description }} -
        ${{ item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
      </h4>

      <button
        v-if="hoveredIndex === index"
        class="delete-btn"
        @click="removeExpense(index)"
      >
        ✕ Remove
      </button>
    </div>

    <h3>Summary</h3>
    <div id="expenseSummary">
      <div>Total Spent: ${{ totalSpent.toFixed(2) }}</div>
      <div>Average Expense: ${{ averageExpense }}</div>
      <div>Remaining Budget: ${{ remainingBudget.toFixed(2) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      budget: 1000,
      expenseDescription: '',
      expenseAmount: 0,
      expenses: [],
      hoveredIndex: null
    }
  },
  computed: {
    totalSpent() {
      return this.expenses.reduce((total, expense) => total + expense.amount, 0)
    },
    averageExpense() {
      return this.expenses.length
        ? (this.totalSpent / this.expenses.length).toFixed(2)
        : 0
    },
    remainingBudget() {
      return this.budget - this.totalSpent
    }
  },
  methods: {
    addExpense() {
      const desc = this.expenseDescription.trim()
      const amount = Number(this.expenseAmount)

      if (!desc || amount <= 0) {
        alert('Please enter a valid description and positive amount.')
        return
      }

      if (amount > this.remainingBudget) {
        alert('This expense exceeds your remaining budget!')
        return
      }

      this.expenses.push({ description: desc, amount })
      this.expenseDescription = ''
      this.expenseAmount = 0
    },
    removeExpense(index) {
      this.expenses.splice(index, 1)
    }
  }
}
</script>

<style scoped>
input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  cursor: pointer;
  border: none;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0056b3;
}

.expense-item {
  width: 400px;
  height: 50px;
  position: relative;
  padding: 10px;
  margin: 6px 0;
  background: #f4f4f4;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.delete-btn {
  position: absolute;
  right: 10px;
  background-color: #dc3545;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  padding: 4px 8px;
  cursor: pointer;
  opacity: 0.9;
}

.delete-btn:hover {
  background-color: #b02a37;
}

#expenseSummary {
  width: 400px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
