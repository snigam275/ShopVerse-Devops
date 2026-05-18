# ── Stage 1: Build ──
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Copy POM first for dependency caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn package -Dmaven.test.skip=true -B

# ── Stage 2: Runtime ──
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# wget is available in Alpine for health checks
RUN apk add --no-cache wget

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
