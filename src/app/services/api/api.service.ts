import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  items: any[] = [
    {id: 1, name: "Plant A", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 2, name: "Plant B", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 3, name: "Plant C", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 4, name: "Plant D", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 5, name: "Plant E", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },
    {id: 6, name: "Plant F", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 7, name: "Plant G", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 8, name: "Plant H", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 9, name: "Plant I", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 10, name: "Plant J", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },
    {id: 11, name: "Plant K", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 12, name: "Plant L", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 13, name: "Plant M", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 14, name: "Plant N", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 15, name: "Plant O", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },
    {id: 16, name: "Plant P", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 17, name: "Plant Q", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 18, name: "Plant R", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 19, name: "Plant S", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 20, name: "Plant T", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },
    {id: 21, name: "Plant U", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 22, name: "Plant V", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 23, name: "Plant W", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 24, name: "Plant X", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 25, name: "Plant Y", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },
    {id: 26, name: "Plant Z", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 27, name: "Plant AA", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 28, name: "Plant BB", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 29, name: "Plant CC", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 30, name: "Plant DD", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },
  ]

  constructor() { }
}
