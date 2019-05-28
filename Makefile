UID := $$(id -u)
GID := $$(id -g)
USERNAME := $$(whoami)

.PHONY: up
up:
	UID=$(UID) GID=$(GID) USERNAME=$(USERNAME) docker-compose up -d
  
.PHONY: build
build:
	UID=$(UID) GID=$(GID) USERNAME=$(USERNAME) docker-compose build

.PHONY: stop
stop:
	UID=$(UID) GID=$(GID) docker-compose stop

.PHONY: down
down:
	UID=$(UID) GID=$(GID) docker-compose down

.PHONY: status
status:
	UID=$(UID) GID=$(GID) docker-compose ps

dev-build-network:
	UID=$(UID) GID=$(GID) docker network create proxy

.PHONY: db-create
db-create:
	UID=$(UID) GID=$(GID) docker-compose exec mariadb mysql -h 127.0.0.1 -u root -prootpwd -e "CREATE DATABASE IF NOT EXISTS c15_northlondon CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"

.PHONY: db-populate-test
db-populate-test: db-create
	UID=$(UID) GID=$(GID) docker-compose exec mariadb mysql -h 127.0.0.1 -u root -prootpwd c15_northlondon -e "source /var/www/html/data/c15_northlondon.sql"
#	docker-compose exec om_mysql /var/www/html/setup-test-data.sh orderdatabase src/data/schema.sql

.PHONY: db-populate-snapshot
db-populate-snapshot:
	docker-compose exec om_mysql /var/www/html/setup-test-data.sh orderdatabase orderdatabase-snapshot.sql

.PHONY: db-import
db-import:
	docker-compose exec om_mysql /var/www/html/setup-test-data.sh ${DB} ${SQLFILE}

.PHONY: db-connect
db-connect:
	docker-compose exec mariadb mysql -h 127.0.0.1 -u root -prootpwd c15_northlondon

.PHONY: db-export
db-export:
	docker-compose exec --user $(UID):$(GID) om_mysql mysqldump -h 127.0.0.1 -u root -pthe3jewels --events --routines --triggers orderdatabase > src/data/orderdatabase.dump.sql

.PHONY: phinx
phinx:
	docker-compose run --rm --user $(USER) om_php php ./vendor/bin/phinx --configuration=src/data/phinx.yml ${ARGS}

.PHONY: db-status
db-status:
	docker-compose run --rm --user $(USER) om_php php ./vendor/bin/phinx --configuration=src/data/phinx.yml status

.PHONY: db-migrate
db-migrate:
	docker-compose run --rm --user $(USER) om_php php ./vendor/bin/phinx --configuration=src/data/phinx.yml migrate ${ARGS}

.PHONY: db-rollback
db-rollback:
	docker-compose run --rm --user $(USER) om_php php ./vendor/bin/phinx --configuration=src/data/phinx.yml rollback ${ARGS}

.PHONY: db-create-migration
db-create-migration:
	docker-compose run --rm --user $(USER) om_php php ./vendor/bin/phinx --configuration=src/data/phinx.yml create $(NAME)

.PHONY: db-seed
db-seed:
	docker-compose run --rm --user $(USER) om_php php ./vendor/bin/phinx --configuration=src/data/phinx.yml seed:run

.PHONY: db-create-seed
db-create-seed:
	docker-compose run --rm --user $(USER) om_php php ./vendor/bin/phinx --configuration=src/data/phinx.yml seed:create $(NAME)

.PHONY: docs
docs:
	./vendor/bin/apigen generate --source src/php --destination src/doc/api/v1 --template-theme bootstrap

.PHONY: deploy-setup
deploy-setup:
	bundle install --path bundler

.PHONY: deploy-tasks
deploy-tasks:
	bundle exec cap -AT

.PHONY: composer-install
composer-install:
	docker-compose run --user $(UID):$(GID) composer install

.PHONY: composer-require
composer-require:
	# echo "Run this: docker-compose run composer require package/name:version"
	docker-compose run --rm --user $(UID):$(GID) composer require ${PACKAGE}

.PHONY: test
test:
	docker-compose run test ./vendor/bin/phpunit

.PHONY: process-financial-transactions-csv
process-financial-transactions-csv:
	docker-compose exec --user $(UID):$(GID) om_php php ./src/bin/process-financial-transactions-csv.php

.PHONY: generate-fake-transaction-data
generate-fake-transaction-data:
	docker-compose exec --user $(UID):$(GID) om_php php ./src/bin/generate-fake-transaction-data.php ${AMOUNT}

