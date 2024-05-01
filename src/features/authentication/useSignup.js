import { useMutation } from "@tanstack/react-query";
import { signUpWithEmailAndPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signUpWithEmailAndPassword,
    onSuccess: () => {
      toast.success("Account created successfully");
    },
  });
  return { signup, isLoading };
}
