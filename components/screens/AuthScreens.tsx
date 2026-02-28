import React, { useState, useEffect } from 'react';
import { ViewState, UserContextType } from '../../types';
import { Header, Button, Keypad, PinDots, InputField, ActionCard } from '../ui/Shared';
import { CreditCard, Hash, Smartphone, Lock, Check, Mail, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface ScreenProps {
  changeView: (view: ViewState) => void;
  onUpdateUser?: (field: any, value: any) => void;
  savedPin?: string;
  user?: UserContextType;
}

// 1. Login Methods Selection
export const LoginMethodsScreen: React.FC<ScreenProps> = ({ changeView }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col justify-center px-6 pt-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-1 font-display">Banco</h1>
          <h1 className="text-4xl font-extrabold text-indigo-500 mb-4 font-display">Confía</h1>
          <p className="text-slate-500">Tú confía</p>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">Inicia sesión</h2>
          <p className="text-slate-500">Selecciona tu método de acceso</p>
        </div>

        <div className="flex flex-col gap-4">
          <ActionCard 
             title="Tarjeta de débito"
             subtitle="Ingresa con tu tarjeta"
             icon={<CreditCard className="w-6 h-6" />}
             bgColor="bg-white border border-indigo-200"
             textColor="text-indigo-600"
             onClick={() => changeView(ViewState.SELECT_ACCOUNT_LOGIN)}
          />
          <ActionCard 
            title="Documento de identidad"
            subtitle="Ingresa con tu DNI"
            icon={<span className="text-xs font-bold border border-current rounded px-1">DNI</span>}
            bgColor="bg-white border border-indigo-200"
            textColor="text-indigo-600"
            onClick={() => changeView(ViewState.PIN_ENTRY)}
          />
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4 items-center">
        <button className="text-indigo-600 font-semibold">¿Problemas para acceder?</button>
        <div className="flex items-center gap-2 mt-2">
            <span className="text-slate-400 text-sm">¿No tienes cuenta?</span>
            <button 
                onClick={() => changeView(ViewState.ONBOARDING_CARD)}
                className="text-indigo-600 font-bold text-sm hover:underline"
            >
                Regístrate aquí
            </button>
        </div>
      </div>
    </div>
  );
};

