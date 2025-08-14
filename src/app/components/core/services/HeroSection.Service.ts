// Data come from  Api and local both


// src/app/core/services/HeroSection.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HeroSectionModel } from '../models/HeroSection.model';

@Injectable({
  providedIn: 'root'
})
export class HeroSectionService {
  private apiUrl = 'http://localhost:5108/api/herosection';

  // Hardcoded fallback data
  private fallbackData: HeroSectionModel[] = [
    {
      title: 'Welcome to FabricHub',
      subtitle: 'Harness the power of our platform to scale and grow your business efficiently.',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
      stats: [
        { number: '10K+', label: 'Active Users' },
        { number: '99%', label: 'Satisfaction' },
        { number: '24/7', label: 'Support' }
      ]
    },
    {
      title: 'Empower Your Business',
      subtitle: 'Harness the power of our platform to scale and grow your business efficiently.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      stats: [
        { number: '5K+', label: 'Partners' },
        { number: '98%', label: 'Customer Retention' },
        { number: 'Dedicated', label: 'Team' }
      ]
    },
        {
      title: 'Welcome to FabricHub',
      subtitle: 'Harness the power of our platform to scale and grow your business efficiently.',
      imageUrl: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&w=400&q=80',
      stats: [
        { number: '10K+', label: 'Active Users' },
        { number: '99%', label: 'Satisfaction' },
        { number: '24/7', label: 'Support' }
      ]
    },
  ];

  constructor(private http: HttpClient) {}

  getHeroDataList(): Observable<HeroSectionModel[]> {
    return this.http.get<HeroSectionModel[]>(this.apiUrl)
      .pipe(
        catchError(error => {
          console.error('API failed, using fallback data:', error);
          return of(this.fallbackData); // Fallback data agar API fail ho
        })
      );
  }
}


















// Data come from  local text


// // src/app/core/services/hero-section.service.ts
// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { HeroSectionModel } from '../models/HeroSection.model'; // ✅ Correct import

// @Injectable({
//   providedIn: 'root'
// })
// export class HeroSectionService {
//   constructor() {}

//   getHeroDataList(): Observable<HeroSectionModel[]> { // ✅ Correct type
//     const heroDataList: HeroSectionModel[] = [
//       {
//         title: 'Welcome to FabricHub',
//         subtitle: 'Harness the power of our platform to scale and grow your business efficiently.',
//         imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
//         stats: [
//           { number: '10K+', label: 'Active Users' },
//           { number: '99%', label: 'Satisfaction' },
//           { number: '24/7', label: 'Support' }
//         ]
//       },
//       {
//         title: 'Empower Your Business',
//         subtitle: 'Harness the power of our platform to scale and grow your business efficiently.',
//         imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
//         stats: [
//           { number: '5K+', label: 'Partners' },
//           { number: '98%', label: 'Customer Retention' },
//           { number: 'Dedicated', label: 'Team' }
//         ]
//       }
//     ];
//     return of(heroDataList);
//   }
// }




// Data come from Only Api

// // src/app/core/services/HeroSection.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http'; // ✅ import HttpClient
// import { Observable } from 'rxjs';
// import { HeroSectionModel } from '../models/HeroSection.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class HeroSectionService {
//   private apiUrl = 'http://localhost:5108/api/herosection';

//   // ✅ inject HttpClient in the constructor
//   constructor(private http: HttpClient) {}

//   getHeroDataList(): Observable<HeroSectionModel[]> {
//     return this.http.get<HeroSectionModel[]>(this.apiUrl);
//   }


//   // getHeroDataList(): Observable<HeroSectionModel[]> {
//   //   const heroDataList: HeroSectionModel[] = [
//   //     {
//   //       title: 'Welcome to FabricHub',
//   //       subtitle: 'Harness the power of our platform to scale and grow your business efficiently.',
//   //       imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
//   //       stats: [
//   //         { number: '10K+', label: 'Active Users' },
//   //         { number: '99%', label: 'Satisfaction' },
//   //         { number: '24/7', label: 'Support' }
//   //       ]
//   //     },
//   //     {
//   //       title: 'Empower Your Business',
//   //       subtitle: 'Harness the power of our platform to scale and grow your business efficiently.',
//   //       imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
//   //       stats: [
//   //         { number: '5K+', label: 'Partners' },
//   //         { number: '98%', label: 'Customer Retention' },
//   //         { number: 'Dedicated', label: 'Team' }
//   //       ]
//   //     }
//   //     // Add more objects as needed
//   //   ];
//   //   return of(heroDataList);
//   // }
// }
