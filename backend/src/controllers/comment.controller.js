const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const { content, postId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
        userId: req.user.userId,
      },
    });
    res.json(comment);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.listByPost = async (req, res) => {
  const postId = Number(req.params.postId);
  const comments = await prisma.comment.findMany({
    where: { postId },
    include: { user: true },
    orderBy: { createdAt: 'asc' }
  });
  res.json(comments);
};
