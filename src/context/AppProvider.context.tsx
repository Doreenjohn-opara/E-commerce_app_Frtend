import React, { ReactNode } from 'react';
import { AuthProvider } from './Auth.context';
import { ProductProvider } from './Product.context';
import { CartProvider } from './Cart.context';
import { SavedItemsProvider } from './SavedItem.context';
import { NotificationProvider } from './Notification.context';


const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AuthProvider>
            <ProductProvider>
                    <CartProvider> 
                        <SavedItemsProvider>
                            <NotificationProvider>
                                    {children}
                            </NotificationProvider>
                        </SavedItemsProvider>
                     </CartProvider>
            </ProductProvider> 
        </AuthProvider>
    );
};

export default AppProviders;
