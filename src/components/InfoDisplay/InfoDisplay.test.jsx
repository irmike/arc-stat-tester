import {describe, it, expect,} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import InfoDisplay from './InfoDisplay';

describe('InfoDisplay Component', () => {
        it('renders with initial content minimized', () => {
            render(<InfoDisplay/>);
            expect(screen.getByText('INFO')).toBeInTheDocument();
            // Content should not be visible initially
            expect(screen.queryByText(/This is a work in progress/)).toBeNull();
        });

        it('toggles content visibility when button is clicked', () => {
            render(<InfoDisplay/>);
            const toggleButton = screen.getByRole('button', {name: /Open info panel/i});
            fireEvent.click(toggleButton);
            // After click, content should be visible
            expect(screen.getByText(/This is a work in progress/)).toBeInTheDocument();
            // Button should now be for minimizing
            expect(screen.getByRole('button', {name: /Minimize info panel/i})).toBeInTheDocument();
        });
    }
);