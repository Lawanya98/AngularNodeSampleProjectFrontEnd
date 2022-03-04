import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemServiceService } from '../services/item-service.service';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

  registrationForm: FormGroup;

  public items = [];
  public items2: any;
  public listVisibility = false;
  public count = 0;

  constructor(private service: ItemServiceService, private fb: FormBuilder) { }

  get f() { return this.registrationForm.controls; }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      ItemId: [''],
      ItemName: [''],
      Qauntity: [''],
      Price: ['']
    });

    this.getItemsFromAPI();
  }

  getItemsFromAPI() {
    console.log("get item clicked");
    this.service.getItems().subscribe((response: []) => {
      console.log(response);
      this.items = response;
      // this.listVisibility = !this.listVisibility;
      // return response;
    })
  }

  searchItem(id) {
    console.log("serch item clicked");
    this.service.getItemById(id).subscribe((response) => {
      this.items2 = response;
      console.log(this.items2);
      // console.log(this.items2.ItemId);
      //undefined
      this.items2.map(i => {
        console.log(i.ItemId);
        this.registrationForm.setValue({
          ItemId: i.ItemId,
          ItemName: i.ItemName,
          Qauntity: i.Qauntity,
          Price: i.Price
        })
      })
    })
  }

  deleteItem(id) {
    console.log("serch item clicked");
    this.service.deleteItemById(id).subscribe((response) => {
      console.log("Deleted --> " + response);
    })
    this.items.filter((i, index) => {

      if (i.ItemId == id) {
        this.items.splice(index, 1);
      }
      this.count++;

    });
  }

  addItem() {
    console.log(this.registrationForm.value);
    this.service.addNewItem(this.registrationForm.value).subscribe((response) => {
      console.log(response);

    });
    this.items.push(this.registrationForm.value);
  }

  updateItem(id) {
    this.service.updateItemById(id, this.registrationForm.value).subscribe((response) => {
      console.log(response);

    })
    this.items.map(i => {
      if (i.ItemId == id) {
        i.ItemName = this.registrationForm.value.ItemName;
        i.Qauntity = this.registrationForm.value.Qauntity;
        i.Price = this.registrationForm.value.Price;
      }
    })
    this.registrationForm.reset();
  }
}