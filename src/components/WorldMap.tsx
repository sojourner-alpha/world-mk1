import { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import LineString from 'ol/geom/LineString';
import { fromLonLat } from 'ol/proj';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import Overlay from 'ol/Overlay';
import { defaults as defaultControls } from 'ol/control';

interface Place {
  name: string;
  region: string;
  type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface WorldMapProps {
  places: Place[];
  onHoverPlace: (place: string | null) => void;
  initialCenter?: {
    lat: number;
    lng: number;
  };
  initialZoom?: number;
}

const WorldMap: React.FC<WorldMapProps> = ({ 
  places, 
  onHoverPlace, 
  initialCenter = { lat: 45, lng: -90 },
  initialZoom = 2.5
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<Map | null>(null);
  const popupContainerRef = useRef<HTMLDivElement>(null);
  const popupContentRef = useRef<HTMLDivElement>(null);
  const popupOverlay = useRef<Overlay | null>(null);

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapRef.current) return;

    // Create popup overlay
    if (popupContainerRef.current && popupContentRef.current) {
      popupOverlay.current = new Overlay({
        element: popupContainerRef.current,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10],
      });
    }

    // Create map instance with points vector source
    const pointsSource = new VectorSource();
    const pointsLayer = new VectorLayer({
      source: pointsSource,
      zIndex: 2
    });

    // Create connections layer
    const connectionsSource = new VectorSource();
    const connectionsLayer = new VectorLayer({
      source: connectionsSource,
      zIndex: 1
    });
    
    // Initialize map with base layer
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: 'Map data © OpenStreetMap contributors'
          }),
          className: 'grayscale-layer',
        }),
        connectionsLayer,
        pointsLayer
      ],
      view: new View({
        center: fromLonLat([initialCenter.lng, initialCenter.lat]),
        zoom: initialZoom
      }),
      controls: defaultControls({
        zoom: true,
        rotate: false,
        attribution: false
      }),
    });

    if (popupOverlay.current) {
      map.addOverlay(popupOverlay.current);
    }

    // Add markers for each place
    const features = places.map(place => {
      const { name, type, coordinates } = place;
      const { lat, lng } = coordinates;
      
      const feature = new Feature({
        geometry: new Point(fromLonLat([lng, lat])),
        name,
        type
      });
      
      let color;
      let radius = 7;
      
      switch (type) {
        case 'Current Base':
          color = '#6B7280'; // gray-500
          radius = 9;
          break;
        case 'Home':
          color = '#3B82F6'; // blue-500
          break;
        case 'Work':
          color = '#15803D'; // green-700
          break;
        default:
          color = '#F59E0B'; // amber-500
      }
      
      feature.setStyle(new Style({
        image: new CircleStyle({
          radius,
          fill: new Fill({ color }),
          stroke: new Stroke({
            color: 'rgba(255, 255, 255, 0.9)',
            width: 2
          })
        })
      }));
      
      return feature;
    });
    
    pointsSource.addFeatures(features);
    
    // Define connections between cities
    const connections = [
      { from: "Montreal", to: "Berlin" },
      { from: "Montreal", to: "Bremen" },
      { from: "Montreal", to: "Necker Island" },
      { from: "Montreal", to: "Isle of Tiree" },
      { from: "Montreal", to: "Halifax" },
      { from: "Montreal", to: "Houston" },
      { from: "San Francisco", to: "Singapore" },
      { from: "San Francisco", to: "Berlin" },
      { from: "San Francisco", to: "Seoul" },
      { from: "New York", to: "Montreal" },
      { from: "New York", to: "Toronto" },
      { from: "Minneapolis", to: "Montreal" },
      { from: "Minneapolis", to: "Toronto" },
      { from: "Minneapolis", to: "San Francisco" },
    ];
    
    const placeMap = new Map();
    places.forEach(place => {
      placeMap.set(place.name, place);
    });
    
    connections.forEach(connection => {
      const fromPlace = placeMap.get(connection.from);
      const toPlace = placeMap.get(connection.to);
      
      if (!fromPlace || !toPlace) return;
      
      const origin = fromLonLat([fromPlace.coordinates.lng, fromPlace.coordinates.lat]);
      const destination = fromLonLat([toPlace.coordinates.lng, toPlace.coordinates.lat]);
      
      const dx = destination[0] - origin[0];
      const dy = destination[1] - origin[1];
      const midpoint = [origin[0] + dx * 0.5, origin[1] + dy * 0.5];
      
      const distance = Math.sqrt(dx * dx + dy * dy);
      const factor = Math.min(0.3, distance / 10);
      
      const controlPoint = [
        midpoint[0], 
        midpoint[1] - Math.abs(dx) * factor
      ];
      
      const lineFeature = new Feature({
        geometry: new LineString([
          origin,
          [midpoint[0] * 0.25 + origin[0] * 0.75, midpoint[1] * 0.25 + origin[1] * 0.75 - Math.abs(dx) * factor * 0.5],
          controlPoint,
          [midpoint[0] * 0.75 + destination[0] * 0.25, midpoint[1] * 0.75 + destination[1] * 0.25 - Math.abs(dx) * factor * 0.5],
          destination
        ])
      });
      
      lineFeature.setStyle(new Style({
        stroke: new Stroke({
          color: 'rgba(160, 160, 160, 0.6)',
          width: 2,
          lineDash: [2, 4],
        })
      }));
      
      connectionsSource.addFeature(lineFeature);
    });
    
    // Add hover interaction
    map.on('pointermove', (e) => {
      const hit = map.hasFeatureAtPixel(e.pixel, {
        layerFilter: layer => layer === pointsLayer
      });
      map.getTargetElement().style.cursor = hit ? 'pointer' : '';
      
      if (!hit) {
        if (popupOverlay.current) {
          popupOverlay.current.setPosition(undefined);
          if (popupContainerRef.current) {
            popupContainerRef.current.style.display = 'none';
          }
        }
        if (onHoverPlace) onHoverPlace(null);
        return;
      }

      const feature = map.forEachFeatureAtPixel(e.pixel, feature => feature, {
        layerFilter: layer => layer === pointsLayer
      }) as Feature | undefined;
      
      if (feature && popupOverlay.current && popupContentRef.current) {
        const properties = feature.getProperties();
        popupContentRef.current.innerHTML = `<strong>${properties.name}</strong>`;
        
        const geometry = feature.getGeometry() as Point;
        if (geometry) {
          const coordinate = geometry.getCoordinates();
          popupOverlay.current.setPosition(coordinate);
          if (popupContainerRef.current) {
            popupContainerRef.current.style.display = 'block';
          }
        }
        
        if (onHoverPlace) onHoverPlace(properties.name);
      }
    });

    mapInstance.current = map;
    
    // Fit to the extent of all places
    const extent = pointsSource.getExtent();
    map.getView().fit(extent, {
      padding: [50, 50, 50, 50],
      maxZoom: 4
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.setTarget('');
      }
    };
  }, [places, onHoverPlace, initialCenter, initialZoom]);

  return (
    <>
      <div 
        ref={mapRef} 
        className="world-map-container"
        style={{ height: '100%', width: '100%', borderRadius: '0.5rem', background: '#222' }}
      />
      <div 
        ref={popupContainerRef} 
        className="ol-popup"
        style={{ 
          position: 'absolute', 
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '4px',
          padding: '8px',
          color: 'white',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          transform: 'translate(-50%, -100%)',
          marginBottom: '6px',
          display: 'none',
          zIndex: 1000
        }}
      >
        <div ref={popupContentRef}></div>
      </div>
    </>
  );
};

export default WorldMap; 