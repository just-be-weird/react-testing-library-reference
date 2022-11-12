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

test('Initial conditions', () => {
  // Button starts out enabled
  render(<App/>);

  const colorButton = screen.getByRole('button', {name: /change to blue/i});
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole('checkbox', {});
  expect(checkbox).not.toBeChecked();
});

test('Checkbox toggles enable or disables the button', () => {
  render(<App/>);

  const button = screen.getByRole('button', {});
  // On click, checkbox gets checked and button is disabled
  const checkbox = screen.getByRole('checkbox', {name: /disable the button/i});
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  // On click, checkbox gets unchecked and the button is enabled
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test('Checkbox toggle enable or disables the button with color change for disable it should be gray', () => {
  render(<App/>);

  const button = screen.getByRole('button', {});
  // On click, checkbox gets checked and button is disabled
  const checkbox = screen.getByRole('checkbox', {name: /disable the button/i});
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
  expect(button).toHaveStyle({backgroundColor: 'gray'});

  // On click, checkbox gets unchecked and the button is enabled
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
  expect(button).toHaveStyle({backgroundColor: 'red'});
});
