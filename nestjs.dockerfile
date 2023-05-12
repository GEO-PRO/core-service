# Sử dụng image cơ bản là Node.js
FROM node:14.16.0 as build-stage

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng Nest.js
RUN npm run build

# Sử dụng image cơ bản là Node.js để chạy ứng dụng đã build
FROM node:14.16.0-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép các tệp từ build-stage stage vào thư mục làm việc trong container
COPY --from=build-stage /app/package*.json ./
COPY --from=build-stage /app/dist ./dist

# Cài đặt các dependencies chỉ cần thiết cho môi trường runtime
RUN npm install --only=production

# Expose cổng mà ứng dụng Nest.js lắng nghe
EXPOSE 3001

# Khởi chạy ứng dụng Nest.js
CMD ["node", "dist/main.js"]
