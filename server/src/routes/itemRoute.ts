import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const items = await prisma.item.findMany({
      where: { userId },
      include: { storageBin: true, listings: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

router.post('/', async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { sku, name, description, quantity, price, condition, storageBinId } = req.body;

    const existingItem = await prisma.item.findUnique({ where: { sku } });
    if (existingItem) {
      return res.status(400).json({ error: 'Item with this SKU already exists' });
    }

    const item = await prisma.item.create({
      data: {
        sku,
        name,
        description,
        quantity: quantity || 0,
        price,
        condition,
        storageBinId,
        userId
      }
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { id } = req.params;
    const { name, description, quantity, price, condition, storageBinId } = req.body;

    const item = await prisma.item.findFirst({ where: { id, userId } });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const updatedItem = await prisma.item.update({
      where: { id },
      data: { name, description, quantity, price, condition, storageBinId }
    });

    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { id } = req.params;

    const item = await prisma.item.findFirst({ where: { id, userId } });
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await prisma.item.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

export default router;
