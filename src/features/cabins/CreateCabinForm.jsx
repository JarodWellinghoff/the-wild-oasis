import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isUpdating, updateCabin } = useUpdateCabin();

  const isWorking = isCreating || isUpdating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      updateCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}>
      <FormRow label='Cabin Name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register("name", {
            required: "Cabin name is required",
          })}
        />
      </FormRow>
      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
          })}
        />
      </FormRow>
      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          {...register("description", {
            required: "Description is required",
          })}
        />
      </FormRow>
      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "Image is required",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset'
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Add Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
