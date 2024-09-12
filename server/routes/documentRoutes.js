const express = require('express');
const multer = require('multer');
const Document = require('../models/Document');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');

// Configuração de armazenamento do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Rota para criar novo documento
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { title, description, fileType } = req.body;
    const errors = {};

    // Validação de campos obrigatórios
    if (!title) errors.title = ["Este campo é obrigatório!"];
    if (!description) errors.description = ["Este campo é obrigatório!"];
    if (!fileType) errors.fileType = ["Este campo é obrigatório!"];
    if (!req.file) errors.file = ["Este campo é obrigatório!"];

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    // Criar novo documento
    const newDocument = await Document.create({
      title,
      description,
      fileName: req.file.originalname,
      fileType,
      filePath: req.file.path,
    });

    res.status(201).json(newDocument);
  } catch (error) {
    console.error('Erro ao criar documento:', error);
    res.status(500).json({ error: 'Erro ao criar documento' });
  }
});

// Rota para deletar documento
router.delete('/:id', async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }

    // Remover o arquivo do sistema e o registro do banco
    fs.unlinkSync(document.filePath);
    await document.destroy();
    res.status(200).json({ message: 'Documento excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    res.status(500).json({ error: 'Erro ao excluir documento' });
  }
});

// Rota para atualizar documento
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }

    const { title, description } = req.body;

    // Se um novo arquivo for enviado, substituí-lo
    if (req.file) {
      if (fs.existsSync(document.filePath)) {
        fs.unlinkSync(document.filePath); // Apaga o arquivo antigo
      }
      document.fileName = req.file.filename;
      document.filePath = req.file.path;
    }

    // Atualizar título e descrição
    document.title = title || document.title;
    document.description = description || document.description;
    await document.save();

    res.status(200).json({ message: 'Documento atualizado com sucesso', document });
  } catch (error) {
    console.error('Erro ao atualizar o documento:', error);
    res.status(500).json({ error: 'Erro ao atualizar o documento' });
  }
});

// Rota GET com filtros, paginação e ordenação
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, title, fileType, fileName, page = 1, limit = 20, sortField = 'createdAt', sortOrder = 'asc' } = req.query;
    const whereClause = {};

    // Filtro por data de edição
    if (startDate || endDate) {
      whereClause.updatedAt = {};
      if (startDate) whereClause.updatedAt[Op.gte] = new Date(startDate);
      if (endDate) whereClause.updatedAt[Op.lte] = new Date(endDate);
    }

    // Filtros por título e nome do arquivo
    if (title) whereClause.title = { [Op.like]: `%${title}%` };
    if (fileName) whereClause.fileName = { [Op.like]: `%${fileName}%` };

    // Filtro por tipo de arquivo
    if (fileType) whereClause.fileType = fileType;

    // Paginação e ordenação
    const offset = (page - 1) * limit;
    const options = {
      where: whereClause,
      order: [[sortField, sortOrder === 'desc' ? 'DESC' : 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    };

    const { count, rows } = await Document.findAndCountAll(options);
    const totalPages = Math.ceil(count / limit);

    res.status(200).json({
      count,
      next: page < totalPages ? `${req.protocol}://${req.get('host')}${req.baseUrl}/?page=${parseInt(page) + 1}&limit=${limit}` : null,
      previous: page > 1 ? `${req.protocol}://${req.get('host')}${req.baseUrl}/?page=${parseInt(page) - 1}&limit=${limit}` : null,
      results: rows,
    });
  } catch (error) {
    console.error('Erro ao listar documentos:', error);
    res.status(500).json({ error: 'Erro ao listar documentos' });
  }
});

// Rota para visualizar documento por ID
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error('Erro ao obter documento:', error);
    res.status(500).json({ error: 'Erro ao obter documento' });
  }
});

// Rota para download de documento
router.get('/download/:id', async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }

    const filePath = path.resolve(document.filePath);
    res.download(filePath, document.fileName);
  } catch (error) {
    console.error('Erro ao fazer download do arquivo:', error);
    res.status(500).json({ error: 'Erro ao fazer download do arquivo' });
  }
});

// Rota para visualizar o documento no navegador
router.get('/view/:id', async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) {
      return res.status(404).json({ error: 'Documento não encontrado' });
    }

    const filePath = path.resolve(document.filePath);
    res.sendFile(filePath);
  } catch (error) {
    console.error('Erro ao exibir o arquivo:', error);
    res.status(500).json({ error: 'Erro ao exibir o arquivo' });
  }
});

module.exports = router;
