<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description
Starter project with [Typeorm](https://github.com/typeorm/typeorm) and centralized environment configuration. It's also comes with Dockerfile and docker-compoe file. This features Typeorm auto migration at runtime in docker container before the nest js start. Forked from [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository

## Installation
```bash
$ npm install
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Create migration file
Create ormconfig.json first in the root folder to set up your database. For reference read the [ormconfig.json](https://typeorm.io/#/using-ormconfig/using-ormconfigjson) configuration.

```bash
$ npm run migration:generate "AddSomeTable"
```
This will create a migration file named `{timestamp}-AddSomeTable.ts` on `/migration` folder under the `database` module

## Run migration on local machine
```bash
# this will run migration file
$ npm run db:migrate

# this will revert migration file
$ npm run db:revert
```

## Docker build
```bash
# build docker images
$ docker build . -t nest-starter-project

# or run docker-compose
$ docker-compose up --build
```

## Auto migration
Auto migration is different from [Typeorm `syncrhonize` method](https://github.com/typeorm/typeorm/blob/master/docs/faq.md#how-do-i-update-a-database-schema). This is like a normal migration but it runs when the docker container start. The migration will run typeorm CLI and supplies with configuration from `ormconfig.js`. The value of `ormconfig.js` is configured when the container start with supplied environment (`host`, `user`, `password`, `port`, `etc`), so the original value is safe to commit to version control as its can change dinamically. The changes of `ormconfig.js` when container starts is done by `entrypoint.sh` scripts

## Environment Configuration
Environment configuration done by loading all declared environtment in `config` module. If you want to add more configuration, add it to `config.service.ts` in `config` module

## Interceptor
This starter project also comes with interceptor. These are:
 - <b>Entity not found interceptor</b> <br>
   This interceptor will return 404 status code if the error type is `EntityNotFoundError`
 - <b>Plain to class interceptor </b> <br>
   This interceptor will transform returned data match to the DTO, so we dont have to transform it manually
 - <b>Response transform interceptor </b> <br>
   This interceptor will transform the response object so you can make a custom structur of the response object

## Support
Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License
Nest is [MIT licensed](LICENSE).
