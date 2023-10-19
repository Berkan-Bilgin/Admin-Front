import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const Index = () => {
  return (
    <Container>
      <div className="text-center mt-5">
        <h1>Burası benim ana sayfam</h1>
        <div className="mt-4">
          <Link to="/login">
            <Button variant="primary" className="me-2">
              Giriş Yap
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="success">Kaydol</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Index;
