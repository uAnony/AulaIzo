const express = require("express");
const app = express();

app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.json({ message: "API rodando dentro do Render!" });
});

// Importa rotas de usuários
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
