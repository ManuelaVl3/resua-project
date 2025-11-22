INSERT INTO species (common_name, scientific_name) VALUES
-- Aves
('Colibrí esmeralda', 'Amazilia franciae'),
('Tucán toco', 'Ramphastos toco'),
('Guacamayo azul y amarillo', 'Ara ararauna'),
('Águila arpía', 'Harpia harpyja'),
('Pava caucana', 'Penelope perspicax'),
('Loro cabeza amarilla', 'Amazona ochrocephala'),
('Carpintero real', 'Campephilus principalis'),
('Barranquero coronado', 'Momotus momota'),
-- Mamíferos
('Jaguar', 'Panthera onca'),
('Puma', 'Puma concolor'),
('Oso de anteojos', 'Tremarctos ornatus'),
('Mono aullador', 'Alouatta seniculus'),
('Capibara', 'Hydrochoerus hydrochaeris'),
('Danta', 'Tapirus terrestris'),
('Perezoso de tres dedos', 'Bradypus variegatus'),
('Armadillo', 'Dasypus novemcinctus'),
-- Reptiles
('Anaconda verde', 'Eunectes murinus'),
('Boa constrictor', 'Boa constrictor'),
('Iguana verde', 'Iguana iguana'),
('Tortuga morrocoy', 'Chelonoidis carbonarius'),
('Caimán del Orinoco', 'Crocodylus intermedius'),
-- Anfibios
('Rana dorada', 'Phyllobates terribilis'),
('Salamandra', 'Bolitoglossa vallecula');

-- Insertar ubicaciones (barrios de Armenia, Quindío, Colombia)
INSERT INTO locations (longitude, latitude, location) VALUES
(-75.681389, 4.533889, 'La Castellana, Armenia, Quindío'),
(-75.680000, 4.535000, 'La Campiña, Armenia, Quindío'),
(-75.682000, 4.530000, 'Granada, Armenia, Quindío'),
(-75.683000, 4.531500, 'El Bosque, Armenia, Quindío'),
(-75.684000, 4.532000, 'San José, Armenia, Quindío'),
(-75.685000, 4.533000, 'Los Fundadores, Armenia, Quindío'),
(-75.686000, 4.534000, 'El Cafetero, Armenia, Quindío'),
(-75.687000, 4.535000, 'Libertadores, Armenia, Quindío'),
(-75.688000, 4.536000, 'Quimbaya, Armenia, Quindío'),
(-75.689000, 4.537000, 'Alfonso López, Armenia, Quindío'),
(-75.690000, 4.538000, 'Francisco de Paula Santander, Armenia, Quindío'),
(-75.691000, 4.539000, 'El Prado, Armenia, Quindío'),
(-75.692000, 4.540000, 'Centro, Armenia, Quindío'),
(-75.693000, 4.541000, 'La Patria, Armenia, Quindío'),
(-75.694000, 4.542000, 'San Rafael, Armenia, Quindío');

