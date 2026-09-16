export const WHATSAPP_PHONE = '919654238328';

export function createWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
}

export function generateProductOrderMessage(params: {
  productName: string;
  size?: string;
  flavour?: string;
  customization?: string;
  quantity?: number;
  date?: string;
  deliveryArea?: string;
}): string {
  return `✨ *Order Enquiry – La Claire Patisserie* ✨

🍰 *Product:* ${params.productName}
📏 *Size / Servings:* ${params.size || 'Standard'}
🌸 *Flavour:* ${params.flavour || 'Standard Chef Selection'}
${params.customization ? `💌 *Custom Note / Message:* ${params.customization}\n` : ''}🛍️ *Quantity:* ${params.quantity || 1}
${params.date ? `📅 *Required Date:* ${params.date}\n` : ''}${params.deliveryArea ? `📍 *Delivery Area:* ${params.deliveryArea}\n` : '📍 *Location:* Delhi NCR\n'}
Please confirm availability, price and delivery slot. Thank you!`;
}

export function generateHamperOrderMessage(params: {
  hamperName?: string;
  items?: { name: string; quantity: number }[];
  packagingType?: string;
  personalizedNote?: string;
  budget?: string;
  occasion?: string;
  requiredDate?: string;
}): string {
  let itemsList = '';
  if (params.items && params.items.length > 0) {
    itemsList = params.items.map(item => `• ${item.name} (x${item.quantity})`).join('\n');
  }

  return `🎁 *Hamper & Gifting Enquiry – La Claire Patisserie* ✨

📦 *Hamper:* ${params.hamperName || 'Custom Curated Hamper'}
${params.occasion ? `🎉 *Occasion:* ${params.occasion}\n` : ''}${itemsList ? `✨ *Selected Goodies:*\n${itemsList}\n` : ''}${params.packagingType ? `🎀 *Packaging:* ${params.packagingType}\n` : ''}${params.personalizedNote ? `💌 *Gift Note:* "${params.personalizedNote}"\n` : ''}${params.budget ? `💎 *Budget / Target:* ${params.budget}\n` : ''}${params.requiredDate ? `📅 *Delivery Date:* ${params.requiredDate}\n` : ''}📍 *Delivery:* Delhi NCR

Please share availability and packaging options for this hamper.`;
}

export function generateCustomOrderMessage(params: {
  name: string;
  phone: string;
  occasion: string;
  date: string;
  guests: string;
  productType: string;
  flavour: string;
  dietaryPreference?: string;
  budget: string;
  deliveryLocation: string;
  specialRequests: string;
}): string {
  return `🎂 *Bespoke Celebration Order Enquiry – La Claire Patisserie* ✨

👤 *Client Name:* ${params.name || 'Not provided'}
📞 *Contact:* ${params.phone || 'WhatsApp'}
🎉 *Occasion:* ${params.occasion}
📅 *Event Date:* ${params.date}
👥 *Number of Guests / Servings:* ${params.guests}
🍰 *Type:* ${params.productType}
🌸 *Preferred Flavour:* ${params.flavour || 'Open to recommendations'}
${params.dietaryPreference ? `🌿 *Special Note:* ${params.dietaryPreference}\n` : ''}💎 *Approx. Budget:* ${params.budget || 'Flexible'}
📍 *Delivery Location:* ${params.deliveryLocation || 'Delhi NCR'}

🎨 *Vision & Details:*
${params.specialRequests || 'Custom celebration cake with elegant floral & modern aesthetic.'}

Looking forward to designing something sweet together!`;
}

export function generateGeneralEnquiryMessage(topic: string = 'placing an order'): string {
  return `Hi Chef Anushka! ✨\n\nI was browsing your website (La Claire Patisserie) and would love to enquire about ${topic}.\n\nCould you please share availability and ordering details? 🍰`;
}
