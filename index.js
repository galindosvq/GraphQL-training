const express = require("express");
const app = express();
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        message: String
    }
`);

const root = {
  message: () => "hello world!"
};

app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    root: root,
    graphiql: true
  })
);
app.listen(3000, () => console.log("server is running on port 3000"));
