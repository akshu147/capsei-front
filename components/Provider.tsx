"use client"
import { store } from '@/store/store';
import React from 'react'


import { Provider as ReduxProvider } from "react-redux";



import { ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({children}: AppProviderProps) => {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  )
}

export default AppProvider

