import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: checkin,
    isLoading: isCheckingIn,
    error,
  } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Checked in booking #${data.id}`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => {
      toast.error("Failed to check in booking");
    },
  });

  return { checkin, isCheckingIn, error };
}
