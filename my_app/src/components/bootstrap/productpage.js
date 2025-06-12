import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/productpage.css';
import {
  Container,
  Row,
  Col,
  Breadcrumb,
  Button,
  Form,
  Badge,
  Offcanvas,
  ListGroup,
  Image,
} from 'react-bootstrap';

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black tee.',
    },
    {
      src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray tee.',
    },
    {
      src: 'https://tailwindui.com/plus/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white tee.',
    },
  ],
  colors: ['White', 'Gray', 'Black'],
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
  description: 'Express your vibrant personality with this versatile 6-pack of tees.',
  highlights: ['100% cotton', 'Pre-washed', 'Locally hand-sewn'],
  details: 'Includes two black, two white, and two gray tees.',
};

const ProductPage = () => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate();

  const handleAddToBag = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const handleCheckout = () => {
    navigate('/paymentpage');
  };

  return (
    <>
      <Container className="product-page">
        {/* Breadcrumb */}
        <Breadcrumb>
          {product.breadcrumbs.map((crumb) => (
            <Breadcrumb.Item href={crumb.href} key={crumb.id}>
              {crumb.name}
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>

        {/* Product Details */}
        <Row>
          <Col md={6} className="product-gallery">
            <img src={product.images[0].src} alt={product.images[0].alt} className="main-image" />
            <Row className="mt-3">
              {product.images.slice(1).map((img, index) => (
                <Col key={index}>
                  <img src={img.src} alt={img.alt} className="thumbnail" />
                </Col>
              ))}
            </Row>
          </Col>

          <Col md={6}>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">{product.price}</p>

            <h5>Colors</h5>
            <div className="color-options">
              {product.colors.map((color) => (
                <Badge
                  key={color}
                  pill
                  bg={selectedColor === color ? 'primary' : 'secondary'}
                  className="color-badge"
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Badge>
              ))}
            </div>

            <h5 className="mt-4">Sizes</h5>
            <Form.Select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {product.sizes.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </Form.Select>

            <Button variant="primary" className="mt-4 w-100" onClick={handleAddToBag}>
              Add to Bag
            </Button>
          </Col>
        </Row>

        {/* Description */}
        <Row className="mt-5">
          <Col>
            <h3>Description</h3>
            <p>{product.description}</p>

            <h5>Highlights</h5>
            <ul>
              {product.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>

            <h5>Details</h5>
            <p>{product.details}</p>
          </Col>
        </Row>
      </Container>

      {/* Sidebar for Add to Bag */}
      <Offcanvas show={showSidebar} onHide={handleCloseSidebar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Bag</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col xs={4}>
                  <Image src={product.images[0].src} alt={product.images[0].alt} fluid rounded />
                </Col>
                <Col xs={8}>
                  <h5>{product.name}</h5>
                  <p className="text-muted">Color: {selectedColor}</p>
                  <p className="text-muted">Size: {selectedSize}</p>
                  <p className="product-price">{product.price}</p>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
          <Button variant="success" className="w-100 mt-3" onClick={handleCheckout}>
            Checkout
          </Button>
          <Button variant="link" className="w-100 mt-2" onClick={handleCloseSidebar}>
            Continue Shopping →
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ProductPage;
