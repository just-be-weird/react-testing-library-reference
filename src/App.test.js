import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

test('Button has correct initial color', () => {
  render(<App/>);
  const linkElement = screen.getByRole('button', {name: /change to blue/i});
  expect(linkElement).toHaveStyle({backgroundColor: 'red'});
});

test('Button has correct initial text', () => {
  render(<App/>);
  // Find the element
  const colorButton = screen.getByRole('button', {name: /change to blue/i});
  // click the button
  fireEvent.click(colorButton)
  expect(colorButton).toHaveStyle({backgroundColor: 'blue'});
  expect(colorButton).toHaveTextContent(/change to red/i);
});
