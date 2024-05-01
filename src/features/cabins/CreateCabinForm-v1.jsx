import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: () => {
      toast.error("Failed to create cabin");
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating}
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
      </FormRow>
      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
          })}
        />
      </FormRow>
      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating}
          {...register("regularPrice", {
            required: "Regular price is required",
            valueAsNumber: true,
            min: { value: 1, message: "Price must be at least 1" },
          })}
        />
      </FormRow>
      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isCreating}
          {...register("discount", {
            valueAsNumber: true,
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount must be less than regular price",
          })}
        />
      </FormRow>
      <FormRow
        label='Description for website'
        error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          disabled={isCreating}
          {...register("description", {
            required: "Description is required",
          })}
        />
      </FormRow>
      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isCreating}
          {...register("image", {
            required: "Image is required",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
