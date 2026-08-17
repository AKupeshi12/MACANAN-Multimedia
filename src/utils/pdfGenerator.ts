import jsPDF from 'jspdf';
import { CreativeBriefSubmission } from '../types';
import { SERVICE_PACKAGES, SERVICE_ADD_ONS } from '../data/packagesData';

export function generateRateCardPDF(currency: 'MWK' | 'USD' = 'MWK') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Background dark header bar
  doc.setFillColor(18, 19, 23); // #121317
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Studio Name & Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('MACANAN MULTIMEDIA', 15, 20);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('ARCHITECTURAL MINIMALISM • EDITORIAL GRACE • CINEMA PRODUCTION', 15, 27);
  doc.text('MZUZU, MALAWI • AVAILABLE GLOBALLY • CONTACT: HELLO@MACANAN.COM', 15, 34);

  // Document Badge
  doc.setFillColor(255, 255, 255);
  doc.rect(pageWidth - 65, 14, 50, 16, 'F');
  doc.setTextColor(18, 19, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('OFFICIAL 2026 RATE CARD', pageWidth - 60, 21);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text(`CURRENCY: ${currency}`, pageWidth - 60, 26);

  let currentY = 56;

  // Title Section
  doc.setTextColor(18, 19, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('1. CORE STUDIO & ON-LOCATION PRODUCTION PACKAGES', 15, currentY);

  currentY += 8;

  SERVICE_PACKAGES.forEach((pkg, index) => {
    // Check page height
    if (currentY > 240) {
      doc.addPage();
      currentY = 20;
    }

    // Card background
    doc.setFillColor(245, 246, 248);
    doc.rect(15, currentY, pageWidth - 30, 28, 'F');

    // Left border accent
    doc.setFillColor(18, 19, 23);
    doc.rect(15, currentY, 2, 28, 'F');

    // Package Title & Category
    doc.setTextColor(18, 19, 23);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`${pkg.title}`, 20, currentY + 7);

    // Price
    const priceText = currency === 'MWK' 
      ? `MK ${pkg.priceMWK.toLocaleString()}` 
      : `$${pkg.priceUSD.toLocaleString()}`;
    doc.setFontSize(11);
    doc.text(priceText, pageWidth - 20, currentY + 7, { align: 'right' });

    // Duration & Ideal For
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(90, 90, 90);
    doc.text(`Duration: ${pkg.duration}  |  Category: ${pkg.category}`, 20, currentY + 13);
    doc.text(`Target: ${pkg.idealFor}`, 20, currentY + 18);

    // Deliverables preview
    doc.setTextColor(50, 50, 50);
    const keyDeliverables = pkg.deliverables.slice(0, 2).join('  •  ');
    doc.text(`Key Inclusions: ${keyDeliverables}`, 20, currentY + 24);

    currentY += 32;
  });

  // Section 2: Production Add-Ons & Gear
  if (currentY > 230) {
    doc.addPage();
    currentY = 20;
  } else {
    currentY += 4;
  }

  doc.setTextColor(18, 19, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('2. A LA CARTE PRODUCTION ENHANCEMENTS', 15, currentY);
  currentY += 7;

  SERVICE_ADD_ONS.forEach((addon) => {
    const addonPrice = currency === 'MWK' 
      ? `MK ${addon.priceMWK.toLocaleString()}` 
      : `$${addon.priceUSD.toLocaleString()}`;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    doc.text(`• ${addon.name}`, 18, currentY);
    doc.text(addonPrice, pageWidth - 20, currentY, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(addon.description, 23, currentY + 4);

    currentY += 10;
  });

  // Section 3: Equipment & Terms
  currentY += 4;
  if (currentY > 230) {
    doc.addPage();
    currentY = 20;
  }

  doc.setFillColor(18, 19, 23);
  doc.rect(15, currentY, pageWidth - 30, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('STUDIO PEDIGREE & BOOKING PROTOCOLS', 20, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(220, 220, 220);
  doc.text('• Primary Rigs: Sony FX3 Cinema Line, Sony Alpha 1 (50MP RAW), Hasselblad & Leica Glass', 20, currentY + 13);
  doc.text('• Aerial: DJI Mavic 3 Cine (ProRes 422 HQ / D-Log M) with certified flight safety compliance', 20, currentY + 18);
  doc.text('• Booking Terms: 50% non-refundable retainer locks calendar slot. Balance due upon delivery.', 20, currentY + 23);
  doc.text('• Direct Inquiries: WhatsApp +265 880 000 000 | Studio: Mzuzu City Center, Malawi', 20, currentY + 28);

  // Footer page number
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.text(`MACANAN MULTIMEDIA — 2026 RATE CARD — PAGE ${i} OF ${pageCount}`, pageWidth / 2, 290, { align: 'center' });
  }

  doc.save(`MACANAN_STUDIO_RATE_CARD_2026_${currency}.pdf`);
}

export function generateProjectBriefPDF(brief: CreativeBriefSubmission) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(18, 19, 23);
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('MACANAN MULTIMEDIA', 15, 18);

  doc.setFontSize(10);
  doc.setTextColor(200, 200, 200);
  doc.text('CREATIVE PROJECT BRIEF & PRODUCTION SPECIFICATION', 15, 26);
  doc.setFontSize(7);
  doc.text(`BRIEF REF: ${brief.id}  •  DATE: ${new Date(brief.createdAt).toLocaleDateString()}`, 15, 33);

  let currentY = 50;

  const renderSection = (title: string, data: { label: string; value: string }[]) => {
    doc.setFillColor(245, 246, 248);
    const boxHeight = 10 + data.length * 7;
    doc.rect(15, currentY, pageWidth - 30, boxHeight, 'F');

    doc.setFillColor(18, 19, 23);
    doc.rect(15, currentY, 2, boxHeight, 'F');

    doc.setTextColor(18, 19, 23);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(title, 20, currentY + 6);

    let rowY = currentY + 12;
    doc.setFontSize(8.5);
    data.forEach(item => {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(60, 60, 60);
      doc.text(`${item.label}:`, 20, rowY);

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(20, 20, 20);
      doc.text(`${item.value}`, 65, rowY);
      rowY += 7;
    });

    currentY += boxHeight + 8;
  };

  renderSection('1. CLIENT & ORGANIZATION DETAILS', [
    { label: 'Project Title', value: brief.projectTitle },
    { label: 'Organization / Client', value: brief.organizationName },
    { label: 'Contact Person', value: brief.clientName },
    { label: 'Email', value: brief.email },
    { label: 'Phone / WhatsApp', value: brief.phone },
  ]);

  renderSection('2. PRODUCTION SPECIFICATIONS', [
    { label: 'Project Type', value: brief.projectType },
    { label: 'Estimated Budget Tier', value: brief.budgetTierMWK },
    { label: 'Target Deadline', value: brief.targetDeadline },
    { label: 'Target Video Duration', value: brief.videoDuration },
    { label: 'Deliverable Formats', value: brief.aspectRatios.join(', ') || '16:9 4K Cinema Master' },
    { label: 'Location Scope', value: brief.locationScope || 'Mzuzu & Surrounds' },
  ]);

  // Project Narrative
  doc.setFillColor(245, 246, 248);
  doc.rect(15, currentY, pageWidth - 30, 45, 'F');
  doc.setFillColor(18, 19, 23);
  doc.rect(15, currentY, 2, 45, 'F');

  doc.setTextColor(18, 19, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('3. CREATIVE GOALS & VISUAL DIRECTION', 20, currentY + 6);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);
  doc.text('Project Objectives:', 20, currentY + 13);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(doc.splitTextToSize(brief.projectGoals || 'Not specified', pageWidth - 50), 20, currentY + 18);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(60, 60, 60);
  doc.text('Visual & Mood Preferences:', 20, currentY + 28);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(20, 20, 20);
  doc.text(doc.splitTextToSize(brief.visualStyleNotes || 'Architectural, quiet luxury, cinematic color grade', pageWidth - 50), 20, currentY + 33);

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(140, 140, 140);
  doc.text('MACANAN MULTIMEDIA — CREATIVE BRIEF SPECIFICATION — CONFIDENTIAL', pageWidth / 2, 285, { align: 'center' });

  doc.save(`MACANAN_CREATIVE_BRIEF_${brief.projectTitle.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
}
