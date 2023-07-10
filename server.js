const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("./auth/user");

// экспорт роутов (импорт модулей)
const logger = require("./logger/logger");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const prodRouter = require("./routes/products");

// определение параметров
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(session({ secret: "SECRET" }));
app.use(passport.initialize());
app.use(passport.session());

// перенаправление на роуты
app.use(logger);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", prodRouter);

// запуск сервера
function start(PORT) {
    app.listen(PORT, () => {
        console.log(`Сервер слушает на порту ${PORT}`);
    });
}

const PORT = process.env.PORT || 3001;
start(PORT);
