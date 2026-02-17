import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Node from './Node';

describe('Node Component', () => {
  const defaultProps = {
    name: 'TestNode',
    description: 'Test node description',
    pointCap: 3,
    image: '/test-image.png',
    increaseTotal: vi.fn(),
    decreaseTotal: vi.fn(),
    points: 5,
  };

  it('renders with initial count of 0', () => {
    render(<Node {...defaultProps} />);
    expect(screen.getByText('0/3')).toBeInTheDocument();
  });

  it('does not exceed pointCap', () => {
    render(<Node {...defaultProps} />);
    const increaseBtn = screen.getByLabelText('Increase TestNode');

    // Click increase 4 times (should cap at 3)
    fireEvent.click(increaseBtn);
    fireEvent.click(increaseBtn);
    fireEvent.click(increaseBtn);
    fireEvent.click(increaseBtn);

    expect(screen.getByText('3/3')).toBeInTheDocument();
  });
});

