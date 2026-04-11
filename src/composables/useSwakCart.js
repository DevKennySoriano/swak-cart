import { computed, ref, watch } from 'vue'
import Swal from 'sweetalert2'
import { useBudget } from './useBudget'
import { useProductsCatalog } from './useProductsCatalog'
import { useReceiptPrinter } from './useReceiptPrinter'

export function useSwakCart() {
	const cartItems = ref([])
	const cartSearch = ref('')
	const isCartEditMode = ref(false)
	const mobileTab = ref('products')
	const wasOverBudget = ref(false)

	const {
		activeCategory,
		catalogSearch,
		categories,
		categoryWithCounts,
		filteredCatalog,
		resolveCatalogImage
	} = useProductsCatalog()

	const { budget, formatMoney, groupedTotals, remainingBudget, totalSpent, utilization } = useBudget(cartItems)

	const filteredCartItems = computed(() => {
		const query = cartSearch.value.trim().toLowerCase()
		return cartItems.value.filter(
			(item) => !query || item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
		)
	})

	const toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		customClass: {
			popup: 'swak-swal-toast'
		}
	})

	function showToast(message, icon = 'success') {
		toast.fire({ icon, title: message })
	}

	watch(remainingBudget, (next) => {
		const over = next < 0
		if (over && !wasOverBudget.value) {
			showToast('Over Budget', 'warning')
		}
		wasOverBudget.value = over
	})

	const { printAndCompleteCart } = useReceiptPrinter(Swal, showToast)

	async function completeCart() {
		await printAndCompleteCart(cartItems.value, () => {
			cartItems.value = []
			isCartEditMode.value = false
			cartSearch.value = ''
			activeCategory.value = 'All'
		})
	}

	async function addItemToCart(payload) {
		const duplicate = cartItems.value.find((item) => item.name.trim().toLowerCase() === payload.name.toLowerCase())
		if (duplicate) {
			const duplicateResult = await Swal.fire({
				title: 'Already Have An Item in Cart',
				text: 'This product is already in your cart. Add another line item?',
				icon: 'question',
				buttonsStyling: false,
				customClass: {
					popup: 'swak-swal',
					title: 'swak-swal-title',
					confirmButton: 'swak-btn swak-btn-primary',
					cancelButton: 'swak-btn swak-btn-cancel'
				},
				showCancelButton: true,
				cancelButtonText: 'Cancel',
				confirmButtonText: 'Yes, Add',
				showCloseButton: false,
				reverseButtons: true
			})

			if (!duplicateResult.isConfirmed) return false
		}

		cartItems.value.unshift({
			id: crypto.randomUUID(),
			name: payload.name,
			price: Number(payload.price),
			qty: Number(payload.qty),
			category: payload.category || 'Other',
			image: payload.image || resolveCatalogImage(payload.name),
			manual: Boolean(payload.manual)
		})
		showToast('Added Successfully', 'success')
		return true
	}

	async function openAddModal(product) {
		const result = await Swal.fire({
			title: 'Add to Cart',
			buttonsStyling: false,
			customClass: {
				popup: 'swak-swal',
				title: 'swak-swal-title',
				confirmButton: 'swak-btn swak-btn-primary',
				cancelButton: 'swak-btn swak-btn-cancel'
			},
			html: `
				<label style="display:block;text-align:left;margin-bottom:6px;font-weight:600;">Product Name</label>
				<input id="swal-name" class="swal2-input" value="${product.name}" readonly style="margin:0 0 10px;">
				<label style="display:block;text-align:left;margin-bottom:6px;font-weight:600;">Price (PHP)</label>
				<input id="swal-price" type="number" class="swal2-input" min="0" step="0.01" placeholder="Enter store price" style="margin:0 0 10px;">
				<label style="display:block;text-align:left;margin-bottom:6px;font-weight:600;">Quantity</label>
				<input id="swal-qty" type="number" class="swal2-input" min="1" step="1" value="1" style="margin:0 0 10px;">
				<label style="display:block;text-align:left;margin-bottom:6px;font-weight:600;">Category</label>
				<input id="swal-category" class="swal2-input" value="${product.category}" readonly style="margin:0;">
			`,
			showCancelButton: true,
			cancelButtonText: 'Cancel',
			confirmButtonText: 'Add Product',
			showCloseButton: false,
			reverseButtons: true,
			focusConfirm: false,
			preConfirm: () => {
				const name = document.getElementById('swal-name')?.value?.trim()
				const price = Number(document.getElementById('swal-price')?.value)
				const qty = Number(document.getElementById('swal-qty')?.value)
				const category = document.getElementById('swal-category')?.value || product.category

				if (!name || Number.isNaN(price) || price <= 0 || Number.isNaN(qty) || qty <= 0) {
					Swal.showValidationMessage('Please enter valid price and quantity.')
					return null
				}

				return { name, price, qty, category }
			}
		})

		if (!result.isConfirmed || !result.value) return

		const payload = result.value
		await addItemToCart({
			name: payload.name,
			price: payload.price,
			qty: payload.qty,
			category: payload.category,
			image: product.image,
			manual: false
		})
	}

	async function openManualAddModal() {
		const defaultCategory = activeCategory.value === 'All' ? 'Other' : activeCategory.value
		const result = await Swal.fire({
			title: 'Add Product Manually',
			buttonsStyling: false,
			customClass: {
				popup: 'swak-swal',
				title: 'swak-swal-title',
				confirmButton: 'swak-btn swak-btn-primary',
				cancelButton: 'swak-btn swak-btn-cancel'
			},
			html: `
				<label style="display:block;text-align:left;margin-bottom:6px;font-weight:600;">Product Name</label>
				<input id="swal-name" class="swal2-input" placeholder="Enter item name" style="margin:0 0 10px;">
				<label style="display:block;text-align:left;margin-bottom:6px;font-weight:600;">Category</label>
				<input id="swal-category" class="swal2-input" value="${defaultCategory}" placeholder="Other" style="margin:0 0 10px;">
				<label style="display:block;text-align:left;margin-bottom:6px;font-weight:600;">Price (PHP)</label>
				<input id="swal-price" type="number" class="swal2-input" min="0" step="0.01" placeholder="Enter store price" style="margin:0 0 10px;">
				<label style="display:block;text-align:left;margin-bottom:6px;font-weight:600;">Quantity</label>
				<input id="swal-qty" type="number" class="swal2-input" min="1" step="1" value="1" style="margin:0;">
			`,
			showCancelButton: true,
			cancelButtonText: 'Cancel',
			confirmButtonText: 'Add Product',
			showCloseButton: false,
			reverseButtons: true,
			focusConfirm: false,
			preConfirm: () => {
				const name = document.getElementById('swal-name')?.value?.trim()
				const category = document.getElementById('swal-category')?.value?.trim() || 'Other'
				const price = Number(document.getElementById('swal-price')?.value)
				const qty = Number(document.getElementById('swal-qty')?.value)

				if (!name || Number.isNaN(price) || price <= 0 || Number.isNaN(qty) || qty <= 0) {
					Swal.showValidationMessage('Please enter a product name, valid price, and quantity.')
					return null
				}

				return { name, category, price, qty }
			}
		})

		if (!result.isConfirmed || !result.value) return

		await addItemToCart({
			...result.value,
			image: resolveCatalogImage(result.value.name),
			manual: true
		})
	}

	async function requestRemoveItem(item) {
		const result = await Swal.fire({
			title: 'Removal of Item in Cart',
			text: `Remove ${item.name} from your cart?`,
			icon: 'warning',
			buttonsStyling: false,
			customClass: {
				popup: 'swak-swal',
				title: 'swak-swal-title',
				confirmButton: 'swak-btn swak-btn-danger',
				cancelButton: 'swak-btn swak-btn-cancel'
			},
			showCancelButton: true,
			cancelButtonText: 'Cancel',
			confirmButtonText: 'Yes, Remove Item',
			showCloseButton: false,
			reverseButtons: true
		})

		if (!result.isConfirmed) return
		cartItems.value = cartItems.value.filter((product) => product.id !== item.id)
		showToast('Removed an Item', 'info')
	}

	function updateQty(item, value) {
		const qty = Number(value)
		item.qty = Number.isNaN(qty) || qty <= 0 ? 1 : qty
	}

	return {
		activeCategory,
		budget,
		cartSearch,
		catalogSearch,
		categories,
		categoryWithCounts,
		filteredCartItems,
		filteredCatalog,
		formatMoney,
		groupedTotals,
		isCartEditMode,
		mobileTab,
		openAddModal,
		openManualAddModal,
		completeCart,
		remainingBudget,
		requestRemoveItem,
		totalSpent,
		updateQty,
		utilization
	}
}
