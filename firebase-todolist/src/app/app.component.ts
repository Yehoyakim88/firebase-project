import { Component, Input } from '@angular/core';
import { Firestore, collectionData, collection, doc } from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

interface Item {
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  // the $ character does not have any function! It just makes clear that it is an updatable variable (type: Observable)
  todos$: Observable<any>;               // variable item$ of type Observable which updates itself when changes are made on side of database
  // todos:Array<any>;

  todotext:string = '';
  
  // private attribute inside constructor helps to use var firebase in newToDo()
  constructor(private firestore: Firestore) {
    // strict-mode inside angular.json set off, so that coll can be without postix ': <type>'
    // name of desired collection to download is 'todos'
    const coll = collection(firestore, 'todos');  
    this.todos$ = collectionData(coll);

    // to immediately update on every database change
    // use the code snippet below
    // this.todos$.subscribe((newToDoS) => {
    //   console.log('New data are: ', newToDoS);
    //   this.todos = newToDoS;
    // });
  }

  newToDo() {
    const coll = collection(this.firestore, 'todos');
    return setDoc(doc(coll), {name: this.todotext});
  }
}
