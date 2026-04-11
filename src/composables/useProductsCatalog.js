import { computed, ref } from 'vue'
import { catalogData, imageAliases, localImageFiles } from './catalogData'

function toSlug(value) {
	return String(value)
		.toLowerCase()
		.replace(/\([^)]*\)/g, ' ')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

function toCatalogImage(label) {
	const safe = encodeURIComponent(label)
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320'><rect width='320' height='320' rx='24' fill='#e6ece9'/><path d='M86 94h22l18 86a18 18 0 0 0 17 14h92a18 18 0 0 0 17-13l15-57H117' fill='none' stroke='#6a7f77' stroke-width='12' stroke-linecap='round' stroke-linejoin='round'/><circle cx='138' cy='236' r='16' fill='#6a7f77'/><circle cx='228' cy='236' r='16' fill='#6a7f77'/><text x='160' y='286' text-anchor='middle' font-size='20' font-family='Arial' font-weight='700' fill='#516a62'>${safe}</text></svg>`
	return `data:image/svg+xml;utf8,${svg}`
}

const localImageBySlug = Object.fromEntries(
	localImageFiles.map((file) => [file.replace(/\.[^.]+$/, ''), `/images/products/${file}`])
)

function resolveCatalogImage(label) {
	const slug = toSlug(label)
	if (localImageBySlug[slug]) return localImageBySlug[slug]
	if (imageAliases[slug] && localImageBySlug[imageAliases[slug]]) return localImageBySlug[imageAliases[slug]]
	return toCatalogImage(label)
}

export function useProductsCatalog() {
	const catalogSearch = ref('')
	const activeCategory = ref('All')

	const categories = catalogData.categories.map((category) => category.name)
	const productCatalog = catalogData.categories.flatMap((category) =>
		category.items.map((item) => ({
			...item,
			category: category.name,
			image: resolveCatalogImage(item.name)
		}))
	)

	const categoryWithCounts = computed(() => {
		const counts = productCatalog.reduce((acc, product) => {
			acc[product.category] = (acc[product.category] || 0) + 1
			return acc
		}, {})

		return ['All', ...categories].map((category) => {
			if (category === 'All') {
				return { label: category, count: productCatalog.length }
			}
			return { label: category, count: counts[category] || 0 }
		})
	})

	const filteredCatalog = computed(() => {
		const query = catalogSearch.value.trim().toLowerCase()
		return productCatalog
			.filter((product) => {
				const categoryMatch = activeCategory.value === 'All' || product.category === activeCategory.value
				const textMatch =
					!query ||
					product.name.toLowerCase().includes(query) ||
					product.category.toLowerCase().includes(query)
				return categoryMatch && textMatch
			})
			.sort((a, b) => a.name.localeCompare(b.name))
	})

	return {
		activeCategory,
		catalogSearch,
		categories,
		categoryWithCounts,
		filteredCatalog,
		productCatalog,
		resolveCatalogImage
	}
}
