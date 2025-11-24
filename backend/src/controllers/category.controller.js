const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  try {
    const category = await prisma.category.create({ data: { name: req.body.name } });
    res.json(category);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
};
