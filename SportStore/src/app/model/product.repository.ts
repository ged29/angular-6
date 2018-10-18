import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { StaticDataSource } from "./static.datasource";

@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private categories: string[] = [];

    constructor(dataSource: StaticDataSource) {
        dataSource.getProducts().subscribe(products => {
            this.products = products;
            this.categories = products
                .map(product => product.category)
                .filter((cat, index, array) => array.indexOf(cat) === index)
                .sort();
        });
    }

    getProducts(category: string = null): Product[] {
        return this.products.filter(product => category === null || product.category === category);
    }

    getProduct(id: number): Product {
        return this.products.find(product => product.id === id);
    }

    getCategories(): string[] {
        return this.categories;
    }
}