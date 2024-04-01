import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'; // Importing screen along with render and fireEvent
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import Compaction from './Compaction';
import Memtable from './Memtable';
import NavigationBar from './NavigationBar';
import SSTable from './SSTable';
import Components from './Components';
import Landing from './Landing';
import Simulation from './Simulation';
import TransLogs from './TransLogs';

describe('Compaction component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Compaction />, { wrapper: MemoryRouter });
    expect(getByText('Understanding Compaction in LSM Trees')).toBeInTheDocument();
  });

  // You can add more tests to check specific elements or behaviors
});

describe('Memtable component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<Memtable />, { wrapper: MemoryRouter });
    expect(getByText('Understanding Memtables in LSM Trees')).toBeInTheDocument();
  });

  // You can add more tests to check specific elements or behaviors
});

describe('NavigationBar component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<NavigationBar />, { wrapper: MemoryRouter });
    expect(getByText('LSM Web App')).toBeInTheDocument();
  });

  test('clicking navigation buttons works correctly', () => {
    const { getByText } = render(<NavigationBar />, { wrapper: MemoryRouter });
    fireEvent.click(getByText('Components'));
    expect(getByText('Memtable')).toBeInTheDocument();
    // Add more assertions to test navigation behavior
  });

  // You can add more tests to check specific elements or behaviors
});

describe('SSTable component', () => {
  test('renders correctly', () => {
    const { getByText } = render(<SSTable />, { wrapper: MemoryRouter });
    expect(getByText('Understanding SSTables in LSM Trees')).toBeInTheDocument();
  });

  // You can add more tests to check specific elements or behaviors
});

describe('Components Component', () => {
    test('renders the Components page correctly', () => {
      const { getByText } = render(<Components />, { wrapper: BrowserRouter }); // Fixing getByText
      expect(getByText('Understanding LSM Trees')).toBeInTheDocument(); // Fixing getByText
    });
});

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));
  
describe('Landing Component', () => {
    test('renders with buttons and navigates correctly', async () => {
      const { getByText, getByRole } = render(<Landing />, { wrapper: MemoryRouter });
      
      // Check if the main header is rendered
      expect(getByText('LSM Web App')).toBeInTheDocument();
      
      // Define the buttons and simulate clicks
      const transactionLogsButton = getByRole('button', { name: 'Transaction Logs' });
      const componentsButton = getByRole('button', { name: 'Components' });
      const simulationButton = getByRole('button', { name: 'Simulation' });
  
      // Mock navigate function to verify it's called with the correct paths
      const navigate = jest.fn();
  
      fireEvent.click(transactionLogsButton);
      expect(navigate).toHaveBeenCalledWith("/trans-logs");
  
      fireEvent.click(componentsButton);
      expect(navigate).toHaveBeenCalledWith("/components");
  
      fireEvent.click(simulationButton);
      expect(navigate).toHaveBeenCalledWith("/simulation");
    });
});

describe('Simulation Component', () => {
    test('renders the Simulation page correctly', () => {
      render(<Simulation />, { wrapper: BrowserRouter });
  
      expect(screen.getByRole('heading')).toHaveTextContent('This is the Simulation page');
      expect(screen.getByText('This is a text message.')).toBeInTheDocument(); // Fixing the typo
    });
});


describe('TransLogs Component', () => {
    test('renders correctly', () => {
      render(<TransLogs />, { wrapper: BrowserRouter });
      
      // Check if the heading is rendered
      expect(screen.getByRole('heading', { name: 'Understanding Transaction Logs' })).toBeInTheDocument();
  
    });
});
