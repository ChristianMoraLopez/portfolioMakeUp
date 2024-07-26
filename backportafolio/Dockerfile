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
        default-mysql-client \
        libmariadb-dev \
        libmariadb-dev-compat \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_pgsql pdo_mysql mbstring zip exif pcntl gd bcmath


# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Configura Composer para aumentar el tiempo de espera y deshabilitar los plugins
RUN composer config --global process-timeout 2000 \
    && composer config --global allow-plugins.composer/package-versions-deprecated false

# Etapa de construcción para instalar dependencias y preparar la aplicación
FROM base AS build

# Copia los archivos composer.json y composer.lock y ejecuta la instalación de dependencias antes de copiar el resto del proyecto para aprovechar la caché
COPY composer.json composer.lock ./

# Instala dependencias de Composer
RUN composer install --prefer-dist --no-progress --no-interaction --no-scripts

# Copia el resto de la aplicación al contenedor
COPY . .

# Configura permisos correctos y aplica permisos específicos para Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# Imagen final
FROM base AS final

# Copia los archivos compilados del build
COPY --from=build /var/www/html /var/www/html

# Asegúrate de que el archivo .env esté presente
COPY .env.example .env

# Genera la clave de la aplicación y limpia la configuración
RUN php artisan key:generate --force \


# Ejecutar las migraciones durante la construcción
RUN php artisan migrate --force

# Establecer el usuario no root
RUN useradd -ms /bin/bash appuser \
    && chown -R appuser:appuser /var/www/html

USER appuser

# Ejecutar el servidor de PHP
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
