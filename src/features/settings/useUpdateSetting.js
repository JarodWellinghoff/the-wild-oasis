import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      toast.success("Setting updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      //   reset();
    },
    onError: () => {
      toast.error("Failed to update setting");
    },
  });

  return { isUpdating, updateSetting };
}
