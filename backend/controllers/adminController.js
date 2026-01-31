// backend/controllers/adminController.js
const prisma = require('../src/prisma');

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 6, search = '' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Filter logic: Search by Name or Email
    const whereClause = {
      OR: [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
      // Optional: If you only want to show Customers in this specific view
      // role: 'CUSTOMER' 
    };

    const users = await prisma.user.findMany({
      where: whereClause,
      skip: skip,
      take: parseInt(limit),
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        companyName: true, // Useful if they are vendors
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const totalUsers = await prisma.user.count({ where: whereClause });

    res.json({
      users,
      totalPages: Math.ceil(totalUsers / parseInt(limit)),
      currentPage: parseInt(page),
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllUsers };