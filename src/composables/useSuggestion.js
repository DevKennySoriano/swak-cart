import { computed } from 'vue'

function toCents(value) {
	return Math.round(Number(value || 0) * 100)
}

function normalizeName(value) {
	return String(value || '').trim().toLowerCase()
}

function formatCartItemLabel(item) {
	const qty = Number(item.qty || 1)
	if (qty > 1) return `${qty} x ${item.name}`
	return item.name
}

function getSuggestionReason(product) {
	const tags = new Set((product.tags || []).map((tag) => String(tag).toLowerCase()))
	if (tags.has('staple')) return 'Staple item'
	if (tags.has('ulam')) return 'Good for main meals'
	if (tags.has('breakfast')) return 'Useful breakfast item'
	if (tags.has('healthy')) return 'Healthy choice'
	if (tags.has('quick')) return 'Quick pantry pick'
	if (product.common) return 'Common grocery item'
	return 'Suggested item'
}

function getProductPriority(product) {
	const tags = new Set((product.tags || []).map((tag) => String(tag).toLowerCase()))
	let score = product.common ? 40 : 0
	if (tags.has('staple')) score += 60
	if (tags.has('ulam')) score += 45
	if (tags.has('breakfast')) score += 35
	if (tags.has('healthy')) score += 25
	if (tags.has('quick')) score += 20
	return score
}

function findRemovalPlan(cartItems, targetCents) {
	const items = cartItems
		.map((item) => ({
			...item,
			lineTotalCents: toCents(Number(item.price || 0) * Number(item.qty || 0))
		}))
		.filter((item) => item.lineTotalCents > 0)
		.sort((a, b) => b.lineTotalCents - a.lineTotalCents)

	if (items.length === 0) return null

	const suffixSums = new Array(items.length + 1).fill(0)
	for (let index = items.length - 1; index >= 0; index -= 1) {
		suffixSums[index] = suffixSums[index + 1] + items[index].lineTotalCents
	}

	let bestPlan = null

	function updateBest(selection, totalCents) {
		if (totalCents < targetCents) return
		const overshoot = totalCents - targetCents
		if (
			!bestPlan ||
			overshoot < bestPlan.overshoot ||
			(overshoot === bestPlan.overshoot && selection.length < bestPlan.items.length) ||
			(overshoot === bestPlan.overshoot && selection.length === bestPlan.items.length && totalCents < bestPlan.totalCents)
		) {
			bestPlan = {
				items: [...selection],
				totalCents,
				overshoot
			}
		}
	}

	function search(index, totalCents, selection) {
		if (totalCents >= targetCents) {
			updateBest(selection, totalCents)
			return
		}

		if (index >= items.length) return
		if (totalCents + suffixSums[index] < targetCents) return

		selection.push(items[index])
		search(index + 1, totalCents + items[index].lineTotalCents, selection)
		selection.pop()

		search(index + 1, totalCents, selection)
	}

	search(0, 0, [])
	return bestPlan
}

export function useSuggestion(cartItems, remainingBudget, productCatalog, formatMoney) {
	const suggestion = computed(() => {
		const items = cartItems.value || []
		const cartNames = new Set(items.map((item) => normalizeName(item.name)))
		const hasMultipleItems = items.length > 1

		if (remainingBudget.value < 0) {
			const deficitCents = Math.abs(toCents(remainingBudget.value))
			const plan = findRemovalPlan(items, deficitCents)

			if (!plan) {
				return {
					type: 'over-budget',
					title: 'Over budget',
					summary: `You are over budget by ${formatMoney(Math.abs(remainingBudget.value))}. Remove any item to get back on track.`,
					items: []
				}
			}

			return {
				type: 'over-budget',
				title: `Over budget by ${formatMoney(Math.abs(remainingBudget.value))}`,
				summary: `Remove the suggested item${plan.items.length > 1 ? 's' : ''} to recover ${formatMoney(plan.totalCents / 100)}.`,
				items: plan.items.map((item) => ({
					key: item.id,
					label: formatCartItemLabel(item),
					detail: `${formatMoney(item.lineTotalCents / 100)} saved`,
					note: item.category || 'Cart item'
				}))
			}
		}

		if (!hasMultipleItems || remainingBudget.value <= 0) return null

		const recommendations = productCatalog
			.filter((product) => product.common && !cartNames.has(normalizeName(product.name)))
			.map((product) => ({
				...product,
				priority: getProductPriority(product)
			}))
			.sort((a, b) => b.priority - a.priority || a.name.localeCompare(b.name))
			.slice(0, 4)

		if (recommendations.length === 0) return null

		return {
			type: 'budget-left',
			title: 'Suggested essentials',
			summary: `You still have ${formatMoney(remainingBudget.value)} left. These common items are not yet in your cart.`,
			items: recommendations.map((product) => ({
				key: product.name,
				label: product.name,
				detail: product.category,
				note: getSuggestionReason(product)
			}))
		}
	})

	return {
		suggestion
	}
}