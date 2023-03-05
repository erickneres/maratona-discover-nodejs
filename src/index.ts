import express from "express";
import { create } from "express-handlebars";

import routes from "./routes";

import path from "path";

const app = express();

app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

const hbs = create({
  partialsDir: ['src/views/partials'],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));

app.use('/', express.static(path.resolve(__dirname, '../public')));

app.use(routes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
