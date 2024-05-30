import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

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

		const marker = new Marker({color: 'red'}).setLngLat(this.currentLngLat).addTo(this.map);

	}


}
