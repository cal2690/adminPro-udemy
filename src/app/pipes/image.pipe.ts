import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, collection: string = 'users'): any {

    let url = URL_SERVICE + '/image';

    if (!image) {
      return url + '/users/noimage';
    }

    if(image.indexOf('https') >= 0) {
      return image;
    }

    switch (collection) {
      case 'users':
        url += '/users/' + image;
      break;
      
      case 'doctors':
        url += '/doctors/' + image;
      break;

      case 'hospitals':
        url += '/hospitals/' + image;
      break;

      default:
        console.log('Image not found');
        url += '/user/noimage';
    }

    return url;
  }

}
