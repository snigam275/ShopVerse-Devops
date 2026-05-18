package com.shopverse.product.service;

import com.shopverse.product.dto.PaginatedResponse;
import com.shopverse.product.dto.ProductResponse;
import com.shopverse.product.model.Product;
import com.shopverse.product.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Business logic layer for products.
 * Caps limit at MAX_PAGE_SIZE to prevent unbounded queries (Failure Audit F1).
 */
@Service
public class ProductService {

    private static final Logger log = LoggerFactory.getLogger(ProductService.class);
    private static final int MAX_PAGE_SIZE = 100;

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    /**
     * Get paginated products, optionally filtered by category.
     * Limit is capped at 100 server-side regardless of client request.
     */
    public PaginatedResponse<ProductResponse> getProducts(int offset, int limit, String category) {
        // Cap limit at MAX_PAGE_SIZE (Failure Audit F1)
        int cappedLimit = Math.min(Math.max(limit, 1), MAX_PAGE_SIZE);
        int pageNumber = offset / cappedLimit;

        Pageable pageable = PageRequest.of(pageNumber, cappedLimit);
        Page<Product> page;

        if (category != null && !category.isBlank()) {
            page = repository.findByCategory(category.toLowerCase(), pageable);
            log.info("Fetched {} products for category '{}' (page {}, size {})",
                    page.getNumberOfElements(), category, pageNumber, cappedLimit);
        } else {
            page = repository.findAll(pageable);
            log.info("Fetched {} products (page {}, size {})",
                    page.getNumberOfElements(), pageNumber, cappedLimit);
        }

        List<ProductResponse> dtos = page.getContent().stream()
                .map(ProductResponse::from)
                .toList();

        return new PaginatedResponse<>(dtos, page.getTotalElements(), cappedLimit, offset);
    }

    /**
     * Get a single product by ID.
     */
    public Optional<ProductResponse> getProductById(Long id) {
        return repository.findById(id).map(ProductResponse::from);
    }
}
