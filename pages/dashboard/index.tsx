import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useSession } from "contexts/Session";
import { useToast } from "contexts/Toast";

const Dashboard = () => {
  const { user } = useSession();
  const { toast } = useToast();

  const [startDate, setStartDate] = useState(() => Date.now().toString());
  const [endDate, setEndDate] = useState(() => Date.now().toString());

  const today = new Date();

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    const selectedStartDate = new Date(startDate);
    const selectedEndDate = new Date(endDate);

    const nonWeekendDates = [];

    for (
      let date = selectedStartDate;
      date <= selectedEndDate;
      date.setDate(date.getDate() + 1)
    ) {
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        nonWeekendDates.push(date);
      }
    }

    const canUserUseVacation =
      Number(user?.dayLimit) - nonWeekendDates.length > 0;

    if (canUserUseVacation) {
      return toast({
        text: "Your permission request has been submitted.",
        type: "success",
      });
    }
    toast({
      text: "You do not have sufficient leave balance.",
      type: "danger",
    });
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={12}>
          <h2 className="text-center mt-3 mb-3">Vacation Leave Form</h2>
        </Col>
        <Col lg={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              className="mb-3"
              type="date"
              value={startDate}
              min={today.toISOString().split("T")[0]}
              onChange={(ev) => setStartDate(ev.target.value)}
              required
            />
            <Form.Label>End Date</Form.Label>
            <Form.Control
              className="mb-3"
              type="date"
              value={endDate}
              min={today.toISOString().split("T")[0]}
              onChange={(ev) => setEndDate(ev.target.value)}
              required
            />
            <div className="d-grid">
              <Button type="submit" variant="primary">
                Proceed
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Dashboard;
