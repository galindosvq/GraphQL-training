const express = require("express");
const app = express();
const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

const { courses } = require("./data.json");

const schema = buildSchema(`
    type Query {
        message: String
        course(id: Int!): Course
        courses(topic: String!): [Course]
    }
    type Course {
        id: Int
        title: String
        author: String
        topic: String
        url: String
    }
`);

const getCourse = args => {
  const id = args.id;
  return courses.filter(course => {
    return course.id === id;
  })[0];
};

const getCourses = args => {
  if (args.topic) {
    const topic = args.topic;
    return courses.filter(course => course.topic === topic);
  } else {
    return courses;
  }
};

const root = {
  message: () => "hello world!",
  course: getCourse,
  courses: getCourses
};

app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(3000, () => console.log("server is running on port 3000"));
