import { Like } from "typeorm";
import { AppDataSource } from "../database/database";
import { BookQueryDto } from "../dto/book-query.dto";
import { Book } from "../models/book";

export class BookService {
    private repository = AppDataSource.getRepository(Book);

    async create(book: Partial<Book>): Promise<Book> {
        const newBook = this.repository.create(book);
        return await this.repository.save(newBook);
    }

    async get(query: BookQueryDto): Promise<Book[]> {
        const filter: any = {};

        if (query.name) filter.name = Like(`%${query.name}%`);
        if (query.authorName) filter.authorName = Like(`%${query.authorName}%`);
        if (query.description) filter.description = Like(`%${query.description}%`);
        
        if (Object.keys(filter).length === 0) {
            return await this.repository.find();
        }
        return await this.repository.find({ where: filter });
    }

    async getById(id: number): Promise<Book | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async update(id: number, data: Partial<Book>): Promise<Book | null> {
        await this.repository.update(id, data);
        return await this.getById(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}