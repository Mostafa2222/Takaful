import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AlertService {

    constructor(private translate: TranslateService) { }

    loading(title?: string) {
        Swal.fire({
            title: title || this.translate.instant('alerts.loading'),
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });
    }

    close() {
        Swal.close();
    }

    error(message: string) {
        Swal.fire({
            icon: 'error',
            title: this.translate.instant('messages.alerts.error_title'),
            text: message,
            timer: 2000,
            showConfirmButton: false,
            confirmButtonText: this.translate.instant('messages.alerts.yes'),
            confirmButtonColor: '#1e88e5',
            background: '#fff',
            customClass: {
                popup: 'rounded-4 p-4',
                confirmButton: 'btn btn-primary px-4'
            }
        });
    }

    success(message: string) {
        Swal.fire({
            icon: 'success',
            title: this.translate.instant('messages.alerts.success_title'),
            text: message,
            timer: 2000,
            showConfirmButton: false,
            confirmButtonText: this.translate.instant('messages.alerts.yes')
        });
    }

    confirm(message: string): Promise<boolean> {
        return Swal.fire({
            icon: 'warning',
            title: this.translate.instant('messages.alerts.confirm_title'),
            text: message,
            // timer: 2000, 
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: this.translate.instant('messages.alerts.yes'),
            cancelButtonText: this.translate.instant('messages.alerts.cancel'),
            confirmButtonColor: '#d33',
            reverseButtons: true
        }).then(result => result.isConfirmed);
    }

    toastSuccess(message: string) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 2500
        });
    }

    toastError(message: string) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 2500
        });
    }

}

