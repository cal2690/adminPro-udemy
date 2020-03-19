import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public uploadFile: File;
  public imageTemp;

  constructor(
    public _uploadFile: UploadFileService,
    public _modalUpload: ModalUploadService
  ) {}

  ngOnInit(): void {
  }

  selectFile(file: File) {
    
    if (!file) {
      this.uploadFile = null;
      return;
    }

    if(file.type.indexOf('image') < 0) {
      alert('El archivo seleccionado no es una imagen');
      this.uploadFile = null;
      return;
    }
    
    this.uploadFile = file;
  
    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = () => this.imageTemp = reader.result;

  }

  uploadImage() {
    this._uploadFile.uploadFile(this.uploadFile, this._modalUpload.type, this._modalUpload.id).
    then( result => {
      this._modalUpload.notification.emit(result);
      this.closeModal();
    })
    .catch( err => {
      console.log('Error Upload Image');
    })
  }

  closeModal() {
    this.imageTemp = null;
    this.uploadFile = null;
    this._modalUpload.hideModal();
  }

}
