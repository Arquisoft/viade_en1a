import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('Home link', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/Welcome back/i);
  expect(linkElement).toBeInTheDocument();
});
