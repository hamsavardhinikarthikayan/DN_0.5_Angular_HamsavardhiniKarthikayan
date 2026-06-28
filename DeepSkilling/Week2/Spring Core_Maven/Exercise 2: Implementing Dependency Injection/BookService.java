package com.library.service;

import com.library.repository.BookRepository;

public class BookService {

    private BookRepository bookRepository;

    public BookService() {
        System.out.println("BookService object created");
    }

    // Setter Method
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void service() {
        System.out.println("Book Service Working");
        bookRepository.display();
    }
}