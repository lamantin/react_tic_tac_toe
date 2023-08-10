import { render, screen } from '@testing-library/react';
import Game from './components/Game';

test('renders start game button', () => {
  render(<Game />);
  const buttonElement = screen.getByText(/Start the Game/i);
  expect(buttonElement).toBeInTheDocument();
});
