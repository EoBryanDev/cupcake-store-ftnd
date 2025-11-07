"use client";

import { useForm } from "react-hook-form";
import { addressSchema, IAddressSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { PatternFormat } from "react-number-format";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { formatAddress } from "@/src/helpers/address-summarized";
import { useUserAddressQuery } from "@/src/hooks/queries/useUserAddress";
import { useCreateAddressMutation } from "@/src/hooks/mutations/useCreateAddress";
import { useUpdateAddressMutation } from "@/src/hooks/mutations/useUpdateAddress";
import useCheckoutStore from "@/src/store/checkout-store/useCheckoutStore";
import { RotateCcwIcon, TrashIcon, EditIcon } from "lucide-react";
import { useDeleteAddressMutation } from "@/src/hooks/mutations/useDeleteAddress";

const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { nextStep, addUserAdd } = useCheckoutStore();

  const createAddressMutation = useCreateAddressMutation();
  const deleteAddressMutation = useDeleteAddressMutation();
  const updateAddressMutation = useUpdateAddressMutation();

  const { data: addresses, isLoading } = useUserAddressQuery();

  const form = useForm<IAddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      receiverName: "",
      street: "",
      number: "",
      complement: "",
      referencePoint: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phoneNumber: "",
      mainAddress: true,
    },
  });

  const addressSelectedData =
    addresses?.data?.find(
      (address) => address.shippingAddrId === selectedAddress,
    ) || null;
  const formEdit = useForm<IAddressSchema>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      receiverName: addressSelectedData?.receiverName || "",
      street: addressSelectedData?.street || "",
      number: addressSelectedData?.number || "",
      complement: addressSelectedData?.complement || "",
      referencePoint: addressSelectedData?.referencePoint || "",
      neighborhood: addressSelectedData?.neighborhood || "",
      city: addressSelectedData?.city || "",
      state: addressSelectedData?.state || "",
      country: addressSelectedData?.country || "",
      zipCode: addressSelectedData?.zipCode || "",
      phoneNumber: addressSelectedData?.phoneNumber || "",
      mainAddress: addressSelectedData?.mainAddress || true,
    },
  });

  useEffect(() => {
    if (isEditing && addressSelectedData) {
      formEdit.reset(addressSelectedData);
    } else if (!isEditing) {
      // Opcionalmente, limpa o formEdit quando não estiver editando
      formEdit.reset({
        receiverName: "",
        street: "",
        number: "",
        complement: "",
        referencePoint: "",
        neighborhood: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        phoneNumber: "",
        mainAddress: true,
      });
    }
  }, [isEditing, addressSelectedData, formEdit]);

  const handleClear = () => {
    form.reset({
      receiverName: "",
      street: "", // Isso reseta o formulário de "adicionar novo", não o de edição.
      number: "",
      complement: "",
      referencePoint: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      phoneNumber: "",
      mainAddress: true,
    });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const onSubmitEdit = async (values: IAddressSchema) => {
    if (!selectedAddress || selectedAddress === "add_new") return;

    try {
      const updatedAddress = await updateAddressMutation.mutateAsync({
        address_id: selectedAddress,
        data: values,
      });

      toast.success("Address updated successfully");
      // form.reset(); // Isso reseta o formulário de "adicionar novo", não o de edição.
      setIsEditing(false);

      if (updatedAddress.data && updatedAddress.data.length > 0) {
        setSelectedAddress(updatedAddress.data[0].shippingAddrId);
      }
    } catch (error) {
      toast.error("Error to update address");
      console.error(error);
    }
  };

  const onSubmit = async (values: IAddressSchema) => {
    try {
      const newAddress = await createAddressMutation.mutateAsync(values);
      toast.success("Address created successfully");
      form.reset();

      if (newAddress.data && newAddress.data.length > 0) {
        setSelectedAddress(newAddress.data[0].shippingAddrId);
      }
    } catch (error) {
      toast.error("Error to create address");
      console.error(error);
    }
  };

  const onClickDelete = async () => {
    try {
      await deleteAddressMutation.mutateAsync(selectedAddress!);
      toast.success("Address deleted successfully");
      setSelectedAddress(null);
      setIsEditing(false);
      // formEdit será resetado pelo useEffect quando isEditing se tornar false
    } catch (error) {
      toast.error("Error to delete address");
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        {(!selectedAddress || selectedAddress === "add_new") && (
          <CardTitle>Identification</CardTitle>
        )}
        {selectedAddress !== "add_new" && selectedAddress !== null && (
          <CardTitle className="flex items-center justify-between">
            Identification
            <div className="flex gap-2">
              {isEditing ? (
                <RotateCcwIcon
                  size={16}
                  className="cursor-pointer text-orange-500 hover:text-orange-600"
                  onClick={handleClear}
                />
              ) : (
                <EditIcon
                  size={16}
                  className="cursor-pointer hover:text-orange-500"
                  onClick={handleEdit}
                />
              )}

              <TrashIcon
                size={16}
                className="cursor-pointer hover:text-red-500"
                onClick={onClickDelete}
              />
            </div>
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {isLoading || createAddressMutation.isPending ? (
          <div className="py-4 text-center">
            <p>Loading addresses...</p>
          </div>
        ) : (
          <RadioGroup
            value={selectedAddress || ""}
            onValueChange={(value) => {
              setSelectedAddress(value);

              setIsEditing(false);
            }}
          >
            {addresses?.data && addresses.data.length === 0 && (
              <div className="py-4 text-center">
                <p className="text-muted-foreground">
                  You do not have any addresses yet.
                </p>
              </div>
            )}

            {addresses?.data &&
              addresses.data.length > 0 &&
              addresses?.data.map((address) => (
                <Card key={address.shippingAddrId}>
                  <CardContent>
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem
                        value={address.shippingAddrId}
                        id={address.shippingAddrId}
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={address.shippingAddrId}
                          className="cursor-pointer"
                        >
                          <div>
                            <p className="text-sm">{formatAddress(address)}</p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            <Card>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="add_new" id="add_new" />
                  <Label htmlFor="add_new">Add New Address</Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>
        )}

        {selectedAddress && selectedAddress !== "add_new" && !isEditing && (
          <div className="mt-4">
            <Button
              onClick={() => {
                addUserAdd(selectedAddress);
                nextStep();
              }}
              className="w-full"
            >
              Payment Method
            </Button>
          </div>
        )}

        {selectedAddress === "add_new" && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-4 space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="receiverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Type receiver name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="Type street name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Type number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complement</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="block, apartment (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referencePoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Point</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Type reference point (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Neighborhood</FormLabel>
                      <FormControl>
                        <Input placeholder="Type neighborhood" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Type city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Type state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Type country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="#####-###"
                          placeholder="00000-000"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="(##) #####-####"
                          placeholder="(11) 99999-9999"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  createAddressMutation.isPending ||
                  updateAddressMutation.isPending
                }
              >
                {createAddressMutation.isPending ? "Saving..." : "Save Address"}
              </Button>
            </form>
          </Form>
        )}

        {isEditing && (
          <Form {...formEdit}>
            <form
              onSubmit={formEdit.handleSubmit(onSubmitEdit)}
              className="mt-4 space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={formEdit.control}
                  name="receiverName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiver Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Type receiver name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formEdit.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="Type street name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formEdit.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Type number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formEdit.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complement</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="block, apartment (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formEdit.control}
                  name="referencePoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Point</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Type reference point (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formEdit.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Neighborhood</FormLabel>
                      <FormControl>
                        <Input placeholder="Type neighborhood" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formEdit.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Type city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formEdit.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="Type state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formEdit.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Type country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formEdit.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="#####-###"
                          placeholder="00000-000"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={formEdit.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <PatternFormat
                          format="(##) #####-####"
                          placeholder="(11) 99999-9999"
                          customInput={Input}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={updateAddressMutation.isPending}
              >
                {updateAddressMutation.isPending
                  ? "Updating..."
                  : "Update Address"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
