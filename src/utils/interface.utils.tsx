import { ChangeEvent } from "react";

export interface IPasswordInput {
    text: string;
    icon?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
    name?: string;
    hasIcon?: boolean;
    transparent?: boolean;
  }

  export interface ITextInput {
    type: 'email' | 'text';
    text: string;
    icon?: string;
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    id?: string;
    name?: string;
    hasIcon?: boolean; 
    transparent?: boolean;
  }

  export interface IButton {
    type?: string;
    text: string;
    onClick?: () => void;
    color?: string; 
}


export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneCode: string;
  phoneNumber: string;
}

export interface INotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export interface ILoginData{
  email: string;
  password: string;
}