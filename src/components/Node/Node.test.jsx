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
  const baseNodeData = {
    name: 'TestNode',
    description: 'Test node description',
    pointCap: 3,
    pointLock: 0,
    image: DummyImage,
  };

  it('renders with initial count of 0', () => {
    render(
      <Node
        nodeData={baseNodeData}
        points={5}
        total={0}
        locked={false}
        highlight="limegreen"
        openNodeName={null}
        setOpenNodeName={vi.fn()}
        spendPoints={vi.fn()}
        refundPoints={vi.fn()}
        unlockNodeByName={vi.fn()}
        lockNodeByName={vi.fn()}
        onSectionTotalChange={vi.fn()}
      />
    );
    expect(screen.getByText('0/3')).toBeInTheDocument();
  });

  it('does not increase count if at pointCap', () => {
    render(
      <Node
        nodeData={baseNodeData}
        points={5}
        total={0}
        locked={false}
        highlight="limegreen"
        openNodeName={null}
        setOpenNodeName={vi.fn()}
        spendPoints={vi.fn()}
        refundPoints={vi.fn()}
        unlockNodeByName={vi.fn()}
        lockNodeByName={vi.fn()}
        onSectionTotalChange={vi.fn()}
      />
    );
    const increaseBtn = screen.getByLabelText('Increase TestNode');
    // Click 4 times (should cap at 3)
    for (let i = 0; i < 4; i++) {
      fireEvent.click(increaseBtn);
    }
    expect(screen.getByText('3/3')).toBeInTheDocument();
  });

  it('calls unlockNodeByName for each unlock target when increasing from 0', () => {
    const unlockNodeByName = vi.fn();
    const onSectionTotalChange = vi.fn();
    const nodeDataWithUnlocks = {
      ...baseNodeData,
      unlocks: ['NodeB', 'NodeC'],
    };
    render(
      <Node
        nodeData={nodeDataWithUnlocks}
        points={5}
        total={0}
        locked={false}
        unlockNodeByName={unlockNodeByName}
        lockNodeByName={vi.fn()}
        highlight="limegreen"
        openNodeName={null}
        setOpenNodeName={vi.fn()}
        spendPoints={vi.fn()}
        refundPoints={vi.fn()}
        onSectionTotalChange={onSectionTotalChange}
      />
    );
    const increaseBtn = screen.getByLabelText('Increase TestNode');
    fireEvent.click(increaseBtn);
    expect(unlockNodeByName).toHaveBeenCalledWith('NodeB');
    expect(unlockNodeByName).toHaveBeenCalledWith('NodeC');
    expect(onSectionTotalChange).toHaveBeenCalledWith(1);
  });

  it('calls lockNodeByName for each unlock target when decreasing from 1', () => {
    const lockNodeByName = vi.fn();
    const onSectionTotalChange = vi.fn();
    const nodeDataWithUnlocks = {
      ...baseNodeData,
      unlocks: ['NodeB', 'NodeC'],
    };
    render(
      <Node
        nodeData={nodeDataWithUnlocks}
        points={5}
        total={0}
        locked={false}
        unlockNodeByName={vi.fn()}
        lockNodeByName={lockNodeByName}
        highlight="limegreen"
        openNodeName={null}
        setOpenNodeName={vi.fn()}
        spendPoints={vi.fn()}
        refundPoints={vi.fn()}
        onSectionTotalChange={onSectionTotalChange}
      />
    );
    const increaseBtn = screen.getByLabelText('Increase TestNode');
    fireEvent.click(increaseBtn); // count: 1
    const decreaseBtn = screen.getByLabelText('Decrease TestNode');
    fireEvent.click(decreaseBtn); // count: 0
    expect(lockNodeByName).toHaveBeenCalledWith('NodeB');
    expect(lockNodeByName).toHaveBeenCalledWith('NodeC');
    expect(onSectionTotalChange).toHaveBeenCalledWith(-1);
  });
});
