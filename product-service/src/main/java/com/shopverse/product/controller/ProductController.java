package com.shopverse.product.controller;

import com.shopverse.product.dto.PaginatedResponse;
import com.shopverse.product.dto.ProductResponse;
import com.shopverse.product.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for the Product catalog.
 * Endpoints:
 *   GET /products          — paginated list (with optional ?category= filter)
 *   GET /products/{id}     — single product by ID
 *
 * Health check is handled by Spring Actuator at /actuator/health.
 */
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public PaginatedResponse<ProductResponse> getProducts(
            @RequestParam(defaultValue = "0") int offset,
            @RequestParam(defaultValue = "50") int limit,
            @RequestParam(required = false) String category) {

        return productService.getProducts(offset, limit, category);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
