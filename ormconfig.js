/**
 * this js module is used to trigger typeorm migration
 * at runtime in docker container.
 */

module.exports = {
    type: "postgres",
    host: "localhost",
    port: 1234,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/database/migration/*.js"],
    migrationsTableName: "_schema_migration_history",
    cli: {
        "entitiesDir": ["dist/**/"],
        "migrationsDir": "dist/database/migration"
    }
}