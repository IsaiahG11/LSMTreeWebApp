import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Components from './Components';

describe('Components Component', () => {
  test('renders the Components page correctly', () => {
    render(<Components />, { wrapper: BrowserRouter });

    expect(screen.getByRole('heading')).toHaveTextContent('This is the Components page');
    expect(screen.getByText('This is a text.')).toBeInTheDocument();
  });
});
