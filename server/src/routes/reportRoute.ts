import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

router.get('/export', async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;

    const items = await prisma.item.findMany({
      where: { userId },
      include: { storageBin: true, listings: true },
      orderBy: { createdAt: 'desc' }
    });

    // Create a simple CSV representation as string
    const headers = ['SKU', 'Name', 'Quantity', 'Price', 'Condition', 'Storage Bin', 'Listings Count'];
    const rows = items.map((i: any) => [
      i.sku,
      `"${i.name.replace(/"/g, '""')}"`,
      i.quantity.toString(),
      i.price?.toString() || '',
      i.condition || '',
      `"${i.storageBin?.name.replace(/"/g, '""') || 'Unassigned'}"`,
      i.listings.length.toString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((r: any) => r.join(','))
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="inventory_report.csv"');
    res.send(csvContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to export report' });
  }
});

export default router;
