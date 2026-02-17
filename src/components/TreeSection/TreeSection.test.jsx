import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TreeSection from './TreeSection';

describe('TreeSection Component', () => {
  const mockData = [
    [
      {
        name: 'Node1',
        description: 'Test node 1',
        pointCap: 3,
        image: '/test.png',
      },
      {
        name: 'Node2',
        description: 'Test node 2',
        pointCap: 2,
        image: '/test.png',
      },
    ],
  ];

  const mockPointFuncts = {
    points: 10,
    increasePoints: () => {},
    decreasePoints: () => {},
  };

  it('displays section name in uppercase', () => {
    render(
      <TreeSection
        name="TestSection"
        direction="up"
        data={mockData}
        pointFuncts={mockPointFuncts}
      />
    );
    expect(screen.getByText('TESTSECTION')).toBeInTheDocument();
  });

  it('renders all nodes from data', () => {
    render(
      <TreeSection
        name="Test"
        direction="up"
        data={mockData}
        pointFuncts={mockPointFuncts}
      />
    );
    expect(screen.getByAltText('Node1')).toBeInTheDocument();
    expect(screen.getByAltText('Node2')).toBeInTheDocument();
  });
});

