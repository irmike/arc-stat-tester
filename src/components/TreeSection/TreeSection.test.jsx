/*
 * TreeSection.test.jsx - Tests for the TreeSection component.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import TreeSection from './TreeSection';
import testDataFactory from '../../test/mocks/testDataFactory.js';


describe('TreeSection Component', () => {
  const mockPointFuncts = {
    points: 10,
    increasePoints: () => {},
    decreasePoints: () => {},
  };

  it('displays section name in uppercase', () => {
    const data = [
      [testDataFactory({ name: 'Node1' })],
      [testDataFactory({ name: 'Node2' })]
    ];
    render(
      <TreeSection
        name="TestSection"
        direction="up"
        data={data}
        pointFuncts={mockPointFuncts}
      />
    );
    expect(screen.getByText('TESTSECTION')).toBeInTheDocument();
  });

  it('renders all nodes from data', () => {
    const data = [
      [testDataFactory({ name: 'Node1' })],
      [testDataFactory({ name: 'Node2' }), testDataFactory({ name: 'Node3' })]
    ];
    render(
      <TreeSection
        name="Test"
        direction="up"
        data={data}
        pointFuncts={mockPointFuncts}
      />
    );
    expect(screen.getByLabelText('Open Description for Node1')).toBeInTheDocument();
    expect(screen.getByLabelText('Open Description for Node2')).toBeInTheDocument();
    expect(screen.getByLabelText('Open Description for Node3')).toBeInTheDocument();
  });

  it('locks nodes with pointLock > 0 when total < pointLock', () => {
    const data = [
      [testDataFactory({ name: 'UnlockedNode', pointLock: 0 })], // first subsection, unlocked
      [testDataFactory({ name: 'LockedNode', pointLock: 2 })]    // second subsection, locked
    ];
    render(
      <TreeSection
        name="Test"
        direction="up"
        data={data}
        pointFuncts={mockPointFuncts}
      />
    );
    const lockedNodeRoot = screen.getByLabelText('Open Description for LockedNode').closest('.node-root');
    const unlockedNodeRoot = screen.getByLabelText('Open Description for UnlockedNode').closest('.node-root');
    expect(lockedNodeRoot.querySelectorAll('button').length).toBe(1);
    expect(unlockedNodeRoot.querySelectorAll('button').length).toBe(3);
  });

  it('unlocks nodes via unlocks prop when + is clicked in NodeA', async () => {
    const data = [
      [testDataFactory({ name: 'NodeA', unlocks: ['NodeB', 'NodeC'] })],
      [testDataFactory({ name: 'NodeB' })],
      [testDataFactory({ name: 'NodeC' })]
    ];
    render(
      <TreeSection
        name="Test"
        direction="up"
        data={data}
        pointFuncts={mockPointFuncts}
      />
    );
    const nodeARoot = screen.getByLabelText('Open Description for NodeA').closest('.node-root');
    const nodeBRoot = screen.getByLabelText('Open Description for NodeB').closest('.node-root');
    const nodeCRoot = screen.getByLabelText('Open Description for NodeC').closest('.node-root');

    expect(nodeARoot.querySelectorAll('button').length).toBe(3);
    expect(nodeBRoot.querySelectorAll('button').length).toBe(1);
    expect(nodeCRoot.querySelectorAll('button').length).toBe(1);

    const plusButtonA = Array.from(nodeARoot.querySelectorAll('button')).find(btn => btn.getAttribute('aria-label') === 'Increase NodeA');
    plusButtonA && plusButtonA.click();

    await waitFor(() => {
      expect(nodeBRoot.querySelectorAll('button').length).toBe(3);
      expect(nodeCRoot.querySelectorAll('button').length).toBe(3);
    });
  });
});
