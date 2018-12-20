import { Component, OnInit } from '@angular/core';
import { Link } from '../link';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})

export class LinksComponent implements OnInit {

  selectedLink: Link;
  links: Link[];

  constructor(private linkService: LinkService) { }

  ngOnInit() {
    console.log('ngOnInit() on LinksComponent');
    this.getLinks();
  }

  onSelect(link: Link): void {
    this.selectedLink = link;
  }

  getLinks(): void {
    this.linkService.getLinks()
        .subscribe(links => this.links = links);
  }
}
