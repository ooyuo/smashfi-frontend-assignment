import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/shared/lib/test/test-utils';
import userEvent from '@testing-library/user-event';
import { SearchInput } from '../SearchInput';

describe('SearchInput', () => {
  it('입력 필드가 올바르게 렌더링된다', () => {
    render(<SearchInput value="" onChange={vi.fn()} />);

    const input = screen.getByPlaceholderText(/검색/i);
    expect(input).toBeInTheDocument();
  });

  it('초기값이 올바르게 표시된다', () => {
    render(<SearchInput value="bitcoin" onChange={vi.fn()} />);

    const input = screen.getByDisplayValue('bitcoin');
    expect(input).toBeInTheDocument();
  });

  it('입력 시 onChange 핸들러가 호출된다', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<SearchInput value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/검색/i);
    await user.type(input, 'eth');

    expect(handleChange).toHaveBeenCalled();
  });

  it('검색어 입력 시 value가 업데이트된다', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    const { rerender } = render(<SearchInput value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(/검색/i);
    await user.type(input, 'ethereum');

    rerender(<SearchInput value="ethereum" onChange={handleChange} />);

    expect(input).toHaveValue('ethereum');
  });
});
