const { postgraphile } = require("postgraphile");

module.exports = postgraphile(
  {
    database: "postgres",
    user: "postgres",
    password: "postgres",
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
