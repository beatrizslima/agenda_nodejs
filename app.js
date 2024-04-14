const express = require("express");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const { validateToken } = require("./auth");
const app = express();
const port = 3000;

app.use(express.json());
app.use('*', validateToken)

app.get("/", (req, resp) => {
  console.log(req.query);
  resp.send("hello world");
});

app.post("/welcome", (req, resp) => {
  console.log(req.body);
  let name = req.body.firstName;
  let lastName = req.body.lastName;
  resp.send(`welcome ${name} ${lastName}!`);
});

app.post("/login", async (req, resp) => {
  let email = req.body.email;
  let password = req.body.password;

  try {
    console.log(email, password)
    const user = await User.findOne({
      where: {
        email,
        password,
      },
    });
    console.log(user)
    if (!user) {
      return resp.status(401).json({
        success: false,
        message: "wrong credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user.userId,
        name: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return resp.status(200).json({
      data: { user, token },
      success: true,
      message: "token created successfully",
    });

  } catch (error) {
    resp.json({
      data: { error },
      success: false,
      message: "an error ocurred",
    });
  }

});


app
  .route("/user")
  .get(async (req, resp) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      resp.json(users);
    } catch (error) {
      resp.status(500).send("Error on users consulting");
    }
  })

  .post(async (req, resp) => {
    try {
      const newUser = await User.create({
        ...req.body,
      });
      resp.send("user created: " + newUser.userId);
    } catch (error) {
      resp.send("could not create an user " + JSON.stringify(error));
    }
  })

  .put((req, resp) => {
    resp.send("put");
  })

  .delete((req, resp) => {
    resp.send("delete");
  });

app.listen(port, async () => {
  console.log(`listening port ${port}`);
  await User.sync({ alter: true });
});
