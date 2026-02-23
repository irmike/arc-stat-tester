import { describe, it, expect, vi } from 'vitest';
import PointsHeader from "./PointsHeader.jsx";
import { render, fireEvent } from "@testing-library/react";

describe('PointsHeader', () => {

  it('handleChange updates expeditions and updates the UI', () => {
    const points = 76;
    const onExpeditionsTotalChange = vi.fn();
    const { getByText, getByRole, container } = render(
      <PointsHeader points={points} onExpeditionsTotalChange={onExpeditionsTotalChange} />
    );

    fireEvent.click(getByText('Add Expedition'));
    expect(container.querySelectorAll('.expedition-item').length).toBe(1);
    expect(onExpeditionsTotalChange).toHaveBeenCalledWith(0);

    const input = getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '3' } });
    expect(container.querySelectorAll('.expedition-item').length).toBe(1);
    expect(onExpeditionsTotalChange).toHaveBeenCalledWith(3);
  });

  it('handleAdd adds expeditions and updates the UI', () => {
    const points = 76;
    const onExpeditionsTotalChange = vi.fn();
    const { getByText, container } = render(
      <PointsHeader points={points} onExpeditionsTotalChange={onExpeditionsTotalChange} />
    );

    fireEvent.click(getByText('Add Expedition'));
    expect(container.querySelectorAll('.expedition-item').length).toBe(1);
    expect(onExpeditionsTotalChange).toHaveBeenCalledWith(0);
    fireEvent.click(getByText('Add Expedition'));
    expect(container.querySelectorAll('.expedition-item').length).toBe(2);
    expect(onExpeditionsTotalChange).toHaveBeenCalledWith(0);
  });

  it('handleRemove removes expeditions and updates the UI', () => {
    const points = 76;
    const onExpeditionsTotalChange = vi.fn();
    const { getByText, getAllByRole, container } = render(
      <PointsHeader points={points} onExpeditionsTotalChange={onExpeditionsTotalChange} />
    );

    fireEvent.click(getByText('Add Expedition'));
    fireEvent.click(getByText('Add Expedition'));
    expect(container.querySelectorAll('.expedition-item').length).toBe(2);
    expect(onExpeditionsTotalChange).toHaveBeenCalledWith(0);

    const removeButtons = getAllByRole('button', { name: 'x' });
    fireEvent.click(removeButtons[0]);
    expect(container.querySelectorAll('.expedition-item').length).toBe(1);
    expect(onExpeditionsTotalChange).toHaveBeenCalledWith(0);
  });
});
