import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.use(requireAuth);

router.get('/sync', async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    // Mocking an eBay sync process
    // In a real scenario, we would call the eBay API using OAuth tokens stored for the user
    
    // Simulate finding items that aren't listed and creating draft listings
    const unlistedItems = await prisma.item.findMany({
      where: {
        userId,
        listings: { none: {} }
      }
    });

    const newListings = [];
    for (const item of unlistedItems) {
      const listing = await prisma.listing.create({
        data: {
          itemId: item.id,
          status: 'ACTIVE', // Mocking that they became active on eBay
          price: item.price !== null ? item.price * 1.1 : 0, // Mock 10% markup
          ebayId: `EBAY-${Math.floor(Math.random() * 1000000)}`
        }
      });
      newListings.push(listing);
    }

    res.json({ message: 'Sync complete', new_listings_count: newListings.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to sync listings' });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const { id } = req.params;
    const { status } = req.body;

    const listing = await prisma.listing.findFirst({
      where: {
        id,
        item: { userId }
      }
    });

    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    const updated = await prisma.listing.update({
      where: { id },
      data: { status }
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update listing status' });
  }
});

export default router;
