import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInWithEmailAndPassword } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLoginWithEmailAndPassword() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) =>
      signInWithEmailAndPassword({ email, password }),
    onSuccess: (user) => {
      toast.success(`Welcome back, !`);
      navigate("/dashboard");
      queryClient.setQueryData(["user"], user.user);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to login");
    },
  });

  return { isLoading, error, login };
}
