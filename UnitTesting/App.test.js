import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../src/Components/home/Home';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/best place to find and explore that all you need/);
  expect(linkElement).toBeInTheDocument();
});
