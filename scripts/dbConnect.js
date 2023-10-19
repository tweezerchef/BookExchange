require('dotenv').config(); // Load environment variables from .env

const { execSync } = require('child_process');

const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

if (!host || !database || !user || !password) {
  console.error('Missing database connection information in .env');
  process.exit(1);
}

const command = `psql -h ${host} -d ${database} -U ${user} -W`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error connecting to the database:', error);
  process.exit(1);
}