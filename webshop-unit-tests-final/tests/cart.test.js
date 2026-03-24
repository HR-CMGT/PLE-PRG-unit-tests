import { describe, it, expect, beforeEach } from 'vitest';
import { ShoppingCart, ShoppingCartItem, DiscountResult } from '../js/cart.js';
import { Product } from '../js/product.js';

describe('ShoppingCart', () => {
    /** @type {ShoppingCart} */
    let cart;

    /** @type {Product} */
    let product1;

    /** @type {Product} */
    let product2;

    beforeEach(() => {
        cart = new ShoppingCart();
        product1 = new Product(1, 'Laptop', 1000, '💻');
        product2 = new Product(2, 'Mouse', 50, '🖱️');
    });

    describe('1. addItem', () => {
        it('1.1. adds a new product with quantity 1', () => {
            cart.addItem(product1);

            expect(cart.getItems()).toHaveLength(1);
            expect(cart.getItems()[0]).toBeInstanceOf(ShoppingCartItem);
            expect(cart.getItems()[0].product).toBeInstanceOf(Product);
            expect(cart.getItems()[0].product).toBe(product1);
            expect(cart.getItems()[0].quantity).toBe(1);
        });

        it('1.2. increases quantity if the product already exists', () => {
            cart.addItem(product1);
            cart.addItem(product1);
            expect(cart.getItems()).toHaveLength(1);
            expect(cart.getItems()[0].quantity).toBe(2);
            expect(cart.getItems().length).toBe(1);
        });
        it('1.3. throws an error if null is passed as item', () => {
            expect(() => cart.addItem(null)).toThrow("Item must be an instance of Product.");
        });
    });

    describe('2. decreaseQuantity', () => {
        it('2.1. removes the product if the quantity reaches 0', () => {
            cart.addItem(product1);
            cart.decreaseQuantity(product1);
            expect(cart.getItems()).toHaveLength(0);
        });
        it('2.2. decreases the quantity of an existing product (quantity >1)', () => {
            cart.addItem(product1);
            cart.addItem(product1);
            cart.decreaseQuantity(product1);
            expect(cart.getItems()[0].quantity).toBe(1);
        });

        it('2.3. Does nothing if null is passed', () => {
            cart.decreaseQuantity(null);
            expect(cart.getItems()).toHaveLength(0);
        });
        it('2.4. When a product is passed that is not in de ShoppingCart', () => {
            cart.addItem(product1);
            expect(() => cart.decreaseQuantity(product2)).toThrow("This product is not in the ShoppingCart");
        });
    });

    describe('applyDiscountCode', () => {
        it('applies a valid discount code and returns success', () => {
            const result = cart.applyDiscountCode('KORTING10');
            expect(result).toBeInstanceOf(DiscountResult);
            expect(result.success).toBe(true);
            expect(cart.discountStatus.active).toBe(true);
            expect(cart.discountStatus.percentage).toBe(10);
            expect(cart.discountStatus.code).toBe('KORTING10');
        });

        it('applies a valid discount code case-insensitively', () => {
            const result = cart.applyDiscountCode('super20');
            expect(result).toBeInstanceOf(DiscountResult);
            expect(result.success).toBe(true);
            expect(cart.discountStatus.percentage).toBe(20);
        });

        it('returns failure for an invalid discount code', () => {
            const result = cart.applyDiscountCode('INVALID50');
            expect(result).toBeInstanceOf(DiscountResult);
            expect(result.success).toBe(false);
            expect(cart.discountStatus.active).toBe(false);
        });
    });

    describe('removeDiscountCode', () => {
        it('resets the discount status', () => {
            cart.applyDiscountCode('WEBSHOP50');
            cart.removeDiscountCode();
            expect(cart.discountStatus.active).toBe(false);
            expect(cart.discountStatus.percentage).toBe(0);
            expect(cart.discountStatus.code).toBe('');
        });
    });

    describe('Calculations (Subtotal, DiscountAmount, Total)', () => {
        beforeEach(() => {
            cart.addItem(product1); // 1000
            cart.addItem(product1); // +1000
            cart.addItem(product2); // +50
            // Subtotal = 2050
        });

        it('calculates subtotal correctly', () => {
            expect(cart.getSubtotal()).toBe(2050);
        });

        it('calculates discount amount correctly with an active code', () => {
            cart.applyDiscountCode('KORTING10'); // 10%
            expect(cart.getDiscountAmount()).toBe(205);
        });

        it('returns 0 for discount amount if no active code', () => {
            expect(cart.getDiscountAmount()).toBe(0);
        });

        it('calculates total correctly without discount', () => {
            expect(cart.getTotal()).toBe(2050);
        });

        it('calculates total correctly with discount', () => {
            cart.applyDiscountCode('SUPER20'); // 20%
            // 20% of 2050 = 410. Total = 2050 - 410 = 1640
            expect(cart.getTotal()).toBe(1640);
        });
    });
});
