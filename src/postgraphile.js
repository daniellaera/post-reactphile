const { postgraphile } = require("postgraphile");

module.exports = postgraphile(
  {
    database: "post-reactphile",
    user: "postgres",
    password: "postgres_dev",
    host: "localhost",
    port: 5432,
  },
  "public",
  {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
  }
);
