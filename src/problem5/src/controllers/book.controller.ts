import { BookService } from "../services/book.service";
import { Book } from "../models/book";
import { Request, Response } from "express";
import { plainToInstance } from 'class-transformer';
import { BookQueryDto } from "../dto/book-query.dto";

const bookService = new BookService();

export async function createBook(req: Request, res: Response) {
    try {
        const book: Book = req.body;
        const createdUser = await bookService.create(book);
        res.status(201).json(createdUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getBooks(req: Request, res: Response) {
    try {
        const queryDto = plainToInstance(BookQueryDto, req.query);
        console.log(queryDto);
        const books = await bookService.get(queryDto);
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function getBookWithId(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: "id should be number!" });
        }
        const book = await bookService.getById(id);
        if (!book) {
            res.status(404).json({ message: `Book with ID ${id} not found.` });
        } else {
            res.status(200).json(book);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function updateBook(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "id should be number!" });
        }

        const book: Partial<Book> = req.body;
        const updatedBook = await bookService.update(id, book);

        if (!updatedBook) {
            res.status(404).json({ message: `Book with ID ${id} not found.` });
        } else {
            res.status(204).json(updatedBook);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function deleteBook(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: "id should be number!" });
        }

        const book = await bookService.getById(id);
        if (!book) {
            res.status(404).json({ message: `Book with ID ${id} not found.` });
        } else {
            await bookService.delete(id);
            res.status(204).send();
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}