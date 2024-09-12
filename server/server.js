const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const storage = require('./routes/documentRoutes');

app.use(cors());
app.use(express.json());

// Porta para o servidor rodar
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



const sequelize = require('./config/database');
const Document = require('./models/Document');

sequelize.sync().then(() => {
  console.log('Database synced');
});

const documentRoutes = require('./routes/documentRoutes');
app.use('/api/documents', documentRoutes);


const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo não permitido'), false);
    }
  };
  
  const upload = multer({
    storage,
    fileFilter,
  });