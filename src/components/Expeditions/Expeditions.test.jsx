/*
 * Expeditions.test.jsx - Tests for the Expeditions component.
 * Copyright (c) 2026 Michael Crowley. All rights reserved.
 * This file is part of the arc-stat-tester project.
 * Unauthorized copying or distribution is prohibited.
 */

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Expeditions from "./Expeditions";

describe("Expeditions", () => {
  it("renders add button and no expeditions by default", () => {
    render(
      <Expeditions expeditions={[]} onAdd={() => {}} onRemove={() => {}} onChange={() => {}} />
    );
    expect(screen.getByText("Add Expedition")).toBeInTheDocument();
    expect(screen.queryByText(/Exp. 1/)).not.toBeInTheDocument();
  });

  it("calls onAdd when add button is clicked", () => {
    const onAdd = vi.fn();
    render(
      <Expeditions expeditions={[]} onAdd={onAdd} onRemove={() => {}} onChange={() => {}} />
    );
    fireEvent.click(screen.getByText("Add Expedition"));
    expect(onAdd).toHaveBeenCalled();
  });

  it("renders expedition input and remove button when expeditions exist", () => {
    render(
      <Expeditions expeditions={[0]} onAdd={() => {}} onRemove={() => {}} onChange={() => {}} />
    );
    expect(screen.getByText("Exp. 1")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
    expect(screen.getByText("x")).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    const onRemove = vi.fn();
    render(
      <Expeditions expeditions={[0]} onAdd={() => {}} onRemove={onRemove} onChange={() => {}} />
    );
    fireEvent.click(screen.getByText("x"));
    expect(onRemove).toHaveBeenCalledWith(0);
  });

  it("calls onChange when input value changes", () => {
    const onChange = vi.fn();
    render(
      <Expeditions expeditions={[0]} onAdd={() => {}} onRemove={() => {}} onChange={onChange} />
    );
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "3" } });
    expect(onChange).toHaveBeenCalledWith(0, 3);
  });
});
