import {  Alert } from 'react-bootstrap';

function FooterNotice() {
  return (
    <Alert
      variant="warning"
      className="text-center fixed-bottom mb-0"
      style={{ borderRadius: 0 }}
    >
      ⚠️ This is an ongoing project
    </Alert>
  );
}

export default FooterNotice;