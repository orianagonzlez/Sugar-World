import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-category-form',
  templateUrl: './admin-category-form.component.html',
  styleUrls: ['./admin-category-form.component.scss']
})
export class AdminCategoryFormComponent implements OnInit {

  categoryForm: FormGroup = null;
  editCategory: Category = null;
  categoryId: string;
  valid = true;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getUrlParams();
  }

  createForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  patchFormValues(): void {
    this.categoryForm.patchValue({
      name: this.editCategory.name,
    })
  }

  createCategory(newCategory: Category): void {
    this.categoryService.createCategory(newCategory).then(res => {

    }).catch(err => console.log(err));
  }

  updateCategory(newCategory: Category): void {
    this.categoryService.updateCategory(newCategory, this.categoryId).then(res => {
      this.router.navigate(['/admin/category']);
    }).catch(err => console.log(err))
  }

  onSubmit(): void {
    console.log(this.categoryForm.get('name').value);
    const newCategory: Category = {
      name: this.categoryForm.get('name').value,
    }

    if (this.categoryForm.valid) {
      this.valid = true;
      
      this.categoryForm.reset()

      if (this.editCategory) {
        this.updateCategory(newCategory);
        return;
      }

      this.createCategory(newCategory);
    } else {
      this.valid = false;
    }
    
  }

  getUrlParams(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('categoryId');

      if (this.categoryId) {
        this.categoryService.getCategory(this.categoryId).subscribe((item) => {
          this.editCategory = {
            $key: item.payload.id,
            ...item.payload.data(),
          };
          this.categoryForm.patchValue({
            name: this.editCategory.name,
          });
        });
      }
    });
  }
}
