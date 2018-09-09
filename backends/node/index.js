const fastify = require("fastify")();
var i18next = require("i18next");
var middleware = require("i18next-express-middleware");

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

fastify.get("/translate", async (request, reply) => {
  if (request.req.i18n.exists("title")) return request.req.t("title");
  else {
    reply.code(404);
    return {};
  }
});

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
