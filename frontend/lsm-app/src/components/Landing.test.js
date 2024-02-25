import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Landing from './Landing';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Landing Component', () => {
  test('renders with buttons and navigates correctly', async () => {
    render(<Landing />, { wrapper: BrowserRouter });
    
    // Check if the main header is rendered
    expect(screen.getByRole('heading', { name: 'LSM Web App' })).toBeInTheDocument();
    
    // Define the buttons and simulate clicks
    const transactionLogsButton = screen.getByRole('button', { name: 'Transaction Logs' });
    const componentsButton = screen.getByRole('button', { name: 'Components' });
    const simulationButton = screen.getByRole('button', { name: 'Simulation' });

    // Mock navigate function to verify it's called with the correct paths
    const navigate = useNavigate();

    userEvent.click(transactionLogsButton);
    expect(navigate).toHaveBeenCalledWith("/trans-logs");

    userEvent.click(componentsButton);
    expect(navigate).toHaveBeenCalledWith("/components");

    userEvent.click(simulationButton);
    expect(navigate).toHaveBeenCalledWith("/simulation");
  });
});
