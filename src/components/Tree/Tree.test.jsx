import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DummyImage from '../../test/helpers/dummyImage.jsx';

// Mock the data modules to use dummy data
vi.mock('../../data/mobilityData.js', function() {
  return { default: [[{ name: 'MobilityNode', image: DummyImage, pointCap: 1 }]] };
});
vi.mock('../../data/conditioningData.js', function() {
  return { default: [[{ name: 'ConditioningNode', image: DummyImage, pointCap: 1 }]] };
});
vi.mock('../../data/survivalData.js', function() {
  return { default: [[{ name: 'SurvivalNode', image: DummyImage, pointCap: 1 }]] };
});

import Tree from './Tree';

describe('Tree Component', () => {
  const dummyPointFuncts = {
    points: 76,
    increasePoints: () => {},
    decreasePoints: () => {},
  };

  it('displays all three tree sections', () => {
    render(<Tree pointFuncts={dummyPointFuncts} />);
    expect(screen.getByText('MOBILITY')).toBeInTheDocument();
    expect(screen.getByText('CONDITIONING')).toBeInTheDocument();
    expect(screen.getByText('SURVIVAL')).toBeInTheDocument();
  });

  it('initializes with default points value', () => {
    render(<Tree pointFuncts={dummyPointFuncts} />);
    expect(dummyPointFuncts.points).toBe(76);
  });
});
