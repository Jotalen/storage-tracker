import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

router.get('/summary', async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;

    const totalItemsCount = await prisma.item.count({ where: { userId } });
    
    // Summing quantities
    const items = await prisma.item.findMany({ where: { userId }, select: { quantity: true, price: true } });
    const totalQuantity = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
    const estimatedValue = items.reduce((sum: number, item: any) => sum + (item.quantity * (item.price || 0)), 0);

    const activeListings = await prisma.listing.count({
      where: {
        item: { userId },
        status: 'ACTIVE'
      }
    });

    // We can add mock historical data for the dashboard chart
    const historicalData = [
      { date: '2026-03-01', value: 100 },
      { date: '2026-03-02', value: 120 },
      { date: '2026-03-03', value: 140 },
      { date: '2026-03-04', value: 130 },
      { date: '2026-03-05', value: 150 },
      { date: '2026-03-06', value: 170 },
      { date: '2026-03-07', value: 160 },
    ];
    
    const projectedData = [
      { date: '2026-03-07', value: 160 },
      { date: '2026-03-08', value: 180 },
      { date: '2026-03-09', value: 190 },
      { date: '2026-03-10', value: 210 },
    ];

    res.json({
      totalSkus: totalItemsCount,
      totalQuantity,
      estimatedValue,
      activeListings,
      historicalData,
      projectedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dashboard summary' });
  }
});

export default router;
