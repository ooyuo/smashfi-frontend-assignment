import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/shared/lib/test/test-utils';
import userEvent from '@testing-library/user-event';
import { Tabs } from '../Tabs';
import { TAB_TYPES } from '../../model/constants';

describe('Tabs', () => {
  it('All과 My favorite 탭이 렌더링된다', () => {
    render(<Tabs activeTab={TAB_TYPES.ALL} onTabChange={vi.fn()} />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('My favorite')).toBeInTheDocument();
  });

  it('활성 탭에 올바른 스타일이 적용된다', () => {
    render(<Tabs activeTab={TAB_TYPES.ALL} onTabChange={vi.fn()} />);

    const allTab = screen.getByText('All');
    expect(allTab.className).toContain('bg-background');
    expect(allTab.className).toContain('shadow-sm');
  });

  it('탭 클릭 시 onTabChange가 호출된다', async () => {
    const user = userEvent.setup();
    const handleTabChange = vi.fn();

    render(<Tabs activeTab={TAB_TYPES.ALL} onTabChange={handleTabChange} />);

    const favoriteTab = screen.getByText('My favorite');
    await user.click(favoriteTab);

    expect(handleTabChange).toHaveBeenCalledWith(TAB_TYPES.FAVORITES);
  });

  it('My favorite 탭이 활성화되면 올바른 스타일이 적용된다', () => {
    render(<Tabs activeTab={TAB_TYPES.FAVORITES} onTabChange={vi.fn()} />);

    const favoriteTab = screen.getByText('My favorite');
    expect(favoriteTab.className).toContain('bg-background');
    expect(favoriteTab.className).toContain('shadow-sm');
  });
});
