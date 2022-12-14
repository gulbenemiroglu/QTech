import {Navbar as BSNavbar, Container, Button, Row} from "react-bootstrap";
import {useSession} from "contexts/Session";

const Navbar = () => {
    const {logout} = useSession();
    return (
        <BSNavbar id="navbar" bg="light" className="px-5">
            <Container>
                <Row>
                    <Button variant="outline-dark" onClick={logout}>
                        Logout
                    </Button>
                </Row>
            </Container>
        </BSNavbar>
    )
}

export default Navbar;