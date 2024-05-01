import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createUpdateCabin,
    onSuccess: () => {
      toast.success("Cabin created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      //   reset();
    },
    onError: () => {
      toast.error("Failed to create cabin");
    },
  });

  return { isCreating, createCabin };
}
