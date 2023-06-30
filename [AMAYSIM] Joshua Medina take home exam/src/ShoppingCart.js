export class ShoppingCart {
    constructor(pricingRules) {
        //Array of PricingRules.js
        this.pricingRules = pricingRules;
        this.cartItems = {
            'ult_small': {
                name: 'Unlimited 1GB',
                price: 24.90,
                quantity: 0
            },
            'ult_medium': {
                name: 'Unlimited 2GB',
                price: 29.90,
                quantity: 0
            },
            'ult_large': {
                name: 'Unlimited 5GB',
                price: 44.90,
                quantity: 0
            },
            '1gb': {
                name: '1 GB Data-pack',
                price: 9.90,
                quantity: 0
            }
        };
        this.totalPrice = 0.00;
        this.discount = 1; //defaulting to 1 so it multiplies by itself if no promocode is used.
    }
    
    add = function(item, promoCode) {
        //item properties - code, name, pric
        //add to item list
        this.cartItems[item.code].quantity++;

        if(this.pricingRules[item.name] && Object.keys(this.pricingRules[item.name])[0] === 'addItem') {
            let newItem = this.pricingRules[item.name].addItem.code;
            this.cartItems[newItem].quantity++;
            
            //presubtract the price of the free object so it doesn't interfere later on
            this.totalPrice -= this.cartItems[newItem].price;
        }

        if(promoCode && this.pricingRules.hasOwnProperty(promoCode)) {
            this.discount -= this.pricingRules[promoCode].discount;
        }
    }
    
    total = function() {
        let activeTotal = this.totalPrice;
        for(let cartItem in this.cartItems) {
            //check if item has a pricing rule
            let curr = this.cartItems[cartItem];
            if(this.pricingRules.hasOwnProperty(curr.name)) {
                //get rule effect
                let rule = this.pricingRules[curr.name];
    
                //minQuantity, fixedQuantity, addItem
                let action = Object.keys(rule)[0];
    
                switch(action) {
                    case 'minQuantity': {
                        let minQuantity = rule.minQuantity;
                        if(curr.quantity >= minQuantity) {
                            activeTotal += rule.price * curr.quantity;
                        } else {
                            activeTotal += curr.price * curr.quantity;
                        }
                        break;
                    }
                    case 'fixedQuantity': {
                        let fixedQuantity = rule.fixedQuantity;
                        if(curr.quantity >= fixedQuantity) {
                            for(let x = fixedQuantity; x <= curr.quantity; x+=fixedQuantity) {
                                activeTotal += rule.price;
                            }
                        } else {
                            activeTotal += curr.price * curr.quantity;
                        }
                        break;
                    }
                    default: {
                        activeTotal += curr.price * curr.quantity;
                    };
                }
            } else {
                activeTotal += curr.price * curr.quantity;
            }
        }
        return (activeTotal * this.discount).toFixed(2);
    }
    
    items = function() {
        let summaryString = '';
        for(let cartItem in this.cartItems) {
            if(this.cartItems[cartItem].quantity === 0) continue;
            summaryString += this.cartItems[cartItem].quantity + ' x ' + this.cartItems[cartItem].name + '\n';
        }
        return summaryString.trim();
    }
}