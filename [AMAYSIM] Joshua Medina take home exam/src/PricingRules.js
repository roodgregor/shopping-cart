/*
    Assumptions:
    - new/updates to promos will follow the pattern of having any of:
        - fixedQuantity (3 for 2, 2 for 1, etc.)
        - minQuantity (discount min of 4 purchase etc.)
        - addItem (adding an item)
        - discount (applying a discount)
    - These actions are the first property of the pricing rule object
 */

export const pricingRules = {
    // 3 for 2 deal on Unlimited 1GBs
    // applies for fixedQuantity of 3
  "Unlimited 1GB": {
    fixedQuantity: 3,
    price: 49.80,
  },

  // Bulk discount on Unlimited 5GBs; more than 3
  "Unlimited 5GB": {
    minQuantity: 4,
    price: 39.90,
  },

  // Free 1 GB Data-pack with Unlimited 2GBs
  "Unlimited 2GB": {
    addItem: {
      code: '1gb'
    },
  },

  // 10% discount with promo code 'I<3AMAYSIM'
  "I<3AMAYSIM": {
    discount: 0.1, //assume to decrease 0.1 or 10% to total price
  },
};