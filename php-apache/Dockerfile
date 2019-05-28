ARG APACHE_RUN_USER
ARG APACHE_RUN_GROUP
FROM php:7.3-apache
MAINTAINER Ratnarashi
ARG UID=1000
ARG GID=1000
ARG USERNAME=fred
RUN groupadd -g ${GID} ${USERNAME} \
    && useradd -m -g ${USERNAME} -u ${UID} -s /bin/bash ${USERNAME}
RUN docker-php-ext-install pdo_mysql mysqli
RUN a2enmod rewrite

