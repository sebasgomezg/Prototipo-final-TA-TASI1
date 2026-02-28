import React, { useState } from 'react';
import { ViewState, TransactionDetails, UserContextType, PaymentDetails, MovementItem } from './types';
import { StatusBar } from './components/ui/Shared';
import { 
  LoginMethodsScreen, 
  SelectAccountLoginScreen,
  PinEntryScreen, 
  ForgotPinEmailScreen, 
  VerifyCodeScreen, 
  CreatePinScreen, 
  PinSuccessScreen,
  ActivateCardScreen,
  OnboardingPinScreen
} from './components/screens/AuthScreens';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { 
  TransferMenuScreen, 
  TransferFormScreen, 
  TransferConfirmScreen, 
  TransferSuccessScreen 
} from './components/screens/TransferScreens';
import {
  PaymentMenuScreen,
  PaymentServiceSelectScreen,
  PaymentBillSelectScreen,
  PaymentSuccessScreen
} from './components/screens/PaymentScreens';
import {
  MovementsListScreen,
  MovementDetailScreen
} from './components/screens/MovementScreens';
import { EditProfileScreen } from './components/screens/ProfileScreens';
import { 
  TravelMainScreen
} from './components/screens/TravelScreens';
import { TravelDetails } from './types';

import { motion, AnimatePresence } from 'motion/react';

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LOGIN_METHODS);
  // Track previous view specifically for Movement Detail navigation
  const [previousView, setPreviousView] = useState<ViewState>(ViewState.DASHBOARD);
  
  // Functional PIN state
  const [savedPin, setSavedPin] = useState('1234');

  // App Data State
  const [user, setUser] = useState<UserContextType>({
    name: 'Sebastian',
    fullName: 'SEBASTIAN ARMANDO GOMEZ GARAY',
    email: 'sgomezg@pucp.edu.pe', 
    phone: '987 654 321',
    address: 'AV.UNIVERSITARIA 1801 SAN MIGUEL',
    accounts: [
      {
        id: '1',
        name: 'Cuenta Sueldo',
        number: '1234564321',
        balance: 8450.20,
        availableBalance: 8450.20
      },
      {
        id: '2',
        name: 'Cuenta Corriente',
        number: '9876543210',
        balance: 12500.50,
        availableBalance: 12500.50
      }
    ]
  });

  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [selectedMovement, setSelectedMovement] = useState<MovementItem | null>(null);
  const [travelNotices, setTravelNotices] = useState<TravelDetails[]>([]);
  const [selectedAccount, setSelectedAccount] = useState(user.accounts[0]);
  const [movements, setMovements] = useState<MovementItem[]>([
    { id: '1', title: 'Pago en POS', subtitle: 'Supermercado', dateLabel: 'Hoy', time: '14:32', amount: -86.40, type: 'pos', account: 'Cuenta Sueldo' },
    { id: '2', title: 'Transferencia recibida', subtitle: 'Ana Pérez', dateLabel: 'Ayer', time: '18:15', amount: 250.00, type: 'transfer_in', account: 'Cuenta Sueldo' },
    { id: '3', title: 'Pago de servicio', subtitle: 'Entel', dateLabel: 'Hace 3 días', time: '10:22', amount: -59.90, type: 'payment', account: 'Cuenta Sueldo' },
    { id: '4', title: 'Transferencia enviada', subtitle: 'Juan López', dateLabel: 'Hace 3 días', time: '09:15', amount: -120.00, type: 'transfer_out', account: 'Cuenta Sueldo' },
    { id: '5', title: 'Depósito en efectivo', subtitle: 'Agente BCP', dateLabel: 'Hace 1 semana', time: '11:00', amount: 500.00, type: 'transfer_in', account: 'Cuenta Corriente' },
    { id: '6', title: 'Netflix', subtitle: 'Suscripción', dateLabel: 'Hace 1 semana', time: '08:00', amount: -45.00, type: 'payment', account: 'Cuenta Corriente' },
  ]);

  const addMovement = (newMovement: Omit<MovementItem, 'id' | 'dateLabel' | 'time'>) => {
    const movement: MovementItem = {
      ...newMovement,
      id: Math.random().toString(36).substr(2, 9),
      dateLabel: 'Hoy',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMovements(prev => [movement, ...prev]);

    // Update account balance
    setUser(prev => {
      const updatedAccounts = prev.accounts.map(acc => {
        if (acc.name === movement.account) {
          const newBalance = acc.balance + movement.amount;
          const updatedAcc = { ...acc, balance: newBalance, availableBalance: newBalance };
          // If this is the currently selected account, update it too
          if (selectedAccount.id === acc.id) {
            setSelectedAccount(updatedAcc);
          }
          return updatedAcc;
        }
        return acc;
      });
      return { ...prev, accounts: updatedAccounts };
    });
  };

  // Handler to update user profile data
  const handleUpdateUser = (field: keyof UserContextType, value: string) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Helper for view rendering
  const renderView = () => {
    switch (currentView) {
      // Auth Flow
      case ViewState.LOGIN_METHODS:
        return <LoginMethodsScreen changeView={setCurrentView} />;
      case ViewState.SELECT_ACCOUNT_LOGIN:
        return <SelectAccountLoginScreen changeView={setCurrentView} user={user} />;
      case ViewState.PIN_ENTRY:
        return <PinEntryScreen changeView={setCurrentView} savedPin={savedPin} />;
      
      // Onboarding Flow
      case ViewState.ONBOARDING_CARD:
        return <ActivateCardScreen changeView={setCurrentView} />;
      case ViewState.ONBOARDING_PIN:
        return <OnboardingPinScreen changeView={setCurrentView} onUpdateUser={(field, val) => setSavedPin(val)} />;
      
      // Recover PIN Flow
      case ViewState.FORGOT_PIN_EMAIL:
        return <ForgotPinEmailScreen changeView={setCurrentView} />;
      case ViewState.VERIFY_CODE:
        return <VerifyCodeScreen changeView={setCurrentView} />;
      case ViewState.CREATE_PIN:
        return <CreatePinScreen changeView={setCurrentView} mode="create" />;
      case ViewState.CONFIRM_PIN:
        return <CreatePinScreen changeView={setCurrentView} mode="confirm" />;
      case ViewState.PIN_SUCCESS:
        return <PinSuccessScreen changeView={setCurrentView} message="¡PIN creado!" btnText="Ir al inicio" nextView={ViewState.LOGIN_METHODS} />;
      
      // Dashboard
      case ViewState.DASHBOARD:
        return (
          <DashboardScreen 
            user={user} 
            changeView={setCurrentView} 
            setMovement={setSelectedMovement} 
            setPreviousView={setPreviousView}
            setSelectedAccount={setSelectedAccount}
            movements={movements}
          />
        );
      case ViewState.EDIT_PROFILE:
        return <EditProfileScreen user={user} changeView={setCurrentView} onUpdateUser={handleUpdateUser} />;
      
      // Transfer Flow
      case ViewState.TRANSFER_MENU:
        return <TransferMenuScreen changeView={setCurrentView} setTransaction={setTransaction} transaction={transaction} user={user} />;
      case ViewState.TRANSFER_FORM:
        return <TransferFormScreen changeView={setCurrentView} setTransaction={setTransaction} transaction={transaction} user={user} />;
      case ViewState.TRANSFER_CONFIRM:
        return <TransferConfirmScreen changeView={setCurrentView} setTransaction={setTransaction} transaction={transaction} user={user} onConfirm={addMovement} />;
      case ViewState.TRANSFER_SUCCESS:
        return <TransferSuccessScreen changeView={setCurrentView} setTransaction={setTransaction} transaction={transaction} user={user} />;

      // Payment Flow
      case ViewState.PAYMENT_MENU:
        return <PaymentMenuScreen changeView={setCurrentView} setPayment={setPayment} payment={payment} user={user} />;
      case ViewState.PAYMENT_SERVICE_SELECT:
        return <PaymentServiceSelectScreen changeView={setCurrentView} setPayment={setPayment} payment={payment} user={user} />;
      case ViewState.PAYMENT_BILL_SELECT:
        return <PaymentBillSelectScreen changeView={setCurrentView} setPayment={setPayment} payment={payment} user={user} onConfirm={addMovement} />;
      case ViewState.PAYMENT_SUCCESS:
        return <PaymentSuccessScreen changeView={setCurrentView} setPayment={setPayment} payment={payment} user={user} />;

      // Movements Flow
      case ViewState.MOVEMENTS_LIST:
        return (
          <MovementsListScreen 
            changeView={setCurrentView} 
            setMovement={setSelectedMovement} 
            movement={selectedMovement} 
            user={user} 
            setPreviousView={setPreviousView}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
            movements={movements}
          />
        );
      case ViewState.MOVEMENT_DETAIL:
        return (
          <MovementDetailScreen 
            changeView={setCurrentView} 
            setMovement={setSelectedMovement} 
            movement={selectedMovement} 
            user={user}
            previousView={previousView}
          />
        );

      // Travel Flow
      case ViewState.TRAVEL_MAIN:
        return (
          <TravelMainScreen 
            changeView={setCurrentView} 
            user={user} 
            travelNotices={travelNotices} 
            setTravelNotices={setTravelNotices} 
          />
        );

      default:
        return <LoginMethodsScreen changeView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 md:p-4 font-sans text-slate-900">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md h-screen md:h-[844px] bg-white md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col relative border-4 border-transparent md:border-slate-900">
        
        {/* Top Status Bar Area */}
        {currentView !== ViewState.DASHBOARD && currentView !== ViewState.EDIT_PROFILE && <StatusBar />}
        {/* Special handling for Edit Profile which has a colored header area taking up status bar space visually if needed, but we keep consistent for now or hide if it clashes with the purple header */}
        {currentView === ViewState.EDIT_PROFILE && (
           <div className="absolute top-0 left-0 right-0 z-50">
               {/* Custom White Status Bar for Purple Header */}
                <div className="flex justify-between items-center px-6 py-3 text-white">
                  <span className="font-semibold text-sm">8:51</span>
                  <div className="flex items-center gap-1.5 opacity-90">
                     <div className="w-4 h-4 border border-white/50 rounded-sm flex items-end justify-center gap-[1px] p-[1px]">
                         <div className="w-[2px] h-[3px] bg-white"></div>
                         <div className="w-[2px] h-[5px] bg-white"></div>
                         <div className="w-[2px] h-[7px] bg-white"></div>
                    </div>
                  </div>
                </div>
           </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Home Indicator (iOS style) */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/20 rounded-full mb-1 z-50"></div>
      </div>
    </div>
  );
};

export default App;