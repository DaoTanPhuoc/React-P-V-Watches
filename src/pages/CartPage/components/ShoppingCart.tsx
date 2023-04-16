import React, { useEffect, useState } from "react";
import "../style/shoppingCart.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ProductModel } from "../../../models/ProductModel";
import axios from "axios";
import { Select } from "antd";

interface ShoppingCartProps {
  visibilty: boolean;
  onProductRemove: boolean;
  onClose: () => void;
  onQuantityChange: (id: number, value: number) => void;
}

function ShoppingCart({
  visibilty,

  onProductRemove,
  onClose,
  onQuantityChange,
}: ShoppingCartProps) {
  const [products, setProducts] = useState<ProductModel[]>([]);

  useEffect(() => {
    axios
      .get(`https://localhost:7182/api/Products`)
      .then((result) => {
        setProducts(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      className="modal"
      style={{
        display: visibilty ? "block" : "none",
      }}
    >
      <div className="shoppingCart">
        <div className="header">
          <h2>Shopping cart</h2>
          <button className="btn close-btn" onClick={onClose}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className="cart-products">
          {products.length === 0 && (
            <span className="empty-text">Your basket is currently empty</span>
          )}
          {/* {products.map((product) => (
            <div className="cart-product" key={product.Id}>
              <img src={product.Image} alt={product.Name} />
              <div className="product-info">
                <h3>{product.Name}</h3>
                <span className="product-price">
                  {product.Price * product.Count}$
                </span>
              </div>
              <Select
                className="count"
                value={product.Count}
                onChange={(value) => {
                  onQuantityChange(product.Id, value);
                }}
              >
                {[1, 2, 3, 4, 5].map((number) => {
                  const num = number + 1;
                  return (
                    <Select.Option value={num} key={num}>
                      {num}
                    </Select.Option>
                  );
                })}
              </Select>
              <button
                className="btn remove-btn"
                // onClick={() => onProductRemove(product)}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          ))} */}
          {products.length > 0 && (
            <button className="btn checkout-btn">Proceed to checkout</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
