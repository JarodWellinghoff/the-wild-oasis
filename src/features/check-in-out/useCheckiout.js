import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const {
    mutate: checkout,
    isLoading: isCheckingOut,
    error,
  } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Checked out booking #${data.id}`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Failed to check out booking");
    },
  });

  return { checkout, isCheckingOut, error };
}
