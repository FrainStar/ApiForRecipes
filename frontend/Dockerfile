# Используем официальный образ Node.js
FROM node:18.13.0-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json .

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Команда для запуска приложения
CMD ["npm", "run", "dev"]
