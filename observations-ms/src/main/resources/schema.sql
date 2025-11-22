CREATE TABLE IF NOT EXISTS species (
                                       id BIGSERIAL PRIMARY KEY,
                                       common_name VARCHAR(80) NOT NULL,
    scientific_name VARCHAR(80) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS locations (
                                         id BIGSERIAL PRIMARY KEY,
                                         longitude NUMERIC(9, 6) NOT NULL,
    latitude NUMERIC(9, 6) NOT NULL,
    location VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE IF NOT EXISTS registers (
                                         id BIGSERIAL PRIMARY KEY,
                                         user_id BIGINT NOT NULL,
                                         species_id BIGINT NOT NULL,
                                         location_id BIGINT NOT NULL,
                                         description TEXT,
                                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                                         CONSTRAINT fk_registers_species
                                         FOREIGN KEY (species_id)
    REFERENCES species(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,

    CONSTRAINT fk_registers_location
    FOREIGN KEY (location_id)
    REFERENCES locations(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
    );

CREATE TABLE IF NOT EXISTS register_images (
                                               id BIGSERIAL PRIMARY KEY,
                                               register_id BIGINT NOT NULL,
                                               image_url VARCHAR(500) NOT NULL,
    image_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_register_images_register
    FOREIGN KEY (register_id)
    REFERENCES registers(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    );

CREATE INDEX idx_registers_user_id ON registers(user_id);
CREATE INDEX idx_registers_species_id ON registers(species_id);
CREATE INDEX idx_registers_location_id ON registers(location_id);
CREATE INDEX idx_registers_created_at ON registers(created_at);

CREATE INDEX idx_register_images_register_id ON register_images(register_id);

CREATE INDEX idx_species_common_name ON species(common_name);
CREATE INDEX idx_species_scientific_name ON species(scientific_name);

CREATE INDEX idx_locations_coordinates ON locations(latitude, longitude);
