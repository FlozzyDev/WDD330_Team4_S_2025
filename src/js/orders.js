import { loadHeaderFooter } from "./utils.mjs";
import { checkLogin } from "./auth.mjs";
import { getOrders } from "./externalServices.mjs";

loadHeaderFooter();
const token = checkLogin();

if (token) {
    async function displayOrders() {
        try {
            const orders = await getOrders(token);
            const ordersList = document.getElementById("orders-list");
            
            if (!orders || orders.length === 0) {
                ordersList.innerHTML = "<p>No orders found.</p>";
                return;
            }
            
            
            const ordersObjects = orders.map(order => `
                <div class="order-card">
                    <h3 id="order-id">Order #${order.id}</h3>
                    <div class="order-divider"></div>
                    <p id="order-name">${order.fname} ${order.lname}</p>
                    <p id="order-address">${order.street}, ${order.city}, ${order.state} ${order.zip}</p>
                    <p id="order-date">Date: ${new Date(order.orderDate).toLocaleDateString()}</p>
                    <p id="order-total">Total: $${order.orderTotal}</p>
                </div>
            `).join("");

            ordersList.innerHTML = ordersObjects;
        } catch (error) {
            console.error("Error loading orders:", error);
            document.getElementById("orders-list").innerHTML = 
                "<p>Error loading orders. Please try again later.</p>";
        }
    }

    displayOrders();
}