-- Insertar registros de observaciones
INSERT INTO registers (user_id, species_id, location_id, description) VALUES
-- Aves
(1001, 1, 1, 'Colibrí esmeralda alimentándose de flores rojas en La Castellana. Movimientos muy rápidos y precisos.'),
(1002, 2, 2, 'Tucán toco posado en la copa de un árbol alto en La Campiña. Pico multicolor muy impresionante.'),
(1003, 3, 3, 'Guacamayo azul y amarillo volando sobre Granada. Colores vibrantes contra el cielo azul.'),
(1004, 4, 4, 'Águila arpía sobrevolando El Bosque. Envergadura impresionante, fácilmente identificable.'),
(1005, 5, 5, 'Pava caucana caminando entre la vegetación en San José. Plumaje café con manchas blancas.'),
(1006, 6, 6, 'Loro cabeza amarilla en Los Fundadores. Vocalizaciones muy características.'),
(1007, 7, 7, 'Carpintero real picoteando un árbol en El Cafetero. Sonido rítmico muy distintivo.'),
(1008, 8, 8, 'Barranquero coronado posado en una rama en Libertadores. Cola larga con colores metálicos.'),
-- Mamíferos
(1009, 9, 9, 'Jaguar merodeando cerca de Quimbaya. Pelaje dorado con manchas negras muy distintivas.'),
(1010, 10, 10, 'Puma observado al amanecer en Alfonso López. Silueta elegante contra el horizonte.'),
(1001, 11, 11, 'Oso de anteojos trepando un árbol en Francisco de Paula Santander. Marcas faciales características.'),
(1002, 12, 12, 'Mono aullador en El Prado. Aullidos resonantes que se escuchan a gran distancia.'),
(1003, 13, 13, 'Capibara nadando en un pequeño lago del Centro. Comportamiento muy tranquilo.'),
(1004, 14, 14, 'Danta cruzando un sendero en La Patria. Tamaño impresionante y movimientos lentos.'),
(1005, 15, 15, 'Perezoso de tres dedos colgado de una rama en San Rafael. Movimientos extremadamente lentos.'),
(1006, 16, 1, 'Armadillo excavando en La Castellana. Caparazón duro y garras largas muy distintivas.'),
-- Reptiles
(1007, 17, 2, 'Anaconda verde en La Campiña. Serpiente de gran tamaño, color verde oscuro.'),
(1008, 18, 3, 'Boa constrictor en Granada. Patrón de manchas marrones muy característico.'),
(1009, 19, 4, 'Iguana verde tomando el sol en El Bosque. Color verde brillante y cresta dorsal.'),
(1010, 20, 5, 'Tortuga morrocoy caminando lentamente en San José. Caparazón alto y oscuro.'),
(1001, 21, 6, 'Caimán del Orinoco en Los Fundadores. Reptil de gran tamaño en el agua.'),
-- Anfibios
(1002, 22, 7, 'Rana dorada en El Cafetero. Color dorado brillante, muy tóxica.'),
(1003, 23, 8, 'Salamandra bajo una roca en Libertadores. Cuerpo alargado y cola larga.');

-- Insertar imágenes de los registros
INSERT INTO register_images (register_id, image_url, image_order) VALUES
-- Aves
(1, 'https://example.com/images/colibri_esmeralda_001.jpg', 1),
(1, 'https://example.com/images/colibri_esmeralda_002.jpg', 2),
(2, 'https://example.com/images/tucan_toco_001.jpg', 1),
(3, 'https://example.com/images/guacamayo_azul_amarillo_001.jpg', 1),
(3, 'https://example.com/images/guacamayo_azul_amarillo_002.jpg', 2),
(4, 'https://example.com/images/aguila_arpia_001.jpg', 1),
(5, 'https://example.com/images/pava_caucana_001.jpg', 1),
(6, 'https://example.com/images/loro_cabeza_amarilla_001.jpg', 1),
(7, 'https://example.com/images/carpintero_real_001.jpg', 1),
(8, 'https://example.com/images/barranquero_coronado_001.jpg', 1),
-- Mamíferos
(9, 'https://example.com/images/jaguar_001.jpg', 1),
(9, 'https://example.com/images/jaguar_002.jpg', 2),
(10, 'https://example.com/images/puma_001.jpg', 1),
(11, 'https://example.com/images/oso_anteojos_001.jpg', 1),
(11, 'https://example.com/images/oso_anteojos_002.jpg', 2),
(12, 'https://example.com/images/mono_aullador_001.jpg', 1),
(13, 'https://example.com/images/capibara_001.jpg', 1),
(14, 'https://example.com/images/danta_001.jpg', 1),
(15, 'https://example.com/images/perezoso_001.jpg', 1),
(16, 'https://example.com/images/armadillo_001.jpg', 1),
-- Reptiles
(17, 'https://example.com/images/anaconda_verde_001.jpg', 1),
(17, 'https://example.com/images/anaconda_verde_002.jpg', 2),
(18, 'https://example.com/images/boa_constrictor_001.jpg', 1),
(19, 'https://example.com/images/iguana_verde_001.jpg', 1),
(20, 'https://example.com/images/tortuga_morrocoy_001.jpg', 1),
(21, 'https://example.com/images/caiman_orinoco_001.jpg', 1),
-- Anfibios
(22, 'https://example.com/images/rana_dorada_001.jpg', 1),
(23, 'https://example.com/images/salamandra_001.jpg', 1);

