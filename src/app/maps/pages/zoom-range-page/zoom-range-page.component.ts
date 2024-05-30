import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { log } from 'console';
import {LngLat, Map} from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

	@ViewChild('map') divMap?: ElementRef;

	public zoom: number = 17;
	public map?: Map;
	public currentLngLat: LngLat = new LngLat(-7.768690440935302, 42.60724702579077);

	ngAfterViewInit(): void {

		if(!this.divMap) throw 'El elemento HTML no fue encontrado';

		this.map = new Map({
			container: this.divMap.nativeElement, // container ID
			style: 'mapbox://styles/mapbox/streets-v12', // style URL
			center: this.currentLngLat, // starting position [lng, lat]
			zoom: this.zoom, // starting zoom
			accessToken: 'pk.eyJ1Ijoic295aXZhbm4iLCJhIjoiY2x3cnozeGQzMDU1NjJqc2FscDNjbmF2eSJ9.mX8QkVSOrmhGfABom_7aUw'
		});

		this.mapsListeners();

	}

	ngOnDestroy(): void {
		this.map?.remove();
	}

	mapsListeners(){
		if(!this.map) throw 'Mapa no inicializado';

		this.map.on('zoom', (ev) =>{
			this.zoom = this.map!.getZoom();
		});

		this.map.on('zoomend', ev => {
			if(this.map!.getZoom() < 18) return;
			this.map!.zoomTo(18);
		})

		this.map.on('move', () => {
			this.currentLngLat = this.map!.getCenter();
			const { lng, lat } = this.currentLngLat;
		})

	}

	zoomIn(){
		this.map?.zoomIn()
	}

	zoomOut(){
		this.map?.zoomOut()
	}

	zoomChanged(value: string){
		this.zoom = Number(value);
		this.map?.zoomTo(this.zoom);
	}

}
