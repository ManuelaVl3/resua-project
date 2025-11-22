# Configuración Docker para Community MS

Este microservicio usa PostgreSQL en el puerto **5434** para no conflictuar con otros microservicios.

## Iniciar PostgreSQL con Docker

```bash
# Iniciar el contenedor de PostgreSQL
docker-compose up -d

# Verificar que está corriendo
docker-compose ps

# Ver los logs
docker-compose logs -f postgres-community
```

## Detener PostgreSQL

```bash
# Detener el contenedor
docker-compose down

# Detener y eliminar los volúmenes (¡CUIDADO! Esto borra los datos)
docker-compose down -v
```

## Conectarse a la base de datos

```bash
# Desde la línea de comandos
psql -h localhost -p 5434 -U postgres -d community_db

# O usando docker exec
docker exec -it community-postgres psql -U postgres -d community_db
```

## Verificar que las tablas se crearon

```bash
# Conectarse y listar tablas
docker exec -it community-postgres psql -U postgres -d community_db -c "\dt"
```

## Credenciales

- **Host:** localhost
- **Puerto:** 5434
- **Base de datos:** community_db
- **Usuario:** postgres
- **Contraseña:** postgres

## Notas

- El script `schema.sql` se ejecuta automáticamente al crear el contenedor por primera vez
- Los datos se persisten en un volumen Docker llamado `postgres_community_data`
- Si necesitas reiniciar desde cero, usa `docker-compose down -v` y luego `docker-compose up -d`

