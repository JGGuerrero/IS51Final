import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface ICart {
  id?: number;
  image?: string;
  description?: string;
  price?: number;
  quantity?: number;
  owed?: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<ICart> = [];

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
      this.bikes = await this.loadItemsFromFile();
      console.log('this.bikes from ngOnInit...', this.bikes)
      }
  

  async loadItemsFromFile() {
    const data = await this.http.get('assets/inventory.json').toPromise();
    return data.json();
    }

    addItem1(item: string){
        this.bikes.unshift({
          "id": 1,
          "image": "../../assets/bike1.jpeg",
          "description": "Bike Model 1",
          "price": 5000,
          "quantity": 1,
  
      })
    
    
  }
  addItem2(item: string){
    this.bikes.unshift({
      "id": 2,
      "image": "../../assets/bike2.jpeg",
      "description": "Bike Model 2",
      "price": 4000,
      "quantity": 2

  })


}

addItem3(item: string){
  this.bikes.unshift({
    "id": 3,
    "image": "../../assets/bike3.jpeg",
    "description": "Bike Model 3",
    "price": 3000,
    "quantity": 3

})


}

delete(index: number){
  this.bikes.splice(index, 1);
}

saveBike() {
  localStorage.setItem('bikes', JSON.stringify(this.bikes));
  this.toastService.showToast('success', 5000, 'Success. Bike saved');

}

finalize (){
  this.calculate();
  const data = this.calculate();
  this.router.navigate(['home', data]);
}


calculate() {
  let owed = 0;
  for(let i=0; i < this.bikes.length; i++) {
    // console.log('i: ', i, "this.contacts[i]", this.contacts[i]);
    owed += this.bikes[i].owed;
    console.log('owed---->', owed);
  }
  return {
    numberOfBikes: this.bikes.length, 
    subTotal: owed,
    taxAmount: owed * .15,
    total: owed + (owed * .15) 
  };
}



   



}