-- Script para crear la base de datos PostgreSQL
-- Ejecutar este script como usuario postgres o superusuario

-- Crear la base de datos si no existe
-- Nota: En PostgreSQL no existe CREATE DATABASE IF NOT EXISTS
-- Por lo tanto, este comando debe ejecutarse manualmente o usar un script bash

-- Conectarse primero a PostgreSQL y ejecutar:
-- CREATE DATABASE community_db;

-- O usar psql desde la línea de comandos:
-- psql -U postgres -c "CREATE DATABASE community_db;"

-- Después de crear la base de datos, conectarse a ella y ejecutar schema.sql:
-- psql -U postgres -d community_db -f schema.sql

