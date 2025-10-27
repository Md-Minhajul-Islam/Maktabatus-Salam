
import Swal from 'sweetalert2';

export default async function ConfirmDialog() {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    return result.isConfirmed;
}