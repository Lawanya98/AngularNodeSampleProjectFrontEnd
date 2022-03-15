import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemServiceService } from '../services/item-service.service';
import { SharedServiceService } from '../services/shared-service.service';
@Component({
  selector: 'app-item-user-view',
  templateUrl: './item-user-view.component.html',
  styleUrls: ['./item-user-view.component.scss']
})
export class ItemUserViewComponent implements OnInit {

  registrationForm: FormGroup;

  public items: any;
  public items2: any;
  public listVisibility = false;
  public count = 0;

  constructor(private service: ItemServiceService, private fb: FormBuilder, private sharedService: SharedServiceService) { }


  ngOnInit() {
    this.sharedService.setIsLoggedIn(true);
    this.registrationForm = this.fb.group({
      ItemId: [''],
      ItemName: [''],
      Qauntity: [''],
      Price: ['']
    });
  }

  getItemsFromAPI() {
    console.log("get item clicked");
    this.service.getItems().subscribe((response: []) => {
      console.log(response);
      this.items = response['payload'];
      // this.listVisibility = !this.listVisibility;
      // return response;
    })
  }

  searchItem(id) {
    console.log("serch item clicked" + id);
    this.service.getItemById(id).subscribe((response) => {
      this.items2 = response['payload'];
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
