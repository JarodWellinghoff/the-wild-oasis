import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (id) => deleteBookingAPI(id),
    onSuccess: () => {
      // Query invalidation
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({
        queryKey: "bookings",
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isDeleting, deleteBooking };
}
