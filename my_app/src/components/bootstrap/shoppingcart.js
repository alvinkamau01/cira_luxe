import React, { useState } from 'react';
import './css/shoppingcart.css'; // Import the CSS file
import { Offcanvas, Button, Image, ListGroup, Row, Col } from 'react-bootstrap';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
];

export default function ShoppingCart() {
  const [show, setShow] = useState(false);
  

  const handleClose = () => {
    setShow(false);
  

  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Open Shopping Cart
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="shopping-cart-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            {products.map((product) => (
              <ListGroup.Item key={product.id} className="cart-item">
                <Row>
                  <Col xs={4}>
                    <Image
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      fluid
                      rounded
                      className="product-image"
                    />
                  </Col>
                  <Col xs={8}>
                    <h5 className="product-name">{product.name}</h5>
                    <p className="text-muted">{product.color}</p>
                    <p className="product-price">{product.price}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Qty: {product.quantity}</span>
                      <Button variant="link" className="text-danger p-0">
                        Remove
                      </Button>
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <span className="subtotal-label">Subtotal:</span>
              <span className="subtotal-value">$262.00</span>
            </div>
            <p className="text-muted small text-center">
              Shipping and taxes calculated at checkout.
            </p>
            <Button variant="success" className="w-100">
              Checkout
            </Button>
          </div>
          <Button variant="link" className="mt-3 text-primary w-100" onClick={handleClose}>
            Continue Shopping →
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
