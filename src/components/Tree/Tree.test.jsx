import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tree from './Tree';

describe('Tree Component', () => {

  it('displays all three tree sections', () => {
    render(<Tree />);
    expect(screen.getByText('MOBILITY')).toBeInTheDocument();
    expect(screen.getByText('CONDITIONING')).toBeInTheDocument();
    expect(screen.getByText('SURVIVAL')).toBeInTheDocument();
  });

  it('initializes with default points value', () => {
    render(<Tree />);
    const pointsText = screen.getByText('Points available: 76');
    expect(pointsText).toBeInTheDocument();
  });
});


