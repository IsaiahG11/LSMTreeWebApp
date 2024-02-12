import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import TransLogs from './TransLogs';

describe('TransLogs Component', () => {
  test('renders correctly', () => {
    render(<TransLogs />, { wrapper: BrowserRouter });
    
    // Check if the heading is rendered
    expect(screen.getByRole('heading', { name: 'This is the Transaction Logs page' })).toBeInTheDocument();

  });
});
