import Swal from "sweetalert2";

export const showSuccessAlert = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    confirmButtonText: "OK",
  });
};

export const showErrorAlert = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "error",
    confirmButtonText: "OK",
  });
};