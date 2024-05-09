import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface IProductDataItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
}

interface IProductDataState {
  data: IProductDataItem[];
  unfilteredData: IProductDataItem[];
  pageSize: number;
  currentPage: number;
  total: number;
  searchTerm: string;
}

type Action =
  | { type: 'SET_DATA'; payload: IProductDataItem[] }
  | { type: 'SET_UNFILTERED_DATA'; payload: IProductDataItem[] }
  | { type: 'SET_PAGE_SIZE'; payload: number }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'SET_SEARCH_TERM'; payload: string };

interface IProductDataContext {
  state: IProductDataState;
  dispatch: React.Dispatch<Action>;
}

const ProductDataContext = createContext<IProductDataContext | undefined>(undefined);

const dataReducer = (state: IProductDataState, action: Action): IProductDataState => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
      case 'SET_UNFILTERED_DATA':
        return { ...state, unfilteredData: action.payload };
    case 'SET_PAGE_SIZE':
      return { ...state, pageSize: action.payload, currentPage: 1 };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };
      case 'SET_TOTAL':
        return { ...state, total: action.payload };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};

interface ProductDataProviderProps {
  children: ReactNode;
}

export const ProductDataProvider: React.FC<ProductDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    data: [],
    unfilteredData: [],
    pageSize: 5,
    currentPage: 1,
    total: 0,
    searchTerm: '',
  });

  return <ProductDataContext.Provider value={{ state, dispatch }}>{children}</ProductDataContext.Provider>;
};

export const useProductData = () => {
  const context = useContext(ProductDataContext);
  if (!context) {
    throw new Error('useProductData must be used within a ProductDataProvider');
  }
  return context;
};
