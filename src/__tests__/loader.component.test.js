import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Loader from '../components/Utils/Loader/loader.component';

afterAll(cleanup);

it('renders without crashing', () => {
  const { container } = render(<Loader />);

  expect(container).toBeTruthy();
});
