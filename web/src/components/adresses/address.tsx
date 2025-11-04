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
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { formatAddress } from "@/src/helpers/address-summarized";
import { useUserAddressQuery } from "@/src/hooks/queries/useUserAddress";
import { useCreateAddressMutation } from "@/src/hooks/mutations/useCreateAddress";
import { useUpdateAddressMutation } from "@/src/hooks/mutations/useUpdateAddress";
import useCheckoutStore from "@/src/store/checkout-store/useCheckoutStore";

const Addresses = () => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { nextStep } = useCheckoutStore();

  const createAddressMutation = useCreateAddressMutation();
  // const updateAddressMutation = useUpdateAddressMutation();

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

  const onSubmit = async (values: IAddressSchema) => {
    try {
      const newAddress = await createAddressMutation.mutateAsync(values);
      toast.success("Address created successfully");
      form.reset();
      setSelectedAddress(newAddress.data[0].shippingAddrId);
    } catch (error) {
      toast.error("Error to create address");
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identification</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-4 text-center">
            <p>Loading addresses...</p>
          </div>
        ) : (
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
          >
            {addresses?.data.length === 0 && (
              <div className="py-4 text-center">
                <p className="text-muted-foreground">
                  You do not have any addresses yet.
                </p>
              </div>
            )}

            {addresses?.data.map((address) => (
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
                  <Label htmlFor="add_new">Adicionar novo endereço</Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>
        )}

        {selectedAddress && selectedAddress !== "add_new" && (
          <div className="mt-4">
            <Button
              onClick={nextStep}
              className="w-full"
              // disabled={updateCartShippingAddressMutation.isPending}
            >
              {/* {updateCartShippingAddressMutation.isPending
                ? "Processando..."
                : "Ir para pagamento"} */}
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
                        <Input placeholder="Digite o estado" {...field} />
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
                        <Input placeholder="Digite o estado" {...field} />
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
                disabled={createAddressMutation.isPending}
              >
                {createAddressMutation.isPending ? "Saving..." : "Save Address"}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
