import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { CountryService, CountryInfo } from '../services/country.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [NgIf],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {


  hoverData: {
    name: string;
    x: number;
    y: number;
  } | null = null;

 
  selectedCountry: CountryInfo | null = null;

  constructor(private countryService: CountryService) {}

 
  onHover(event: MouseEvent | null): void {
    if (event === null) {
      this.hoverData = null;
      return;
    }

    const target = event.target as SVGElement;

    if (target.tagName.toLowerCase() === 'path') {
      const countryName = target.getAttribute('name') || 'Unknown';

      this.hoverData = {
        name: countryName,
        x: event.offsetX + 10, 
        y: event.offsetY + 10
      };
    } else {
      this.hoverData = null;
    }
  }

 
  onMouseMove(event: MouseEvent): void {
    if (this.hoverData) {
      this.hoverData = {
        ...this.hoverData,
        x: event.offsetX + 10,
        y: event.offsetY + 10
      };
    }
  }


  onCountryClick(event: MouseEvent): void {
    const target = event.target as SVGElement;

    if (target.tagName.toLowerCase() !== 'path') {
      return;
    }

    const countryCode = target.id;
    if (!countryCode) {
      console.log('No country code found on clicked path');
      return;
    }

    const isoCode = countryCode.toLowerCase(); 
    this.loadCountryDetails(isoCode);
  }


  loadCountryDetails(isoCode: string): void {
    this.countryService.getCountryByCode(isoCode).subscribe({
      next: (data: CountryInfo) => {
        this.selectedCountry = data;
        console.log('Country data loaded:', data);
      },
      error: (err: any) => {
        console.error('Failed to load country info for:', isoCode, err);
        this.selectedCountry = null;
      }
    });
  }
}