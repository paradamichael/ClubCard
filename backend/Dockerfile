# Stage 1: Build stage with Maven
FROM maven:3.9-eclipse-temurin-17-alpine AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Runtime stage
FROM eclipse-temurin:17-jre-alpine

# Install network diagnostic tools
RUN apk add --no-cache bind-tools netcat-openbsd busybox-extras

# Set working directory
WORKDIR /app

# Copy the built JAR from build stage
COPY --from=build /app/target/GolfScoreBackend-0.0.1-SNAPSHOT.jar app.jar

# Copy diagnostic script
COPY test-db-connection.sh .
RUN chmod +x test-db-connection.sh

# Expose port 8080
EXPOSE 8080

# Run diagnostics then start application
ENTRYPOINT ["sh", "-c", "./test-db-connection.sh && java -jar app.jar"]
