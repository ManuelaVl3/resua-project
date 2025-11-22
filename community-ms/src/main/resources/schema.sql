-- Script SQL para crear las tablas de la base de datos PostgreSQL
-- Basado en las clases modelo Comment y Report

-- Crear la tabla de comentarios
CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    register_id BIGINT NOT NULL,
    user_comment_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    body TEXT NOT NULL
);

-- Crear la tabla de reportes
-- comment_id es una foreign key que referencia a la tabla comments
CREATE TABLE IF NOT EXISTS reports (
    id BIGSERIAL PRIMARY KEY,
    comment_id BIGINT NOT NULL,
    reason VARCHAR(255) NOT NULL,
    state INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_report_comment FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_comments_register_id ON comments(register_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_comment_id ON comments(user_comment_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);
CREATE INDEX IF NOT EXISTS idx_reports_comment_id ON reports(comment_id);
CREATE INDEX IF NOT EXISTS idx_reports_state ON reports(state);

-- Comentarios sobre las tablas
COMMENT ON TABLE comments IS 'Tabla para almacenar los comentarios de los registros';
COMMENT ON TABLE reports IS 'Tabla para almacenar los reportes de comentarios';

-- Comentarios sobre las columnas
COMMENT ON COLUMN comments.id IS 'Identificador único del comentario';
COMMENT ON COLUMN comments.register_id IS 'ID del registro al que pertenece el comentario';
COMMENT ON COLUMN comments.user_comment_id IS 'ID del usuario que creó el comentario';
COMMENT ON COLUMN comments.created_at IS 'Fecha y hora de creación del comentario';
COMMENT ON COLUMN comments.body IS 'Contenido del comentario';

COMMENT ON COLUMN reports.id IS 'Identificador único del reporte';
COMMENT ON COLUMN reports.comment_id IS 'ID del comentario reportado - Foreign Key que referencia a comments.id';
COMMENT ON COLUMN reports.reason IS 'Razón por la que se reporta el comentario';
COMMENT ON COLUMN reports.state IS 'Estado del reporte (0: pendiente, 1: revisado, etc.)';
COMMENT ON COLUMN reports.created_at IS 'Fecha y hora de creación del reporte';

