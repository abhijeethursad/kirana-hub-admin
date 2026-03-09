import { Order } from "@/types/order";

export const printInvoice = (order: Order) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Please allow pop-ups to print invoices.");
    return;
  }

  const totalNum = typeof order.total === 'string' ? parseFloat(order.total.replace(/,/g, '') || '0') : typeof order.total === 'number' ? order.total : 0;
  const subtotal = (totalNum / 1.18).toFixed(2);
  const taxAmount = (totalNum - parseFloat(subtotal)).toFixed(2);

  let stampHtml = '';
  if (order.status.toLowerCase() === 'delivered') {
    stampHtml = `<div class="absolute top-48 right-12 border-[6px] border-emerald-600 text-emerald-600 text-6xl font-black uppercase tracking-[0.2em] px-8 py-3 transform rotate-[12deg] opacity-20 rounded-xl z-0 pointer-events-none mix-blend-multiply">PAID</div>`;
  } else if (order.status.toLowerCase() === 'cancelled') {
    stampHtml = `<div class="absolute top-48 right-12 border-[6px] border-rose-600 text-rose-600 text-5xl font-black uppercase tracking-[0.2em] px-8 py-3 transform rotate-[12deg] opacity-20 rounded-xl z-0 pointer-events-none mix-blend-multiply">CANCELLED</div>`;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Tax Invoice - #${order.id}</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800;900&family=JetBrains+Mono:wght@500;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        @media print {
          body { margin: 0; padding: 0; background-color: white !important; }
          @page { margin: 0; size: A4; }
        }
      </style>
    </head>
    <body class="bg-white text-slate-900 antialiased relative min-h-screen p-12">
      
      ${stampHtml}

      <div class="max-w-4xl mx-auto relative z-10 pt-8">
        
        <div class="flex justify-between items-start pb-8">
          <div class="flex items-center gap-4">
            <div class="h-16 w-16 bg-slate-900 flex items-center justify-center text-white font-black text-3xl">
              <span class="transform -skew-x-12">K</span>
            </div>
            <div>
              <h1 class="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Kirana Hub</h1>
              <p class="text-slate-500 font-bold text-[10px] tracking-[0.2em] mt-2 uppercase">Premium Retail & Logistics</p>
            </div>
          </div>
          <div class="text-right">
            <h2 class="text-4xl font-black text-slate-200 uppercase tracking-widest mb-2">Invoice</h2>
            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1">Receipt Number</p>
            <h3 class="text-xl font-bold text-slate-900 font-mono">#${order.id}</h3>
          </div>
        </div>

        <div class="border-y-2 border-slate-900 py-4 flex justify-between items-center mb-12 bg-slate-50 px-4">
          <div class="flex gap-12">
            <div>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date of Issue</p>
              <p class="text-xs font-bold text-slate-900">${order.timeAgo}</p>
            </div>
            <div>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">GSTIN / Tax ID</p>
              <p class="text-xs font-bold text-slate-900 font-mono">27AADCB2230M1Z2</p>
            </div>
            <div>
              <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Payment Method</p>
              <p class="text-xs font-bold text-slate-900 uppercase">${order.payment || 'Cash on Delivery'}</p>
            </div>
          </div>
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=60x60&data=KiranaHub_Receipt_${order.id}&color=0f172a" alt="QR" class="mix-blend-multiply opacity-80">
        </div>

        <div class="grid grid-cols-2 gap-12 mb-12">
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-2">Billed To</p>
            <h3 class="text-lg font-black text-slate-900">${order.customer}</h3>
            <p class="text-slate-600 font-medium text-sm mt-1 max-w-xs leading-relaxed">${order.location || 'Store Pickup / Location not provided'}</p>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-2">From</p>
            <h3 class="text-lg font-black text-slate-900">Kirana Hub HQ</h3>
            <p class="text-slate-600 font-medium text-sm mt-1 leading-relaxed">123 Commerce Avenue, Tech District<br/>Pune, Maharashtra 411001<br/>billing@kiranahub.com</p>
          </div>
        </div>

        <div class="mb-8">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b-2 border-slate-900 text-[10px] text-slate-900 uppercase tracking-widest">
                <th class="py-3 pr-4 font-black w-16 text-center">Qty</th>
                <th class="py-3 px-4 font-black">Description</th>
                <th class="py-3 pl-4 font-black text-right">Amount</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              ${order.items.map(item => `
                <tr class="group">
                  <td class="py-5 pr-4 font-black text-slate-900 text-center font-mono">${item.qty}</td>
                  <td class="py-5 px-4 font-bold text-slate-700">${item.name}</td>
                  <td class="py-5 pl-4 font-bold text-slate-900 text-right font-mono">₹${item.price || 0}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        ${order.removedItems && order.removedItems.length > 0 ? `
          <div class="mb-8 bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <p class="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span class="w-2 h-2 bg-slate-400 rounded-full"></span> Adjustments (Out of Stock / Removed)
            </p>
            <div class="space-y-1">
              ${order.removedItems.map(item => `
                <div class="flex justify-between items-center text-xs">
                  <span class="font-bold text-slate-500 line-through">${item.qty}x ${item.name}</span>
                  <div class="flex items-center gap-4">
                    <span class="font-bold text-slate-400 font-mono line-through">₹${item.price || 0}</span>
                    <span class="font-bold text-slate-900 uppercase tracking-widest text-[9px] bg-white px-2 py-1 rounded border border-slate-200">${item.reason}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="flex justify-end mb-16">
          <div class="w-72">
            <div class="flex justify-between py-2 border-b border-slate-100 text-sm">
              <span class="font-bold text-slate-500">Subtotal</span>
              <span class="font-bold text-slate-900 font-mono">₹${subtotal}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-slate-900 text-sm">
              <span class="font-bold text-slate-500">IGST (18%)</span>
              <span class="font-bold text-slate-900 font-mono">₹${taxAmount}</span>
            </div>
            <div class="flex justify-between py-4 items-end">
              <span class="font-black text-slate-900 uppercase tracking-widest text-xs">Total Amount</span>
              <span class="font-black text-4xl text-slate-900 font-mono tracking-tighter">₹${order.total}</span>
            </div>
          </div>
        </div>

        <div class="border-t border-slate-200 pt-8 grid grid-cols-2 gap-12">
          <div>
            <p class="text-[9px] font-black text-slate-900 uppercase tracking-widest mb-2">Terms & Conditions</p>
            <p class="text-[9px] text-slate-500 leading-relaxed font-medium">
              1. Goods once sold will not be taken back or exchanged.<br/>
              2. All disputes are subject to Pune jurisdiction.<br/>
              3. This is a computer-generated invoice and does not require a physical signature.
            </p>
          </div>
          <div class="text-right flex flex-col items-end justify-end">
            <div class="w-48 border-b-2 border-slate-900 border-dashed mb-2"></div>
            <p class="text-[9px] font-black text-slate-900 uppercase tracking-widest">Authorized Signatory</p>
            <p class="text-[9px] text-slate-500 font-medium mt-1">Kirana Hub Retail Pvt. Ltd.</p>
          </div>
        </div>

      </div>
      <script>
        setTimeout(() => {
          window.print();
        }, 800);
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};