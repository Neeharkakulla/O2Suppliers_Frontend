import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imageviewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imageviewer.component.html',
  styleUrl: './imageviewer.component.css'
})
export class ImageviewerComponent {
  retrievedImage: any;
  showImage=false

  constructor(
    private router: Router) { }
  @Input() image: any;
  ngOnInit(): void {
    this.retrievedImage = 'data:image/jpeg;base64,' + this.image;
    if(this.image)
      this.showImage=true;
  }
  close() {
   this.showImage=false
  }

}
