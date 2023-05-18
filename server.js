const express = require("express");
const app = express();
const { Client } = require("@notionhq/client");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(cors());

const authToken = process.env.NOTION_INTEGRATION_TOKEN;
const notionDbID = process.env.NOTION_DATABASE_ID;
const notion = new Client({ auth: authToken });

app.get("/NotionAPIGet", async (req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: notionDbID,
      //   sorts: [
      //     {
      //       timestamp: "created_time",
      //       direction: "descending",
      //     },
      //   ],
    });

    res.send(response.results);
    console.log("success");
  } catch (error) {
    console.log(error.message);
    res.send(error.message).status(error.status);
  }
});

app.post("/NotionAPIPost", jsonParser, async (req, res) => {
  //   const { Fullname, CompanyRole, Location } = req.body;

  try {
    const response = await notion.pages.create({
      parent: {
        database_id: notionDbID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Orchid Blossoms",
              },
            },
          ],
        },
        Stock: {
          number: 3,
        },
      },
    });

    res.send(response);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("server listening on port 3000!");
});
