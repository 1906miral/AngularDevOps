import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //readonly API_URL = 'http://192.168.1.149:8089/SpringMVC/produit';

  constructor(private httpClient: HttpClient) { }
  getAllProducts() {
    return this.httpClient.get('/url/SpringMVC/produit/retrieve-all-produits')
  }
  addProduct(product : any) {
    return this.httpClient.post('/url/SpringMVC/produit/add-produit', product)
  }
  editProduct(product : any){
    return this.httpClient.put('/url/SpringMVC/produit/modify-produit', product)
  }
  deleteProduct(idProduct : any){
    return  this.httpClient.delete('/url/SpringMVC/produit/remove-produit/${idProduct}')
  }

}
