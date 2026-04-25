import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface ZoneFeatureProperties {
  zoneId: number;
  zoneName: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  drawingManager!: google.maps.drawing.DrawingManager;
  theme: 'dark' | 'light' = (localStorage.getItem('theme') as 'dark' | 'light') || 'light';

  center = { lat: 24.7136, lng: 46.6753 };
  zoom = 11;
  labels: google.maps.Marker[] = [];

  googleMap!: google.maps.Map;

  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: false,
    clickableIcons: true,
    mapTypeControl: false,
    fullscreenControl: true,
    streetViewControl: false
  };

  polygonOptions: google.maps.PolygonOptions = {
    fillOpacity: 0.35,
    strokeWeight: 2,
    clickable: true
  };

  zones: ZoneFeatureProperties[] = [];
  selectedZoneId: number | null = null;

  polygons: {
    zoneId: number;
    zoneName: string;
    paths: google.maps.LatLngLiteral[];
    options: google.maps.PolygonOptions;
  }[] = [];

  markers: {
    position: google.maps.LatLngLiteral;
    options: google.maps.MarkerOptions;
  }[] = [];

  geoJsonData: any;
  newFeatureText = '';
  newZoneId!: number;
  newZoneName = '';

  toast = { show: false, message: '', type: 'info' as 'info' | 'success' };
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadGeoJson();
  }

  // onMapInit(map: google.maps.Map) {
  //   this.googleMap = map;
  //   (window as any).googleMapInstance = map;
  // }
  onMapInit(map: google.maps.Map) {
    this.googleMap = map;

    // this.drawingManager = new google.maps.drawing.DrawingManager({
    //   drawingMode: google.maps.drawing.OverlayType.POLYGON,
    //   drawingControl: true,
    //   drawingControlOptions: {
    //     position: google.maps.ControlPosition.TOP_CENTER,
    //     drawingModes: [google.maps.drawing.OverlayType.POLYGON]
    //   },
    //   polygonOptions: {
    //     fillColor: '#22c55e',
    //     fillOpacity: 0.4,
    //     strokeColor: '#0f766e',
    //     strokeWeight: 2,
    //     clickable: true,
    //     editable: true
    //   }
    // });



    // this.drawingManager.setMap(this.googleMap);

    // google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event: any) => {
    //   if (event.type === google.maps.drawing.OverlayType.POLYGON) {
    //     this.onPolygonDrawn(event.overlay);
    //   }
    // });
  }

  enableDraw() {
    if (!this.drawingManager) {
      this.showToast('⚠️ الخريطة لسه بتحميل… جرّب بعد ثانية', 'info');
      return;
    }

    this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    this.showToast('✏️ ارسم المنطقة على الخريطة', 'info');
  }


  onPolygonDrawn(polygon: google.maps.Polygon) {
    const path = polygon.getPath().getArray().map(p => [p.lng(), p.lat()]);

    // نقفل البوليجون (أول نقطة = آخر نقطة)
    path.push(path[0]);

    const feature = {
      type: 'Feature',
      properties: {
        zoneId: this.newZoneId,
        zoneName: this.newZoneName
      },
      geometry: {
        type: 'Polygon',
        coordinates: [path]
      }
    };

    this.newFeatureText = JSON.stringify(feature, null, 2);

    this.showToast('✏️ تم رسم المنطقة بنجاح – تم توليد GeoJSON تلقائيًا', 'success');
  }


  loadGeoJson() {
    this.http.get<any>('assets/map/riyadh-zones.geojson')
      .subscribe(data => {
        this.geoJsonData = data;
        this.renderPolygonsFromGeoJson();
      });
  }

  renderPolygonsFromGeoJson() {
    this.polygons = [];
    this.zones = [];
    this.labels.forEach(l => l.setMap(null));
    this.labels = [];

    this.geoJsonData.features.forEach((f: any) => {
      const coords = f.geometry.coordinates[0].map((c: number[]) => ({
        lat: c[1],
        lng: c[0]
      }));

      const zoneId = f.properties.zoneId;
      const zoneName = f.properties.zoneName;

      this.zones.push({ zoneId, zoneName });

      this.polygons.push({
        zoneId,
        zoneName,
        paths: coords,
        options: {
          fillColor: this.zoneColor(zoneId),
          fillOpacity: 0.35,
          strokeColor: '#0f766e',
          strokeWeight: 2,
          clickable: true
        }
      });

      const center = coords.reduce((acc: any, cur: any) => ({
        lat: acc.lat + cur.lat / coords.length,
        lng: acc.lng + cur.lng / coords.length
      }), { lat: 0, lng: 0 });

      const labelMarker = new google.maps.Marker({
        position: center,
        map: this.googleMap,
        label: {
          text: zoneName,
          color: this.theme === 'dark' ? '#142c5d' : '#e6e6e6',
          fontWeight: '800',
          fontSize: '12px'
        },
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0
        }
      });

      this.labels.push(labelMarker);
    });
  }

  onPolygonClick(poly: any) {
    this.selectedZoneId = poly.zoneId;
    this.showToast(`نحن نخدم منطقة ${poly.zoneName}`, 'success');
  }

  onPolygonHover(poly: any) {
    poly.options = {
      ...poly.options,
      fillOpacity: 0.7,
      strokeWeight: 3
    };
  }
  onPolygonMouseOver(poly: any) {
    poly.setOptions({
      fillOpacity: 0.6,
      strokeWeight: 3
    });
  }

  onPolygonMouseOut(poly: any) {
    poly.setOptions({
      fillOpacity: 0.35,
      strokeWeight: 2
    });
  }


  highlightZone(zoneId: number) {
    this.selectedZoneId = zoneId;

    this.polygons = this.polygons.map(p => ({
      ...p,
      options: {
        ...p.options,
        fillOpacity: p.zoneId === zoneId ? 0.75 : 0.45,
        strokeWeight: p.zoneId === zoneId ? 3 : 2,
        strokeColor: p.zoneId === zoneId ? '#22c55e' : '#0ea5a5'
      }
    }));
  }

  addZoneFromFeatureText(featureText: string) {
    const feature = JSON.parse(featureText);
    feature.properties = { zoneId: this.newZoneId, zoneName: this.newZoneName };
    this.geoJsonData.features.push(feature);
    this.renderPolygonsFromGeoJson();
  }

  downloadGeoJson() {
    const blob = new Blob([JSON.stringify(this.geoJsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'riyadh-zones.geojson';
    a.click();
    URL.revokeObjectURL(url);
  }

  zoneColor(id: number) {
    const fills = ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#fb7185', '#22c55e', '#0ea5e9'];
    return fills[id % fills.length];
  }

  zoneBorder(id: number) {
    const borders = ['#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed', '#be123c', '#16a34a', '#0284c7'];
    return borders[id % borders.length];
  }

  onMarkerClick(marker: any) {
    const title = marker?.options?.title || 'مكان';
    alert(`📍 ${title}`);
  }


  showToast(message: string, type: 'info' | 'success' = 'info') {
    this.toast = { show: true, message, type };
    setTimeout(() => this.toast.show = false, 2200);
  }

}
