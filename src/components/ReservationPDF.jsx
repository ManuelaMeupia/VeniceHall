import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import { FaFilePdf } from 'react-icons/fa';

const ReservationPDF = ({ reservationData, onDownloadComplete }) => {
  const pdfRef = useRef();

  const generatePDF = () => {
    const element = pdfRef.current;
    
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `reservation_${reservationData.nom.replace(/\s/g, '_')}_${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true, useCORS: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
    
    if (onDownloadComplete) {
      onDownloadComplete();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const reference = `VEN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  return (
    <div>
      {/* Template du PDF */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <div ref={pdfRef} style={{ 
          width: '210mm', 
          padding: '15mm', 
          backgroundColor: 'white', 
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          lineHeight: '1.5',
          color: '#333'
        }}>
          {/* En-tête avec logo à gauche */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '30px', 
            paddingBottom: '20px', 
            borderBottom: '3px solid #5c2abd' 
          }}>
            {/* Logo et nom à gauche */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: '#5c2abd', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                <img 
                  src="/img/Logo.jpeg" 
                  alt="Venice Hall" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span style="color:white;font-weight:bold;font-size:20px">VH</span>';
                  }}
                />
              </div>
              <div>
                <h1 style={{ color: '#5c2abd', margin: 0, fontSize: '24px' }}>Venice Hall</h1>
                <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '12px' }}>Salles de fête d'exception</p>
              </div>
            </div>
            
            {/* Numéro de réservation à droite */}
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '10px', color: '#999' }}>N° de réservation</p>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#5c2abd' }}>{reference}</p>
            </div>
          </div>

          {/* Titre principal */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ color: '#5c2abd', fontSize: '28px', margin: 0 }}>Confirmation de réservation</h2>
            <p style={{ color: '#666', margin: '10px 0 5px 0' }}>Merci d'avoir choisi Venice Hall</p>
            <div style={{ 
              width: '80px', 
              height: '3px', 
              background: '#5c2abd', 
              margin: '15px auto',
              borderRadius: '2px'
            }}></div>
          </div>

          {/* Informations client */}
          <div style={{ 
            marginBottom: '20px', 
            padding: '15px', 
            background: '#f8f9fa', 
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ 
              color: '#5c2abd', 
              margin: '0 0 15px 0', 
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ background: '#5c2abd', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
              Informations client
            </h3>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', width: '35%' }}>Nom complet :</td>
                  <td style={{ padding: '8px 0' }}>{reservationData.nom}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Email :</td>
                  <td style={{ padding: '8px 0' }}>{reservationData.email}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Téléphone :</td>
                  <td style={{ padding: '8px 0' }}>{reservationData.telephone}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Détails de l'événement */}
          <div style={{ 
            marginBottom: '20px', 
            padding: '15px', 
            background: '#f8f9fa', 
            borderRadius: '10px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ 
              color: '#5c2abd', 
              margin: '0 0 15px 0', 
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ background: '#5c2abd', width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' }}></span>
              Détails de l'événement
            </h3>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', width: '35%' }}>Type d'événement :</td>
                  <td style={{ padding: '8px 0' }}>{reservationData.typeEvenement}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Date de début :</td>
                  <td style={{ padding: '8px 0' }}>{formatDate(reservationData.dateDebut)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                  <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Date de fin :</td>
                  <td style={{ padding: '8px 0' }}>{formatDate(reservationData.dateFin)}</td>
                </tr>
                {reservationData.nombreInvites && (
                  <tr style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Nombre d'invités :</td>
                    <td style={{ padding: '8px 0' }}>{reservationData.nombreInvites} personnes</td>
                  </tr>
                )}
                {reservationData.message && (
                  <tr>
                    <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Demandes spéciales :</td>
                    <td style={{ padding: '8px 0' }}>{reservationData.message}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Statut */}
          <div style={{ 
            marginBottom: '20px', 
            padding: '15px', 
            background: '#e8f5e9', 
            borderRadius: '10px', 
            textAlign: 'center',
            border: '1px solid #c8e6c9'
          }}>
            <p style={{ color: '#2e7d32', fontWeight: 'bold', margin: 0, fontSize: '14px' }}>
              ✓ Réservation en attente de confirmation
            </p>
            <p style={{ fontSize: '11px', color: '#666', margin: '8px 0 0 0' }}>
              Notre équipe vous contactera sous 24h pour confirmer votre réservation
            </p>
          </div>

          {/* Informations de paiement */}
          <div style={{ 
            marginBottom: '20px', 
            padding: '15px', 
            background: '#fff8e7', 
            borderRadius: '10px',
            border: '1px solid #ffe0b2'
          }}>
            <h3 style={{ color: '#5c2abd', margin: '0 0 12px 0', fontSize: '14px' }}>💳 Informations de paiement</h3>
            <table style={{ width: '100%', fontSize: '11px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '5px 0', width: '35%' }}><strong>Arrhes (30%) :</strong></td>
                  <td>À verser à la confirmation</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0' }}><strong>Solde :</strong></td>
                  <td>7 jours avant l'événement</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 0' }}><strong>Moyens acceptés :</strong></td>
                  <td>Virement bancaire, Mobile Money, Carte bancaire</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Pied de page */}
          <div style={{ 
            marginTop: '30px', 
            textAlign: 'center', 
            fontSize: '10px', 
            color: '#999', 
            borderTop: '1px solid #e0e0e0', 
            paddingTop: '15px' 
          }}>
            <p style={{ margin: '0' }}>Venice Hall - Salles de fête</p>
            <p style={{ margin: '5px 0' }}>Texaco Omnisport, Yaoundé, Cameroun | Tél: +237 693 830 605</p>
            <p style={{ margin: '5px 0' }}>Email: contact@venicehall.com | www.venicehall.com</p>
            <p style={{ margin: '10px 0 0 0', fontWeight: 'bold' }}>Ce document est une preuve de réservation. Merci de le conserver.</p>
          </div>
        </div>
      </div>

      {/* Bouton visible */}
      <button onClick={generatePDF} className="btn-download-pdf">
        <FaFilePdf />
        Télécharger la confirmation PDF
      </button>
    </div>
  );
};

export default ReservationPDF;