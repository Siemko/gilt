const fastify = require("fastify")();
const i18next = require("i18next");
const middleware = require("i18next-express-middleware");
const cors = require('cors')

i18next.use(middleware.LanguageDetector).init({
  preload: ["en", "pl", "it"],
  detection: {
    order: ["querystring"],
    lookupQuerystring: "culture"
  },
  resources: {
    en: {
      translation: {
        title: "This is node english title. Why so serious?"
      }
    },
    pl: {
      translation: {
        title: "To jest tytuł po polsku. Z fastifaja. Serio."
      }
    },
    it: {
      translation: {
        title: "Buongiorno!"
      }
    }
  }
  //fallbackLng: 'pl',
});

fastify.use(middleware.handle(i18next));
fastify.use(cors());

fastify.get("/translate", async (request, reply) => {
  if (request.req.i18n.exists("title")) {
    reply.type("application/json");
    return request.req.t("title");
  } else {
    reply.code(404);
    reply.type("application/json");
    return {};
  }
});

const start = async () => {
  try {
    await fastify.listen(4000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
