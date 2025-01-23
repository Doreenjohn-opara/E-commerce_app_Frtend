import React, { ReactNode } from 'react';
import { AuthProvider } from './Auth.context';



const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AuthProvider>
                {/* <BudgetProvider>
                    <TransactionProvider> */}
                    {/* <GamificationProvider> */}
                        {children}
                    {/* </GamificationProvider> */}
                    {/* </TransactionProvider>
                </BudgetProvider> */}
        </AuthProvider>
    );
};

export default AppProviders;
