package com.shopverse.product.repository;

import com.shopverse.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository.
 * JpaRepository gives us findAll(Pageable), findById, count, etc. for free.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * Find products by category with pagination.
     */
    Page<Product> findByCategory(String category, Pageable pageable);
}
