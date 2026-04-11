import { computed, ref } from 'vue'

export function useBudget(cartItems, initialBudget = 2500) {
	const budget = ref(initialBudget)
	const peso = new Intl.NumberFormat('en-PH', {
		style: 'currency',
		currency: 'PHP',
		minimumFractionDigits: 2
	})

	const totalSpent = computed(() =>
		cartItems.value.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0), 0)
	)

	const remainingBudget = computed(() => Number(budget.value || 0) - totalSpent.value)

	const utilization = computed(() => {
		const base = Number(budget.value || 0)
		if (base <= 0) return 0
		return Math.min(100, Math.round((totalSpent.value / base) * 100))
	})

	const groupedTotals = computed(() =>
		cartItems.value.reduce((acc, item) => {
			const key = item.category || 'Other'
			acc[key] = (acc[key] || 0) + Number(item.price || 0) * Number(item.qty || 0)
			return acc
		}, {})
	)

	function formatMoney(value) {
		return peso.format(Number(value || 0))
	}

	return {
		budget,
		formatMoney,
		groupedTotals,
		remainingBudget,
		totalSpent,
		utilization
	}
}
