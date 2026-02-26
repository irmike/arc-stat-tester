import { describe, it, expect, vi } from 'vitest';
import PointsHeader from "./PointsHeader.jsx";
import { render, fireEvent } from "@testing-library/react";

describe('PointsHeader', () => {
  it('renders points and passes add handler through to the Expeditions button', () => {
    const onAddExpedition = vi.fn();
    const { getByText } = render(
      <PointsHeader
        points={76}
        expeditions={[]}
        onAddExpedition={onAddExpedition}
        onRemoveExpedition={vi.fn()}
        onChangeExpedition={vi.fn()}
      />
    );

    expect(getByText('Points available: 76')).toBeInTheDocument();

    fireEvent.click(getByText('Add Expedition'));
    expect(onAddExpedition).toHaveBeenCalledTimes(1);
  });

  it('renders expedition items based on expeditions prop', () => {
    const { container } = render(
      <PointsHeader
        points={76}
        expeditions={[0, 2]}
        onAddExpedition={vi.fn()}
        onRemoveExpedition={vi.fn()}
        onChangeExpedition={vi.fn()}
      />
    );

    expect(container.querySelectorAll('.expedition-item').length).toBe(2);
  });

  it('passes remove/change handlers through to expedition controls', () => {
    const onRemoveExpedition = vi.fn();
    const onChangeExpedition = vi.fn();

    const { getByText, getByRole } = render(
      <PointsHeader
        points={76}
        expeditions={[0]}
        onAddExpedition={vi.fn()}
        onRemoveExpedition={onRemoveExpedition}
        onChangeExpedition={onChangeExpedition}
      />
    );

    fireEvent.change(getByRole('spinbutton'), { target: { value: '3' } });
    expect(onChangeExpedition).toHaveBeenCalledWith(0, 3);

    fireEvent.click(getByText('x'));
    expect(onRemoveExpedition).toHaveBeenCalledWith(0);
  });
});
