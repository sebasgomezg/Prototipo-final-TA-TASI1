export enum ViewState {
  // Auth Flow
  LOGIN_METHODS = 'LOGIN_METHODS',
  SELECT_ACCOUNT_LOGIN = 'SELECT_ACCOUNT_LOGIN',
  PIN_ENTRY = 'PIN_ENTRY',
  
  // Forgot PIN Flow
  FORGOT_PIN_EMAIL = 'FORGOT_PIN_EMAIL',
  VERIFY_CODE = 'VERIFY_CODE',
  CREATE_PIN = 'CREATE_PIN',
  CONFIRM_PIN = 'CONFIRM_PIN',
  PIN_SUCCESS = 'PIN_SUCCESS',
  PIN_UPDATED_READY = 'PIN_UPDATED_READY',

  // Main App
  DASHBOARD = 'DASHBOARD',
  EDIT_PROFILE = 'EDIT_PROFILE',
  
  // Transfer Flow
  TRANSFER_MENU = 'TRANSFER_MENU',
  TRANSFER_FORM = 'TRANSFER_FORM',
  TRANSFER_CONFIRM = 'TRANSFER_CONFIRM',
  TRANSFER_SUCCESS = 'TRANSFER_SUCCESS',

  // Payment Flow
  PAYMENT_MENU = 'PAYMENT_MENU',
  PAYMENT_SERVICE_SELECT = 'PAYMENT_SERVICE_SELECT',
  PAYMENT_BILL_SELECT = 'PAYMENT_BILL_SELECT',
  PAYMENT_SUCCESS = 'PAYMENT_SUCCESS',

  // Movements Flow
  MOVEMENTS_LIST = 'MOVEMENTS_LIST',
  MOVEMENT_DETAIL = 'MOVEMENT_DETAIL',

  // Travel Flow
  TRAVEL_MAIN = 'TRAVEL_MAIN',
  TRAVEL_INFO = 'TRAVEL_INFO', // Keeping for backward compatibility or internal use if needed, but we'll focus on TRAVEL_MAIN
  TRAVEL_CARDS = 'TRAVEL_CARDS',
  TRAVEL_SUCCESS = 'TRAVEL_SUCCESS',

  // Onboarding Flow
  ONBOARDING_CARD = 'ONBOARDING_CARD',
  ONBOARDING_PIN = 'ONBOARDING_PIN',
}

export interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
  availableBalance: number;
}

export interface TransactionDetails {
  recipientName: string;
  recipientAccount: string;
  amount: string;
  concept: string;
  date: string;
  operationId: string;
  sourceAccount?: Account;
}

export interface PaymentDetails {
  serviceName: string;
  amount: string;
  operationId: string;
}

export interface TravelDetails {
  id: string;
  destination: string[]; // Multiple countries
  startDate: string;
  endDate: string;
  selectedCards: string[]; // IDs of accounts
  note?: string;
  status: 'active' | 'expired';
}

export interface UserContextType {
  name: string; // First name for dashboard
  fullName: string; // Full legal name for profile
  email: string;
  phone: string;
  address: string;
  accounts: Account[];
}

export interface MovementItem {
  id: string;
  title: string;
  subtitle: string; // e.g., "Ana Pérez" or "Supermercado"
  dateLabel: string; // "Hoy", "Ayer"
  time: string;
  amount: number; // positive for income, negative for expense
  type: 'transfer_in' | 'transfer_out' | 'payment' | 'pos';
  account: string;
}