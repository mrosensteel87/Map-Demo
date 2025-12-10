import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CountryInfo {
  name: string;
  capital: string;
  region: string;
  incomeLevel: string;
  latitude: string;
  longitude: string;
  iso2Code: string;
  iso3Code: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = 'https://api.worldbank.org/V2';

  constructor(private http: HttpClient) {}
  getCountryByCode(code: string): Observable<CountryInfo> {
    const url = `${this.baseUrl}/country/${code}?format=json`;

    return this.http.get<any>(url).pipe(
      map((response: any) => {
        const country = response[1][0];

        return {
          name: country.name,
          capital: country.capitalCity,
          region: country.region?.value,
          incomeLevel: country.incomeLevel?.value,
          latitude: country.latitude,
          longitude: country.longitude,
          iso2Code: country.iso2Code,
          iso3Code: country.id
        } as CountryInfo;
      })
    );
  }
}