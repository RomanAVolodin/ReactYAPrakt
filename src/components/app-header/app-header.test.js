import AppHeader from './app-header';
import { fireEvent, getByTestId, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Заголовок приложения', () => {
  let component;
  let mockFunc;
  beforeEach(() => {
    mockFunc = jest.fn();
    const { container } = render(
      <MemoryRouter>
        <AppHeader />
      </MemoryRouter>,
    );
    component = container;
  });

  it('Должен быть пункт меню Конструктор', () => {
    const element = getByTestId(component, 'constructor-link');
    expect(element.querySelector('span').textContent).toBe('Конструктор');
  });

  it('Пункт меню Конструктор должен быть активным по умолчанию', () => {
    const element = getByTestId(component, 'constructor-link');
    expect(element.classList.contains('text_color_active')).toBe(true);
  });

  it('Пункт меню Конструктор должен становиться неактивным при клике на другой пункт', () => {
    const element = getByTestId(component, 'constructor-link');
    expect(element.classList.contains('text_color_active')).toBe(true);
    const feed = getByTestId(component, 'feed-link');
    fireEvent.click(feed);
    expect(element.classList.contains('text_color_active')).toBe(false);
  });

  it('Должен быть пункт меню Лента заказов', () => {
    const element = getByTestId(component, 'feed-link');
    expect(element.querySelector('span').textContent).toBe('Лента заказов');
  });

  it('Пункт меню Конструктор должен быть НЕ активным по умолчанию и активным при клике', () => {
    const element = getByTestId(component, 'feed-link');
    expect(element.classList.contains('text_color_active')).toBe(false);
    fireEvent.click(element);
    expect(element.classList.contains('text_color_active')).toBe(true);
  });

  it('Должен быть пункт меню Кабинет', () => {
    const element = getByTestId(component, 'cabinet-link');
    expect(element.querySelector('span').textContent).toBe('Личный кабинет');
  });

  it('Пункт меню Кабинет должен быть НЕ активным по умолчанию и активным при клике', () => {
    const element = getByTestId(component, 'cabinet-link');
    expect(element.classList.contains('text_color_active')).toBe(false);
    fireEvent.click(element);
    expect(element.classList.contains('text_color_active')).toBe(true);
  });
});