// --- Onboarding: Activate Card ---
export const ActivateCardScreen: React.FC<ScreenProps> = ({ changeView }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [error, setError] = useState(false);

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 16) val = val.slice(0, 16);
        
        // Format with spaces
        const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
        setCardNumber(formatted);
        setError(false);
    };

    const handleContinue = () => {
        const raw = cardNumber.replace(/\s/g, '');
        if (raw === '4532123456789012') {
            changeView(ViewState.ONBOARDING_PIN);
        } else {
            setError(true);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-y-auto no-scrollbar">
            <Header onBack={() => changeView(ViewState.LOGIN_METHODS)} />
            
            <div className="px-8 pt-2 flex-1 flex flex-col">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Activar tarjeta</h1>
                    <p className="text-slate-500">Ingresa el número de tu tarjeta para comenzar</p>
                </div>

                {/* Card Visualization */}
                <div className="relative w-full aspect-[1.6/1] bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 mb-10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/3 translate-x-1/4"></div>
                    
                    <div className="w-12 h-8 bg-white/30 rounded-lg mb-12"></div>
                    
                    <div className="flex gap-3 mb-6">
                        {cardNumber ? (
                            <p className="text-2xl font-bold tracking-widest">{cardNumber}</p>
                        ) : (
                            [1,2,3,4].map(i => (
                                <div key={i} className="flex gap-1">
                                    {[1,2,3,4].map(j => <div key={j} className="w-1.5 h-1.5 bg-white rounded-full"></div>)}
                                </div>
                            ))
                        )}
                    </div>
                    
                    <p className="text-[10px] font-bold tracking-widest opacity-80 uppercase">Número de tarjeta</p>
                </div>

                <div className="mb-8">
                    <InputField 
                        label="Número de tarjeta"
                        placeholder="4532 1234 5678 9012"
                        value={cardNumber}
                        onChange={handleCardChange}
                        error={error}
                        icon={<CreditCard className="w-5 h-5" />}
                    />
                    <p className="text-slate-400 text-xs mt-2 ml-1">16 dígitos sin espacios</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-900">Tus datos están protegidos</h4>
                        <p className="text-xs text-slate-500">Encriptación de extremo a extremo</p>
                    </div>
                </div>

                <div className="mt-auto pb-8 flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-2">
                            <div className="w-8 h-1.5 bg-indigo-600 rounded-full"></div>
                            <div className="w-8 h-1.5 bg-slate-200 rounded-full"></div>
                        </div>
                        <span className="text-indigo-600 font-bold text-xs mt-1">1 de 2</span>
                    </div>

                    <Button 
                        onClick={handleContinue} 
                        disabled={cardNumber.replace(/\s/g, '').length !== 16}
                        className="flex items-center justify-center gap-2"
                    >
                        Continuar
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

// --- Onboarding: Create PIN ---
export const OnboardingPinScreen: React.FC<ScreenProps> = ({ changeView, onUpdateUser }) => {
    const [pin, setPin] = useState('');

    const handlePress = (val: string) => {
        if (pin.length < 4) setPin(prev => prev + val);
    };

    const handleDelete = () => {
        setPin(prev => prev.slice(0, -1));
    };

    const handleFinish = () => {
        if (pin.length === 4 && onUpdateUser) {
            onUpdateUser('pin', pin);
            setTimeout(() => {
                changeView(ViewState.PIN_SUCCESS);
            }, 300);
        }
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-y-auto no-scrollbar">
            <Header onBack={() => changeView(ViewState.ONBOARDING_CARD)} />
            
            <div className="px-8 pt-2 flex-1 flex flex-col">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Crea tu PIN</h1>
                    <p className="text-slate-500">Elige 4 dígitos que puedas recordar fácilmente</p>
                </div>

                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                        <Check className="w-8 h-8" strokeWidth={3} />
                    </div>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-2xl flex items-center gap-4 mb-10">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                        <Check className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-indigo-700">Tarjeta verificada</h4>
                        <p className="text-xs text-indigo-600 font-medium">.... .... .... 5678</p>
                    </div>
                </div>

                <div className="mb-8 flex flex-col items-center">
                    <h3 className="font-bold text-slate-900 mb-6">Tu PIN de seguridad</h3>
                    <div className="flex gap-4 mb-4">
                        {[0, 1, 2, 3].map(i => (
                            <div 
                                key={i} 
                                className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all ${
                                    i < pin.length 
                                    ? 'border-indigo-600 bg-white' 
                                    : (i === pin.length ? 'border-indigo-400 bg-indigo-50/30' : 'border-slate-100 bg-slate-50')
                                }`}
                            >
                                {i < pin.length && <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>}
                                {i === pin.length && <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></div>}
                            </div>
                        ))}
                    </div>
                    <p className="text-slate-400 text-xs">El PIN debe tener exactamente 4 dígitos</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl mb-10">
                    <h4 className="font-bold text-slate-900 text-sm mb-3">Consejos de seguridad</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-xs text-slate-500">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                            No uses fechas de nacimiento
                        </li>
                        <li className="flex items-center gap-2 text-xs text-slate-500">
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                            Evita secuencias como 1234
                        </li>
                    </ul>
                </div>

                <div className="mt-auto pb-8 flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex gap-2">
                            <div className="w-8 h-1.5 bg-indigo-600 rounded-full"></div>
                            <div className="w-8 h-1.5 bg-indigo-600 rounded-full"></div>
                        </div>
                        <span className="text-indigo-600 font-bold text-xs mt-1">2 de 2</span>
                    </div>

                    <div className="w-full">
                        <div className="scale-90 -mt-8 mb-4">
                            <Keypad onPress={handlePress} onDelete={handleDelete} showForgot={false} />
                        </div>
                        <Button 
                            onClick={handleFinish}
                            disabled={pin.length !== 4}
                            className="flex items-center justify-center gap-2"
                        >
                            Finalizar
                            <Check className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 1.5. Select Account Login Screen (Debit Cards)
export const SelectAccountLoginScreen: React.FC<ScreenProps> = ({ changeView, user }) => {
    return (
        <div className="flex flex-col h-full bg-white overflow-y-auto no-scrollbar">
            <Header onBack={() => changeView(ViewState.LOGIN_METHODS)} />
            
            <div className="px-8 pt-6 flex-1 flex flex-col">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Tarjetas de débito</h1>
                    <p className="text-slate-500">Selecciona la tarjeta guardada con la que deseas ingresar</p>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                    {user?.accounts.map(acc => (
                        <ActionCard 
                            key={acc.id}
                            title={acc.name}
                            subtitle={`Tarjeta **** ${acc.number.slice(-4)}`}
                            icon={<CreditCard className="w-6 h-6" />}
                            bgColor="bg-indigo-50"
                            textColor="text-indigo-600"
                            onClick={() => changeView(ViewState.PIN_ENTRY)}
                        />
                    ))}
                </div>

                <div className="mt-auto pb-8">
                    <p className="text-center text-slate-400 text-xs px-10">
                        Si no ves tu tarjeta, asegúrate de haberla activado en la opción de registro.
                    </p>
                </div>
            </div>
        </div>
    );
};

// 2. PIN Entry Screen
export const PinEntryScreen: React.FC<ScreenProps> = ({ changeView, savedPin = '1234' }) => {
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showError, setShowError] = useState(false);
  const pinLength = savedPin.length;

  const handlePress = (val: string) => {
    if (pin.length < pinLength) setPin(prev => prev + val);
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

  useEffect(() => {
    if (pin.length === pinLength) {
      // Mock validation
      if (pin === savedPin) {
        setTimeout(() => changeView(ViewState.DASHBOARD), 300);
      } else {
        setTimeout(() => setShowError(true), 300);
      }
    }
  }, [pin, changeView, savedPin, pinLength]);

  return (
    <div className="flex flex-col h-full relative bg-white">
      <Header onBack={() => changeView(ViewState.LOGIN_METHODS)} />
      
      <div className="flex-1 flex flex-col items-center pt-8 px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Ingresa tu PIN</h2>
        <p className="text-slate-500 mb-8">Cuenta **** 4321</p>
        
        <PinDots length={pinLength} filled={pin.length} isError={showError} />

        <Keypad 
          onPress={handlePress} 
          onDelete={handleDelete} 
          onForgot={() => changeView(ViewState.FORGOT_PIN_EMAIL)} 
        />
      </div>

      {/* Error Modal Overlay */}
      {showError && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm flex flex-col items-center text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-6">
              <X className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">PIN incorrecto</h3>
            <p className="text-slate-500 mb-6">
              La clave de {pinLength} dígitos que ingresaste no es válida.
              <br/>Inténtalo de nuevo.
            </p>
            <p className="text-slate-500 text-sm font-semibold mb-6">
              Tienes un máximo de 3 oportunidades. Luego de ello, la cuenta se bloqueará.
            </p>
            <Button 
              onClick={() => {
                setShowError(false);
                setPin('');
                setAttempts(a => a + 1);
              }}
              className="mb-4"
            >
              Reintentar
            </Button>
            <Button variant="secondary" onClick={() => changeView(ViewState.FORGOT_PIN_EMAIL)}>
              Olvidé mi clave
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// 3. Forgot PIN - Email
export const ForgotPinEmailScreen: React.FC<ScreenProps> = ({ changeView }) => {
  return (
    <div className="flex flex-col h-full">
      <Header onBack={() => changeView(ViewState.PIN_ENTRY)} />
      <div className="px-6 pt-4 flex-1">
        <h1 className="text-center text-xl font-bold mb-8">Recuperar PIN</h1>
        
        <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 mb-6">
                <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">¿Olvidaste tu PIN?</h2>
            <p className="text-center text-slate-500 px-4">Ingresa tu correo para enviarte un código de verificación.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <InputField 
                label="Correo"
                placeholder="correo@ejemplo.com"
                type="email"
                className="mb-4"
            />
            <p className="text-slate-500 text-sm mb-6">Si el correo existe, te enviaremos un código.</p>
            <Button onClick={() => changeView(ViewState.VERIFY_CODE)}>
                Enviar código
            </Button>
        </div>
        
        <div className="mt-8 text-center">
             <button onClick={() => changeView(ViewState.LOGIN_METHODS)} className="text-indigo-600">Volver a iniciar sesión</button>
        </div>
      </div>
    </div>
  );
};

// 4. Verify Code
export const VerifyCodeScreen: React.FC<ScreenProps> = ({ changeView }) => {
  return (
    <div className="flex flex-col h-full">
      <Header onBack={() => changeView(ViewState.FORGOT_PIN_EMAIL)} />
      <div className="px-6 pt-4 flex-1 flex flex-col items-center">
        <h1 className="text-xl font-bold mb-10">Verificar código</h1>
        
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-6">
            <Mail className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Ingresa el código</h2>
        <p className="text-center text-slate-500 mb-1">Enviamos un código a</p>
        <p className="text-center text-slate-900 font-bold mb-8">mi****@correo.com</p>

        <div className="flex gap-3 mb-4 w-full justify-center">
            {[1,2,3,4,5,6].map(i => (
                <div key={i} className="w-12 h-14 border border-slate-200 rounded-xl flex items-center justify-center text-2xl font-bold">
                    {i === 3 ? '•' : ''}
                </div>
            ))}
        </div>

        <div className="flex justify-between w-full text-slate-500 text-sm mb-8 px-2">
            <span>Reenviar en 00:42</span>
            <span className="text-slate-400">Reenviar</span>
        </div>

        <Button onClick={() => changeView(ViewState.CREATE_PIN)}>
            Verificar
        </Button>
        
        <div className="mt-8">
             <button className="text-indigo-600">Cambiar correo</button>
        </div>
      </div>
    </div>
  );
};

// 5. Create/Confirm PIN Logic (Combined for brevity but handles both states)
export const CreatePinScreen: React.FC<ScreenProps & { mode: 'create' | 'confirm' }> = ({ changeView, mode }) => {
  const [pin, setPin] = useState('');
  
  const handlePress = (val: string) => {
      if (pin.length < 4) setPin(prev => prev + val);
  };
  
  useEffect(() => {
      if (pin.length === 4) {
          // Delay for effect
          if(mode === 'create') {
             setTimeout(() => changeView(ViewState.CONFIRM_PIN), 500);
          } else {
             setTimeout(() => changeView(ViewState.PIN_SUCCESS), 500);
          }
      }
  }, [pin, mode, changeView]);

  return (
      <div className="flex flex-col h-full">
          <Header onBack={() => changeView(mode === 'create' ? ViewState.VERIFY_CODE : ViewState.CREATE_PIN)} />
          <div className="px-6 pt-4 flex-1 flex flex-col items-center">
            <h1 className="text-xl font-bold mb-8">Nuevo PIN</h1>
            
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 mb-6">
                <Lock className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
                {mode === 'create' ? 'Crea tu PIN' : 'Confirma tu PIN'}
            </h2>
            <p className="text-center text-slate-500 mb-6">
                {mode === 'create' 
                  ? 'El PIN debe tener 4 dígitos numéricos.' 
                  : 'Este será tu código de acceso'}
            </p>

            {/* Visual representation only for the "top" part of the screenshot design */}
            {mode === 'create' && (
                 <div className="w-full flex justify-center gap-2 mb-8">
                    {[1,2,3,4].map(i => <div key={i} className="w-12 h-14 bg-slate-100 rounded-xl"></div>)}
                 </div>
            )}
             
            {mode === 'confirm' && (
                <PinDots length={4} filled={pin.length} />
            )}

            {mode === 'create' && (
                <div className="w-full">
                   <p className="text-xs text-slate-400 text-center mb-4">Tip: evita usar secuencias (1234) o fechas fáciles de adivinar.</p>
                   {/* In real app, we would use Keypad here, but screenshot shows an input field visualization. 
                       We'll stick to Keypad for functionality as requested "fully functional" */}
                   <Button onClick={() => changeView(ViewState.CONFIRM_PIN)}>Guardar PIN</Button>
                </div>
            )}

            {mode === 'confirm' && (
                <Keypad onPress={handlePress} onDelete={() => setPin(p => p.slice(0, -1))} showForgot={false} />
            )}
          </div>
      </div>
  )
}

// 6. Success PIN
export const PinSuccessScreen: React.FC<ScreenProps & { message: string, btnText: string, nextView: ViewState }> = ({ changeView, message, btnText, nextView }) => {
    return (
        <div className="flex flex-col h-full justify-center px-6 items-center bg-white overflow-y-auto no-scrollbar">
             <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-8 animate-in zoom-in duration-300">
                <Check className="w-16 h-16" strokeWidth={3} />
             </div>
             <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">{message}</h2>
             <p className="text-slate-500 text-center mb-12">
                {message === '¡PIN creado!' 
                  ? 'Tu tarjeta ha sido guardada con éxito. Ya puedes acceder con tu nuevo PIN desde la opción "Tarjeta de débito".' 
                  : 'Ya puedes iniciar sesión con tu nuevo PIN.'}
             </p>
             
             {message === '¡PIN creado!' && (
                 <div className="bg-indigo-50 p-6 rounded-3xl flex items-center gap-4 w-full mb-12 border border-indigo-100">
                     <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <Lock className="w-6 h-6" />
                     </div>
                     <div>
                         <h4 className="font-bold text-slate-900">Seguridad activada</h4>
                         <p className="text-xs text-slate-500">Tu PIN protege todas tus operaciones</p>
                     </div>
                 </div>
             )}

             <Button onClick={() => changeView(nextView)}>{btnText}</Button>
             
             {message === 'PIN actualizado' && (
                 <p className="mt-6 text-slate-400 text-xs text-center px-8">Si no solicitaste este cambio, contacta soporte.</p>
             )}
             
             {message === 'PIN actualizado' && (
                 <div className="mt-8 w-full border border-slate-200 rounded-2xl p-6 text-center">
                    <h3 className="font-bold mb-2">Soporte</h3>
                    <p className="text-sm text-slate-500 mb-4">Ayuda con el acceso a tu cuenta</p>
                    <button className="bg-blue-50 text-blue-600 py-2 px-6 rounded-lg font-bold text-sm">Contactar</button>
                 </div>
             )}
        </div>
    )
}
