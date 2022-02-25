import { toast } from 'react-toastify';

export const toastSuccess = (content) => {
    toast.success(content, {
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT
    });
};

export const toastError = (content) => {
    toast.error(content, {
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT
    });
};

export const toastInfo = (content) => {
    toast.info(content, {
        autoClose: 1500,
        position: toast.POSITION.TOP_RIGHT
    });
};