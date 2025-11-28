import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No hay items para procesar." });
    }

    const newOrder = await Order.create({
      user: req.user._id,
      items,
      total
    });

    res.status(201).json({
      message: "Pedido creado correctamente",
      order: newOrder
    });
  } catch (error) {
    console.error("Error creando pedido:", error);
    res.status(500).json({ message: "Error del servidor." });
  }
};
