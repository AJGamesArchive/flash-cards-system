import { render } from '@testing-library/react';
import HelloWorld from "../../components/HelloWorld";

test('render the Hello World component', () => {
  const { getByText } = render(<HelloWorld />);
  const headingElement = getByText(/Hello, Vite, React & TypeScript!/i);
  expect(headingElement).toBeInTheDocument();
});