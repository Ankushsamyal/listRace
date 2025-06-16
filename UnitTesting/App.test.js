import '@testing-library/jest-dom';  // Fixes matcher error
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../src/components/home/HomePage';
import * as ApiService from '../src/API/ApiService';
import { Provider } from 'react-redux';
import store from '../src/redux/store';

jest.mock('../src/API/ApiService');

const renderWithProvider = (ui) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('Home component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders static texts correctly', () => {
    ApiService.fetchCategories.mockResolvedValue([]);
    renderWithProvider(<Home />);
    expect(screen.getByText(/Best place to find and explore that all you need/i)).toBeInTheDocument();
    expect(screen.getByText(/Find Best Place, Restaurant, Hotel/i)).toBeInTheDocument();
  });

//   test('fetches categories and passes data to child components', async () => {
//     const mockCategories = [{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }];
//     ApiService.fetchCategories.mockResolvedValue(mockCategories);

//     renderWithProvider(<Home />);

//     await waitFor(() => {
//       expect(ApiService.fetchCategories).toHaveBeenCalledTimes(1);
//     });
//   });

//  test('shows alert state if fetchCategories fails', async () => {
//   const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

//   ApiService.fetchCategories.mockRejectedValue(new Error('Network Error'));

//   renderWithProvider(<Home />);

//   await waitFor(() => {
//     expect(consoleErrorSpy).toHaveBeenCalledWith('API error:', expect.any(Error));
//   });

//   consoleErrorSpy.mockRestore();
// });
});
