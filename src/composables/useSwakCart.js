import { computed, reactive, ref } from 'vue'

export function useSwakCart() {
  const budget = ref(2500)
  const showAddModal = ref(false)
  const catalogSearch = ref('')
  const cartSearch = ref('')
  const activeCategory = ref('All')
  const selectedProduct = ref(null)

  const addForm = reactive({
    name: '',
    price: '',
    qty: 1,
    category: 'Other'
  })

  const catalogData = {
    categories: [
      {
        name: 'Rice & Carbohydrates',
        items: [
          { name: 'White rice', unit: 'kg', common: true, tags: ['staple'] },
          { name: 'Jasmine rice', unit: 'kg', common: true, tags: ['staple'] },
          { name: 'Brown rice', unit: 'kg', common: false, tags: ['healthy'] },
          { name: 'Glutinous rice', unit: 'kg', common: false, tags: ['special'] },
          { name: 'Bread loaf', unit: 'pack', common: true, tags: ['breakfast'] },
          { name: 'Pandesal', unit: 'pack', common: true, tags: ['breakfast'] },
          { name: 'Instant noodles', unit: 'pack', common: true, tags: ['quick'] },
          { name: 'Pasta', unit: 'pack', common: true, tags: [] },
          { name: 'Flour', unit: 'kg', common: true, tags: [] },
          { name: 'Oats', unit: 'pack', common: true, tags: ['healthy'] },
          { name: 'Corn', unit: 'kg', common: false, tags: [] }
        ]
      },
      {
        name: 'Meat & Poultry',
        items: [
          { name: 'Chicken (whole)', unit: 'kg', common: true, tags: ['ulam'] },
          { name: 'Chicken cuts', unit: 'kg', common: true, tags: ['ulam'] },
          { name: 'Pork liempo', unit: 'kg', common: true, tags: ['ulam'] },
          { name: 'Pork kasim', unit: 'kg', common: true, tags: ['ulam'] },
          { name: 'Ground pork', unit: 'kg', common: true, tags: ['ulam'] },
          { name: 'Beef', unit: 'kg', common: true, tags: ['ulam'] },
          { name: 'Ground beef', unit: 'kg', common: true, tags: ['ulam'] },
          { name: 'Hotdog', unit: 'pack', common: true, tags: ['processed'] },
          { name: 'Ham', unit: 'pack', common: false, tags: ['processed'] },
          { name: 'Bacon', unit: 'pack', common: true, tags: ['processed'] },
          { name: 'Sausage', unit: 'pack', common: true, tags: ['processed'] }
        ]
      },
      {
        name: 'Fish & Seafood',
        items: [
          { name: 'Bangus', unit: 'kg', common: true, tags: ['ulam'] },
          { name: 'Tilapia', unit: 'kg', common: true, tags: ['ulam'] },
          { name: 'Shrimp', unit: 'kg', common: true, tags: ['ulam'] },
          { name: 'Squid', unit: 'kg', common: true, tags: ['ulam'] },
          { name: 'Dried fish (tuyo)', unit: 'pack', common: true, tags: ['breakfast'] },
          { name: 'Dried fish (danggit)', unit: 'pack', common: true, tags: ['breakfast'] },
          { name: 'Dried anchovies (dilis)', unit: 'pack', common: true, tags: [] },
          { name: 'Frozen fish fillet', unit: 'pack', common: true, tags: [] }
        ]
      },
      {
        name: 'Eggs & Dairy',
        items: [
          { name: 'Eggs', unit: 'dozen', common: true, tags: ['staple'] },
          { name: 'Fresh milk', unit: 'liter', common: true, tags: [] },
          { name: 'Powdered milk', unit: 'pack', common: true, tags: [] },
          { name: 'Evaporated milk', unit: 'can', common: true, tags: [] },
          { name: 'Cheese', unit: 'pack', common: true, tags: [] },
          { name: 'Butter', unit: 'pack', common: true, tags: [] },
          { name: 'Margarine', unit: 'pack', common: true, tags: [] },
          { name: 'Yogurt', unit: 'cup', common: false, tags: ['healthy'] }
        ]
      },
      {
        name: 'Vegetables',
        items: [
          { name: 'Pechay', unit: 'bundle', common: true, tags: ['ulam'] },
          { name: 'Kangkong', unit: 'bundle', common: true, tags: ['ulam'] },
          { name: 'Cabbage', unit: 'pc', common: true, tags: [] },
          { name: 'Eggplant', unit: 'kg', common: true, tags: [] },
          { name: 'Tomato', unit: 'kg', common: true, tags: [] },
          { name: 'Onion', unit: 'kg', common: true, tags: [] },
          { name: 'Garlic', unit: 'kg', common: true, tags: [] },
          { name: 'Potato', unit: 'kg', common: true, tags: [] },
          { name: 'Carrot', unit: 'kg', common: true, tags: [] },
          { name: 'Sayote', unit: 'kg', common: true, tags: [] },
          { name: 'Squash', unit: 'kg', common: true, tags: [] }
        ]
      },
      {
        name: 'Fruits',
        items: [
          { name: 'Banana', unit: 'kg', common: true, tags: ['snack'] },
          { name: 'Apple', unit: 'kg', common: true, tags: [] },
          { name: 'Orange', unit: 'kg', common: true, tags: [] },
          { name: 'Mango', unit: 'kg', common: true, tags: ['seasonal'] },
          { name: 'Pineapple', unit: 'pc', common: true, tags: [] },
          { name: 'Watermelon', unit: 'pc', common: true, tags: [] },
          { name: 'Papaya', unit: 'pc', common: true, tags: [] }
        ]
      },
      {
        name: 'Canned & Packaged Goods',
        items: [
          { name: 'Sardines', unit: 'can', common: true, tags: ['ulam'] },
          { name: 'Canned tuna', unit: 'can', common: true, tags: ['ulam'] },
          { name: 'Corned beef', unit: 'can', common: true, tags: ['ulam'] },
          { name: 'Meat loaf', unit: 'can', common: true, tags: [] },
          { name: 'Canned vegetables', unit: 'can', common: false, tags: [] },
          { name: 'Canned fruits', unit: 'can', common: false, tags: [] },
          { name: 'Ready-to-eat meals', unit: 'pack', common: false, tags: [] }
        ]
      },
      {
        name: 'Pantry Essentials',
        items: [
          { name: 'Sugar', unit: 'kg', common: true, tags: [] },
          { name: 'Salt', unit: 'pack', common: true, tags: [] },
          { name: 'Coffee', unit: 'pack', common: true, tags: [] },
          { name: 'Powdered chocolate drink', unit: 'pack', common: true, tags: [] },
          { name: 'Cooking oil', unit: 'liter', common: true, tags: [] },
          { name: 'Vinegar', unit: 'bottle', common: true, tags: [] },
          { name: 'Soy sauce', unit: 'bottle', common: true, tags: [] },
          { name: 'Fish sauce', unit: 'bottle', common: true, tags: [] },
          { name: 'Biscuits', unit: 'pack', common: true, tags: ['snack'] },
          { name: 'Crackers', unit: 'pack', common: true, tags: ['snack'] }
        ]
      },
      {
        name: 'Condiments & Seasonings',
        items: [
          { name: 'Black pepper', unit: 'pack', common: true, tags: [] },
          { name: 'Garlic powder', unit: 'pack', common: true, tags: [] },
          { name: 'Onion powder', unit: 'pack', common: true, tags: [] },
          { name: 'Seasoning mix', unit: 'pack', common: true, tags: [] },
          { name: 'Ketchup', unit: 'bottle', common: true, tags: [] },
          { name: 'Mayonnaise', unit: 'bottle', common: true, tags: [] },
          { name: 'Chili sauce', unit: 'bottle', common: false, tags: [] },
          { name: 'Oyster sauce', unit: 'bottle', common: true, tags: [] }
        ]
      },
      {
        name: 'Beverages',
        items: [
          { name: 'Bottled water', unit: 'liter', common: true, tags: [] },
          { name: 'Soft drinks', unit: 'bottle', common: true, tags: [] },
          { name: 'Juice drinks', unit: 'pack', common: true, tags: [] },
          { name: '3-in-1 coffee', unit: 'pack', common: true, tags: [] },
          { name: 'Tea', unit: 'pack', common: true, tags: [] },
          { name: 'Energy drinks', unit: 'can', common: false, tags: [] }
        ]
      },
      {
        name: 'Snacks',
        items: [
          { name: 'Chips', unit: 'pack', common: true, tags: [] },
          { name: 'Candy', unit: 'pack', common: true, tags: [] },
          { name: 'Chocolate', unit: 'pack', common: true, tags: [] },
          { name: 'Cup noodles', unit: 'cup', common: true, tags: [] }
        ]
      },
      {
        name: 'Household Supplies',
        items: [
          { name: 'Laundry detergent', unit: 'pack', common: true, tags: [] },
          { name: 'Fabric conditioner', unit: 'bottle', common: true, tags: [] },
          { name: 'Dishwashing liquid', unit: 'bottle', common: true, tags: [] },
          { name: 'Bleach', unit: 'bottle', common: true, tags: [] },
          { name: 'Multi-purpose cleaner', unit: 'bottle', common: true, tags: [] },
          { name: 'Toilet cleaner', unit: 'bottle', common: true, tags: [] },
          { name: 'Trash bags', unit: 'pack', common: true, tags: [] },
          { name: 'Tissue paper', unit: 'pack', common: true, tags: [] }
        ]
      },
      {
        name: 'Personal Care',
        items: [
          { name: 'Shampoo', unit: 'bottle', common: true, tags: [] },
          { name: 'Conditioner', unit: 'bottle', common: true, tags: [] },
          { name: 'Soap', unit: 'bar', common: true, tags: [] },
          { name: 'Body wash', unit: 'bottle', common: false, tags: [] },
          { name: 'Toothpaste', unit: 'tube', common: true, tags: [] },
          { name: 'Toothbrush', unit: 'pc', common: true, tags: [] },
          { name: 'Deodorant', unit: 'bottle', common: true, tags: [] },
          { name: 'Feminine products', unit: 'pack', common: true, tags: [] }
        ]
      }
    ]
  }

  const categories = catalogData.categories.map((category) => category.name)

  const categoryColor = {
    'Rice & Grains': '#F6E2A8',
    Protein: '#FFD5CA',
    Vegetables: '#CDEEDB',
    Fruits: '#FFE7BB',
    Toiletries: '#DDE8FF',
    Other: '#D9EEE8'
  }

  const productIcon = {
    Rice: 'RC',
    Bread: 'BR',
    Noodles: 'ND',
    Eggs: 'EG',
    Chicken: 'CH',
    Fish: 'FS',
    Tomato: 'TM',
    Onion: 'ON',
    'Leafy Greens': 'LG',
    Banana: 'BN',
    Apple: 'AP',
    Soap: 'SP',
    Shampoo: 'SH',
    Toothpaste: 'TP',
    'Cooking Oil': 'CO',
    'Drinking Water': 'DW'
  }

  function toCatalogImage(label, category) {
    const bg = categoryColor[category] || categoryColor.Other
    const icon = productIcon[label] || 'CT'
    const safeLabel = encodeURIComponent(label)
    const safeIcon = encodeURIComponent(icon)
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320'><rect width='320' height='320' rx='28' fill='${bg}'/><circle cx='260' cy='62' r='44' fill='rgba(255,255,255,0.42)'/><text x='160' y='162' text-anchor='middle' font-size='76' font-family='Arial, sans-serif' font-weight='700' fill='#1b5f4d'>${safeIcon}</text><text x='160' y='278' text-anchor='middle' font-size='26' font-family='Arial, sans-serif' font-weight='700' fill='#1b5f4d'>${safeLabel}</text></svg>`
    return `data:image/svg+xml;utf8,${svg}`
  }

  // Local image files in public/images/products. Keep filenames kebab-case for auto matching.
  const localImageFiles = [
    '3-in-1-coffee.jpg',
    'apple.jpeg',
    'bacon.jpg',
    'banana.jpg',
    'bangus.jpg',
    'beef.jpg',
    'biscuit.jpg',
    'black-pepper.jpg',
    'bleach.jpg',
    'body-wash.jpg',
    'bottled-water.jpg',
    'bread-loaf.jpg',
    'brown-rice.jpg',
    'butter.jpg',
    'cabbage.jpg',
    'candy.jpg',
    'canned-fruits.jpg',
    'canned-tuna.jpg',
    'canned-vegetables.jpg',
    'carrot.jpg',
    'cheese.jpg',
    'ketchup.jpg',
    'white-rice.jpeg'
  ]

  function toSlug(value) {
    return String(value)
      .toLowerCase()
      .replace(/\([^)]*\)/g, ' ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const localImageBySlug = Object.fromEntries(
    localImageFiles.map((file) => {
      const basename = file.replace(/\.[^.]+$/, '')
      return [basename, `/images/products/${file}`]
    })
  )

  const localImageAliases = {
    milkfish: 'bangus',
    'milkfish-bangus': 'bangus',
    water: 'bottled-water',
    biscuits: 'biscuit'
  }

  function resolveCatalogImage(label, category) {
    const slug = toSlug(label)
    const aliasSlug = localImageAliases[slug]

    if (localImageBySlug[slug]) return localImageBySlug[slug]
    if (aliasSlug && localImageBySlug[aliasSlug]) return localImageBySlug[aliasSlug]

    return toCatalogImage(label, category)
  }

  const productCatalog = catalogData.categories.flatMap((category) => {
    return category.items.map((item) => ({
      ...item,
      category: category.name,
      image: resolveCatalogImage(item.name, category.name)
    }))
  })

  const cartItems = ref([])
  const isCartEditMode = ref(false)
  const mobileTab = ref('products')

  const peso = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2
  })

  const totalSpent = computed(() => cartItems.value.reduce((sum, p) => sum + Number(p.price || 0) * Number(p.qty || 0), 0))
  const remainingBudget = computed(() => Number(budget.value || 0) - totalSpent.value)

  const utilization = computed(() => {
    const value = Number(budget.value || 0)
    if (value <= 0) return 0
    return Math.min(100, Math.round((totalSpent.value / value) * 100))
  })

  const groupedTotals = computed(() => {
    return cartItems.value.reduce((acc, p) => {
      const key = p.category || 'Other'
      acc[key] = (acc[key] || 0) + Number(p.price || 0) * Number(p.qty || 0)
      return acc
    }, {})
  })

  const categoryWithCounts = computed(() => {
    const counts = productCatalog.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
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

  const filteredCartItems = computed(() => {
    const query = cartSearch.value.trim().toLowerCase()
    return cartItems.value.filter((item) => {
      if (!query) return true
      return item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
    })
  })

  function formatMoney(value) {
    return peso.format(Number(value || 0))
  }

  function openAddModal(product) {
    selectedProduct.value = product
    addForm.name = product.name
    addForm.category = product.category
    addForm.price = ''
    addForm.qty = 1
    showAddModal.value = true
  }

  function closeAddModal() {
    showAddModal.value = false
    selectedProduct.value = null
  }

  function addProduct() {
    const cleanName = addForm.name.trim()
    const cleanPrice = Number(addForm.price)
    const cleanQty = Number(addForm.qty)

    if (!cleanName || Number.isNaN(cleanPrice) || cleanPrice <= 0 || Number.isNaN(cleanQty) || cleanQty <= 0) return

    cartItems.value.unshift(
      {
        id: crypto.randomUUID(),
        name: cleanName,
        price: cleanPrice,
        qty: cleanQty,
        category: addForm.category
      }
    )

    addForm.name = ''
    addForm.price = ''
    addForm.qty = 1
    addForm.category = 'Other'
    closeAddModal()
  }

  function removeItem(id) {
    cartItems.value = cartItems.value.filter((p) => p.id !== id)
  }

  function updateQty(item, value) {
    const qty = Number(value)
    item.qty = Number.isNaN(qty) || qty <= 0 ? 1 : qty
  }

  return {
    activeCategory,
    addForm,
    addProduct,
    budget,
    cartItems,
    cartSearch,
    catalogSearch,
    categories,
    categoryWithCounts,
    closeAddModal,
    filteredCartItems,
    filteredCatalog,
    formatMoney,
    groupedTotals,
    isCartEditMode,
    mobileTab,
    openAddModal,
    productCatalog,
    remainingBudget,
    removeItem,
    selectedProduct,
    showAddModal,
    totalSpent,
    updateQty,
    utilization
  }
}
