package com.shopverse.product;

import com.shopverse.product.dto.PaginatedResponse;
import com.shopverse.product.dto.ProductResponse;
import com.shopverse.product.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Unit tests for ProductController using MockMvc.
 * Uses @WebMvcTest (loads only the web layer, no DB).
 */
@WebMvcTest
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ProductService productService;

    private ProductResponse sampleProduct() {
        return new ProductResponse(
                1L, "Test Headphones", "electronics",
                4999.0, 7999.0, 4.8, 342,
                "https://example.com/img.jpg",
                List.of("https://example.com/img.jpg"),
                "Great headphones", List.of("Noise Cancelling"),
                "Best Seller", "TestBrand", "Plastic", "250g", "2 Years"
        );
    }

    @Test
    void getProducts_returnsPaginatedResponse() throws Exception {
        var response = new PaginatedResponse<>(List.of(sampleProduct()), 1L, 50, 0);
        when(productService.getProducts(anyInt(), anyInt(), any())).thenReturn(response);

        mockMvc.perform(get("/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.total").value(1))
                .andExpect(jsonPath("$.limit").value(50))
                .andExpect(jsonPath("$.offset").value(0))
                .andExpect(jsonPath("$.products[0].name").value("Test Headphones"));
    }

    @Test
    void getProductById_found() throws Exception {
        when(productService.getProductById(1L)).thenReturn(Optional.of(sampleProduct()));

        mockMvc.perform(get("/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Headphones"));
    }

    @Test
    void getProductById_notFound() throws Exception {
        when(productService.getProductById(999L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/products/999"))
                .andExpect(status().isNotFound());
    }
}
