import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

export function useTutorial(options = {}) {
  const setMobileTab = typeof options.setMobileTab === 'function' ? options.setMobileTab : null

  function isMobileViewport() {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(max-width: 540px)').matches
  }

  function getDesktopSteps() {
    return [
      {
        element: '#tutorial-header',
        popover: {
          title: 'Welcome to SWAK-CART',
          description: 'This quick tour shows you how to budget, browse products, and complete your cart.',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#budget-input',
        popover: {
          title: 'Set Your Budget',
          description: 'Enter your spending limit here so you can track your remaining budget in real time.',
          side: 'left',
          align: 'start'
        }
      },
      {
        element: '#product-search',
        popover: {
          title: 'Search Products',
          description: 'Use this search bar to quickly locate an item or filter by category.',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#category-filter-toggle',
        popover: {
          title: 'Category Filter',
          description: 'Open the dropdown to narrow products by category and save space on the screen.',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#manual-add-btn',
        popover: {
          title: 'Add Manually',
          description: 'If a product is not listed, use this button to add a custom item to your cart.',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#cart-panel',
        onHighlightStarted: () => {
          if (setMobileTab) {
            setMobileTab('cart')
          }
        },
        popover: {
          title: 'Review Your Cart',
          description: 'Check quantities, edit prices, and see how much of your budget has been used.',
          side: 'left',
          align: 'start'
        }
      },
      {
        element: '#complete-cart-btn',
        popover: {
          title: 'Finish Checkout',
          description: 'When you are ready, complete your cart to finalize the purchase flow and generate a receipt.',
          side: 'top',
          align: 'end'
        }
      }
    ]
  }

  function getMobileSteps() {
    return [
      {
        element: '#tutorial-header',
        popover: {
          title: 'Welcome to SWAK-CART',
          description: 'On mobile, the app is split into Products and Cart tabs. This tour shows how to move between them.',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#mobile-products-tab-btn',
        popover: {
          title: 'Products Tab',
          description: 'This tab keeps the product list visible while giving you more room on the screen.',
          side: 'top',
          align: 'center'
        }
      },
      {
        element: '#product-search',
        popover: {
          title: 'Search Products',
          description: 'Search items quickly, then use the category dropdown to narrow your results.',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#category-filter-toggle',
        popover: {
          title: 'Category Filter',
          description: 'Open this dropdown to sort products without taking up extra space.',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#manual-add-btn',
        popover: {
          title: 'Add Manually',
          description: 'If a product is missing, use this button to add it yourself.',
          side: 'bottom',
          align: 'start'
        }
      },
      {
        element: '#mobile-cart-tab-btn',
        onHighlightStarted: () => {
          if (setMobileTab) {
            setMobileTab('cart')
          }
        },
        popover: {
          title: 'Cart Tab',
          description: 'Tap this tab when you want to review your budget, totals, and cart items.',
          side: 'top',
          align: 'center'
        }
      },
      {
        element: '#cart-panel',
        onHighlightStarted: () => {
          if (setMobileTab) {
            setMobileTab('cart')
          }
        },
        popover: {
          title: 'Review Your Cart',
          description: 'Check quantities, edit prices, and see how much of your budget has been used before you finish checkout.',
          side: 'left',
          align: 'start'
        }
      },
      {
        element: '#budget-input',
        popover: {
          title: 'Set Your Budget',
          description: 'This is where you enter your budget on mobile once you switch to the Cart tab.',
          side: 'left',
          align: 'start'
        }
      },
      {
        element: '#complete-cart-btn',
        popover: {
          title: 'Finish Checkout',
          description: 'Complete the cart when everything looks good and you are ready to generate a receipt.',
          side: 'top',
          align: 'end'
        }
      }
    ]
  }

  const tutorialDriver = driver({
    showProgress: true,
    animate: true,
    allowClose: true,
    overlayOpacity: 0.65,
    steps: isMobileViewport() ? getMobileSteps() : getDesktopSteps()
  })

  function showTutorial() {
    if (setMobileTab) {
      setMobileTab('products')
    }

    tutorialDriver.drive()
  }

  return { showTutorial }
}