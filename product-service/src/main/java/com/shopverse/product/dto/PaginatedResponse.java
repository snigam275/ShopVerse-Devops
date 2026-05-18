package com.shopverse.product.dto;

import java.util.List;

/**
 * Generic paginated response envelope.
 * Prevents unbounded GET /products from returning billions of rows (Failure Audit F1).
 */
public record PaginatedResponse<T>(
        List<T> products,
        long total,
        int limit,
        int offset
) {}
