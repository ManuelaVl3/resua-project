package com.resua.observations.infrastructure.adapters.out.database.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Table(name = "registers")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "species_id",
            foreignKey = @ForeignKey(name = "fk_registers_species"),
            nullable = false)
    private SpeciesEntity species;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "location_id",
            foreignKey = @ForeignKey(name = "fk_registers_location"),
            nullable = false)
    private LocationEntity location;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "register", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @OrderBy("imageOrder ASC")
    private List<RegisterImageEntity> images;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
