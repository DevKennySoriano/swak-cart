<script setup>
import { ref } from 'vue'
import { useSwakCart } from '../composables/useSwakCart'
import '../styles/swak-cart.css'

const lastUpdated = ref('April 11, 2026')

const {
  activeCategory,
  budget,
  cartSearch,
  catalogSearch,
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
} = useSwakCart()

function categoryIcon(label) {
  const iconMap = {
    All: 'fa-table-cells-large',
    'Rice & Carbohydrates': 'fa-wheat-awn',
    'Meat & Poultry': 'fa-drumstick-bite',
    'Fish & Seafood': 'fa-fish',
    'Eggs & Dairy': 'fa-egg',
    Vegetables: 'fa-seedling',
    Fruits: 'fa-apple-whole',
    'Canned & Packaged Goods': 'fa-box',
    'Pantry Essentials': 'fa-jar',
    'Condiments & Seasonings': 'fa-mortar-pestle',
    Beverages: 'fa-mug-hot',
    Snacks: 'fa-cookie-bite',
    'Household Supplies': 'fa-pump-soap',
    'Personal Care': 'fa-soap'
  }

  return iconMap[label] || 'fa-tag'
}
</script>

<template>
  <main class="page">
    <section class="page-header">
      <div class="header-content">
        <img src="/images/logo.png" alt="SWAK-CART Logo" class="logo" />
        <div>
          <p class="eyebrow">SWAK-CART</p>
          <h1>Grocery Budget Calculator</h1>
          <p class="subhead">Enter your budget, pick products from the list, then enter actual store price before adding to cart.</p>
        </div>
      </div>
    </section>

    <section class="layout-grid">
      <article class="panel list-panel product-list-panel mobile-products-tab" :class="{ 'mobile-hidden': mobileTab === 'cart' }">
        <div class="list-head">
          <div>
            <h2>Product List</h2>
            <small>{{ filteredCatalog.length }} shown</small>
          </div>
          <button type="button" class="edit-btn" @click="openManualAddModal">
            <i class="fa-solid fa-circle-plus" aria-hidden="true"></i>
            Add Manually
          </button>
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
              <i :class="['fa-solid', categoryIcon(entry.label)]" aria-hidden="true"></i>
              <span class="chip-label">{{ entry.label }}</span>
              <span class="chip-count">{{ entry.count }}</span>
            </button>
          </div>
        </div>

        <p v-if="filteredCatalog.length === 0" class="empty-state">No products matched your filter.</p>

        <div v-else class="product-grid">
          <div v-for="product in filteredCatalog" :key="`${product.category}-${product.name}`" class="product-card">
            <img :src="product.image" :alt="product.name" class="product-image" />
            <div class="product-meta">
              <strong>{{ product.name }}</strong>
              <p>{{ product.category }}</p>
            </div>
            <button type="button" class="primary-btn" @click="openAddModal(product)">
              <i class="fa-solid fa-cart-plus" aria-hidden="true"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </article>

      <aside class="stacked-side mobile-cart-tab" :class="{ 'mobile-hidden': mobileTab === 'products' }">
        <section class="progress-card">
          <div class="progress-head">
            <strong>Budget Usage</strong>
            <span>{{ utilization }}%</span>
          </div>
          <p class="metric-desc">Shows how much of your entered budget is currently allocated to your cart.</p>
          <div class="progress-track" role="progressbar" :aria-valuenow="utilization" aria-valuemin="0" aria-valuemax="100">
            <div :class="['progress-fill', { 'over-budget': remainingBudget < 0 }]" :style="{ width: `${utilization}%` }"></div>
          </div>
          <p v-if="remainingBudget < 0" class="alert">Over budget by {{ formatMoney(Math.abs(remainingBudget)) }}. Remove or adjust some products.</p>
        </section>

        <article class="card">
          <h2>Budget</h2>
          <p class="metric-desc">Set your target spending limit for this shopping session.</p>
          <label for="budget" class="sr-only">Budget in PHP</label>
          <div class="budget-input-wrap">
            <span>PHP</span>
            <input id="budget" v-model.number="budget" type="number" min="0" step="10" />
          </div>
        </article>

        <article class="card">
          <h2>Total Spent</h2>
          <p class="metric-desc">Displays the running total based on item price multiplied by quantity.</p>
          <p class="value spent">{{ formatMoney(totalSpent) }}</p>
        </article>

        <article class="card">
          <h2>Remaining</h2>
          <p class="metric-desc">Indicates how much budget is left after current cart calculations.</p>
          <p class="value" :class="remainingBudget < 0 ? 'negative' : 'positive'">{{ formatMoney(remainingBudget) }}</p>
        </article>

        <article class="panel">
          <div class="cart-header">
            <div>
              <h2>Your Cart</h2>
              <small>{{ filteredCartItems.length }} items</small>
            </div>
            <div class="cart-actions">
              <button 
                type="button" 
                class="edit-btn"
                @click="isCartEditMode = !isCartEditMode"
              >
                <i :class="isCartEditMode ? 'fa-solid fa-check' : 'fa-solid fa-pen-to-square'" aria-hidden="true"></i>
                {{ isCartEditMode ? 'Done' : 'Edit' }}
              </button>
              <button
                type="button"
                class="complete-btn"
                :disabled="filteredCartItems.length === 0 || remainingBudget < 0"
                @click="completeCart"
              >
                <i class="fa-solid fa-circle-check" aria-hidden="true"></i>
                Complete Cart
              </button>
            </div>
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
                @click="requestRemoveItem(item)"
              >
                <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
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
        <i class="fa-solid fa-table-cells-large" aria-hidden="true"></i>
        Products
      </button>
      <button 
        type="button" 
        :class="['mobile-tab-btn', { active: mobileTab === 'cart' }]"
        @click="mobileTab = 'cart'"
      >
        <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
        Cart
      </button>
    </div>

    <footer class="footer">
      <div class="footer-left">
        <img src="/images/logo.png" alt="SWAK-CART Logo" class="footer-logo" />
        <p class="footer-updated">Last Updated: {{ lastUpdated }}</p>
      </div>
      <div class="footer-right">
        <a href="mailto:devkennysoriano@gmail.com" class="social-link" title="Email">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/kennysoriano/" target="_blank" rel="noopener noreferrer" class="social-link" title="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.002 1.413-.103.25-.129.599-.129.949v5.443h-3.554s.05-8.83 0-9.738h3.554v1.379c-.01.016-.023.032-.033.05h.033v-.05c.43-.664 1.199-1.61 2.922-1.61 2.135 0 3.731 1.395 3.731 4.397v5.572zM5.337 8.855c-1.144 0-1.915-.761-1.915-1.713 0-.951.77-1.713 1.958-1.713 1.187 0 1.915.762 1.932 1.713 0 .952-.745 1.713-1.975 1.713zm-1.848 11.597h3.695v-9.738H3.489v9.738zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/>
          </svg>
        </a>
        <a href="https://github.com/DevKennySoriano" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href="https://devkennysoriano.vercel.app/" target="_blank" rel="noopener noreferrer" class="social-link portfolio-link" title="Portfolio">
          <img src="/images/icons/K.png" alt="Portfolio" class="k-logo" />
        </a>
      </div>
    </footer>

  </main>
</template>
