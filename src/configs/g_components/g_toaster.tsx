import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const successToast = ({ title, position }: { title: string, position?: string }) => {
  let objsuccess: Record<string, any> =
  {
    position: position ?? "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  return toast.success(title, objsuccess)
}
const warningToast = ({ title, position }: { title: string, position?: string }) => {

  let objWarning: Record<string, any> =
  {
    position: position ?? "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  return toast.warning(title, objWarning)

}
const errorToast = ({ title, position }: { title: string, position?: string }) => {
  let objerror: Record<string, any> =
  {
    position: position ?? "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  return toast.error(title, objerror)

}

export { successToast, warningToast, errorToast }
