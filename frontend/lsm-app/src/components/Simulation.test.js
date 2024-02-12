import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Simulation from './Simulation'; 

describe('Simulation Component', () => {
  test('renders the Simulation page correctly', () => {
    render(<Simulation />, { wrapper: BrowserRouter });

    expect(screen.getByRole('heading')).toHaveTextContent('This is the Simulation page');
    expect(screen.getByText('This is a text massage.')).toBeInTheDocument();
  });
});
