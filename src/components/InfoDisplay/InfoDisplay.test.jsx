import {describe, it, expect,} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import InfoDisplay from './InfoDisplay';

describe('InfoDisplay Component', () => {
        it('renders with initial content visible', () => {
            render(<InfoDisplay/>);
            expect(screen.getByText('INFO')).toBeInTheDocument();
            expect(screen.getByText(/This is a work in progress/)).toBeInTheDocument();
        });

        it('toggles content visibility when button is clicked', () => {
            render(<InfoDisplay/>);
            const toggleButton = screen.getByRole('button', {name: /Minimize info panel/i});

            // Click to minimize
            fireEvent.click(toggleButton);
            expect(screen.queryByText('INFO')).not.toBeInTheDocument();

            // Click to maximize
            fireEvent.click(toggleButton);
            expect(screen.getByText('INFO')).toBeInTheDocument();
        });
    }
);