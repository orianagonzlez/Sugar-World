export interface Product {
    $key?: string;
    name: string;
    category: string;
    description: string;
    image?: string;
    quantity: number;
    price: number;
    isFavorite: boolean;
}
