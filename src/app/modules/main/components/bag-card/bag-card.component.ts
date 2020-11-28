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

  constructor(private bagService: BagService) { }

  ngOnInit(): void {
    console.log(this.bag);
  }

  deleteBag(): void {
    console.log('borrando' + this.bag.key);
    this.bagService.deleteBag(this.bag.key).then((res) => {this.borrada = true}).catch(err => console.log(err));
  }

}
