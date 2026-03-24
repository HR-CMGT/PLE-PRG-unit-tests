export class Product {

    /**
     * Creates a new instance of the Product class.
     * @param {number} id - The unique identifier of the product.
     * @param {string} name - The name of the product.
     * @param {number} price - The price of the product.
     * @param {string} icon - The icon of the product.
     */
    constructor(id, name, price, icon) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.icon = icon;
    }
}