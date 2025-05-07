
import { getParam } from "./utils.mjs";
import getProductDetails from "./productDetails.mjs";

const productId = getParam("product");
getProductDetails(productId);
