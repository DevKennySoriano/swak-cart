# 🛒 SWAK-CART – Your Grocery Companion

## 📌 Overview

**SWAK-CART** is your grocery companion: a modern, responsive web app built with **Vue 3** and **Vite** to help you shop smarter and stay within budget. It combines an extensive product catalog, real-time budget tracking, and clear suggestions before checkout.

No download required. No account required. Open and use instantly in your browser.

The application enables users to:

* Set and track a grocery budget
* Browse and search from an extensive catalog of grocery items
* Add products to a cart with custom pricing
* Add items manually if not found in the catalog
* Track real-time spending and remaining budget
* View category-based spending breakdown
* Manage cart items with full edit capabilities

---

## 🧩 Features

* 📱 **Fully Responsive Design** – Optimized for desktop, tablet, and mobile devices
* 🔍 **Smart Search & Filtering** – Find products by name or category instantly
* 🛍️ **Extensive Catalog** – 100+ grocery items across 12+ categories
* ➕ **Manual Product Entry** – Add custom items not found in the catalog
* 💰 **Real-Time Budget Tracking** – Live spending and remaining budget calculations
* 💡 **Budget Suggestions** – When over budget, see which items to remove to recover the overspent amount; when budget remains, get smart product recommendations
* 📊 **Category Breakdown** – View spending totals by product category
* 🧭 **Guided App Tutorial** – Driver.js walkthrough for desktop and mobile flows
* 🎨 **Modal & Toast Notifications** – SweetAlert2-powered confirmations and feedback
* 🧾 **Receipt Preview & PDF Export** – Preview before completion, then download a print-friendly receipt
* 🖨️ **Print-Friendly Receipt Layout** – Black-and-white standard format with item count, Sub-total, Discount, VAT/TAX, and Total
* ✅ **Smart Completion Rules** – Complete Cart is disabled when over budget or when cart is empty
* ✨ **Smooth User Experience** – Professional animations and clean UI
* 🖼️ **Product Images** – Real product images with fallback placeholders
* 🔄 **Editable Cart** – Modify prices and quantities on the fly

---

## 📂 Project Structure

```
public/
├── images/
│   ├── logo.png              # SWAK-CART logo
│   ├── icons/                # Social and branding icons
│   └── products/             # Product images (100+ items)
src/
├── components/
│   ├── PageLoader.vue        # Initial loading animation component
│   └── SwakCartPage.vue      # Main application component
├── composables/
│   ├── catalogData.js        # Grocery catalog dataset and category metadata
│   ├── useBudget.js          # Budget totals, utilization, and currency formatting
│   ├── useProductsCatalog.js # Catalog filtering, search, and image resolution
│   ├── useReceiptPrinter.js  # Receipt preview and PDF printing/completion flow
│   ├── useSwakCart.js        # Main orchestration composable for cart behavior
	│   ├── useSuggestion.js      # Cart-aware budget suggestion logic
│   └── useTutorial.js        # Driver.js tutorial steps and mobile tab sync behavior
├── styles/
│   ├── swak-cart-core.css        # Base layout, typography, and component styling
│   ├── swak-cart-overlays.css    # SweetAlert and overlay-specific styling
│   ├── swak-cart-responsive.css  # Mobile and tablet responsive behavior
│   ├── swak-cart-tutorial.css    # Tutorial popover and coach-mark styling
│   └── swak-cart.css             # Style entrypoint that imports all style layers
├── App.vue                   # Root component
└── main.js                   # Application entry point
.vscode/
├── extensions.json           # Recommended extensions
└── settings.json             # Workspace editor settings
.gitignore                    # Git ignore rules
index.html                    # HTML entry point
jsconfig.json                 # JavaScript project configuration
package.json                  # Dependencies and scripts
package-lock.json             # Dependency lockfile
vite.config.js               # Vite configuration
```

---

## 🛠️ Installation & Setup

### Prerequisites

* **Node.js:** `^20.19.0` or `>=22.12.0`
* **npm:** comes with Node.js

