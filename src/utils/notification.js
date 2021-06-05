import { toast, Flip, Bounce } from 'react-toastify'

export const createNotification = (message, type, position) => {
  toast.configure({
    position: position || 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: position === "bottom-right" ? Flip : Bounce
  })
  switch (type) {
    case 'success':
      toast.success(message)
      return
    case 'warn':
      toast.warn(message)
      return
    case 'error':
      toast.error(message)
      return
    case 'info':
      toast.info(message)
      return
    default:
      toast(message)
  }
}
