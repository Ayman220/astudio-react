import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types for data and actions
export interface IUserDataItem {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  bloodGroup: string;
  eyeColor: string;
  domain: string;
}

interface IUserDataState {
  data: IUserDataItem[];
  unfilteredData: IUserDataItem[];
  pageSize: number;
  currentPage: number;
  total: number;
  searchTerm: string;
}

// Define actions
type Action =
  | { type: 'SET_DATA'; payload: IUserDataItem[] }
  | { type: 'SET_UNFILTERED_DATA'; payload: IUserDataItem[] }
  | { type: 'SET_PAGE_SIZE'; payload: number }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'SET_SEARCH_TERM'; payload: string };

interface IUserDataContext {
  state: IUserDataState;
  dispatch: React.Dispatch<Action>;
}

const UserDataContext = createContext<IUserDataContext | undefined>(undefined);

const dataReducer = (state: IUserDataState, action: Action): IUserDataState => {
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

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    data: [],
    unfilteredData: [],
    pageSize: 5,
    currentPage: 1,
    total: 0,
    searchTerm: '',
  });

  return <UserDataContext.Provider value={{ state, dispatch }}>{children}</UserDataContext.Provider>;
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
