const express = require("express");
const app = express();
const port = process.env.PORT || 9000;
const knex = require("knex")({
  client: "mssql",
  connection: {
    server: "mrjb-srv-db01.database.windows.net",
    database: "DB01",
    user: "AppUser",
    password: "Password1",
    options: {
      encrypt: true,
    },
  },
});

app.listen(port, () => console.log(`listening on port: ${port}`));

app.get("/", async (request, response) => {
  try {
    const testRecord = await knex("[GT].[Postcodes]").first("*");
    response.send(`Did we get anything from the database? ${JSON.stringify(testRecord)}`);
  } catch (err) {
    console.log(err);
  }
});

app.get("/sp", async (request, response) => {
  const postcodes = request.query.postcodes;
  console.log(`💩 - file: index.js - line 30 - app.get - postcodes`, postcodes);

  try {
    const testRecord = await knex.raw(`EXEC [dbo].[GetNudgebackData] @DistrictCode = '${postcodes}'`);
    response.send(`Did we get anything from the database? ${JSON.stringify(testRecord)}`);
  } catch (err) {
    console.log(err);
  }
});

