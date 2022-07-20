import * as express from "express";
import { firestore } from "./db";
import { json } from "body-parser";

const app = express();
const port = 3000;
app.use(json());

class User {
  products: [{}];
}

const usersColl = firestore.collection("users");

app.get("/users", (request, response) => {
  response.json(["todos los usuarios"]);
});

app.get("/users/:userId", function (request, response) {
  const userId = request.params.userId;
  const userDoc = usersColl.doc(userId);
  userDoc.get().then((userSnap) => {
    const userData = userSnap.data();
    response.json(userData);
  });
});

app.post("/users", function (request, response) {
  const newUserDoc = usersColl.doc();

  newUserDoc.create(request.body).then(() => {
    response.json({
      id: newUserDoc.id,
    });
  });
});

app.patch("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  const userDoc = usersColl.doc(userId);
  const updatedObject = request.body;
  updatedObject.updatedAt = new Date();

  //la API actúa llevando y trayendo información
  //el servidor (este archivo) actúa como filtro de la API
  // modificando, limpiando, borrando o formateando data para que
  // después sea guardada en la base de datos
  //la base de datos guarda la información

  userDoc.update(updatedObject).then((res) => {
    response.json({ message: "ok" });
  });
});
app.delete("/users/:pepe", (request, response) => {
  response.status(204);
});

app.listen(port, () => {
  console.log(`escuchando puerto ${port}`);
});
