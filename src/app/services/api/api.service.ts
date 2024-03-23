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
    {id: 31, name: "Plant EE", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 32, name: "Plant FF", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 33, name: "Plant GG", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 34, name: "Plant HH", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 35, name: "Plant II", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },
    {id: 36, name: "Plant JJ", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 37, name: "Plant KK", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 38, name: "Plant LL", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 39, name: "Plant MM", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 40, name: "Plant NN", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },
    {id: 41, name: "Plant OO", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 42, name: "Plant PP", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 43, name: "Plant QQ", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 44, name: "Plant RR", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 45, name: "Plant SS", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },
    {id: 46, name: "Plant TT", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 47, name: "Plant UU", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 48, name: "Plant VV", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 49, name: "Plant WW", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 50, name: "Plant Xx", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },
    {id: 51, name: "Plant YY", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 52, name: "Plant ZZ", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 53, name: "Plant AAA", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 54, name: "Plant BBB", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 55, name: "Plant CCC", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },
    {id: 56, name: "Plant DDD", price: 700, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 57, name: "Plant EEE", price: 800, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/amazon-peace-lily-plant-variegated.jpg' },
    {id: 58, name: "Plant FFF", price: 900, category: 'JAPAN', img: 'https://www.plantandflowerinfo.com/images/bromeliad-guzmania-plant2.jpg' },
    {id: 59, name: "Plant GGG", price: 500, category: 'CHINA', img: 'https://www.plantandflowerinfo.com/images/aechmea-fasciata-bromeliad.jpg' },
    {id: 60, name: "Plant HHH", price: 1000, category: 'INDIA', img: 'https://www.plantandflowerinfo.com/images/pothos-houseplant.jpg' },










  ]

  constructor() { }

  getItem(id:any) {
    const item = this.items.find(x => x.id == id);
    return item;
  }
}
