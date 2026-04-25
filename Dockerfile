FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# نطبع الملفات عشان نتأكد
RUN ls target

EXPOSE 2030

CMD ["sh", "-c", "java -jar target/*.jar"]