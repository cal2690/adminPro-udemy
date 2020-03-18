import { Injectable } from '@angular/core';
import { URL_SERVICE } from 'src/app/config/config';

@Injectable()
export class UploadFileService {

  constructor() {}

  uploadFile(file: File, collection: string, id: string) {

    return new Promise((resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Image load');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Error load image');
            reject(xhr.response);
          }
        }
      }

      let url = URL_SERVICE + '/upload/' + collection + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);

    })

  }


}
