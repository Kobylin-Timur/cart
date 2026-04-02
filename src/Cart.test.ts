import Cart from './Cart.js';
import Movie from './Movie.js';

describe('Cart', () => {
  let cart: Cart;
  let movie1: Movie;
  let movie2: Movie;

  beforeEach(() => {
    cart = new Cart();
    movie1 = new Movie(1, 'Фильм 1', 100, 'Автор', 5400, 'Реж', 'Страна', 2023, ['драма']);
    movie2 = new Movie(2, 'Фильм 2', 200, 'Автор', 7200, 'Реж', 'Страна', 2023, ['комедия']);
  });

  test('add: добавляет товар с количеством 1 по умолчанию', () => {
    cart.add(movie1);
    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getItems()[0].quantity).toBe(1);
  });

  test('add: суммирует количество при повторном добавлении', () => {
    cart.add(movie1, 2);
    cart.add(movie1, 3);
    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getItems()[0].quantity).toBe(5);
  });

  test('total: возвращает 0 для пустой корзины', () => {
    expect(cart.total()).toBe(0);
  });

  test('total: считает сумму товаров', () => {
    cart.add(movie1, 2); // 200
    cart.add(movie2, 1); // 200
    expect(cart.total()).toBe(400);
  });

  test('totalWithDiscount: применяет скидку корректно', () => {
    cart.add(movie1, 2); // 200
    expect(cart.totalWithDiscount(10)).toBe(180);
    expect(cart.totalWithDiscount(100)).toBe(0);
  });

  test('totalWithDiscount: бросает ошибку при скидке < 0', () => {
    expect(() => cart.totalWithDiscount(-1)).toThrow('Discount must be between 0 and 100');
  });

  test('totalWithDiscount: бросает ошибку при скидке > 100', () => {
    expect(() => cart.totalWithDiscount(101)).toThrow('Discount must be between 0 and 100');
  });

  test('remove: удаляет существующий товар и возвращает true', () => {
    cart.add(movie1);
    expect(cart.remove(movie1.id)).toBe(true);
    expect(cart.getItems()).toHaveLength(0);
  });

  test('remove: возвращает false для несуществующего товара', () => {
    expect(cart.remove(999)).toBe(false);
  });

  test('clear: полностью очищает корзину', () => {
    cart.add(movie1, 3);
    cart.clear();
    expect(cart.getUniqueCount()).toBe(0);
    expect(cart.getTotalQuantity()).toBe(0);
  });

  test('getAll: возвращает массив продуктов', () => {
    cart.add(movie1);
    cart.add(movie2);
    const products = cart.getAll();
    expect(products).toHaveLength(2);
    expect(products[0].name).toBe('Фильм 1');
  });

  test('getUniqueCount и getTotalQuantity работают корректно', () => {
    cart.add(movie1, 3);
    cart.add(movie2, 2);
    expect(cart.getUniqueCount()).toBe(2);
    expect(cart.getTotalQuantity()).toBe(5);
  });
});