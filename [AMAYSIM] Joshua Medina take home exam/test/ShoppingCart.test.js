import { ShoppingCart } from '../src/ShoppingCart.js';
import { pricingRules } from '../src/PricingRules.js';

describe('ShoppingCart', () => {
    const items = [
        {
            code: 'ult_small',
            name: 'Unlimited 1GB',
            price: 24.90
        },
        {
            code: 'ult_medium',
            name: 'Unlimited 2GB',
            price: 29.90
        },
        {
            code: 'ult_large',
            name: 'Unlimited 5GB',
            price: 44.90
        },
        {
            code: '1gb',
            name: '1 GB Data-pack',
            price: 9.90
        }
    ];
    it('should purchase 3 1GB and 1 5GB', () => {
        const cart = new ShoppingCart(pricingRules);
        cart.add(items[0]); //1GB
        cart.add(items[0]);
        cart.add(items[0]);
        cart.add(items[2]); //5GB

        expect(cart.items()).toBe('3 x Unlimited 1GB\n1 x Unlimited 5GB');
        expect(cart.total()).toBe('94.70');
    });

    it('should purchase 2 1GB and 4 5GB', () => {
        const cart = new ShoppingCart(pricingRules);
        cart.add(items[0]); //1GB
        cart.add(items[0]);
        cart.add(items[2]); //5GB
        cart.add(items[2]);
        cart.add(items[2]);
        cart.add(items[2]);

        expect(cart.items()).toBe('2 x Unlimited 1GB\n4 x Unlimited 5GB');
        expect(cart.total()).toBe('209.40');
    });

    it('should purchase 1 1GB and 2 2GB', () => {
        const cart = new ShoppingCart(pricingRules);
        cart.add(items[0]); //1GB
        cart.add(items[1]); //2GB
        cart.add(items[1]);

        expect(cart.items()).toBe('1 x Unlimited 1GB\n2 x Unlimited 2GB\n2 x 1 GB Data-pack');
        expect(cart.total()).toBe('84.70');
    });

    it('should purchase 1 1GB and 1 1 GB data-pack, with amaysim promo', () => {
        const cart = new ShoppingCart(pricingRules);
        cart.add(items[0]); //1GB
        cart.add(items[3], 'I<3AMAYSIM'); //1GB Data-pack with promocode

        expect(cart.items()).toBe('1 x Unlimited 1GB\n1 x 1 GB Data-pack');
        expect(cart.total()).toBe('31.32');
    });
});