Migration: 

create `sequelize-cli migration:generate --name user`
make migration `npm run sequelize db:migrate`
undo migration `npm run sequelize db:migrate:undo`

Seeding:

create `sequelize-cli seed:generate --name user`
make seeds `npm run sequelize db:seed:all`
undo seeds `npm run sequelize db:seed:undo:all`

Heroku:

connect to db `heroku pg:psql --app node-rest-caht`

make migration `npm run sequelize db:migrate --env staging`
undo migration `npm run sequelize db:migrate:undo --env staging`

make seeds `npm run sequelize db:seed:all --env staging`
undo seeds `npm run sequelize db:seed:undo:all --env staging`