# Imagen base con PHP y Composer
FROM php:8.2-fpm AS base

# Establece el directorio de trabajo
WORKDIR /var/www/html

# Exponer el puerto 8000 para el servidor Artisan
EXPOSE 8000

# Actualiza la lista de paquetes e instala las dependencias necesarias
RUN apt-get update \
    && apt-get install -y \
        libpq-dev \
        zlib1g-dev \
        curl \
        gnupg \
        build-essential \
        libpng-dev \
        libjpeg62-turbo-dev \
        libfreetype6-dev \
        locales \
        libzip-dev \
        libonig-dev \
        zip \
        jpegoptim optipng pngquant gifsicle \
        vim \
        unzip \
        git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql pdo_pgsql mbstring zip exif pcntl gd bcmath



# Compilación de assets en una etapa separada
FROM base AS build

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Configura Composer para aumentar el tiempo de espera y deshabilitar los plugins
RUN composer config --global process-timeout 2000 \
    && composer config --global allow-plugins.composer/package-versions-deprecated false

# Copia los archivos composer.json y package.json y ejecuta la instalación de dependencias antes de copiar el resto del proyecto para aprovechar la caché
COPY composer.json composer.lock ./
COPY package.json package-lock.json ./

# Instala dependencias de Composer y Node.js
RUN composer install --prefer-dist --no-progress --no-interaction --no-scripts --no-autoloader


# Copia el resto de la aplicación al contenedor
COPY . .


# Configura permisos correctos y aplica permisos específicos para Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 755 /var/www/html \
    && chmod -R 777 /var/www/html/storage/logs \
    && chmod -R 755 /var/www/html/storage/framework \
    && chmod -R 777 /var/www/html/storage/framework/views \
    && chmod -R 777 /var/www/html/storage/framework/sessions \
    && chmod -R 777 /var/www/html/storage/framework/cache \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R o+w /var/www/html/storage

# Crea el archivo de base de datos SQLite
RUN touch /var/www/html/database/database.sqlite \
    && chown www-data:www-data /var/www/html/database/database.sqlite

# Ejecuta las migraciones para crear las tablas necesarias y comandos de Laravel para limpiar la caché
RUN composer dump-autoload \
    && php artisan migrate --force \
    && php artisan config:clear \
    && php artisan route:clear \
    && php artisan cache:clear \
    && php artisan view:clear \
    && php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

# Imagen final
FROM base AS final

# Copia los archivos compilados del build
COPY --from=build /var/www/html /var/www/html

# Asegurarse de que el archivo .env esté presente
COPY .env.example .env

# Ejecutar el servidor Artisan
CMD ["php", "/var/www/html/artisan", "serve", "--host=0.0.0.0", "--port=8000"]
