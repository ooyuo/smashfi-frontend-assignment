import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/shared/lib/test/test-utils';
import userEvent from '@testing-library/user-event';
import { FavoriteButton } from '../FavoriteButton';

describe('FavoriteButton', () => {
  it('즐겨찾기가 아닐 때 빈 하트 아이콘이 표시된다', () => {
    render(<FavoriteButton isFavorite={false} onToggle={vi.fn()} />);

    const button = screen.getByRole('button', { name: /즐겨찾기/i });
    expect(button).toBeInTheDocument();
  });

  it('즐겨찾기일 때 채워진 하트 아이콘이 표시된다', () => {
    render(<FavoriteButton isFavorite={true} onToggle={vi.fn()} />);

    const button = screen.getByRole('button', { name: /즐겨찾기/i });
    expect(button).toBeInTheDocument();
  });

  it('버튼 클릭 시 onToggle 핸들러가 호출된다', async () => {
    const user = userEvent.setup();
    const handleToggle = vi.fn();

    render(<FavoriteButton isFavorite={false} onToggle={handleToggle} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('즐겨찾기 상태에 따라 올바른 aria-label이 설정된다', () => {
    const { rerender } = render(<FavoriteButton isFavorite={false} onToggle={vi.fn()} />);

    let button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', '즐겨찾기 추가');

    rerender(<FavoriteButton isFavorite={true} onToggle={vi.fn()} />);

    button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', '즐겨찾기 제거');
  });
});
