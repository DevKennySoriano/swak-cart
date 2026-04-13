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

    <section id="home" class="hero-banner">
      <div>
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

      <div class="hero-media">
        <img src="/images/logo.png" alt="SWAK-CART banner image" class="hero-image" />
      </div>
    </section>

    <section id="features" class="section">
      <h2>Features</h2>
      <div class="card-grid">
        <article class="info-card">
          <i class="fa-solid fa-wallet" aria-hidden="true"></i>
          <h3>Track Your Budget</h3>
          <p>See your total spending, remaining budget, and budget usage in real time.</p>
        </article>

        <article class="info-card">
          <i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>
          <h3>Add Items Easily</h3>
          <p>Choose from the product list or add your own items with your store's actual prices.</p>
        </article>

        <article class="info-card">
          <i class="fa-solid fa-lightbulb" aria-hidden="true"></i>
          <h3>Helpful Suggestions</h3>
          <p>Get suggestions on what to remove when over budget and what essentials to add when you still have budget.</p>
        </article>
      </div>
    </section>

    <section id="about" class="section">
      <h2>What This Is For</h2>
      <div class="about-grid">
        <article class="about-card">
          <i class="fa-solid fa-people-group" aria-hidden="true"></i>
          <p>Great for families and individuals planning weekly or monthly grocery spending.</p>
        </article>

        <article class="about-card">
          <i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>
          <p>Works on desktop and mobile, so you can plan anywhere.</p>
        </article>

        <article class="about-card">
          <i class="fa-solid fa-cloud" aria-hidden="true"></i>
          <p>No installation, no sign-up, and no software download needed.</p>
        </article>
      </div>
    </section>

    <section id="how" class="section">
      <h2>How It Works</h2>
      <div class="steps">
        <article class="step-card">
          <div class="step-media">
            <img src="/images/logo.png" alt="Set your grocery budget" />
            <span class="step-badge">1</span>
          </div>
          <div class="step-content">
            <h3>Set Your Budget</h3>
            <p>Enter your budget in PHP so you can track your spending from the first item.</p>
          </div>
        </article>

        <article class="step-card reverse">
          <div class="step-media">
            <img src="/images/logo.png" alt="Add products with actual prices" />
            <span class="step-badge">2</span>
          </div>
          <div class="step-content">
            <h3>Add Your Items</h3>
            <p>Pick from the product list or add manually, then enter the actual store price and quantity.</p>
          </div>
        </article>

        <article class="step-card">
          <div class="step-media">
            <img src="/images/logo.png" alt="Review budget summary and suggestions" />
            <span class="step-badge">3</span>
          </div>
          <div class="step-content">
            <h3>Review Your Summary</h3>
            <p>Check total spent, remaining budget, and suggestions to keep your cart on track.</p>
          </div>
        </article>

        <article class="step-card reverse">
          <div class="step-media">
            <img src="/images/logo.png" alt="Complete cart and export receipt" />
            <span class="step-badge">4</span>
          </div>
          <div class="step-content">
            <h3>Complete and Save</h3>
            <p>Finalize your cart and export a clean receipt for your records.</p>
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

