package com.shopverse.product.model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

/**
 * JPA entity mapping to the "products" table.
 * All 15 fields from the original ShopVerse PRODUCTS array in script.js.
 */
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Double originalPrice;

    @Column(nullable = false)
    private Double rating;

    @Column(nullable = false)
    private Integer reviews;

    @Column(nullable = false, length = 512)
    private String image;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> images;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb")
    private List<String> highlights;

    private String badge;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private String material;

    @Column(nullable = false)
    private String weight;

    @Column(nullable = false)
    private String warranty;

    // ── Getters ──

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public Double getPrice() { return price; }
    public Double getOriginalPrice() { return originalPrice; }
    public Double getRating() { return rating; }
    public Integer getReviews() { return reviews; }
    public String getImage() { return image; }
    public List<String> getImages() { return images; }
    public String getDescription() { return description; }
    public List<String> getHighlights() { return highlights; }
    public String getBadge() { return badge; }
    public String getBrand() { return brand; }
    public String getMaterial() { return material; }
    public String getWeight() { return weight; }
    public String getWarranty() { return warranty; }

    // ── Setters ──

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCategory(String category) { this.category = category; }
    public void setPrice(Double price) { this.price = price; }
    public void setOriginalPrice(Double originalPrice) { this.originalPrice = originalPrice; }
    public void setRating(Double rating) { this.rating = rating; }
    public void setReviews(Integer reviews) { this.reviews = reviews; }
    public void setImage(String image) { this.image = image; }
    public void setImages(List<String> images) { this.images = images; }
    public void setDescription(String description) { this.description = description; }
    public void setHighlights(List<String> highlights) { this.highlights = highlights; }
    public void setBadge(String badge) { this.badge = badge; }
    public void setBrand(String brand) { this.brand = brand; }
    public void setMaterial(String material) { this.material = material; }
    public void setWeight(String weight) { this.weight = weight; }
    public void setWarranty(String warranty) { this.warranty = warranty; }
}
