import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface PlainMarker {
	color: string;
	lngLat: number[];
}

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit{

	@ViewChild('map') divMap?: ElementRef;

	@Input() lngLat?: [number, number];
	public map?: Map;
	public zoom: number = 12;
	public marker?: Marker;

	ngAfterViewInit(): void {

		if(!this.divMap?.nativeElement) throw "Map Div not found"
		if(!this.lngLat) throw "LngLat can't be null"
		// mapa

		this.map = new Map({
			container: this.divMap.nativeElement, // container ID
			style: 'mapbox://styles/mapbox/streets-v12', // style URL
			center: this.lngLat, // starting position [lng, lat]
			zoom: this.zoom,
			interactive: false,// starting zoom
			accessToken: 'pk.eyJ1Ijoic295aXZhbm4iLCJhIjoiY2x3cnozeGQzMDU1NjJqc2FscDNjbmF2eSJ9.mX8QkVSOrmhGfABom_7aUw'
		});

		// marker
		this.marker = new Marker().setLngLat(this.lngLat!).addTo(this.map);



	}

}
