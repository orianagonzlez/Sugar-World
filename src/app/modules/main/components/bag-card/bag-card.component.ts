import { Component, Input, OnInit } from '@angular/core';
import { Bag } from 'src/app/models/bag';
import { BagService } from 'src/app/services/bag.service';

@Component({
  selector: 'app-bag-card',
  templateUrl: './bag-card.component.html',
  styleUrls: ['./bag-card.component.scss']
})
export class BagCardComponent implements OnInit {
  @Input() bag: Bag;
  loading = false;
  borrada = false;
  price = 0;

  constructor(private bagService: BagService) { }

  ngOnInit(): void {
    this.price = (this.bag.price * this.bag.weight) / 50
  }

  deleteBag(): void {
    this.bagService.deleteBag(this.bag.key).then((res) => {this.borrada = true}).catch(err => console.log(err));
  }

}
