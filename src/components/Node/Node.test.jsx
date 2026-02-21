/*
 * Node.test.jsx - Tests for the Node component.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Node from './Node';
import DummyImage from '../../test/helpers/dummyImage.jsx';

describe('Node Component', () => {
  const nodeData = {
    name: 'TestNode',
    description: 'Test node description',
    pointCap: 3,
    image: DummyImage,
  };

  it('renders with initial count of 0', () => {
    render(<Node nodeData={nodeData} increaseTotal={vi.fn()} decreaseTotal={vi.fn()} points={5} />);
    expect(screen.getByText('0/3')).toBeInTheDocument();
  });

  it('does not exceed pointCap', () => {
    render(<Node nodeData={nodeData} increaseTotal={vi.fn()} decreaseTotal={vi.fn()} points={5} />);
    const increaseBtn = screen.getByLabelText('Increase TestNode');

    // Click increase 4 times (should cap at 3)
    fireEvent.click(increaseBtn);
    fireEvent.click(increaseBtn);
    fireEvent.click(increaseBtn);
    fireEvent.click(increaseBtn);

    expect(screen.getByText('3/3')).toBeInTheDocument();
  });

  it('calls unlockNodeByName for each unlock target when count increases from 0 to 1', () => {
    const unlockNodeByName = vi.fn();
    const nodeDataWithUnlocks = {
      ...nodeData,
      unlocks: ['NodeB', 'NodeC'],
    };
    render(
      <Node
        nodeData={nodeDataWithUnlocks}
        increaseTotal={vi.fn()}
        decreaseTotal={vi.fn()}
        points={5}
        registerLockSetter={() => {}}
        unregisterLockSetter={() => {}}
        unlockNodeByName={unlockNodeByName}
        lockNodeByName={() => {}}
      />
    );
    const increaseBtn = screen.getByLabelText('Increase TestNode');
    fireEvent.click(increaseBtn);
    expect(unlockNodeByName).toHaveBeenCalledWith('NodeB');
    expect(unlockNodeByName).toHaveBeenCalledWith('NodeC');
  });

  it('calls lockNodeByName for each unlock target when count decreases from 1 to 0', () => {
    const lockNodeByName = vi.fn();
    const nodeDataWithUnlocks = {
      ...nodeData,
      unlocks: ['NodeB', 'NodeC'],
    };
    render(
      <Node
        nodeData={nodeDataWithUnlocks}
        increaseTotal={vi.fn()}
        decreaseTotal={vi.fn()}
        points={5}
        registerLockSetter={() => {}}
        unregisterLockSetter={() => {}}
        unlockNodeByName={() => {}}
        lockNodeByName={lockNodeByName}
      />
    );
    const increaseBtn = screen.getByLabelText('Increase TestNode');
    const decreaseBtn = screen.getByLabelText('Decrease TestNode');
    fireEvent.click(increaseBtn); // count: 1
    fireEvent.click(decreaseBtn); // count: 0
    expect(lockNodeByName).toHaveBeenCalledWith('NodeB');
    expect(lockNodeByName).toHaveBeenCalledWith('NodeC');
  });
});
