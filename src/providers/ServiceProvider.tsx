import React, { createContext, useContext, ReactNode } from 'react';
import { ServiceContainer } from '../services/ServiceContainer';
import { IProblemService } from '../services/interfaces/IProblemService';
import { ITopicService } from '../services/interfaces/ITopicService';

interface ServiceContextType {
  problemService: IProblemService;
  topicService: ITopicService;
}

const ServiceContext = createContext<ServiceContextType | null>(null);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const container = ServiceContainer.getInstance();

  const value: ServiceContextType = {
    problemService: container.getProblemService(),
    topicService: container.getTopicService(),
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
}

// Custom hook to access services (DIP: components depend on interface, not implementation)
export function useServices(): ServiceContextType {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within ServiceProvider');
  }
  return context;
}
