import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from 'components/SearchBar';
import filtersReducer from 'features/filters/filtersSlice';
import contentReducer from 'features/content/contentSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      filters: filtersReducer,
      content: contentReducer,
    },
  });
};

describe('SearchBar', () => {
  it('should render search input', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();
  });

  it('should handle English text input', () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Anisha' } });

    expect(input.value).toBe('Anisha');
    // Redux state should not update until search is triggered
    expect(store.getState().filters.keyword).toBe('');

    // Trigger search by clicking the icon
    const searchIcon = container.querySelector('.search-icon') as HTMLElement;
    fireEvent.click(searchIcon);

    // Now Redux state should be updated
    expect(store.getState().filters.keyword).toBe('Anisha');
  });

  it('should handle Chinese text input', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '你好世界' } });

    expect(input.value).toBe('你好世界');
    expect(store.getState().filters.keyword).toBe('');

    // Trigger search by pressing Enter
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(store.getState().filters.keyword).toBe('你好世界');
  });

  it('should handle Japanese text input', () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'こんにちは' } });

    expect(input.value).toBe('こんにちは');
    expect(store.getState().filters.keyword).toBe('');

    // Trigger search by clicking the icon
    const searchIcon = container.querySelector('.search-icon') as HTMLElement;
    fireEvent.click(searchIcon);

    expect(store.getState().filters.keyword).toBe('こんにちは');
  });

  it('should handle Arabic text input', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'مرحبا' } });

    expect(input.value).toBe('مرحبا');
    expect(store.getState().filters.keyword).toBe('');

    // Trigger search by pressing Enter
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(store.getState().filters.keyword).toBe('مرحبا');
  });

  it('should handle mixed language input', () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello 你好 こんにちは' } });

    expect(input.value).toBe('Hello 你好 こんにちは');
    expect(store.getState().filters.keyword).toBe('');

    // Trigger search by clicking the icon
    const searchIcon = container.querySelector('.search-icon') as HTMLElement;
    fireEvent.click(searchIcon);

    expect(store.getState().filters.keyword).toBe('Hello 你好 こんにちは');
  });

  it('should clear search when value is empty', () => {
    const store = createTestStore();
    const { container } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByTestId('search-input') as HTMLInputElement;
    const searchIcon = container.querySelector('.search-icon') as HTMLElement;

    // First set a value and search
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
    fireEvent.click(searchIcon);
    expect(store.getState().filters.keyword).toBe('test');

    // Then clear and search again
    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');
    fireEvent.click(searchIcon);
    expect(store.getState().filters.keyword).toBe('');
  });
});
