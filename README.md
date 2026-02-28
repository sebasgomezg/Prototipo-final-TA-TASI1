# Banco Confía - Banca Móvil

Este proyecto es una aplicación web progresiva (PWA) construida con React que simula la experiencia de una aplicación bancaria nativa.

## Enlaces del Proyecto

- **Google AI Studio:** [Ver Aplicación](https://ai.studio/apps/drive/1MuhzVhuUQE8ditUZ71KeawuLos9cXcpl)
- **Documentación:** [Ver Documento](https://docs.google.com/document/d/1eWgnBv2hy6Iwvh_UMATi_YH9_Ej9F7VLZiAyk8U6AOE/edit?usp=sharing)

## Integrantes

- Carlos Camilo Vásquez Morales (20202583)
- Sebastián Gómez Armando Garay (20196378)

## Características

- **Autenticación Segura:** Ingreso mediante número de cuenta, tarjeta o DNI con validación de PIN.
- **Dashboard Interactivo:** Vista rápida de saldo, accesos directos y últimos movimientos.
- **Transferencias:** Flujo completo para enviar dinero a contactos favoritos o terceros.
- **Pagos de Servicios:** Búsqueda de empresas, selección de recibos y pago de deudas.
    - *Prueba:* Ingresa el número `987654321` en el servicio de Entel para ver deudas. Otros números de 9 dígitos mostrarán que estás al día.
- **Historial de Movimientos:** Listado detallado de transacciones con filtros por fecha y cuenta.
- **Validaciones de Negocio:**
    - Límite de transferencia: S/ 1.00 a S/ 60,000.00.
    - Validación de saldo insuficiente en transferencias.
    - Validación de longitud exacta (9 dígitos) para números de teléfono en pagos.

## Credenciales de Acceso

Para probar la aplicación, utiliza las siguientes credenciales simuladas:

- **Usuario:** Sebastian
- **Método de acceso:** Cualquiera (Cuenta, Tarjeta o DNI)
- **PIN:** `123456`

> **Nota:** Si ingresas un PIN incorrecto 3 veces, se mostrará una pantalla de bloqueo simulada. El PIN correcto siempre es `123456`.

## Datos para Pruebas

### Pagos de Servicios (Entel)
- **Número con deuda:** `987654321` (Muestra facturas pendientes).
- **Otros números:** Deben tener exactamente 9 dígitos para ser válidos y mostrarán "¡Estás al día!".

### Transferencias a Terceros
Para simular la validación exitosa de una cuenta a terceros, utiliza el siguiente número:

- **Cuenta válida:** `194-88888888-0-01`
- **Titular:** María González

Cualquier otro número simulará una cuenta no válida o no encontrada.

### Límites de Transferencia
- **Monto mínimo:** S/ 1.00
- **Monto máximo:** S/ 60,000.00
- **Validación:** No se permite transferir más del saldo disponible en la cuenta origen.

## Tecnologías

- React 18
- Tailwind CSS
- Lucide React (Iconos)
- TypeScript

## Instalación y Uso

1.  Clonar el repositorio.
2.  Instalar dependencias (aunque este entorno usa ESM modules directamente).
3.  Ejecutar `npm start` o abrir el archivo `index.html` en un servidor local.