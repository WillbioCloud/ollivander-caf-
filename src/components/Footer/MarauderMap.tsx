import React, { useEffect, useRef } from 'react';

// Coordenadas Exatas do Ollivander Bistrô & Café em Caldas Novas
const CENTER_POS = { lat: -17.740075, lng: -48.624349 };

// Estilo JSON "Mapa do Maroto"
const MARAUDER_STYLE = [
    { "featureType": "administrative.country", "elementType": "geometry.fill", "stylers": [{ "color": "#ff0000" }, { "visibility": "on" }] },
    { "featureType": "administrative.province", "elementType": "all", "stylers": [{ "visibility": "off" }] },
    { "featureType": "administrative.locality", "elementType": "geometry.fill", "stylers": [{ "color": "#ff0000" }] },
    { "featureType": "administrative.neighborhood", "elementType": "geometry.fill", "stylers": [{ "color": "#ff0000" }] },
    { "featureType": "administrative.land_parcel", "elementType": "geometry.fill", "stylers": [{ "color": "#ff0000" }] },
    { "featureType": "landscape", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 65 }, { "visibility": "on" }] },
    { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "color": "#f7f9f0" }] },
    { "featureType": "landscape.natural.landcover", "elementType": "geometry.fill", "stylers": [{ "hue": "#ff0000" }, { "visibility": "on" }] },
    { "featureType": "poi", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 51 }, { "visibility": "simplified" }] },
    { "featureType": "road.highway", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] },
    { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 30 }, { "visibility": "on" }] },
    { "featureType": "road.local", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 40 }, { "visibility": "on" }] },
    { "featureType": "transit", "elementType": "all", "stylers": [{ "saturation": -100 }, { "visibility": "simplified" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "hue": "#ffff00" }, { "lightness": -25 }, { "saturation": -97 }] },
    { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#ab6629" }] },
    { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "on" }, { "lightness": -25 }, { "saturation": -100 }] }
];

// Correção para o TypeScript reconhecer o 'google' no window
declare global {
  interface Window {
    google: any;
  }
}

export const MarauderMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verifica se o script do Google Maps foi carregado no index.html
    if (!mapRef.current || !window.google) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: CENTER_POS,
      zoom: 17, // Zoom mais próximo para ver a rua
      styles: MARAUDER_STYLE, // APLICA O TEMA DO MAROTO
      disableDefaultUI: true, // Remove botões para visual mais limpo
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
    });

    // Marcador
    new window.google.maps.Marker({
      position: CENTER_POS,
      map: map,
      title: "Ollivander Bistrô & Café",
      animation: window.google.maps.Animation.DROP,
    });
  }, []);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '300px', // Aumentei um pouco a altura para destacar
        borderRadius: '8px',
        border: '4px double var(--color-wizard-gold)', // Borda dupla dourada
        boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
        marginTop: '1.5rem',
        filter: 'sepia(20%)' // Um toque extra de envelhecimento
      }} 
    />
  );
};