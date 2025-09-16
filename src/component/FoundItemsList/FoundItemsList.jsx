import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

function FoundItemsList({ token, onBackToHome, onBackToLogin, user }) {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchFoundItems = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const url = user
        ? `${process.env.REACT_APP_backendURI}/api/user/foundItem/${user.id}`
        : `${process.env.REACT_APP_backendURI}/api/default/foundItem`;

      const response = await axios.post(
        url,
        {
          current: 0,
          size: 10,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      setFoundItems(response?.data?.data || response?.data || []);
    } catch (error) {
      console.error("Failed to fetch found items:", error);
      if (error.response?.status === 401) {
        setErrorMessage("Unauthorized. Please login again.");
      } else {
        setErrorMessage("Failed to fetch found items. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    fetchFoundItems();
  }, [fetchFoundItems]);

  return (
    <Container className="lost-page">
      <div className="lost-page-header d-flex justify-content-between align-items-center mb-3">
        <h2>
          {user ? "Your Reported Items" : "Lost Items - Check Found Items"}
        </h2>
        <div className="header-actions">
          <Button
            onClick={fetchFoundItems}
            disabled={loading}
            variant="primary"
            className="me-2"
          >
            {loading ? <Spinner animation="border" size="sm" /> : "🔄 Refresh"}
          </Button>
          <Button onClick={onBackToHome} variant="secondary">
            ← Back to Home
          </Button>
        </div>
      </div>

      {loading && <p>Loading found items...</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {!loading && !errorMessage && foundItems.length === 0 && (
        <p>No found items available.</p>
      )}

      {!loading && !errorMessage && foundItems.length > 0 && (
        <Row xs={1} sm={2} md={3} className="g-3">
          {foundItems.map((item, index) => (
            <Col key={item.id || index}>
              <Card>
                <Card.Body>
                  <Card.Title>{item.name || "Unnamed Item"}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Qty: {item.quantity || 1}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Description:</strong>{" "}
                    {item.description || "No description available"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Location:</strong>{" "}
                    {item.location || "Not specified"}
                  </Card.Text>
                  {item.user && (
                    <Card.Text>
                      <strong>Found by:</strong> {item.user}
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!token && (
        <div className="text-center mb-4">
          <Button variant="success" size="sm" onClick={onBackToLogin}>
            Login to Search More
          </Button>
        </div>
      )}
    </Container>
  );
}

export default FoundItemsList;