const { postgraphile, makePluginHook } = require("postgraphile");
const MySubscriptionPlugin = require("./MySubscriptionPlugin");

const { default: PgPubsub } = require("@graphile/pg-pubsub"); // remember to install through yarn/npm

const pluginHook = makePluginHook([PgPubsub]);

const WsLoggerPlugin = (req, res, next) => {
  // TODO add logs for ws
  next();
};

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
    live: true,
    subscriptions: true,
    simpleSubscriptions: true,
    websocketMiddlewares: [WsLoggerPlugin],
    pluginHook,
  }
);
