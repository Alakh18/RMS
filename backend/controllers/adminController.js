// backend/controllers/adminController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); //

// GET: Fetch all users with pagination and search
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 6, search = '' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const whereClause = {
      OR: [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ],
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
        companyName: true,
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

// DELETE: Remove a user from the system
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// PATCH: Update user role (e.g. Promote Customer to Vendor)
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body; // Expecting { role: 'VENDOR' } or 'ADMIN'

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { role },
    });

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

module.exports = { getAllUsers, deleteUser, updateUser };