import express from "express"
const app = express();
const PORT = 1245;
import { createClient } from "redis";
const client = createClient();

const listProducts = [
	{itemId: 1, itemName: "Suitcase 250", price: 50, initialAvailableQuantity: 4},
	{itemId: 2, itemName: "Suitcase 450", price: 100, initialAvailableQuantity: 10},
	{itemId: 3, itemName: "Suitcase 650", price: 350, initialAvailableQuantity: 2},
	{itemId: 4, itemName: "Suitcase 1050", price: 550, initialAvailableQuantity: 5}
];


function getItemById(id) {
	return listProducts.find((product) => product.Id === id);
}

async function reserveStockById(itemId, stock) {
	await client.set(`item.${itemId}`, stock);
}

async function getCurrentReservedStockById(itemId) {
	const stock = await client.get(`item.${itemId}`);
	return stock ? parseInt(stock, 10) : null;
}

app.get('/list_products', (req, res) => {
	res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
	const itemId = parseInt(req.params.itemId, 10);
	const product = listProducts.find(item => item.itemId === itemId);

	if (!product) {
		return res.json({status:"Product not found"});
	}

	const reservedStock = await getCurrentReservedStockById(itemId);
	const availableStock = product.initialAvailableQuantity - (reservedStock || 0);

	return res.json({
		itemId: product.id,
		itemName: product.itemName,
		price: product.price,
		initialAvailableQuantity: product.initialAvailableQuantity,
		currentQuantity: availableStock
	});

});

app.get('/reserve_product/:itemId', async (req, res) => {
	const itemId = parseInt(req.params.itemId, 10);
	const product = listProducts.find(item => item.itemId === itemId);

	if (!product) {
		return res.json({status:"Product not found"});
	}

	const reservedStock = await getCurrentReservedStockById(itemId);
	const availableStock = product.initialAvailableQuantity - (reservedStock || 0);
	if (availableStock <= 0) {
		return res.json({status:`Not enough stock available, itemId:${itemId}`});
	}

	await reserveStockById(itemId, reserveStockById + 1)
	return res.json({ status: "Reservation confirmed", itemId });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
