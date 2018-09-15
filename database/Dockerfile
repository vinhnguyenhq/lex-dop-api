FROM mysql:5.7

ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE lex-dop-api
ENV MYSQL_USER lex-dop-api
ENV MYSQL_PASSWORD password

ADD init.sql /docker-entrypoint-initdb.d
