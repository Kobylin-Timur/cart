import { IProduct } from './types.js';

/**
 * Элемент корзины: товар + количество
 */
interface CartItem {
  product: IProduct;
  quantity: number;
}

/**
 * Корзина покупок
 */
export default class Cart {
  private items: Map<number, CartItem> = new Map();

  /**
   * Добавляет товар в корзину
   * @param product - товар для добавления
   * @param quantity - количество (по умолчанию 1)
   */
  public add(product: IProduct, quantity: number = 1): void {
    const existing = this.items.get(product.id);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.set(product.id, { product, quantity });
    }
  }

  /**
   * Возвращает все товары в корзине
   */
  public getAll(): IProduct[] {
    return Array.from(this.items.values()).map(item => item.product);
  }

  /**
   * Возвращает элементы корзины с количеством
   */
  public getItems(): CartItem[] {
    return Array.from(this.items.values());
  }

  /**
   * Считает суммарную стоимость без скидки
   * @returns {number} общая сумма в рублях
   */
  public total(): number {
    let sum = 0;
    for (const { product, quantity } of this.items.values()) {
      sum += product.price * quantity;
    }
    return sum;
  }

  /**
   * Считает суммарную стоимость с учётом скидки
   * @param discount - скидка в процентах (0-100)
   * @returns {number} итоговая сумма после скидки
   */
  public totalWithDiscount(discount: number): number {
    if (discount < 0 || discount > 100) {
      throw new Error('Discount must be between 0 and 100');
    }
    const originalTotal = this.total();
    return originalTotal * (1 - discount / 100);
  }

  /**
   * Удаляет товар из корзины по id
   * @param id - идентификатор товара
   * @returns {boolean} true если товар был удалён, false если не найден
   */
  public remove(id: number): boolean {
    return this.items.delete(id);
  }

  /**
   * Очищает корзину
   */
  public clear(): void {
    this.items.clear();
  }

  /**
   * Возвращает количество уникальных товаров
   */
  public getUniqueCount(): number {
    return this.items.size;
  }

  /**
   * Возвращает общее количество единиц товаров
   */
  public getTotalQuantity(): number {
    let count = 0;
    for (const { quantity } of this.items.values()) {
      count += quantity;
    }
    return count;
  }
}