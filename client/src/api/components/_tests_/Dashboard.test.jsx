import { render, screen } from '@testing-library/react';
import Dashboard from '../../pages/Dashboard';

test('renders tasks heading', ()=>{
  render(<Dashboard />);
  expect(screen.getByText(/tasks/i)).toBeInTheDocument();
});
