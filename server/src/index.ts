import { app } from "./app";
import { EnvConfig } from "./config/env";
import { connectRedis } from "./lib/redis";

const port = EnvConfig.API_PORT;
(async () => {
  await connectRedis();
  app.listen(port, async () => {
    console.log(`App running http://localhost:${port}`);
  });
})();
