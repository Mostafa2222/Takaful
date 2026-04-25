import Swal from 'sweetalert2';

export class AlertService {

    static loading(title: string = 'جاري التنفيذ...') {
        Swal.fire({
            title,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
    }

    static close() {
        Swal.close();
    }

    static error(message: string) {
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: message,
            timer: 2000, 
            showConfirmButton: false,
            confirmButtonText: 'موافق',
            confirmButtonColor: '#1e88e5',
            background: '#fff',
            customClass: {
                popup: 'rounded-4 p-4',
                confirmButton: 'btn btn-primary px-4'
            }
        });
    }

    static success(message: string) {
        Swal.fire({
            icon: 'success',
            title: 'تم',
            text: message,
            timer: 2000, 
            showConfirmButton: false,
            confirmButtonText: 'موافق'
        });
    }

    static confirm(message: string): Promise<boolean> {
        return Swal.fire({
            icon: 'warning',
            title: 'هل أنت متأكد؟',
            text: message,
            // timer: 2000, 
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'نعم',
            cancelButtonText: 'إلغاء',
            confirmButtonColor: '#d33',
            reverseButtons: true
        }).then(result => result.isConfirmed);
    }

    static toastSuccess(message: string) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 2500
        });
    }

    static toastError(message: string) {
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

//AlertService.toastSuccess(`تم اختيار نوع البطاقة: ${type.name}, يمكنك تغيير هذا لاحقًا من الإعدادات, لا تقلق!, ID: ${type.id}`);
// AlertService.error('من فضلك أكمل البيانات المطلوبة في هذه الخطوة');
  //   AlertService.toastSuccess(`تم اختيار اللون: ${this.activeField}`);
//   AlertService.error('من فضلك أكمل البيانات');
// AlertService.success('تم إضافة المكافأة');
