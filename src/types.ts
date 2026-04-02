/**
 * Базовый интерфейс для всех товаров
 */
export interface IProduct {
  id: number;
  name: string;
  price: number;
  getDetails(): string;
}

/**
 * Интерфейс для товаров с автором/исполнителем
 */
export interface IAuthorProduct extends IProduct {
  author: string;
}

/**
 * Интерфейс для медиа-товаров с длительностью
 */
export interface IMediaProduct extends IAuthorProduct {
  duration: number; // в секундах
}

/**
 * Интерфейс для фильма с дополнительной информацией
 */
export interface IMovie extends IMediaProduct {
  director: string;
  country: string;
  year: number;
  rating?: number; // опционально, как на КиноПоиск
  genres: string[];
}