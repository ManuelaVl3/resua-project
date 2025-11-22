package com.resua.observations.infrastructure.adapters.out.database.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Table(name = "register_images")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "register_id",
            foreignKey = @ForeignKey(name = "fk_register_images_register"),
            nullable = false)
    private RegisterEntity register;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "image_order")
    private Integer imageOrder;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}

