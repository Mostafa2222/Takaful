FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 2030

CMD ["java", "-jar", "target/Takaful-0.0.1-SNAPSHOT.jar"]