import { IMovie } from './types.js';

/**
 * Класс фильма для интернет-магазина
 */
export default class Movie implements IMovie {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly author: string, // сценарист или "на основе произведения"
    public readonly duration: number, // в секундах
    public readonly director: string,
    public readonly country: string,
    public readonly year: number,
    public readonly genres: string[],
    public readonly rating?: number
  ) {}

  /**
   * Форматирует длительность в чч:мм
   */
  private formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }

  /**
   * Возвращает детальную информацию о фильме
   */
  public getDetails(): string {
    const rating = this.rating !== undefined ? `⭐ ${this.rating}` : '';
    const genres = this.genres.join(', ');
    
    return `
🎬 ${this.name}
🎭 Жанр: ${genres}
🎬 Режиссёр: ${this.director}
✍️  Сценарий: ${this.author}
🌍 Страна: ${this.country}
📅 Год: ${this.year}
⏱️  Длительность: ${this.formatDuration(this.duration)}
💰 Цена: ${this.price} ₽
${rating ? `${rating}\n` : ''}    `.trim();
  }
}