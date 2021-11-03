import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class MessageService {

    error(error) {
        if (error.status === 422) {
            let i;
            const fields = Object.values(error.error.msg.detail).toString().split('.,');
            let html = '<ul>';
            for (i = 0; i < fields.length - 1; i++) {
                html += `<li>${fields[i]}.</li>`;
            }
            html += `<li>${fields[i]}</li>`;
            html += '</ul>';
            return Swal.fire({
                title: error.error.msg.summary,
                html,
                icon: 'error'
            });
        }

        if (error.status === 400) {
            if (error.error.msg.code === '23505') {
                return Swal.fire({
                    title: 'El registro ya existe',
                    text: error.error.data,
                    icon: 'error'
                });
            }
        }

        return Swal.fire({
            title: error.error.msg.summary,
            text: error.error.msg.detail,
            icon: 'error'
        });
    }

    success(response) {
        return Swal.fire({
            title: response.msg.summary,
            text: response.msg.detail,
            icon: 'info'
        });
    }
}