<style scoped>
.home-page {
  min-height: 100vh;
  padding: clamp(1rem, 2.5vw, 2rem);
  background: #ffffff;
  color: #1f2a27;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.site-nav-wrap,
.hero-banner,
.section,
.footer {
  max-width: min(1360px, 96vw);
  margin: 0 auto;
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #e6ece9;
  box-shadow: 0 8px 22px rgba(30, 56, 47, 0.07);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  font-weight: 800;
  color: #2f8b63;
}

.brand-logo {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.nav-links {
  display: inline-flex;
  gap: 1rem;
}

.nav-links a {
  text-decoration: none;
  color: #395a51;
  font-weight: 600;
}

.hero-banner {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1rem;
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: 20px;
  background: #ffffff;
  border: 1px solid #e6ece9;
  box-shadow: 0 12px 26px rgba(30, 56, 47, 0.08);
}

.eyebrow {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #57b86f;
}

.hero-banner h1 {
  margin: 0.2rem 0 0;
  font-size: clamp(1.7rem, 4.5vw, 2.85rem);
  line-height: 1.1;
  color: #1d2f2a;
}

.hero-copy {
  margin: 0.9rem 0 0;
  max-width: 70ch;
  font-size: clamp(0.98rem, 2.1vw, 1.1rem);
  line-height: 1.6;
  color: #3f5f56;
}

.hero-media {
  display: grid;
  place-items: center;
  border-radius: 16px;
  border: 1px solid #e6ece9;
  background: #fafdfb;
}

.hero-image {
  width: min(230px, 70%);
  height: auto;
  object-fit: contain;
}

.cta-row {
  margin-top: 1.2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.9rem;
}

.get-started-btn {
  border: 0;
  border-radius: 12px;
  padding: 0.82rem 1.35rem;
  background: #57b86f;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
  transition: transform 120ms ease, box-shadow 120ms ease, background-color 120ms ease;
  box-shadow: 0 8px 18px rgba(30, 123, 100, 0.22);
}

.get-started-btn:hover {
  background: #49a961;
  transform: translateY(-1px);
}

.nav-btn {
  padding: 0.62rem 1rem;
  font-size: 0.92rem;
}

.cta-note {
  margin: 0;
  font-size: 0.92rem;
  color: #4d6a62;
}

.section {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid #e6ece9;
  box-shadow: 0 7px 18px rgba(30, 56, 47, 0.06);
}

.section:last-of-type {
  margin-bottom: 0.9rem;
}

.section h2 {
  margin: 0 0 0.8rem;
  font-size: 1.24rem;
  color: #2f8b63;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.info-card {
  padding: 1rem 0.9rem;
  border-radius: 14px;
  background: #fbfdfc;
  border: 1px solid #ecf2ef;
  text-align: center;
}

.info-card i,
.about-card i {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin: 0 auto 0.6rem;
  border-radius: 999px;
  background: #eef7f3;
  font-size: 1.2rem;
  color: #57b86f;
}

.info-card h3 {
  margin: 0.2rem 0 0;
  font-size: 1rem;
  color: #3b8e69;
}

.info-card p {
  margin: 0.45rem 0 0;
  line-height: 1.45;
  color: #568872;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.about-card {
  padding: 0.55rem 0.6rem;
  border-radius: 0;
  background: transparent;
  border: 0;
  text-align: center;
}

.about-card p {
  margin: 0;
  line-height: 1.45;
  color: #568872;
}

.steps {
  display: grid;
  gap: 0.95rem;
}

.step-card {
  display: grid;
  grid-template-columns: 210px 1fr;
  gap: 1rem;
  align-items: center;
  padding: 0.85rem;
  border-radius: 14px;
  border: 1px solid #e6ece9;
  background: #fbfdfc;
}

.step-card.reverse {
  grid-template-columns: 1fr 210px;
}

.step-card.reverse .step-media {
  order: 2;
}

.step-card.reverse .step-content {
  order: 1;
}

.step-media {
  position: relative;
  display: grid;
  place-items: center;
  padding: 0.8rem;
  border-radius: 12px;
  border: 1px solid #e6ece9;
  background: #f4faf7;
}

.step-media img {
  width: min(130px, 70%);
  height: auto;
  object-fit: contain;
}

.step-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #fff;
  background: #57b86f;
}

.step-content h3 {
  margin: 0;
  color: #3b8e69;
}

.step-content p {
  margin: 0.45rem 0 0;
  color: #568872;
  line-height: 1.45;
}

.home-mobile-tabs {
  display: none;
  max-width: min(1360px, 96vw);
  margin: 0 auto;
}

@media (max-width: 980px) {
  .hero-banner {
    grid-template-columns: 1fr;
  }

  .card-grid,
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 680px) {
  .home-page {
    padding-bottom: 6.2rem;
  }

  .site-nav {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-links {
    display: none;
  }

  .hero-banner,
  .section {
    padding: 1rem;
  }

  .card-grid,
  .about-grid {
    grid-template-columns: 1fr;
  }

  .step-card,
  .step-card.reverse {
    grid-template-columns: 1fr;
  }

  .step-card.reverse .step-media,
  .step-card.reverse .step-content {
    order: initial;
  }

  .cta-row {
    align-items: stretch;
  }

  .get-started-btn {
    width: 100%;
  }

  .home-mobile-tabs {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    background: #ffffff;
    border-top: 1px solid #d9e8e1;
    z-index: 120;
  }

  .home-mobile-tab-btn {
    border: 0;
    border-bottom: 3px solid transparent;
    background: #f9fdfb;
    color: #5a7f6f;
    padding: 0.72rem 0.4rem;
    font-weight: 700;
    font-size: 0.82rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.36rem;
    cursor: pointer;
  }

  .home-mobile-tab-btn.active {
    color: #57b86f;
    border-bottom-color: #57b86f;
    background: #ffffff;
  }

  .home-mobile-tab-btn i {
    font-size: 0.86rem;
  }
}
</style>
