# GolfScoreBackend

Spring Boot backend skeleton for ClubCard. Scaffolds JPA entities, repositories, basic controllers and JWT utilities.

Usage

- Build: `mvn -B package`
- Run: `mvn spring-boot:run`

Configuration

The project uses environment variables or `application.yml` values to configure the PostgreSQL connection and JWT secret. Example environment variables:

- `SPRING_DATASOURCE_URL` (jdbc url)
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `JWT_SECRET` (secret used to sign tokens)

You can use a free PostgreSQL provider such as ElephantSQL or Heroku Postgres. Set the JDBC URL into `SPRING_DATASOURCE_URL`.
