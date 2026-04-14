<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
const emit = defineEmits(['start'])
import lastUpdated from 'virtual:git-date'

const activeMobileSection = ref('home')
const sectionOrder = ['home', 'features', 'about', 'how']
let rafId = null

function startApp() {
  emit('start')
}

function goToSection(sectionId) {
  activeMobileSection.value = sectionId
  const target = document.getElementById(sectionId)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function updateActiveSectionFromScroll() {
  const offset = window.scrollY + 140
  let current = sectionOrder[0]

  for (const id of sectionOrder) {
    const section = document.getElementById(id)
    if (!section) continue
    if (section.offsetTop <= offset) {
      current = id
    }
  }

  activeMobileSection.value = current
}

function onScrollOrResize() {
  if (rafId !== null) return
  rafId = window.requestAnimationFrame(() => {
    updateActiveSectionFromScroll()
    rafId = null
  })
}

onMounted(() => {
  updateActiveSectionFromScroll()
  window.addEventListener('scroll', onScrollOrResize, { passive: true })
  window.addEventListener('resize', onScrollOrResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollOrResize)
  window.removeEventListener('resize', onScrollOrResize)
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId)
    rafId = null
  }
})
</script>

<template>
  <main class="home-page">
    <header class="site-nav-wrap">
      <nav class="site-nav">
        <a class="brand" href="#home" @click.prevent>
          <img src="/images/logo.png" alt="SWAK-CART Logo" class="brand-logo" />
          <span>SWAK-CART</span>
        </a>

        <div class="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#how">How It Works</a>
        </div>
      </nav>
    </header>

    <div class="home-mobile-tabs" role="tablist" aria-label="Homepage sections">
      <button
        type="button"
        :class="['home-mobile-tab-btn', { active: activeMobileSection === 'home' }]"
        @click="goToSection('home')"
      >
        <i class="fa-solid fa-play" aria-hidden="true"></i>
        Get Started
      </button>
      <button
        type="button"
        :class="['home-mobile-tab-btn', { active: activeMobileSection === 'features' }]"
        @click="goToSection('features')"
      >
        <i class="fa-solid fa-star" aria-hidden="true"></i>
        Features
      </button>
      <button
        type="button"
        :class="['home-mobile-tab-btn', { active: activeMobileSection === 'about' }]"
        @click="goToSection('about')"
      >
        <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
        About
      </button>
      <button
        type="button"
        :class="['home-mobile-tab-btn', { active: activeMobileSection === 'how' }]"
        @click="goToSection('how')"
      >
        <i class="fa-solid fa-list-check" aria-hidden="true"></i>
        How It Works
      </button>
    </div>

    <section id="home" class="hero-banner" data-aos="fade-up">
      <div class="hero-content" data-aos="fade-right" data-aos-delay="80">
        <p class="eyebrow">SWAK-CART: Your Grocery Companion</p>
        <h1>Shop smarter and stay within budget.</h1>
        <p class="hero-copy">
          SWAK-CART is your grocery companion for planning every trip. Add items, enter real store prices,
          and instantly see your total, remaining budget, and smart suggestions before checkout.
        </p>

        <div class="cta-row">
          <button type="button" class="get-started-btn" @click="startApp">Get Started</button>
          <p class="cta-note">No download required. No account required. Open and use instantly in your browser.</p>
        </div>
      </div>

      <div class="hero-media" data-aos="zoom-in" data-aos-delay="140">
        <img src="/images/homepage/swak-cart-banner.png" alt="SWAK-CART banner image" class="hero-image" />
      </div>
    </section>

    <section id="features" class="section" data-aos="fade-up">
      <h2>Features</h2>
      <p class="section-lead">Are you budget-conscious, feeding a family, or trying to stop impulse grocery spending? SWAK-CART helps you plan before checkout stress starts.</p>
      <div class="quick-check" aria-label="Who SWAK-CART helps">
        <span>Budget-conscious shopper?</span>
        <span>Weekly grocery planner?</span>
        <span>Student on allowance?</span>
        <span>Family meal budget manager?</span>
      </div>
      <div class="card-grid">
        <article class="info-card" data-aos="fade-up" data-aos-delay="40">
          <i class="fa-solid fa-wallet" aria-hidden="true"></i>
          <h3>Track Your Spending</h3>
          <p>See total spend, remaining budget, and usage percentage in real time while you build your cart.</p>
        </article>

        <article class="info-card" data-aos="fade-up" data-aos-delay="100">
          <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
          <h3>Plan Like You Shop</h3>
          <p>Add items from the product list or manually input what is not listed using your store's actual prices.</p>
        </article>

        <article class="info-card" data-aos="fade-up" data-aos-delay="160">
          <i class="fa-solid fa-lightbulb" aria-hidden="true"></i>
          <h3>Smart Budget Suggestions</h3>
          <p>Over budget? Get remove-first suggestions. Still have budget left? Get practical essentials to consider.</p>
        </article>
      </div>
    </section>

    <section id="about" class="section" data-aos="fade-up">
      <h2>What This Is For</h2>
      <p class="section-lead">SWAK-CART is built for real grocery situations, not just perfect lists.</p>
      <div class="about-grid">
        <article class="about-card" data-aos="fade-up" data-aos-delay="40">
          <i class="fa-solid fa-people-group" aria-hidden="true"></i>
          <h3>For Families and Solo Shoppers</h3>
          <p>Great for planning weekly or monthly spending whether you shop for one person or a full household.</p>
        </article>

        <article class="about-card" data-aos="fade-up" data-aos-delay="100">
          <i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>
          <h3>Use It Anywhere</h3>
          <p>Works on desktop and mobile so you can plan at home and update your list while you are in-store.</p>
        </article>

        <article class="about-card" data-aos="fade-up" data-aos-delay="160">
          <i class="fa-solid fa-cloud" aria-hidden="true"></i>
          <h3>Zero Setup, Instant Start</h3>
          <p>No install, no account, and no software download needed. Open, plan, and go.</p>
        </article>
      </div>
    </section>

    <section id="how" class="section" data-aos="fade-up">
      <h2>How It Works</h2>
      <div class="steps">
        <article class="step-card" data-aos="fade-up" data-aos-delay="40">
          <div class="step-media">
            <img src="/images/homepage/homepage-setbudget-step1.jpg" alt="Set your grocery budget" />
            <span class="step-badge">1</span>
          </div>
          <div class="step-content">
            <h3>Set Your Budget</h3>
            <p>Start by entering your total grocery budget before adding anything to your cart. This gives you a clear spending limit right away and lets SWAK-CART calculate your remaining balance as you shop.</p>
          </div>
        </article>

        <article class="step-card reverse" data-aos="fade-up" data-aos-delay="100">
          <div class="step-media">
            <img src="/images/homepage/homepage-additems-step2.jpg" alt="Add products with actual prices" />
            <span class="step-badge">2</span>
          </div>
          <div class="step-content">
            <h3>Add Your Items</h3>
            <p>Choose products from the catalog or manually add items that are not listed, then input the actual store price and quantity for each one. Using real prices helps you build an accurate cart that reflects what you will truly pay at checkout.</p>
          </div>
        </article>

        <article class="step-card" data-aos="fade-up" data-aos-delay="160">
          <div class="step-media">
            <img src="/images/homepage/homepage-reviewcart-step3.jpg" alt="Review budget summary and suggestions" />
            <span class="step-badge">3</span>
          </div>
          <div class="step-content">
            <h3>Review Your Summary</h3>
            <p>Review your total spent, remaining budget, and budget usage to see if your plan is still on track. If you are over budget, SWAK-CART suggests what you can remove first, and if you still have room, it can suggest useful essentials to add.</p>
          </div>
        </article>

        <article class="step-card reverse" data-aos="fade-up" data-aos-delay="220">
          <div class="step-media">
            <img src="/images/homepage/homepage-complete-step4.png" alt="Complete cart and export receipt" />
            <span class="step-badge">4</span>
          </div>
          <div class="step-content">
            <h3>Complete and Save</h3>
            <p>Once your cart looks good and fits your budget, complete the session to finalize your grocery plan. You can then export a clean receipt-style summary for reference, budget tracking, or sharing with family members.</p>
          </div>
        </article>
      </div>
    </section>

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

<style scoped src="../styles/swak-cart-home-page.css"></style>

