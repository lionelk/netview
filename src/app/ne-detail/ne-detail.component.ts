import { Component, OnInit, Input } from '@angular/core';
import { Ne } from '../ne';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-ne-detail',
  templateUrl: './ne-detail.component.html',
  styleUrls: ['./ne-detail.component.css']
})

export class NeDetailComponent implements OnInit {

  @Input() ne: Ne;


  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.add('ne-detail ngOnInit');
  }

}
