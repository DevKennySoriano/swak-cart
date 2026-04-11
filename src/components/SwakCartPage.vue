<script setup>
import { useSwakCart } from '../composables/useSwakCart'
import '../styles/swak-cart.css'

const {
  activeCategory,
  addForm,
  addProduct,
  budget,
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
  openManualAddModal,
  remainingBudget,
  removeItem,
  selectedProduct,
  showAddModal,
  totalSpent,
  updateQty,
  utilization
} = useSwakCart()
</script>

<template>
  <main class="page">
    <section class="hero">
      <p class="eyebrow">SWAK-CART</p>
      <h1>Grocery Budget Calculator</h1>
      <p class="subhead">Enter your budget, pick products from the list, then enter actual store price before adding to cart.</p>
    </section>

    <section class="layout-grid">
      <article class="panel list-panel product-list-panel mobile-products-tab" :class="{ 'mobile-hidden': mobileTab === 'cart' }">
        <div class="list-head">
          <h2>Product List</h2>
          <small>{{ filteredCatalog.length }} shown</small>
        </div>

        <div class="product-tools-head">
          <p class="product-help">Search, filter, then add store-priced items to your cart. Can't find one? Add it manually.</p>
          <button type="button" class="primary-btn add-manual-btn" @click="openManualAddModal">Add Custom Product</button>
        </div>

        <div class="product-tools">
          <div class="controls-row">
            <label>
              Search product list
              <input v-model="catalogSearch" type="search" placeholder="Search by product or category" />
            </label>
          </div>

          <div class="category-strip">
            <button
              v-for="entry in categoryWithCounts"
              :key="entry.label"
              type="button"
              :class="['category-chip', { active: activeCategory === entry.label }]"
              @click="activeCategory = entry.label"
            >
              {{ entry.label }}
              <span>{{ entry.count }}</span>
            </button>
          </div>
        </div>

        <p v-if="filteredCatalog.length === 0" class="empty-state">No products matched your filter.</p>

        <div v-else class="product-grid">
          <div v-for="product in filteredCatalog" :key="`${product.category}-${product.name}`" class="product-card">
            <img v-if="product.image" :src="product.image" :alt="product.name" class="product-image" />
            <div v-else class="product-image-fallback" aria-label="No image available">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="9" cy="21" r="1.2" />
                <circle cx="19" cy="21" r="1.2" />
                <path d="M2 3h3l2.2 10.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 1.9-1.4L21 7H7" />
              </svg>
            </div>
            <div class="product-meta">
              <strong>{{ product.name }}</strong>
              <p>{{ product.category }}</p>
              <small>{{ product.unit }}{{ product.tags.length ? ` | ${product.tags.join(', ')}` : '' }}</small>
            </div>
            <button type="button" class="primary-btn" @click="openAddModal(product)">Add to Cart</button>
          </div>
        </div>
      </article>

      <aside class="stacked-side mobile-cart-tab" :class="{ 'mobile-hidden': mobileTab === 'products' }">
        <section class="progress-card">
          <div class="progress-head">
            <strong>Budget Usage</strong>
            <span>{{ utilization }}%</span>
          </div>
          <div class="progress-track" role="progressbar" :aria-valuenow="utilization" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-fill" :style="{ width: `${utilization}%` }"></div>
          </div>
          <p v-if="remainingBudget < 0" class="alert">Over budget by {{ formatMoney(Math.abs(remainingBudget)) }}. Remove or adjust some products.</p>
        </section>

        <article class="card">
          <h2>Budget</h2>
          <label for="budget" class="sr-only">Budget in PHP</label>
          <div class="budget-input-wrap">
            <span>PHP</span>
            <input id="budget" v-model.number="budget" type="number" min="0" step="10" />
          </div>
        </article>

        <article class="card">
          <h2>Total Spent</h2>
          <p class="value spent">{{ formatMoney(totalSpent) }}</p>
        </article>

        <article class="card">
          <h2>Remaining</h2>
          <p class="value" :class="remainingBudget < 0 ? 'negative' : 'positive'">{{ formatMoney(remainingBudget) }}</p>
        </article>

        <article class="panel">
          <div class="cart-header">
            <div>
              <h2>Your Cart</h2>
              <small>{{ filteredCartItems.length }} items</small>
            </div>
            <button 
              type="button" 
              class="edit-btn"
              @click="isCartEditMode = !isCartEditMode"
            >
              {{ isCartEditMode ? 'Done' : 'Edit' }}
            </button>
          </div>
          <label>
            Search cart
            <input v-model="cartSearch" type="search" placeholder="Search in cart" />
          </label>
          <div class="cart-list">
            <div v-for="item in filteredCartItems" :key="item.id" class="cart-row">
              <div>
                <strong>{{ item.name }}</strong>
                <p>{{ item.category }}</p>
              </div>

              <div v-if="!isCartEditMode" class="cart-view-mode">
                <span class="cart-view-price">{{ formatMoney(item.price) }}</span>
                <span class="cart-view-qty">{{ item.qty }}</span>
              </div>

              <template v-else>
                <label class="inline-field">
                  Price
                  <input :value="item.price" type="number" min="0" step="0.01" @input="item.price = Number($event.target.value) || 0" />
                </label>

                <label class="inline-field qty-wrap">
                  Qty
                  <input :value="item.qty" type="number" min="1" @input="updateQty(item, $event.target.value)" />
                </label>
              </template>

              <strong class="price">{{ formatMoney(item.price * item.qty) }}</strong>
              <button 
                v-if="isCartEditMode"
                type="button" 
                class="remove" 
                @click="removeItem(item.id)"
              >
                Remove
              </button>
            </div>
            <p v-if="filteredCartItems.length === 0" class="complete-msg">No items in cart yet.</p>
          </div>
        </article>

        <article class="panel summary-panel">
          <h2>Category Totals</h2>
          <div class="summary-grid">
            <div v-for="(value, key) in groupedTotals" :key="key" class="summary-chip">
              <span>{{ key }}</span>
              <strong>{{ formatMoney(value) }}</strong>
            </div>
          </div>
        </article>
      </aside>
    </section>

    <div class="mobile-tabs">
      <button 
        type="button" 
        :class="['mobile-tab-btn', { active: mobileTab === 'products' }]"
        @click="mobileTab = 'products'"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 3v18"/><path d="M15 3v18"/>
        </svg>
        Products
      </button>
      <button 
        type="button" 
        :class="['mobile-tab-btn', { active: mobileTab === 'cart' }]"
        @click="mobileTab = 'cart'"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        Cart
      </button>
    </div>

    <div v-if="showAddModal" class="modal-backdrop" @click.self="closeAddModal">
      <section class="modal-card">
        <div class="modal-head">
          <h2>{{ selectedProduct ? 'Add to Cart' : 'Add Custom Product' }}</h2>
          <button type="button" class="close-btn" @click="closeAddModal">Close</button>
        </div>

        <p class="modal-help">
          {{ selectedProduct ? 'Enter actual store price and quantity before saving.' : 'Add a product not in the list, then set category, price, and quantity.' }}
        </p>

        <form class="add-form" @submit.prevent="addProduct">
          <label>
            Product Name
            <input v-model="addForm.name" type="text" :readonly="Boolean(selectedProduct)" placeholder="Type product name" required />
          </label>

          <label>
            Price (PHP)
            <input v-model="addForm.price" type="number" min="0" step="0.01" placeholder="Enter store price" required />
          </label>

          <label>
            Quantity
            <input v-model.number="addForm.qty" type="number" min="1" step="1" />
          </label>

          <label>
            Category
            <select v-model="addForm.category" disabled>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <button type="submit" class="primary-btn">Save Product</button>
        </form>
      </section>
    </div>
  </main>
</template>