```bash
# Clone the repository
git clone https://github.com/DevKennySoriano/swak-cart

# Navigate into the project directory
cd swak-cart

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Available Scripts

```bash
npm run dev      # Start local dev server
npm run build    # Create production build in dist/
npm run preview  # Preview production build locally
```

---

## 📖 Usage

### Setting Your Budget
1. Enter your grocery budget in PHP at the top of the sidebar
2. The app calculates spending in real-time as you add items

### Browsing Products
1. Use the **Search** bar to find specific items
2. Click category chips to filter by type (Rice, Meat, Vegetables, etc.)
3. Click **Add to Cart** on any product card

### Adding Items Manually
1. Click the **Add Manually** button in the Product List header
2. Fill in product name, category, price, and quantity
3. The app checks for duplicates before adding

### Managing Your Cart
1. Click **Edit** in the cart panel to modify items
2. Adjust prices and quantities as needed
3. Click **Remove** to delete items
4. Click **Done** to finish editing

### Budget Suggestions
The suggestion card appears directly below **Budget Usage** in the sidebar (when applicable):
* **Over Budget:** Shows the cart item(s) you can remove to recover the overspent amount
* **Budget Remaining:** When the cart has 2+ items and budget is left, suggests common essential products not yet in your cart

#### How Suggestions Are Calculated

**Over-Budget Removal Plan:**
- Uses a backtracking algorithm to find the minimal set of cart items whose combined cost matches or exceeds the overspent amount
- Prioritizes: lowest overshoot → fewest items → lowest total cost
- Example: If over budget by ₱120, it suggests removing item(s) that total at least ₱120 but minimizes wasted savings

**Budget-Remaining Recommendations:**
- Filters products to only `common: true` items not already in the cart
- Scores each product based on tags and utility:
  - Staple items (rice, eggs, flour): +60 points
  - Ulam / main dishes (meat, fish): +45 points
  - Breakfast items (bread, tuyo): +35 points
  - Other tags (healthy, quick): +20–25 points
  - Common item baseline: +40 points
- Surfaces the 4 highest-scoring products with reason descriptions

### Completing & Downloading Receipt
1. Click **Complete Cart** (enabled only when cart is not over budget)
2. Confirm to open the receipt preview
3. Review the receipt in the preview modal
4. Click **Print & Complete** to download the PDF and complete the cart
5. A confirmation modal appears after completion

### Viewing Spending Breakdown
* **Budget Usage bar** – Shows your spending percentage and progress
* **Suggestion card** – Over-budget removal plans and essential product recommendations
* **Category Totals** – Spending breakdown by product category
* **Real-time alerts** – Warning when cart exceeds budget

### Guided Tutorial (Desktop & Mobile)
1. Click the help icon in the page header to launch the in-app tour
2. Desktop tour walks through budget entry, product discovery, and cart completion
3. Mobile tour guides Products and Cart tabs with automatic tab switching per step
4. On mobile, **Set Your Budget** appears before **Review Your Cart** in the tutorial flow
5. Previous/Next now keeps the correct tab in view while moving between tutorial steps

---

## 🧑‍💻 Technology Stack

* **Vue 3** – Modern reactive UI framework
* **Vite** – Lightning-fast build tool and dev server
* **Font Awesome** – Icon set used for categories and actions
* **SweetAlert2** – Beautiful modals and notifications
* **Driver.js** – Interactive guided walkthrough/tutorial engine
* **jsPDF** – Client-side PDF generation
* **jspdf-autotable** – Structured table generation for receipts
* **CSS3** – Responsive design with flexbox and grid
* **JavaScript (ES6+)** – Composition API for state management

---

## 📈 Performance & Best Practices

* ⚡ Component-based architecture with Vue Composition API
* 🎯 Modular state/composable architecture for maintainable feature boundaries
* 📦 Optimized asset loading and caching
* 🎨 Clean, maintainable, and documented codebase
* 📱 Mobile-first responsive design approach
* ♿ Accessible form controls and labels

---

## 🌍 Deployment

The application is ready for deployment on:

* **Vercel** (Recommended)
* **Netlify**
* **GitHub Pages**

### Build for Production

```bash
npm run build
```

This generates an optimized build in the `dist/` folder.

---

## 📸 Key Screens

* **Product List** – Browse and search grocery items with category filtering
* **Budget Summary** – Real-time spending, remaining budget, and progress indicator
* **Cart Management** – View, edit, and remove items with pricing flexibility
* **Mobile View** – Tab-based navigation between Products and Cart sections

---

## 🐛 Reporting Issues

Found a bug or have a feature request? Please open an issue on GitHub or contact me directly.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📬 Contact & Social Links

* 💼 **LinkedIn:** [https://www.linkedin.com/in/kennysoriano/](https://www.linkedin.com/in/kennysoriano/)
* 🐙 **GitHub:** [https://github.com/DevKennySoriano](https://github.com/DevKennySoriano)
* 🌐 **Portfolio:** [https://devkennysoriano.vercel.app/](https://devkennysoriano.vercel.app/)
* ✉️ **Email:** [devkennysoriano@gmail.com](mailto:devkennysoriano@gmail.com)

---

## 📝 License

This project is open source and available under the MIT License.

---

**Made with ❤️ by [Kenny Soriano](https://devkennysoriano.vercel.app/)**
