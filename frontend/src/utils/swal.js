import Swal from 'sweetalert2'

const defaultOptions = {
  allowOutsideClick: false,
  confirmButtonColor: '#0f172a',
  buttonsStyling: true,
}

export function showSuccessAlert({ title, text, confirmButtonText = 'OK' }) {
  return Swal.fire({
    ...defaultOptions,
    icon: 'success',
    title,
    text,
    confirmButtonText,
  })
}

export function showErrorAlert({ title, text, confirmButtonText = 'OK' }) {
  return Swal.fire({
    ...defaultOptions,
    icon: 'error',
    title,
    text,
    confirmButtonText,
  })
}

export function showWarningAlert({ title, text, confirmButtonText = 'OK' }) {
  return Swal.fire({
    ...defaultOptions,
    icon: 'warning',
    title,
    text,
    confirmButtonText,
  })
}

export function confirmActionAlert({ title, text, confirmButtonText = 'Yes', cancelButtonText = 'Cancel' }) {
  return Swal.fire({
    ...defaultOptions,
    icon: 'warning',
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#64748b',
  })
}