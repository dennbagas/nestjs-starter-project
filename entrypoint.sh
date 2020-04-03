#!/bin/bash

# write DB configuration to ormconfig.js using stream editor
sed -i 's|.*host:.*|host: "'"$DB_HOST"'",|g' /app/ormconfig.js
sed -i 's|.*port:.*|port:'"$DB_PORT"',|g' /app/ormconfig.js
sed -i 's|.*username:.*|username: "'"$DB_USER"'",|g' /app/ormconfig.js
sed -i 's|.*password:.*|password: "'"$DB_PASSWORD"'",|g' /app/ormconfig.js
sed -i 's|.*database:.*|database: "'"$DB_NAME"'",|g' /app/ormconfig.js

# run migration first
npm run db:migrate:prod;

# run app
pm2-runtime ecosystem.config.js;