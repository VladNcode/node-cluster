import express, { Request, Response } from "express";
import { createClient } from "redis";

import { router as jphRoutes } from "./jph-routes";

const PORT = process.env.PORT || 3000;

const app = express();

export const client = createClient({
  // url: "redis://user:password@redis:6379",
  socket: {
    host: "redis",
    port: 6379,
  },
});

(async () => {
  await client.connect();
})();

app.get("/", (req: Request, res: Response) => {
  console.log(`We are on PORT: ${PORT}`);
  res.send(`We are on PORT: ${PORT}`);
});

app.use("/jph", jphRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}...`);
});
