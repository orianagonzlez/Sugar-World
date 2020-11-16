import { Component, OnInit } from '@angular/core';
import { Method } from 'src/app/models/method';
import { MethodsService } from 'src/app/services/method.service';

@Component({
  selector: 'app-method-view',
  templateUrl: './method-view.component.html',
  styleUrls: ['./method-view.component.scss']
})
export class MethodViewComponent implements OnInit {
  
  methods: Array<Method> = [];
  loading: boolean;

  constructor(private MethodService: MethodsService) { }

  ngOnInit(): void {
    this.getAllMethods();
  }

  getAllMethods(): void {
    this.MethodService.getAllMethods().subscribe((items) => {
      this.methods = items.map (
        (items) => 
        ({
          ...items.payload.doc.data(),
          $key: items.payload.doc.id,
        } as Method)
      );
      this.loading = false;
    });
  }

  deleteMethod(methodId: string): void{
    this.MethodService.deleteMethod(methodId).then((res) => {}).catch((err)=>console.log(err));
  }

}
