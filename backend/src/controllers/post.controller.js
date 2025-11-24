const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const { title, content, categoryId } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        image,
        categoryId: Number(categoryId),
        authorId: req.user.userId,
      },
    });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  const { category } = req.query;
  const where = category ? { categoryId: Number(category) } : {};
  const posts = await prisma.post.findMany({
    where,
    include: { author: true, category: true, comments: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json(posts);
};

exports.detail = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true, category: true, comments: { include: { user: true } } },
  });
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
};
