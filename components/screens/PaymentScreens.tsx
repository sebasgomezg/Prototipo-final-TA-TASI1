import React, { useState } from 'react';
import { ViewState, PaymentDetails, UserContextType, Account, MovementItem } from '../../types';
import { Header, Button } from '../ui/Shared';
import { Search, ChevronRight, Check, Zap, Droplet, Smartphone, LayoutGrid, Plus, ChevronDown } from 'lucide-react';

interface PaymentProps {
  changeView: (view: ViewState) => void;
  setPayment: (details: PaymentDetails) => void;
  payment: PaymentDetails | null;
  user: UserContextType;
  onConfirm?: (movement: Omit<MovementItem, 'id' | 'dateLabel' | 'time'>) => void;
}

// 1. Payment Menu
export const PaymentMenuScreen: React.FC<PaymentProps> = ({ changeView }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const frequentServices = [
    { id: 'entel', name: 'Entel', subtitle: 'Telefonía móvil y fija', icon: <Smartphone className="w-6 h-6" />, color: 'bg-blue-100 text-blue-600', view: ViewState.PAYMENT_SERVICE_SELECT },
    { id: 'luz', name: 'Luz del Sur', subtitle: 'Energía eléctrica', icon: <Zap className="w-6 h-6 fill-current" />, color: 'bg-yellow-100 text-yellow-600' },
    { id: 'sedapal', name: 'Sedapal', subtitle: 'Agua potable', icon: <Droplet className="w-6 h-6 fill-current" />, color: 'bg-blue-100 text-blue-500' },
  ];

  const otherCompanies = [
    { id: 'claro', name: 'Claro Perú' },
    { id: 'movistar', name: 'Movistar' },
  ];

  const filteredFrequent = frequentServices.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOther = otherCompanies.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <Header title="Pagar servicios" onBack={() => changeView(ViewState.DASHBOARD)} />
      
      <div className="px-6 py-4">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm mb-8">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
                placeholder="Buscar empresa" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full outline-none text-slate-900 placeholder:text-slate-400 font-medium"
            />
        </div>

        {/* Frequent Services */}
        {filteredFrequent.length > 0 && (
          <>
            <h3 className="font-bold text-lg text-slate-900 mb-4">Servicios frecuentes</h3>
            <div className="flex flex-col gap-4 mb-8">
                {filteredFrequent.map(service => (
                  <div 
                      key={service.id}
                      onClick={() => service.view && changeView(service.view)}
                      className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer active:bg-slate-50 transition-colors"
                  >
                      <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center shrink-0`}>
                          {service.icon}
                      </div>
                      <div className="flex-1">
                          <h4 className="font-bold text-slate-900">{service.name}</h4>
                          <p className="text-slate-400 text-xs">{service.subtitle}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                ))}
            </div>
          </>
        )}

        {/* Other Companies */}
        {filteredOther.length > 0 && (
          <>
            <h3 className="font-bold text-lg text-slate-900 mb-4">Otras empresas</h3>
            <div className="flex flex-col gap-4">
                {filteredOther.map(company => (
                  <div key={company.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer">
                    <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center shrink-0">
                        <LayoutGrid className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-slate-900">{company.name}</h4>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                ))}
            </div>
          </>
        )}

        {filteredFrequent.length === 0 && filteredOther.length === 0 && (
          <div className="text-center py-10">
            <p className="text-slate-400">No se encontraron empresas.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Service Selection
export const PaymentServiceSelectScreen: React.FC<PaymentProps> = ({ changeView }) => {
    return (
        <div className="flex flex-col h-full bg-slate-50">
             <Header title="Pagar Entel" onBack={() => changeView(ViewState.PAYMENT_MENU)} />
             <div className="px-6 py-4">
                 
                 <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                        <Smartphone className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900">Entel</span>
                 </div>

                 <h3 className="font-bold text-lg text-slate-900 mb-4">Selecciona el servicio</h3>
                 
                 <div className="space-y-4">
                    <div 
                        onClick={() => changeView(ViewState.PAYMENT_BILL_SELECT)}
                        className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-all"
                    >
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900">Línea móvil</h4>
                            <p className="text-slate-400 text-xs">Paga tu teléfono celular</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                             <div className="w-6 h-5 border-2 border-blue-600 rounded-sm"></div>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900">Línea fija</h4>
                            <p className="text-slate-400 text-xs">Paga tu teléfono de casa</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>

                    <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                            <div className="w-6 h-4 border-2 border-blue-600 rounded-sm flex items-center justify-center text-[8px] font-bold">TV</div>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900">Internet y TV</h4>
                            <p className="text-slate-400 text-xs">Paga tu plan duo o trio</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                 </div>

             </div>
        </div>
    );
};

// 3. Bill Selection
export const PaymentBillSelectScreen: React.FC<PaymentProps> = ({ changeView, setPayment, user, onConfirm }) => {
    const [phoneNumber, setPhoneNumber] = useState('987654321');
    const [selectedBills, setSelectedBills] = useState<string[]>(['bill1']); // Pre-select bill1
    const [sourceAccount, setSourceAccount] = useState<Account>(user.accounts[0]);
    const [showAccountSelector, setShowAccountSelector] = useState(false);

    const hasDebts = phoneNumber.replace(/\s/g, '') === '987654321';

    const bills = hasDebts ? [
        { id: 'bill1', title: 'Factura Febrero 2026', date: 'Vence: 15 Feb 2026', number: '2026-02-001234', amount: 59.90, status: 'Pendiente' },
        { id: 'bill2', title: 'Factura Enero 2026', date: 'Vence: 15 Ene 2026', number: '2026-01-001233', amount: 62.50, status: 'Atrasada' },
    ] : [];

    const toggleBill = (id: string) => {
        setSelectedBills(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const totalAmount = bills
        .filter(b => selectedBills.includes(b.id))
        .reduce((sum, b) => sum + b.amount, 0);

    const handleContinue = () => {
        const paymentDetails = {
            serviceName: `Entel - ${phoneNumber}`,
            amount: totalAmount.toFixed(2),
            operationId: 'OP-20260205-8849'
        };
        setPayment(paymentDetails);
        
        if (onConfirm) {
            onConfirm({
                title: 'Pago de servicio',
                subtitle: `Entel - ${phoneNumber}`,
                amount: -totalAmount,
                type: 'payment',
                account: sourceAccount.name
            });
        }
        
        changeView(ViewState.PAYMENT_SUCCESS);
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 relative">
             <Header title="Pagar Entel" onBack={() => changeView(ViewState.PAYMENT_SERVICE_SELECT)} />
             
             <div className="px-6 py-4 flex-1 overflow-y-auto no-scrollbar pb-40">
                <div className="mb-6">
                    <label className="text-slate-500 font-bold text-sm mb-2 block">Número de teléfono</label>
                    <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-transparent focus-within:border-indigo-500 transition-all">
                        <input 
                            type="text"
                            maxLength={9}
                            value={phoneNumber}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setPhoneNumber(val);
                                if (val !== '987654321') {
                                    setSelectedBills([]);
                                } else {
                                    setSelectedBills(['bill1']);
                                }
                            }}
                            className="font-bold text-slate-900 text-lg outline-none w-full"
                            placeholder="Ej: 987654321"
                        />
                        {phoneNumber.length === 9 && (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${hasDebts ? 'bg-emerald-100 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                                <Check className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                    {phoneNumber.length > 0 && phoneNumber.length < 9 && (
                        <p className="text-red-500 text-[10px] mt-1 font-bold ml-2 animate-in fade-in slide-in-from-top-1">Debe ingresar exactamente 9 dígitos</p>
                    )}
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-4">Deudas encontradas</h3>

                {bills.length > 0 ? (
                    <div className="space-y-4 mb-4">
                        {bills.map((bill) => {
                            const isSelected = selectedBills.includes(bill.id);
                            return (
                                <div 
                                    key={bill.id}
                                    onClick={() => toggleBill(bill.id)}
                                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all bg-white relative overflow-hidden ${isSelected ? 'border-indigo-600' : 'border-transparent shadow-sm'}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                                            {isSelected && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-slate-900">{bill.title}</h4>
                                                <span className="font-bold text-slate-900 text-lg">S/ {bill.amount.toFixed(2)}</span>
                                            </div>
                                            <p className="text-slate-400 text-xs mb-1">{bill.date}</p>
                                            <p className="text-slate-300 text-xs">N° {bill.number}</p>
                                            
                                            <div className="absolute top-10 right-4">
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                                                    bill.status === 'Atrasada' ? 'bg-red-100 text-red-500' : 'bg-amber-100 text-amber-500'
                                                }`}>
                                                    {bill.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-center mb-8 border border-slate-100">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-8 h-8" strokeWidth={3} />
                        </div>
                        <p className="font-bold text-slate-900 mb-1">¡Estás al día!</p>
                        <p className="text-slate-400 text-sm">No se encontraron deudas pendientes para este número.</p>
                    </div>
                )}

                {bills.length > 0 && (
                    <button 
                        onClick={() => setSelectedBills(bills.map(b => b.id))}
                        className="text-indigo-600 font-bold text-sm mb-8"
                    >
                        Pagar todas (S/ 122.40)
                    </button>
                )}

                <div className="mb-20">
                    <p className="font-bold text-slate-500 text-sm mb-2">Cuenta de pago</p>
                    <div 
                        onClick={() => setShowAccountSelector(true)}
                        className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center cursor-pointer border border-transparent hover:border-indigo-100 transition-all"
                    >
                        <div>
                            <p className="font-bold text-slate-900">{sourceAccount.name} **** {sourceAccount.number.slice(-4)}</p>
                            <p className="text-slate-400 text-xs">Disponible: S/ {sourceAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2})}</p>
                        </div>
                        <ChevronDown className="w-5 h-5 text-indigo-600" />
                    </div>
                </div>
             </div>

             {/* Sticky Bottom Area */}
             <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 rounded-t-[2rem] shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                 <div className="flex justify-between items-center mb-4">
                     <div>
                         <p className="text-slate-900 font-bold text-lg">Total a pagar</p>
                         <p className="text-slate-400 text-xs">Comisión</p>
                     </div>
                     <div className="text-right">
                         <p className="text-slate-900 font-bold text-2xl">S/ {totalAmount.toFixed(2)}</p>
                         <p className="text-emerald-500 font-bold text-xs">S/ 0.00</p>
                     </div>
                 </div>
                 <Button onClick={handleContinue} disabled={totalAmount === 0 || phoneNumber.length !== 9}>Continuar</Button>
             </div>

             {/* Account Selector Modal */}
             {showAccountSelector && (
                <div className="absolute inset-0 z-50 flex items-end">
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowAccountSelector(false)}></div>
                    <div className="bg-white w-full rounded-t-3xl p-6 relative z-10 animate-in slide-in-from-bottom duration-300">
                        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
                        <h3 className="font-bold text-lg text-slate-900 mb-6">Selecciona una cuenta</h3>
                        
                        <div className="space-y-4 mb-6">
                            {user.accounts.map(acc => (
                                <div 
                                    key={acc.id}
                                    onClick={() => {
                                        setSourceAccount(acc);
                                        setShowAccountSelector(false);
                                    }}
                                    className={`p-4 rounded-xl border-2 cursor-pointer flex justify-between items-center ${
                                        sourceAccount.id === acc.id 
                                        ? 'border-indigo-600 bg-indigo-50' 
                                        : 'border-slate-100 hover:border-slate-300'
                                    }`}
                                >
                                    <div>
                                        <p className="font-bold text-slate-900">{acc.name}</p>
                                        <p className="text-slate-500 text-sm">**** {acc.number.slice(-4)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-slate-900">S/ {acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2})}</p>
                                        {sourceAccount.id === acc.id && (
                                            <div className="flex justify-end mt-1">
                                                <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <Button variant="secondary" onClick={() => setShowAccountSelector(false)}>Cancelar</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

// 4. Payment Success
export const PaymentSuccessScreen: React.FC<PaymentProps> = ({ changeView, payment }) => {
    if (!payment) return null;

    return (
        <div className="flex flex-col h-full bg-white px-6 pt-12 items-center text-center overflow-y-auto no-scrollbar">
             <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6 animate-in zoom-in duration-300">
                <Check className="w-16 h-16" strokeWidth={3} />
             </div>

             <h1 className="text-2xl font-extrabold text-slate-900 mb-2">¡Pago exitoso!</h1>
             <p className="text-slate-500 mb-8">Tu servicio fue pagado correctamente</p>

             <div className="bg-slate-50 w-full rounded-2xl p-6 mb-6">
                 <div className="text-left mb-4">
                     <p className="text-slate-500 font-bold text-xs">Monto pagado</p>
                     <p className="text-3xl font-extrabold text-slate-900">S/ {payment.amount}</p>
                 </div>
                 
                 <div className="border-t border-slate-200 my-4"></div>
                 
                 <div className="text-left mb-4">
                     <p className="text-slate-500 font-bold text-xs">Empresa</p>
                     <div className="flex items-center gap-3 mt-1">
                         <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                             <Smartphone className="w-4 h-4" />
                         </div>
                         <p className="font-bold text-slate-900">{payment.serviceName}</p>
                     </div>
                 </div>

                 <div className="flex justify-between items-center text-xs">
                     <p className="text-slate-500 font-bold">N° de operación</p>
                     <p className="text-indigo-600 font-bold">{payment.operationId}</p>
                 </div>
             </div>

             <div className="w-full space-y-4 mb-8">
                 <button className="w-full border border-slate-200 rounded-2xl py-4 px-4 flex items-center justify-center gap-2 font-bold text-slate-900 hover:bg-slate-50">
                     <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 text-xl font-light">+</div>
                     Compartir comprobante
                 </button>
                 
                 <button className="w-full border border-slate-200 rounded-2xl py-4 font-bold text-slate-500 hover:bg-slate-50" onClick={() => changeView(ViewState.PAYMENT_MENU)}>
                     Pagar otro servicio
                 </button>
                 
                 <Button onClick={() => changeView(ViewState.DASHBOARD)}>Ir al inicio</Button>
             </div>
        </div>
    );
};