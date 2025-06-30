package com.example.newsaggregator.service;

import com.example.newsaggregator.model.NewsResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class NewsService {
    private final RestTemplate restTemplate;

    public NewsService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public NewsResponse fetchTopHeadlines(String category, String keyword) {
        String apiKey = "e2d0208dae314381af19c1de889023eb"; // Your News API key
        StringBuilder url = new StringBuilder("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + apiKey);

        // Append category if provided
        if (category != null && !category.isEmpty()) {
            url.append("&category=").append(category);
        }

        // Append keyword if provided
        if (keyword != null && !keyword.isEmpty()) {
            url.append("&q=").append(keyword);
        }

        try {
            return restTemplate.getForObject(url.toString(), NewsResponse.class);
        } catch (RestClientException e) {
            // Log the error (you can use a logging framework)
            System.err.println("Error fetching news: " + e.getMessage());
            return null; // Or you can throw a custom exception
        }
    }
}
