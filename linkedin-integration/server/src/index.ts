import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

const app = express();
const port = 8000;

const KEET_API_KEY = "YOUR KEET API KEY";

let accountToken;

app.use(cors());
app.use(express.json());

app.post("/create-link-token", async (req: Request, res: Response) => {
  const integration = req.body.integration;
  const response = await fetch("https://api.trykeet.com/v1/link/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEET_API_KEY}`,
    },
    body: JSON.stringify({
      linkConfig: {
        integration,
        endUserId: "YOUR END USER ID",
        companyName: "Acme",
      },
    }),
  });
  const data = await response.json();
  res.status(200).json(data);
});

app.post(
  "/get-account-token",
  async (req: Request, res: Response, next: NextFunction) => {
    const publicToken = req.body.publicToken;

    const response = await fetch(
      "https://api.trykeet.com/v1/linked-accounts/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${KEET_API_KEY}`,
        },
        body: JSON.stringify({
          publicToken,
        }),
      }
    );

    const data = await response.json();

    accountToken = data.token;

    res.status(200);
    res.send({
      status: "ok",
    });
  }
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
