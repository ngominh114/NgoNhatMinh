import { Router } from 'express';
import { createBook, deleteBook, getBooks, getBookWithId, updateBook } from '../controllers/book.controller';
import { validateBodyRequest } from '../middlewares/validation.middleware';
import { Book } from '../models/book';

const bookRouter = Router();

bookRouter.post("/", validateBodyRequest(Book), createBook);
bookRouter.get("/", getBooks);
bookRouter.get("/:id", getBookWithId);
bookRouter.put("/:id", validateBodyRequest(Book), updateBook);
bookRouter.delete("/:id", deleteBook);

export default bookRouter;
