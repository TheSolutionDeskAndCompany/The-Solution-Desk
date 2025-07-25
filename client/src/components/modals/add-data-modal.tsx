import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";

const dataPointSchema = z.object({
  dataType: z.enum(['measurement', 'defect', 'time', 'cost', 'other']),
  value: z.number().min(0, "Value must be positive"),
  unit: z.string().optional(),
  description: z.string().optional(),
  collectedAt: z.string().optional(),
});

const metricsSchema = z.object({
  metricType: z.enum(['cost_savings', 'efficiency', 'quality_score', 'cycle_time', 'defect_rate']),
  value: z.number(),
  unit: z.string().optional(),
  description: z.string().optional(),
});

type DataPointFormData = z.infer<typeof dataPointSchema>;
type MetricsFormData = z.infer<typeof metricsSchema>;

interface AddDataModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: number;
  mode: 'data' | 'metrics';
}

export default function AddDataModal({ open, onOpenChange, projectId, mode }: AddDataModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const dataForm = useForm<DataPointFormData>({
    resolver: zodResolver(dataPointSchema),
    defaultValues: {
      dataType: 'measurement',
      value: 0,
      unit: "",
      description: "",
      collectedAt: new Date().toISOString().split('T')[0],
    },
  });

  const metricsForm = useForm<MetricsFormData>({
    resolver: zodResolver(metricsSchema),
    defaultValues: {
      metricType: 'efficiency',
      value: 0,
      unit: "",
      description: "",
    },
  });

  const addDataMutation = useMutation({
    mutationFn: async (data: DataPointFormData) => {
      const response = await apiRequest("POST", `/api/projects/${projectId}/data`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Data Added",
        description: "Your data point has been added successfully.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/data`] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/metrics"] });
      dataForm.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/auth";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add data point. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addMetricsMutation = useMutation({
    mutationFn: async (data: MetricsFormData) => {
      const response = await apiRequest("POST", `/api/projects/${projectId}/metrics`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Metric Added",
        description: "Your metric has been added successfully.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${projectId}/metrics`] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/metrics"] });
      metricsForm.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/auth";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add metric. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmitData = (data: DataPointFormData) => {
    addDataMutation.mutate(data);
  };

  const onSubmitMetrics = (data: MetricsFormData) => {
    addMetricsMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'data' ? 'Add Data Point' : 'Add Project Metric'}
          </DialogTitle>
        </DialogHeader>

        {mode === 'data' ? (
          <Form {...dataForm}>
            <form onSubmit={dataForm.handleSubmit(onSubmitData)} className="space-y-4">
              <FormField
                control={dataForm.control}
                name="dataType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select data type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="measurement">Measurement</SelectItem>
                        <SelectItem value="defect">Defect Count</SelectItem>
                        <SelectItem value="time">Time/Duration</SelectItem>
                        <SelectItem value="cost">Cost</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={dataForm.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="Enter value"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={dataForm.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., minutes, dollars, pieces" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={dataForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Additional details..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={dataForm.control}
                name="collectedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={addDataMutation.isPending}>
                  {addDataMutation.isPending ? "Adding..." : "Add Data Point"}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...metricsForm}>
            <form onSubmit={metricsForm.handleSubmit(onSubmitMetrics)} className="space-y-4">
              <FormField
                control={metricsForm.control}
                name="metricType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metric Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select metric type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cost_savings">Cost Savings</SelectItem>
                        <SelectItem value="efficiency">Efficiency Improvement</SelectItem>
                        <SelectItem value="quality_score">Quality Score</SelectItem>
                        <SelectItem value="cycle_time">Cycle Time</SelectItem>
                        <SelectItem value="defect_rate">Defect Rate</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={metricsForm.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="Enter metric value"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={metricsForm.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., %, $, hours, points" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={metricsForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Details about this metric..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={addMetricsMutation.isPending}>
                  {addMetricsMutation.isPending ? "Adding..." : "Add Metric"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}