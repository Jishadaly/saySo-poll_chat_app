"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z.array(z.string().min(1, "Option cannot be empty")) 
  .min(2, "At least two options are required"),
})

export function PollCreator() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      options: ["", ""],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setOpen(false)
    form.reset()
    toast.success("Poll has been created");
  }

  const addOption = () => {
    const currentOptions = form.getValues("options")
    form.setValue("options", [...currentOptions, ""])
  }

  const removeOption = (index: number) => {
    const currentOptions = form.getValues("options")
    if (currentOptions.length > 2) {
      form.setValue(
        "options",
        currentOptions.filter((_, i) => i !== index)
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Poll</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Poll</DialogTitle>
          <DialogDescription>
            Enter your question and add options for your poll.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your question" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("options").map((_, index) => (
              <FormField
                key={index}
                control={form.control}
                name={`options.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Option ${index + 1}`}</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input {...field} />
                        {index > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeOption(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </FormControl>
                  <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="button" variant="outline" onClick={addOption}>
              <Plus className="mr-2 h-4 w-4" /> Add Option
            </Button>
            <DialogFooter>
              <Button type="submit">Create Poll</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}