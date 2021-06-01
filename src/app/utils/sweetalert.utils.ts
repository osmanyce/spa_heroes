import {Injectable} from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const DESC = 'This action cannot be reversed';
const ICON = 'warning';
const ACTION_YES = 'Yes, delete it!';

@Injectable({providedIn: 'root'})
export class SweetalertUtil {

  constructor() {
  }

  deleteAlert(type: string): Swal {
    return Swal.fire({
      title: type,
      text: DESC,
      icon: ICON,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ACTION_YES
    });
  }
}
