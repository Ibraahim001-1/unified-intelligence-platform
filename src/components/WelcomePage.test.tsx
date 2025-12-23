import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WelcomePage from './WelcomePage';

describe('WelcomePage', () => {
    it('renders correctly', () => {
        render(<WelcomePage onEnter={vi.fn()} />);
        // Check for main elements using case-insensitive matching because of split lines
        expect(screen.getByText(/Global Intelligence Command Center/i)).toBeInTheDocument();
        expect(screen.getByText(/Gal Platform-ka/i)).toBeInTheDocument();
    });

    it('calls onEnter when Enter button is clicked', () => {
        const onEnterMock = vi.fn();
        render(<WelcomePage onEnter={onEnterMock} />);

        const button = screen.getByText(/Gal Platform-ka/i);
        fireEvent.click(button);

        expect(onEnterMock).toHaveBeenCalledTimes(1);
    });

    it('handles "Remember me" checkbox', () => {
        const onEnterMock = vi.fn();
        render(<WelcomePage onEnter={onEnterMock} />);

        const checkbox = screen.getByLabelText(/Remember me/i);
        fireEvent.click(checkbox);

        expect(checkbox).toBeChecked();
    });
});
