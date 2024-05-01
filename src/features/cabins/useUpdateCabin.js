import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createUpdateCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //   reset();
    },
    onError: () => {
      toast.error("Failed to updated cabin");
    },
  });

  return { isUpdating, updateCabin };
}
