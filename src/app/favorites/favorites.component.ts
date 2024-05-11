import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { ProductResponse } from '../models/product-atlas';
import { AuthAltasService } from '../service/auth-atlas.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

  productsIds: string[] = []
  constructor(private userService: UserService, private auth: AuthAltasService){
    const user:Realm.User = this.auth.getCurrentUser()
      if(user){
        if(this.auth.tokenExpired(user.accessToken)){
          this.auth.refreshUser()
        }
        this.userService.getUserFavorites(user.id, user.accessToken).subscribe({
          next: favorites => {
            console.log(favorites)
          this.productsIds = favorites
           
          }
        })

    }
  }
}
