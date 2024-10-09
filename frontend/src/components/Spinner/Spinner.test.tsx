import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
import '@testing-library/jest-dom';

describe('Spinner', () => {
  test('Render correctly', () => {
    render(<Spinner />);
    const containerDiv = screen.getByTestId('spin-container');
    expect(containerDiv).toBeInTheDocument();

    const innerDiv = screen.getByTestId('inner-container');
    expect(innerDiv).toBeInTheDocument();
  });
});
