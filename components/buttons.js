import Swal from 'sweetalert2'

export const buttons = Swal.mixin({
  customClass: {
    confirmButton: 'start-game-btn',
    cancelButton: 'cancel-button'
  },
  buttonsStyling: false,
  background: '#000',
  color: '#fff'
})
