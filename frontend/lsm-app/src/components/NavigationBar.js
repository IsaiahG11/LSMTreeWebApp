import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLSMActive, setIsLSMActive] = useState(false);
    const [isComponentsActive, setIsComponentsActive] = useState(false);
    const [buttonsVisibility, setButtonsVisibility] = useState('hidden');

    useEffect(() => {
        const currentPath = location.pathname;
        const componentPages = ["/components", "/components/memtable", "/components/sstable", "/components/compaction"];

        setButtonsVisibility(componentPages.includes(currentPath) ? 'shown' : 'hidden');
        setIsLSMActive(currentPath === "/");
        setIsComponentsActive(componentPages.includes(currentPath));
    }, [location]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const subCompButtons = [
        { path: "/components/memtable", label: "Memtable" },
        { path: "/components/sstable", label: "SSTable" },
        { path: "/components/compaction", label: "Compaction" }
    ];

    const underlineStyle = {
        borderBottom: `2px solid ${isComponentsActive ? 'blue' : 'black'}` // Underline color changes based on the Components button's active state
    };

    return (
        <Navbar bg="secondary" expand="lg">
            <Container fluid>
                <Navbar.Brand as="button" className={`btn btn-outline-primary fw-bold ${isLSMActive ? 'active' : ''}`} onClick={() => handleNavigate("/")}>LSM Web App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="btn btn-outline-primary me-2" onClick={() => handleNavigate("/trans-logs")} active={location.pathname === "/trans-logs"}>Transaction Logs</Nav.Link>
                        <Nav.Link className={`btn ${isComponentsActive ? 'btn-primary' : 'btn-outline-primary'} me-2`} onClick={() => handleNavigate("/components")} active={isComponentsActive}>Components</Nav.Link>
                        <div style={{ display: buttonsVisibility === 'shown' ? 'flex' : 'none', alignItems: 'center', transition: 'opacity 0.4s ease', opacity: buttonsVisibility === 'hiding' ? 0 : 1 }}>
                            {subCompButtons.map(({ path, label }) => (
                                <Nav.Link key={path} className="btn btn-outline-primary me-2" onClick={() => handleNavigate(path)} active={location.pathname === path} style={underlineStyle}>
                                    {label}
                                </Nav.Link>
                            ))}
                        </div>
                        <Nav.Link className="btn btn-outline-primary me-2" onClick={() => handleNavigate("/simulation")} active={location.pathname === "/simulation"}>Simulation</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
