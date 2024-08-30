import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../Models/Contact.Model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe,FormsModule ,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'contactly.web';
  http= inject(HttpClient);
  contactForm = new FormGroup({
    name: new FormControl<string>(''),
    email: new FormControl<string | null>(''),
    phone: new FormControl<string>(''),
    Favorite: new FormControl<boolean>(false)
  })
contacts$ = this.GetContact();
onFormSubmit(){
const addContactRequest = {
  name: this.contactForm.value.name,
  email: this.contactForm.value.email,
  phone: this.contactForm.value.phone,
  Favorite: this.contactForm.value.Favorite,
}

this.http.post('http://localhost:5254/api/Contacts', addContactRequest)
.subscribe({
  next: (value) => {
    console.log(value);
  this.contacts$ = this.GetContact();
  this.contactForm.reset();
}
})
}
onDelete(id: string)
{ 
  var url ="http://localhost:5254/api/Contacts/"+id;
this.http.delete(url)
.subscribe({
  next: (value) => {
    console.log(value);
  this.contacts$ = this.GetContact();
  this.contactForm.reset();
  }
})
}

private GetContact(): Observable<Contact[]> {
 return this.http.get<Contact[]>('http://localhost:5254/api/Contacts');
  }

}