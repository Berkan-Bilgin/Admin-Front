import { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Burada kayıt doğrulaması ve/veya API çağrısı yapabilirsiniz
    console.log('Name:', name, 'Email:', email, 'Password:', password);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Adınız</Form.Label>
              <Form.Control type="text" placeholder="Adınızı girin" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email adresi</Form.Label>
              <Form.Control type="email" placeholder="Email girin" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Şifre</Form.Label>
              <Form.Control type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Kaydol
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupForm;
