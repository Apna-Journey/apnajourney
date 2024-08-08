import { jsPDF } from 'jspdf';

export const generatePDF = (profile) => {
  return new Promise((resolve) => {
    const doc = new jsPDF();

    
    doc.setFontSize(22);
    doc.text('Company Profile', 105, 20, { align: 'center' });

 
    doc.setFontSize(16);
    doc.text(`Company Name: ${profile.name}`, 20, 40);

    doc.setFontSize(12);
    doc.text(`Industry: ${profile.industry}`, 20, 50);
    doc.text(`Description: ${profile.description}`, 20, 60);
    doc.text(`Founded: ${profile.foundedYear}`, 20, 70);
    doc.text(`Employees: ${profile.employees}`, 20, 80);
    doc.text(`Website: ${profile.website}`, 20, 90);
    doc.text(`Location: ${profile.location}`, 20, 100);

    
    const pdfBlob = doc.output('blob');
    resolve(pdfBlob);
  });
};
