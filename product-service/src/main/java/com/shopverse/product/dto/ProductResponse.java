package com.shopverse.product.dto;

import com.shopverse.product.model.Product;

import java.util.List;

/**
 * Immutable response DTO. Uses Java record for zero-boilerplate.
 * Maps from the JPA Product entity via the static factory method.
 */
public record ProductResponse(
        Long id,
        String name,
        String category,
        Double price,
        Double originalPrice,
        Double rating,
        Integer reviews,
        String image,
        List<String> images,
        String description,
        List<String> highlights,
        String badge,
        String brand,
        String material,
        String weight,
        String warranty
) {
    /**
     * Factory method: Entity → DTO.
     */
    public static ProductResponse from(Product p) {
        return new ProductResponse(
                p.getId(), p.getName(), p.getCategory(),
                p.getPrice(), p.getOriginalPrice(),
                p.getRating(), p.getReviews(),
                p.getImage(), p.getImages(),
                p.getDescription(), p.getHighlights(),
                p.getBadge(), p.getBrand(), p.getMaterial(),
                p.getWeight(), p.getWarranty()
        );
    }
}
