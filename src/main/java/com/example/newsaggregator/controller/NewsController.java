package com.example.newsaggregator.controller;

import com.example.newsaggregator.model.NewsResponse;
import com.example.newsaggregator.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NewsController {
    private final NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @GetMapping("/news")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<NewsResponse> getNews(@RequestParam(required = false) String category,
                                                @RequestParam(required = false) String keyword) {
        NewsResponse newsResponse = newsService.fetchTopHeadlines(category, keyword);

        if (newsResponse == null) {
            // Handle the case where the service returned null
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // or a custom error message
        }

        return new ResponseEntity<>(newsResponse, HttpStatus.OK);
    }
}
