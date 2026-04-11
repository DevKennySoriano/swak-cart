# 🛒 SWAK-CART – Grocery Budget Calculator

## 📌 Overview

**SWAK-CART** is a modern, responsive grocery budget calculator built with **Vue 3** and **Vite**. Designed to help users manage their grocery shopping within a predetermined budget, SWAK-CART combines an extensive product catalog with real-time budget tracking and an intuitive user interface.

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
* 📊 **Category Breakdown** – View spending totals by product category
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
│   └── SwakCartPage.vue      # Main application component
├── composables/
│   ├── catalogData.js        # Grocery catalog dataset and category metadata
│   ├── useBudget.js          # Budget totals, utilization, and currency formatting
│   ├── useProductsCatalog.js # Catalog filtering, search, and image resolution
│   ├── useReceiptPrinter.js  # Receipt preview and PDF printing/completion flow
│   └── useSwakCart.js        # Main orchestration composable for cart behavior
├── styles/
│   ├── swak-cart-core.css        # Base layout, typography, and component styling
│   ├── swak-cart-overlays.css    # SweetAlert and overlay-specific styling
│   ├── swak-cart-responsive.css  # Mobile and tablet responsive behavior
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

### Completing & Downloading Receipt
1. Click **Complete Cart** (enabled only when cart is not over budget)
2. Confirm to open the receipt preview
3. Review the receipt in the preview modal
4. Click **Print & Complete** to download the PDF and complete the cart
5. A confirmation modal appears after completion

### Viewing Spending Breakdown
* Budget Usage bar shows your spending percentage
* Category Totals section displays spending by product type
* Real-time alerts when over budget

---

## 🧑‍💻 Technology Stack

* **Vue 3** – Modern reactive UI framework
* **Vite** – Lightning-fast build tool and dev server
* **Font Awesome** – Icon set used for categories and actions
* **SweetAlert2** – Beautiful modals and notifications
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
